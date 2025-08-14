import * as Haptics from 'expo-haptics'
import { useState } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, useTheme } from 'react-native-paper'

const { width } = Dimensions.get('window')
const isSmall = width < 350

// Keyboard layouts for different modes
const keyboardLayouts = {
  standard: [
    [
      { label: 'MODE', type: 'mode' },
      { label: 'HIST', type: 'history' },
      { label: 'deg', type: 'angle' },
      { label: 'C', type: 'clear' },
      { label: 'AC', type: 'allClear' },
    ],
    [
      { label: '(', type: 'bracket' },
      { label: ')', type: 'bracket' },
      { label: '%', type: 'operator' },
      { label: '÷', type: 'operator' },
      { label: '⌫', type: 'backspace' },
    ],
    [
      { label: '7', type: 'number' },
      { label: '8', type: 'number' },
      { label: '9', type: 'number' },
      { label: '×', type: 'operator' },
      { label: 'x²', type: 'function' },
    ],
    [
      { label: '4', type: 'number' },
      { label: '5', type: 'number' },
      { label: '6', type: 'number' },
      { label: '-', type: 'operator' },
      { label: 'xʸ', type: 'function' },
    ],
    [
      { label: '1', type: 'number' },
      { label: '2', type: 'number' },
      { label: '3', type: 'number' },
      { label: '+', type: 'operator' },
      { label: '±', type: 'function' },
    ],
    [
      { label: '0', type: 'number' },
      { label: '.', type: 'decimal' },
      { label: 'EXP', type: 'function' },
      { label: 'ANS', type: 'function' },
      { label: '=', type: 'equals' },
    ],
  ],

  scientific: [
    [
      { label: 'MODE', type: 'mode' },
      { label: 'HIST', type: 'history' },
      { label: 'deg', type: 'angle' },
      { label: 'C', type: 'clear' },
      { label: 'AC', type: 'allClear' },
    ],
    [
      { label: '2nd', type: 'shift' },
      { label: 'sin', type: 'trig' },
      { label: 'cos', type: 'trig' },
      { label: 'tan', type: 'trig' },
      { label: '⌫', type: 'backspace' },
    ],
    [
      { label: '(', type: 'bracket' },
      { label: ')', type: 'bracket' },
      { label: 'log', type: 'function' },
      { label: 'ln', type: 'function' },
      { label: '√', type: 'function' },
    ],
    [
      { label: 'π', type: 'constant' },
      { label: 'e', type: 'constant' },
      { label: '10ˣ', type: 'function' },
      { label: 'eˣ', type: 'function' },
      { label: '∛', type: 'function' },
    ],
    [
      { label: '7', type: 'number' },
      { label: '8', type: 'number' },
      { label: '9', type: 'number' },
      { label: '×', type: 'operator' },
      { label: '÷', type: 'operator' },
    ],
    [
      { label: '4', type: 'number' },
      { label: '5', type: 'number' },
      { label: '6', type: 'number' },
      { label: '+', type: 'operator' },
      { label: '-', type: 'operator' },
    ],
    [
      { label: '1', type: 'number' },
      { label: '2', type: 'number' },
      { label: '3', type: 'number' },
      { label: 'x²', type: 'function' },
      { label: 'xʸ', type: 'function' },
    ],
    [
      { label: '0', type: 'number' },
      { label: '.', type: 'decimal' },
      { label: '±', type: 'function' },
      { label: 'ANS', type: 'function' },
      { label: '=', type: 'equals' },
    ],
  ],

  calculus: [
    [
      { label: 'MODE', type: 'mode' },
      { label: 'HIST', type: 'history' },
      { label: 'deg', type: 'angle' },
      { label: 'C', type: 'clear' },
      { label: 'AC', type: 'allClear' },
    ],
    [
      { label: '∫', type: 'calculus' },
      { label: 'd/dx', type: 'calculus' },
      { label: 'lim', type: 'calculus' },
      { label: '∑', type: 'calculus' },
      { label: '⌫', type: 'backspace' },
    ],
    [
      { label: '(', type: 'bracket' },
      { label: ')', type: 'bracket' },
      { label: 'sin', type: 'trig' },
      { label: 'cos', type: 'trig' },
      { label: 'tan', type: 'trig' },
    ],
    [
      { label: 'x', type: 'variable' },
      { label: 'y', type: 'variable' },
      { label: 'n', type: 'variable' },
      { label: '∞', type: 'constant' },
      { label: 'dx', type: 'calculus' },
    ],
    [
      { label: '7', type: 'number' },
      { label: '8', type: 'number' },
      { label: '9', type: 'number' },
      { label: '×', type: 'operator' },
      { label: '÷', type: 'operator' },
    ],
    [
      { label: '4', type: 'number' },
      { label: '5', type: 'number' },
      { label: '6', type: 'number' },
      { label: '+', type: 'operator' },
      { label: '-', type: 'operator' },
    ],
    [
      { label: '1', type: 'number' },
      { label: '2', type: 'number' },
      { label: '3', type: 'number' },
      { label: '^', type: 'operator' },
      { label: '±', type: 'function' },
    ],
    [
      { label: '0', type: 'number' },
      { label: '.', type: 'decimal' },
      { label: 'ANS', type: 'function' },
      { label: '=', type: 'equals' },
    ],
  ],

  algebra: [
    [
      { label: 'MODE', type: 'mode' },
      { label: 'HIST', type: 'history' },
      { label: 'deg', type: 'angle' },
      { label: 'C', type: 'clear' },
      { label: 'AC', type: 'allClear' },
    ],
    [
      { label: 'x', type: 'variable' },
      { label: 'y', type: 'variable' },
      { label: 'z', type: 'variable' },
      { label: 'n', type: 'variable' },
      { label: '⌫', type: 'backspace' },
    ],
    [
      { label: '(', type: 'bracket' },
      { label: ')', type: 'bracket' },
      { label: '[', type: 'bracket' },
      { label: ']', type: 'bracket' },
      { label: '{', type: 'bracket' },
    ],
    [
      { label: '}', type: 'bracket' },
      { label: '|', type: 'bracket' },
      { label: '√', type: 'function' },
      { label: '∛', type: 'function' },
      { label: 'x²', type: 'function' },
    ],
    [
      { label: '7', type: 'number' },
      { label: '8', type: 'number' },
      { label: '9', type: 'number' },
      { label: '×', type: 'operator' },
      { label: '÷', type: 'operator' },
    ],
    [
      { label: '4', type: 'number' },
      { label: '5', type: 'number' },
      { label: '6', type: 'number' },
      { label: '+', type: 'operator' },
      { label: '-', type: 'operator' },
    ],
    [
      { label: '1', type: 'number' },
      { label: '2', type: 'number' },
      { label: '3', type: 'number' },
      { label: '^', type: 'operator' },
      { label: '±', type: 'function' },
    ],
    [
      { label: '0', type: 'number' },
      { label: '.', type: 'decimal' },
      { label: 'ANS', type: 'function' },
      { label: '=', type: 'equals' },
    ],
  ],

  statistics: [
    [
      { label: 'MODE', type: 'mode' },
      { label: 'HIST', type: 'history' },
      { label: 'deg', type: 'angle' },
      { label: 'C', type: 'clear' },
      { label: 'AC', type: 'allClear' },
    ],
    [
      { label: 'mean', type: 'stats' },
      { label: 'median', type: 'stats' },
      { label: 'mode', type: 'stats' },
      { label: 'std', type: 'stats' },
      { label: '⌫', type: 'backspace' },
    ],
    [
      { label: '(', type: 'bracket' },
      { label: ')', type: 'bracket' },
      { label: '∑', type: 'stats' },
      { label: '∏', type: 'stats' },
      { label: 'n!', type: 'function' },
    ],
    [
      { label: 'x', type: 'variable' },
      { label: 'y', type: 'variable' },
      { label: 'σ', type: 'stats' },
      { label: 'μ', type: 'stats' },
      { label: 'var', type: 'stats' },
    ],
    [
      { label: '7', type: 'number' },
      { label: '8', type: 'number' },
      { label: '9', type: 'number' },
      { label: '×', type: 'operator' },
      { label: '÷', type: 'operator' },
    ],
    [
      { label: '4', type: 'number' },
      { label: '5', type: 'number' },
      { label: '6', type: 'number' },
      { label: '+', type: 'operator' },
      { label: '-', type: 'operator' },
    ],
    [
      { label: '1', type: 'number' },
      { label: '2', type: 'number' },
      { label: '3', type: 'number' },
      { label: '^', type: 'operator' },
      { label: '±', type: 'function' },
    ],
    [
      { label: '0', type: 'number' },
      { label: '.', type: 'decimal' },
      { label: 'ANS', type: 'function' },
      { label: '=', type: 'equals' },
    ],
  ],
}

