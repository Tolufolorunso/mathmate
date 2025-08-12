import { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppBar from '../../components/ui/AppBar';
import Keyboard from '../../components/ui/Keyboard';

export default function CalculatorScreen() {
  const [expr, setExpr] = useState('');
  const [second, setSecond] = useState(false);
  const [isDeg, setIsDeg] = useState(true);
  const scrollRef = useRef(null);

  /* font-size states */
  const [fontSize, setFontSize] = useState(30);
  const [lineCount, setLineCount] = useState(1);

  /* choose new font size only when text changes */
  useEffect(() => {
    if (lineCount > 4) setFontSize(20);
    else if (lineCount > 2) setFontSize(25);
    else setFontSize(30);
  }, [expr]);

  /* when expr changes, scroll to bottom */
  useEffect(() => {
    const id = setTimeout(
      () => scrollRef.current?.scrollToEnd({ animated: false }),
      0
    );
    return () => clearTimeout(id);
  }, [expr]);

  /* key press handler (trimmed for brevity) */
  const handleKey = (k) => {
    switch (k) {
      case '=':
        try {
          let s = expr
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/π/g, 'Math.PI')
            .replace(/e/g, 'Math.E')
            .replace(/√/g, 'Math.sqrt')
            .replace(/∛/g, 'Math.cbrt')
            .replace(/log/g, 'Math.log10')
            .replace(/ln/g, 'Math.log')
            .replace(/(\d+)\^(\d+)/g, 'Math.pow($1,$2)')
            .replace(/(\d+)EXP(\d+)/g, '($1e$2)')
            .replace(/10ˣ/g, 'Math.pow(10,')
            .replace(/eˣ/g, 'Math.exp(')
            .replace(/x²/g, '**2')
            .replace(/xʸ/g, '**')
            .replace(/asin/g, isDeg ? '(Math.asin' : 'Math.asin')
            .replace(/acos/g, isDeg ? '(Math.acos' : 'Math.acos')
            .replace(/atan/g, isDeg ? '(Math.atan' : 'Math.atan')
            .replace(/sin/g, isDeg ? 'Math.sin(deg2rad(' : 'Math.sin(')
            .replace(/cos/g, isDeg ? 'Math.cos(deg2rad(' : 'Math.cos(')
            .replace(/tan/g, isDeg ? 'Math.tan(deg2rad(' : 'Math.tan(')
            .replace(/deg2rad/g, '(d)=>(d*Math.PI/180)')
            .replace(/inv/g, '(1/(')
            .replace(/±/g, '*(-1)');
          const res = Function('"use strict";return (' + s + ')')();
          setExpr(String(res));
        } catch {
          setExpr('Error');
        }
        break;
      case '⌫':
        setExpr((p) => p.slice(0, -1));
        break;
      case 'C':
        setExpr('');
        break;
      case '2nd':
        setSecond((s) => !s);
        break;
      case 'deg':
      case 'rad':
        setIsDeg((d) => !d);
        break;
      default:
        setExpr((p) => p + k);
    }
  };

  /* ---------- RENDER ---------- */
  return (
    <>
      <AppBar title='Sci. Calculator' />
      <ScreenWrapper style={styles.wrapper}>
        <ScrollView
          ref={scrollRef}
          style={styles.displayScroll}
          contentContainerStyle={styles.displayContent}
          showsVerticalScrollIndicator
        >
          {/* Invisible measuring text */}
          <Text
            style={[styles.displayText, { fontSize }]}
            onTextLayout={({ nativeEvent }) =>
              setLineCount(nativeEvent.lines.length)
            }
          >
            {expr || '0'}
          </Text>
        </ScrollView>

        <Keyboard onPress={handleKey} isSecond={second} />
      </ScreenWrapper>
    </>
  );
}
const styles = StyleSheet.create({
  wrapper: { flex: 1, justifyContent: 'space-between' },

  displayScroll: {
    flex: 1,
    backgroundColor: '#111827',
    borderRadius: 5,
    marginVertical: 5,
  },
  displayContent: {
    padding: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    minHeight: '100%',
  },
  displayText: {
    color: '#fff',
    fontVariant: ['tabular-nums'],
    textAlign: 'right',
    includeFontPadding: false,
  },
});
