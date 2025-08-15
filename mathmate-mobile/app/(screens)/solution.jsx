import { useTheme } from 'react-native-paper';
import ScreenWrapper from '../../components/ScreenWrapper';
import MathSolutionDisplay from '../../components/solution/MathSolutionDisplay ';
import { AppBar } from '../../components/ui';
import { useMathStore } from '../../store/mathStore';

export default function solution() {
  const { questionHistory, solutionContent } = useMathStore();
  const theme = useTheme();
  // const solutionContent = questionHistory[0]?.result?.data?.content;

  console.log(12, solutionContent);
  return (
    <>
      <AppBar
        style={{ height: 40, backgroundColor: theme.colors.background }}
        title='Solution'
        backButton
      />
      <ScreenWrapper>
        <MathSolutionDisplay content={solutionContent} />
      </ScreenWrapper>
    </>
  );
}
