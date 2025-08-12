/* src/components/ui/Keyboard.js */
import * as Haptics from 'expo-haptics';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

const { width } = Dimensions.get('window');
const isSmall = width < 350;

const keyDefs = [
  [
    { label: '2nd', shifted: '2nd' },
    { label: 'deg', shifted: 'rad' },
    { label: 'sin', shifted: 'asin' },
    { label: 'cos', shifted: 'acos' },
    { label: 'tan', shifted: 'atan' },
  ],

  [
    { label: '(', shifted: '(' },
    { label: ')', shifted: ')' },
    { label: '%', shifted: '%' },
    { label: '÷', shifted: '÷' },
    { label: '⌫', shifted: '⌫' },
  ],

  [
    { label: 'log', shifted: '10ˣ' },
    { label: 'ln', shifted: 'eˣ' },
    { label: 'π', shifted: 'π' },
    { label: 'e', shifted: 'e' },
    { label: '√', shifted: '∛' },
  ],

  ['7', '8', '9', '×', 'x²'],
  ['4', '5', '6', '-', 'xʸ'],
  ['1', '2', '3', '+', '±'],
  ['0', '.', 'EXP', 'C', '='],
];

export default function Keyboard({ onPress, isSecond }) {
  const theme = useTheme();

  const press = (k) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress(k);
  };

  const numColor = theme.colors.primary;
  const opColor = theme.colors.secondary;
  const specialColor = theme.colors.success;

  const getColor = (label) => {
    if (!isNaN(label) || label === '.') return numColor;
    if (['+', '-', '×', '÷', '=', 'x²', 'xʸ'].includes(label)) return opColor;
    return specialColor;
  };

  return (
    <View style={styles.container}>
      {keyDefs.map((row, idx) => (
        <View key={idx} style={styles.row}>
          {row.map((def) => {
            const label =
              typeof def === 'string'
                ? def
                : isSecond
                ? def.shifted
                : def.label;
            const color = getColor(label);

            return (
              <Button
                key={label}
                mode='contained'
                onPress={() => press(label)}
                style={[styles.btn, { backgroundColor: color }]}
                labelStyle={styles.label}
                compact
              >
                {label}
              </Button>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 4,
    paddingTop: 4,
    paddingBottom: 8,
    // backgroundColor: '#0003',
    // borderTopLeftRadius: 16,
    // borderTopRightRadius: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  btn: {
    flex: 1,
    marginHorizontal: 2,
    marginVertical: 2,
    minHeight: isSmall ? 46 : 58,
    borderRadius: 5,
    justifyContent: 'center',
    elevation: 2,
  },
  label: { fontSize: isSmall ? 13 : 16, color: '#fff', fontWeight: '600' },
});
