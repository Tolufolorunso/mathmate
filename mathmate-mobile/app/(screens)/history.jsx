import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  LayoutAnimation,
  Platform,
  RefreshControl,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import {
  Button,
  Card,
  Chip,
  IconButton,
  Text,
  useTheme,
} from 'react-native-paper';
import ScreenWrapper from '../../components/ScreenWrapper';
import { AppText } from '../../components/ui';
import AppBar from '../../components/ui/AppBar';
import { useMathStore } from '../../store/mathStore';
import homeStyles from '../../style/home.style';

// Enable LayoutAnimation for Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// --- Memoized History Item for Performance ---
// By wrapping the item in React.memo, we prevent it from re-rendering
// unless its specific props have changed.
const HistoryCard = React.memo(({ item, onPress, theme, styles, onDelete }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card
        style={[styles.recentCard, { backgroundColor: theme.colors.surface }]}
        elevation={1}
      >
        <Card.Content style={styles.recentContent}>
          <View style={styles.recentInfo}>
            <Chip
              mode='outlined'
              icon={item.type === 'image' ? 'camera' : 'keyboard'}
              style={styles.recentChip}
            >
              {item.type === 'image' ? 'Photo' : 'Text'}
            </Chip>
            <AppText bodySmall style={{ color: theme.colors.onSurfaceVariant }}>
              {new Date(item.timestamp).toLocaleDateString()}
            </AppText>
          </View>
          <AppText
            bodyMedium
            style={{ color: theme.colors.onSurface }}
            numberOfLines={2} // Prevents very long text from breaking the layout
          >
            {item.type === 'image' ? 'Image Question' : item.content}
          </AppText>
          <AppText
            bodySmall
            style={[styles.recentStatus, { color: theme.colors.success }]}
          >
            ✓ Solved
          </AppText>
          <IconButton
            icon='trash-can-outline'
            size={18}
            iconColor={theme.colors.error}
            style={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              margin: 0,
            }}
            onPress={(e) => {
              e.stopPropagation(); // prevent card press
              onDelete();
            }}
          />
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
});

export default function HistoriesScreen() {
  const theme = useTheme();
  const styles = homeStyles();
  const router = useRouter();
  const {
    getQuestionHistory,
    setSolutionContent,
    clearHistory,
    deleteHistoryItem,
  } = useMathStore();

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const PAGE_SIZE = 15; // Number of items to fetch per page

  const animateList = () =>
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

  // --- Data Fetching Logic ---
  const fetchData = useCallback(
    (pageNum, isRefresh = false) => {
      // Prevent fetching if already loading or all data is loaded
      if (isLoading || (!isRefresh && allDataLoaded)) return;

      if (isRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      // Simulate an API call to get paginated history
      setTimeout(() => {
        const fullHistory = getQuestionHistory();
        const startIndex = (pageNum - 1) * PAGE_SIZE;
        const newItems = fullHistory.slice(startIndex, startIndex + PAGE_SIZE);

        // Animate the layout before updating the data
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        if (isRefresh) {
          setData(newItems);
          setAllDataLoaded(false); // Reset when refreshing
        } else {
          setData((prevData) => [...prevData, ...newItems]);
        }

        if (newItems.length < PAGE_SIZE) {
          setAllDataLoaded(true);
        }

        if (isRefresh) {
          setIsRefreshing(false);
        } else {
          setIsLoading(false);
        }
      }, 1000); // 1-second delay to simulate network
    },
    [isLoading, allDataLoaded, getQuestionHistory]
  );

  // Initial data load
  useEffect(() => {
    fetchData(1, true);
  }, []);

  // --- Event Handlers ---
  const handleRefresh = useCallback(() => {
    setPage(1);
    fetchData(1, true);
  }, [fetchData]);

  const handleLoadMore = useCallback(() => {
    if (!isLoading && !allDataLoaded) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchData(nextPage);
    }
  }, [isLoading, allDataLoaded, page, fetchData]);

  const handlePressItem = useCallback(
    (item) => {
      // Prevent multiple clicks while navigating
      if (isNavigating) return;

      setIsNavigating(true);
      setSolutionContent(item._id);
      router.push('(screens)/solution');

      // Reset the flag after a short delay to allow navigation to complete
      setTimeout(() => {
        setIsNavigating(false);
      }, 1000);
    },
    [isNavigating, router, setSolutionContent]
  );

  const handleClearHistory = () => {
    Alert.alert('Clear History', 'Delete all solved questions?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: () => {
          animateList();
          clearHistory();
          setData([]);
          setAllDataLoaded(true);
        },
      },
    ]);
  };

  const createDeleteHandler = (item) => () => {
    Alert.alert('Delete Item', 'Remove this question from history?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          animateList();
          deleteHistoryItem(item._id); // remove from store  AsyncStorage
          setData((prev) => prev.filter((i) => i._id !== item._id));
        },
      },
    ]);
  };

  // --- Render Functions ---
  const renderItem = useCallback(
    ({ item }) => (
      <HistoryCard
        item={item}
        onPress={() => handlePressItem(item)}
        theme={theme}
        styles={styles}
        onDelete={createDeleteHandler(item)}
      />
    ),
    [handlePressItem, theme, styles]
  );

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator
          animating
          size='large'
          color={theme.colors.primary}
        />
      </View>
    );
  };

  const renderEmptyState = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
      }}
    >
      <Text
        variant='titleMedium'
        style={{ color: theme.colors.onSurfaceVariant }}
      >
        No activity yet.
      </Text>
      <Text style={{ color: theme.colors.onSurfaceVariant }}>
        Your solved questions will appear here.
      </Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.recentHeader}>
      <AppText
        headlineMedium
        style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
      >
        Activity
      </AppText>
      <Button
        mode='text'
        onPress={handleClearHistory}
        compact
        disabled={data.length === 0}
      >
        Clear History
      </Button>
    </View>
  );

  return (
    <>
      <AppBar elevated backButton title='Histories' titleCenter titleBold />
      <ScreenWrapper>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item?._id?.toString()}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmptyState}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          contentContainerStyle={styles.recentSection}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={[theme.colors.primary]}
              tintColor={theme.colors.primary}
            />
          }
        />
      </ScreenWrapper>
    </>
  );
}
