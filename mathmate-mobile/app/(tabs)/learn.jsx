import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import ScreenWrapper from '../../components/ScreenWrapper';
import { AppBar } from '../../components/ui';

import {
  LearnHeaderSection,
  LearnLearningTips,
  LearnLevelSelection,
  LearnTopicModal,
  LearnTopics,
} from '../../components/learn';

import topicsData from '../../data/elementaryTopics.json';
import learnStyle from '../../style/learn.style';

const { width } = Dimensions.get('window');

export default function LearnScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState('elementary');
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [elementaryTopics, setElementaryTopics] = useState([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [topicsPerPage] = useState(6);
  const [showCompletedTopics, setShowCompletedTopics] = useState(false);

  const styles = learnStyle();

  // Load elementary topics data
  useEffect(() => {
    const loadTopics = async () => {
      try {
        // const topicsData = require('../../data/elementaryTopics.json');
        // Add completion status and progress to topics
        const topicsWithProgress = topicsData.topics.map((topic) => ({
          ...topic,
          progress: Math.random() * 1, // Mock progress - in real app this would come from user data
          completed: Math.random() > 0.7, // Mock completion status
          lastAccessed: new Date(
            Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
          ), // Mock last access
          timeSpent: Math.floor(Math.random() * 30) + 5, // Mock time spent in minutes
        }));
        setElementaryTopics(topicsWithProgress);
      } catch (error) {
        console.error('Error loading topics:', error);
        // Fallback to hardcoded topics if JSON fails to load
        setElementaryTopics([
          {
            id: 'E001',
            title: 'Counting 1-20',
            progress: 0.8,
            difficulty: 'Easy',
            time: '15 min',
            completed: true,
            lastAccessed: new Date(),
            timeSpent: 12,
          },
          {
            id: 'E002',
            title: 'Counting Backwards 20-1',
            progress: 0.6,
            difficulty: 'Easy',
            time: '15 min',
            completed: false,
            lastAccessed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            timeSpent: 9,
          },
          {
            id: 'E003',
            title: 'Number Line 0-10',
            progress: 0.4,
            difficulty: 'Easy',
            time: '20 min',
            completed: false,
            lastAccessed: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            timeSpent: 8,
          },
          {
            id: 'E004',
            title: 'Basic Addition 0-5',
            progress: 0.2,
            difficulty: 'Medium',
            time: '25 min',
            completed: false,
            lastAccessed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            timeSpent: 5,
          },
          {
            id: 'E005',
            title: 'Basic Subtraction 0-5',
            progress: 0.0,
            difficulty: 'Medium',
            time: '25 min',
            completed: false,
            lastAccessed: null,
            timeSpent: 0,
          },
        ]);
      }
    };

    loadTopics();
  }, []);

  const learningLevels = {
    elementary: {
      title: 'Elementary School',
      ageRange: 'Ages 6-11',
      topics: 30,
      description:
        'Foundation concepts with interactive GIFs and fun animations',
      color: theme.colors.primary,
      icon: 'school',
      topicsList: elementaryTopics,
    },
    middle: {
      title: 'Middle School',
      ageRange: 'Ages 12-14',
      topics: 30,
      description:
        'Intermediate concepts with engaging GIFs and step-by-step guidance',
      color: theme.colors.secondary,
      icon: 'calculator',
      topicsList: [
        {
          id: 1,
          title: 'Pre-Algebra',
          progress: 0.7,
          difficulty: 'Medium',
          time: '25 min',
          completed: true,
          lastAccessed: new Date(),
          timeSpent: 18,
        },
        {
          id: 2,
          title: 'Ratios & Proportions',
          progress: 0.5,
          difficulty: 'Medium',
          time: '30 min',
          completed: false,
          lastAccessed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          timeSpent: 15,
        },
        {
          id: 3,
          title: 'Percentages',
          progress: 0.3,
          difficulty: 'Medium',
          time: '25 min',
          completed: false,
          lastAccessed: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
          timeSpent: 8,
        },
        {
          id: 4,
          title: 'Basic Statistics',
          progress: 0.1,
          difficulty: 'Hard',
          time: '35 min',
          completed: false,
          lastAccessed: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
          timeSpent: 4,
        },
        {
          id: 5,
          title: 'Coordinate Geometry',
          progress: 0.0,
          difficulty: 'Hard',
          time: '40 min',
          completed: false,
          lastAccessed: null,
          timeSpent: 0,
        },
      ],
    },
    highSchool: {
      title: 'High School',
      ageRange: 'Ages 15-18',
      topics: 35,
      description:
        'Advanced concepts with comprehensive diagrams and step-by-step solutions',
      color: theme.colors.error,
      icon: 'math-integral',
      topicsList: [
        {
          id: 1,
          title: 'Algebra I',
          progress: 0.6,
          difficulty: 'Hard',
          time: '45 min',
          completed: false,
          lastAccessed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          timeSpent: 27,
        },
        {
          id: 2,
          title: 'Geometry',
          progress: 0.4,
          difficulty: 'Hard',
          time: '50 min',
          completed: false,
          lastAccessed: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          timeSpent: 20,
        },
        {
          id: 3,
          title: 'Algebra II',
          progress: 0.2,
          difficulty: 'Expert',
          time: '55 min',
          completed: false,
          lastAccessed: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
          timeSpent: 11,
        },
        {
          id: 4,
          title: 'Trigonometry',
          progress: 0.1,
          difficulty: 'Expert',
          time: '60 min',
          completed: false,
          lastAccessed: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
          timeSpent: 6,
        },
        {
          id: 5,
          title: 'Pre-Calculus',
          progress: 0.0,
          difficulty: 'Expert',
          time: '65 min',
          completed: false,
          lastAccessed: null,
          timeSpent: 0,
        },
      ],
    },
    university: {
      title: 'University',
      ageRange: 'Ages 18+',
      topics: 25,
      description:
        'Higher-level mathematics with comprehensive diagrams and proofs',
      color: theme.colors.error,
      icon: 'math-integral',
      topicsList: [
        {
          id: 1,
          title: 'Calculus I',
          progress: 0.5,
          difficulty: 'Expert',
          time: '90 min',
          completed: false,
          lastAccessed: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
          timeSpent: 45,
        },
        {
          id: 2,
          title: 'Linear Algebra',
          progress: 0.3,
          difficulty: 'Expert',
          time: '75 min',
          completed: false,
          lastAccessed: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          timeSpent: 23,
        },
        {
          id: 3,
          title: 'Calculus II',
          progress: 0.1,
          difficulty: 'Master',
          time: '100 min',
          completed: false,
          lastAccessed: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
          timeSpent: 10,
        },
        {
          id: 4,
          title: 'Differential Equations',
          progress: 0.0,
          difficulty: 'Master',
          time: '120 min',
          completed: false,
          lastAccessed: null,
          timeSpent: 0,
        },
        {
          id: 5,
          title: 'Real Analysis',
          progress: 0.0,
          difficulty: 'Master',
          time: '150 min',
          completed: false,
          lastAccessed: null,
          timeSpent: 0,
        },
      ],
    },
  };

  const selectLevel = (level) => {
    setSelectedLevel(level);
    setCurrentPage(1); // Reset to first page when changing level
  };

  const openTopic = (topic) => {
    setSelectedTopic(topic);
    setShowTopicModal(true);
  };

  const closeTopicModal = () => {
    setShowTopicModal(false);
    setSelectedTopic(null);
  };

  const startLearning = (id) => {
    // console.log(selectedTopic);
    if (selectedTopic) {
      closeTopicModal();
      // Navigate to topic detail screen with the selected topic
      router.push({
        pathname: '/topic-detail',
        params: {
          topic: id,
          level: selectedLevel,
        },
      });
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return theme.colors.success;
      case 'Medium':
        return theme.colors.warning;
      case 'Hard':
        return theme.colors.error;
      case 'Expert':
        return theme.colors.error;
      case 'Master':
        return theme.colors.primary;
      default:
        return theme.colors.onSurfaceVariant;
    }
  };

  const currentLevel = learningLevels[selectedLevel];

  // Filter topics based on completion status
  const filteredTopics = showCompletedTopics
    ? currentLevel.topicsList
    : currentLevel.topicsList.filter((topic) => !topic.completed);

  // Calculate pagination
  const totalPages = Math.ceil(filteredTopics.length / topicsPerPage);
  const startIndex = (currentPage - 1) * topicsPerPage;
  const endIndex = startIndex + topicsPerPage;
  const currentTopics = filteredTopics.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getCompletionStatus = (topic) => {
    if (topic.completed) {
      return {
        text: 'Completed',
        color: theme.colors.success,
        icon: 'check-circle',
      };
    } else if (topic.progress > 0) {
      return {
        text: 'In Progress',
        color: theme.colors.warning,
        icon: 'progress-clock',
      };
    } else {
      return {
        text: 'Not Started',
        color: theme.colors.onSurfaceVariant,
        icon: 'play-circle',
      };
    }
  };

  const formatLastAccessed = (date) => {
    if (!date) return 'Never';
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <>
      <AppBar title='Learn Math' />
      <ScreenWrapper scrollable>
        {/* Header Section */}
        <LearnHeaderSection />

        {/* Level Selection */}
        <LearnLevelSelection
          selectedLevel={selectedLevel}
          selectLevel={selectLevel}
          learningLevels={learningLevels}
        />

        {/* Topics for Selected Level */}
        <LearnTopics
          showCompletedTopics={showCompletedTopics}
          setShowCompletedTopics={setShowCompletedTopics}
          getCompletionStatus={getCompletionStatus}
          openTopic={openTopic}
          getDifficultyColor={getDifficultyColor}
          formatLastAccessed={formatLastAccessed}
          totalPages={totalPages}
          prevPage={prevPage}
          currentPage={currentPage}
          goToPage={goToPage}
          nextPage={nextPage}
          startIndex={startIndex}
          endIndex={endIndex}
          currentLevel={currentLevel}
          filteredTopics={filteredTopics}
          currentTopics={currentTopics}
        />

        {/* Learning Tips */}
        <LearnLearningTips />

        {/* Topic Modal */}
        <LearnTopicModal
          showTopicModal={showTopicModal}
          closeTopicModal={closeTopicModal}
          selectedTopic={selectedTopic}
          startLearning={startLearning}
        />
      </ScreenWrapper>
    </>
  );
}
