import * as math from 'mathjs';
import { useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import {
  Button,
  Chip,
  IconButton,
  Modal,
  Portal,
  Text,
} from 'react-native-paper';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppBar from '../../components/ui/AppBar';
import EnhancedKeyboard from '../../components/ui/EnhancedKeyboard';
import { MathUtils } from '../../utils/mathUtils';

export default function CalculatorScreen() {
  const [expr, setExpr] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [mode, setMode] = useState('standard'); // standard, scientific, calculus, algebra, statistics
  const [angleUnit, setAngleUnit] = useState('deg'); // deg, rad
  const [showHistory, setShowHistory] = useState(false);
  const [showModeSelector, setShowModeSelector] = useState(false);
  const [showAdvancedInput, setShowAdvancedInput] = useState(false);
  const [advancedInputType, setAdvancedInputType] = useState('');
  const scrollRef = useRef(null);

  /* font-size states */
  const [fontSize, setFontSize] = useState(20);
  const [lineCount, setLineCount] = useState(1);

  /* choose new font size only when text changes */
  useEffect(() => {
    if (lineCount > 4) setFontSize(15);
    else if (lineCount > 2) setFontSize(18);
    else setFontSize(20);
  }, [expr]);

  /* when expr changes, scroll to bottom */
  useEffect(() => {
    const id = setTimeout(
      () => scrollRef.current?.scrollToEnd({ animated: false }),
      0
    );
    return () => clearTimeout(id);
  }, [expr]);

  /* evaluate expression safely with advanced functions */
  const evaluateExpression = (expression) => {
    try {
      // Configure mathjs for the current angle unit
      const scope = {
        deg: (angle) => (angle * Math.PI) / 180,
        rad: (angle) => angle,
        π: Math.PI,
        e: Math.E,
        i: math.complex(0, 1),
      };

      // Handle advanced mathematical operations
      let processedExpr = expression;

      // Calculus operations
      if (processedExpr.includes('∫')) {
        // Handle integration: ∫(expression, variable, lower, upper)
        const match = processedExpr.match(/∫\((.*?)\)/);
        if (match) {
          const args = match[1].split(',').map((arg) => arg.trim());
          if (args.length >= 2) {
            const [expr, variable, lower, upper] = args;
            if (lower && upper) {
              const result = MathUtils.integrate(
                expr,
                variable,
                parseFloat(lower),
                parseFloat(upper)
              );
              processedExpr = processedExpr.replace(/∫\(.*?\)/, result);
            } else {
              const result = MathUtils.integrate(expr, variable);
              processedExpr = processedExpr.replace(/∫\(.*?\)/, result);
            }
          }
        }
      }

      if (processedExpr.includes('d/dx')) {
        // Handle derivative: d/dx(expression, variable, point)
        const match = processedExpr.match(/d\/dx\((.*?)\)/);
        if (match) {
          const args = match[1].split(',').map((arg) => arg.trim());
          if (args.length >= 2) {
            const [expr, variable, point] = args;
            if (point) {
              const result = MathUtils.derivative(
                expr,
                variable,
                parseFloat(point)
              );
              processedExpr = processedExpr.replace(/d\/dx\(.*?\)/, result);
            } else {
              const result = MathUtils.derivative(expr, variable);
              processedExpr = processedExpr.replace(/d\/dx\(.*?\)/, result);
            }
          }
        }
      }

      if (processedExpr.includes('lim')) {
        // Handle limit: lim(expression, variable, value, direction)
        const match = processedExpr.match(/lim\((.*?)\)/);
        if (match) {
          const args = match[1].split(',').map((arg) => arg.trim());
          if (args.length >= 3) {
            const [expr, variable, value, direction = 'both'] = args;
            const result = MathUtils.limit(
              expr,
              variable,
              parseFloat(value),
              direction
            );
            processedExpr = processedExpr.replace(/lim\(.*?\)/, result);
          }
        }
      }

      // Series operations
      if (processedExpr.includes('∑')) {
        // Handle sum: ∑(expression, variable, start, end)
        const match = processedExpr.match(/∑\((.*?)\)/);
        if (match) {
          const args = match[1].split(',').map((arg) => arg.trim());
          if (args.length >= 4) {
            const [expr, variable, start, end] = args;
            const result = MathUtils.sum(
              expr,
              variable,
              parseInt(start),
              parseInt(end)
            );
            processedExpr = processedExpr.replace(/∑\(.*?\)/, result);
          }
        }
      }

      if (processedExpr.includes('∏')) {
        // Handle product: ∏(expression, variable, start, end)
        const match = processedExpr.match(/∏\((.*?)\)/);
        if (match) {
          const args = match[1].split(',').map((arg) => arg.trim());
          if (args.length >= 4) {
            const [expr, variable, start, end] = args;
            const result = MathUtils.product(
              expr,
              variable,
              parseInt(start),
              parseInt(end)
            );
            processedExpr = processedExpr.replace(/∏\(.*?\)/, result);
          }
        }
      }

      // Statistics operations
      if (
        processedExpr.includes('mean(') ||
        processedExpr.includes('median(') ||
        processedExpr.includes('mode(') ||
        processedExpr.includes('std(') ||
        processedExpr.includes('var(')
      ) {
        // Handle statistics functions: function([values])
        const statsFunctions = ['mean', 'median', 'mode', 'std', 'var'];
        statsFunctions.forEach((func) => {
          const regex = new RegExp(`${func}\\(\\[(.*?)\\]\\)`);
          const match = processedExpr.match(regex);
          if (match) {
            const values = match[1].split(',').map((v) => parseFloat(v.trim()));
            let result;
            switch (func) {
              case 'mean':
                result = MathUtils.mean(values);
                break;
              case 'median':
                result = MathUtils.median(values);
                break;
              case 'mode':
                result = MathUtils.mode(values);
                break;
              case 'std':
                result = MathUtils.standardDeviation(values);
                break;
              case 'var':
                result = MathUtils.variance(values);
                break;
            }
            processedExpr = processedExpr.replace(regex, result);
          }
        });
      }

      // Replace common symbols with mathjs functions
      processedExpr = processedExpr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'π')
        .replace(/e/g, 'e')
        .replace(/√/g, 'sqrt')
        .replace(/∛/g, 'cbrt')
        .replace(/log/g, 'log10')
        .replace(/ln/g, 'log')
        .replace(/(\d+)\^(\d+)/g, 'pow($1,$2)')
        .replace(/(\d+)EXP(\d+)/g, '($1e$2)')
        .replace(/10ˣ/g, 'pow(10,')
        .replace(/eˣ/g, 'exp(')
        .replace(/x²/g, '^2')
        .replace(/xʸ/g, '^')
        .replace(/asin/g, 'asin')
        .replace(/acos/g, 'acos')
        .replace(/atan/g, 'atan')
        .replace(/sin/g, 'sin')
        .replace(/cos/g, 'cos')
        .replace(/tan/g, 'tan')
        .replace(/±/g, '*(-1)')
        .replace(/∞/g, 'Infinity')
        .replace(/n!/g, (match) => {
          const n = parseInt(match.replace('!', ''));
          return MathUtils.factorial(n);
        });

      // Handle angle units for trigonometric functions
      if (angleUnit === 'deg') {
        processedExpr = processedExpr
          .replace(/sin\(/g, 'sin(deg(')
          .replace(/cos\(/g, 'cos(deg(')
          .replace(/tan\(/g, 'tan(deg(')
          .replace(/asin\(/g, 'deg(asin(')
          .replace(/acos\(/g, 'deg(acos(')
          .replace(/atan\(/g, 'deg(atan(');
      }

      const result = math.evaluate(processedExpr, scope);

      // Format the result
      let formattedResult;
      if (math.isComplex(result)) {
        formattedResult = result.toString();
      } else if (typeof result === 'number') {
        formattedResult = MathUtils.formatNumber(result, 14);
      } else {
        formattedResult = result.toString();
      }

      return { success: true, result: formattedResult };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  /* key press handler */
  const handleKey = (key) => {
    switch (key) {
      case '=':
        if (!expr.trim()) return;

        const evaluation = evaluateExpression(expr);
        if (evaluation.success) {
          const newHistoryItem = {
            expression: expr,
            result: evaluation.result,
            timestamp: new Date().toLocaleTimeString(),
            mode: mode,
          };
          setHistory((prev) => [newHistoryItem, ...prev.slice(0, 19)]); // Keep last 20
          setResult(evaluation.result);
          setExpr(evaluation.result);
        } else {
          setResult('Error');
          Alert.alert('Calculation Error', evaluation.error);
        }
        break;

      case '⌫':
        setExpr((p) => p.slice(0, -1));
        setResult('');
        break;

      case 'C':
        setExpr('');
        setResult('');
        break;

      case 'AC':
        setExpr('');
        setResult('');
        setHistory([]);
        break;

      case '2nd':
        // This will be handled by the keyboard component
        break;

      case 'deg':
      case 'rad':
        setAngleUnit(angleUnit === 'deg' ? 'rad' : 'deg');
        break;

      case 'MODE':
        setShowModeSelector(true);
        break;

      case 'HIST':
        setShowHistory(true);
        break;

      case 'ANS':
        if (result) {
          setExpr((prev) => prev + result);
        }
        break;

      // Advanced function keys
      case '∫':
        setExpr((prev) => prev + '∫(');
        break;

      case 'd/dx':
        setExpr((prev) => prev + 'd/dx(');
        break;

      case 'lim':
        setExpr((prev) => prev + 'lim(');
        break;

      case '∑':
        setExpr((prev) => prev + '∑(');
        break;

      case '∏':
        setExpr((prev) => prev + '∏(');
        break;

      case 'mean':
        setExpr((prev) => prev + 'mean([');
        break;

      case 'median':
        setExpr((prev) => prev + 'median([');
        break;

      case 'mode':
        setExpr((prev) => prev + 'mode([');
        break;

      case 'std':
        setExpr((prev) => prev + 'std([');
        break;

      case 'var':
        setExpr((prev) => prev + 'var([');
        break;

      default:
        setExpr((p) => p + key);
        setResult('');
    }
  };

  const selectMode = (newMode) => {
    setMode(newMode);
    setShowModeSelector(false);
    setExpr('');
    setResult('');
  };

  const useHistoryItem = (item) => {
    setExpr(item.expression);
    setResult(item.result);
    setMode(item.mode || 'standard');
    setShowHistory(false);
  };

  const getModeDescription = (mode) => {
    const descriptions = {
      standard: 'Basic arithmetic operations',
      scientific: 'Scientific functions and trigonometry',
      calculus: 'Derivatives, integrals, and limits',
      algebra: 'Algebraic operations and variables',
      statistics: 'Statistical calculations and analysis',
    };
    return descriptions[mode] || '';
  };

  /* ---------- RENDER ---------- */
  return (
    <>
      <AppBar title='Scientific Calculator' />
      <ScreenWrapper>
        {/* Mode and Settings Bar */}
        <View style={styles.topBar}>
          <Chip
            mode='outlined'
            onPress={() => setShowModeSelector(true)}
            style={styles.modeChip}
            textStyle={styles.ChipText}
            accessibilityLabel='change keyboard mode'
          >
            {mode.toUpperCase()}
          </Chip>
          <Chip
            mode='outlined'
            onPress={() => setAngleUnit(angleUnit === 'deg' ? 'rad' : 'deg')}
            style={{ backgroundColor: 'red', padding: 0, margin: 0 }}
            textStyle={styles.ChipText}
          >
            {angleUnit.toUpperCase()}
          </Chip>
          <IconButton
            icon='history'
            onPress={() => setShowHistory(true)}
            size={20}
          />
        </View>

        {/* Mode Description */}
        <View style={styles.modeDescription}>
          <Text style={styles.modeDescriptionText}>
            {getModeDescription(mode)}
          </Text>
        </View>

        {/* Display */}
        <ScrollView
          ref={scrollRef}
          style={styles.displayScroll}
          contentContainerStyle={styles.displayContent}
          showsVerticalScrollIndicator
        >
          {/* Expression */}
          <Text
            style={[styles.displayText, { fontSize }]}
            onTextLayout={({ nativeEvent }) =>
              setLineCount(nativeEvent.lines.length)
            }
          >
            {expr || '0'}
          </Text>

          {/* Result */}
          {result && <Text style={styles.resultText}>= {result}</Text>}
        </ScrollView>

        {/* Enhanced Keyboard */}
        <EnhancedKeyboard
          onPress={handleKey}
          mode={mode}
          angleUnit={angleUnit}
        />
      </ScreenWrapper>

      {/* Mode Selector Modal */}
      <Portal>
        <Modal
          visible={showModeSelector}
          onDismiss={() => setShowModeSelector(false)}
          contentContainerStyle={styles.modal}
        >
          <Text style={styles.modalTitle}>Select Calculator Mode</Text>
          <View style={styles.modeGrid}>
            {[
              {
                key: 'standard',
                label: 'Standard',
                icon: 'calculator',
                description: 'Basic arithmetic',
              },
              {
                key: 'scientific',
                label: 'Scientific',
                icon: 'function-variant',
                description: 'Scientific functions',
              },
              {
                key: 'calculus',
                label: 'Calculus',
                icon: 'math-integral',
                description: 'Derivatives & integrals',
              },
              {
                key: 'algebra',
                label: 'Algebra',
                icon: 'math-integral',
                description: 'Algebraic operations',
              },
              {
                key: 'statistics',
                label: 'Statistics',
                icon: 'chart-line',
                description: 'Statistical analysis',
              },
            ].map((modeOption) => (
              <View key={modeOption.key} style={styles.modeOption}>
                <Button
                  mode={mode === modeOption.key ? 'contained' : 'outlined'}
                  onPress={() => selectMode(modeOption.key)}
                  style={styles.modeButton}
                  icon={modeOption.icon}
                >
                  {modeOption.label}
                </Button>
                <Text style={styles.modeOptionDescription}>
                  {modeOption.description}
                </Text>
              </View>
            ))}
          </View>
        </Modal>
      </Portal>

      {/* History Modal */}
      <Portal>
        <Modal
          visible={showHistory}
          onDismiss={() => setShowHistory(false)}
          contentContainerStyle={styles.modal}
        >
          <Text style={styles.modalTitle}>Calculation History</Text>
          <ScrollView style={styles.historyList}>
            {history.length === 0 ? (
              <Text style={styles.noHistory}>No calculations yet</Text>
            ) : (
              history.map((item, index) => (
                <View key={index} style={styles.historyItem}>
                  <View style={styles.historyHeader}>
                    <Text style={styles.historyMode}>
                      {item.mode?.toUpperCase() || 'STD'}
                    </Text>
                    <Text style={styles.historyTime}>{item.timestamp}</Text>
                  </View>
                  <Text style={styles.historyExpr}>{item.expression}</Text>
                  <Text style={styles.historyResult}>= {item.result}</Text>
                  <Button
                    mode='text'
                    onPress={() => useHistoryItem(item)}
                    compact
                  >
                    Use
                  </Button>
                </View>
              ))
            )}
          </ScrollView>
        </Modal>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  // wrapper: {
  //   flex: 1,
  //   justifyContent: 'space-between',
  // },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    // paddingVertical: 4,
    backgroundColor: '#1f2937',
    borderRadius: 8,
    // marginHorizontal: 16,
    // marginVertical: 4,
  },

  ChipText: {
    fontSize: 11,
    fontWeight: '600',
  },

  modeDescription: {
    paddingHorizontal: 10,
    // marginBottom: 0,
  },

  modeDescriptionText: {
    color: '#9ca3af',
    fontSize: 11,
    textAlign: 'center',
    fontStyle: 'italic',
  },

  displayScroll: {
    flex: 1,
    backgroundColor: '#111827',
    borderRadius: 8,
    // marginHorizontal: 16,
    marginVertical: 4,
  },

  displayContent: {
    padding: 16,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    minHeight: '100%',
  },

  displayText: {
    color: '#fff',
    fontVariant: ['tabular-nums'],
    textAlign: 'right',
    includeFontPadding: false,
    fontFamily: 'monospace',
  },

  resultText: {
    color: '#10b981',
    fontSize: 24,
    fontFamily: 'monospace',
    marginTop: 8,
  },

  modal: {
    backgroundColor: '#1f2937',
    padding: 20,
    margin: 20,
    borderRadius: 12,
    maxHeight: '80%',
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },

  modeGrid: {
    gap: 16,
  },

  modeOption: {
    alignItems: 'center',
  },

  modeButton: {
    width: '100%',
    marginBottom: 8,
  },

  modeOptionDescription: {
    color: '#9ca3af',
    fontSize: 12,
    textAlign: 'center',
  },

  historyList: {
    maxHeight: 400,
  },

  noHistory: {
    color: '#9ca3af',
    textAlign: 'center',
    fontStyle: 'italic',
    padding: 20,
  },

  historyItem: {
    backgroundColor: '#374151',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },

  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  historyMode: {
    color: '#10b981',
    fontSize: 12,
    fontWeight: '600',
    backgroundColor: '#1f2937',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },

  historyExpr: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'monospace',
  },

  historyResult: {
    color: '#10b981',
    fontSize: 14,
    fontFamily: 'monospace',
    marginTop: 4,
  },

  historyTime: {
    color: '#9ca3af',
    fontSize: 12,
  },
});