export default function EnhancedKeyboard({
  onPress,
  mode = 'standard',
  angleUnit = 'deg',
}) {
  const theme = useTheme()
  const [isSecond, setIsSecond] = useState(false)

  const press = (key) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

    // Handle special keys
    if (key === '2nd') {
      setIsSecond(!isSecond)
      return
    }

    if (key === 'deg' || key === 'rad') {
      onPress(key)
      return
    }

    // Handle second function keys
    if (isSecond) {
      const secondFunctions = {
        sin: 'asin',
        cos: 'acos',
        tan: 'atan',
        log: '10ˣ',
        ln: 'eˣ',
        '√': '∛',
      }

      if (secondFunctions[key]) {
        onPress(secondFunctions[key])
        setIsSecond(false)
        return
      }
    }

    onPress(key)
  }

  const getColor = (keyType) => {
    switch (keyType) {
      case 'number':
        return theme.colors.primary
      case 'operator':
        return theme.colors.secondary
      case 'function':
        return theme.colors.success
      case 'trig':
        return theme.colors.info
      case 'constant':
        return theme.colors.error
      case 'calculus':
        return '#8b5cf6' // Purple
      case 'stats':
        return '#f59e0b' // Amber
      case 'variable':
        return '#06b6d4' // Cyan
      case 'bracket':
        return '#84cc16' // Lime
      case 'mode':
      case 'history':
      case 'angle':
        return '#64748b' // Slate
      case 'clear':
      case 'allClear':
      case 'backspace':
        return '#ef4444' // Red
      case 'equals':
        return '#10b981' // Green
      case 'shift':
        return isSecond ? '#fbbf24' : '#6b7280' // Yellow when active
      default:
        return theme.colors.primary
    }
  }

  const currentLayout = keyboardLayouts[mode] || keyboardLayouts.standard

  return (
    <View style={styles.container}>
      {/* Mode indicator */}
      <View style={styles.modeIndicator}>
        <Text style={styles.modeText}>{mode.toUpperCase()}</Text>
        {isSecond && <Text style={styles.secondIndicator}>2nd</Text>}
      </View>

      {/* Keyboard */}
      <ScrollView
        style={styles.keyboardScroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.keyboardContent}
      >
        {currentLayout.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((keyDef, keyIndex) => {
              const label = keyDef.label
              const keyType = keyDef.type
              const color = getColor(keyType)

              return (
                <Button
                  key={`${rowIndex}-${keyIndex}`}
                  mode='contained'
                  onPress={() => press(label)}
                  style={[
                    styles.btn,
                    {
                      backgroundColor: color,
                      minHeight: isSmall ? 26 : 38,
                    },
                  ]}
                  labelStyle={[styles.label, { fontSize: isSmall ? 12 : 14 }]}
                  compact
                >
                  {label}
                </Button>
              )
            })}
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
    paddingBottom: 2,
    backgroundColor: '#1f2937',
    borderRadius: 8,
    marginBottom: 8,
  },

  modeIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },

  modeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },

  secondIndicator: {
    color: '#fbbf24',
    fontSize: 10,
    fontWeight: '600',
    backgroundColor: '#1f2937',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },

  keyboardScroll: {
    maxHeight: 400,
  },

  keyboardContent: {
    paddingHorizontal: 8,
    paddingVertical: 8,
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
    borderRadius: 8,
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  label: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },
})
