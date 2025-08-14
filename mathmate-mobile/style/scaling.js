import { Dimensions } from 'react-native';
import { useHasNotch } from '../hooks/useHasNotch';

const { width, height } = Dimensions.get('window');

const isSmall = () => {
  const hasNotch = useHasNotch();

  console.log(hasNotch);
  return width <= 375 && !hasNotch;
};

// const isSmall = width <= 375 && !DeviceInfo.hasNotch();

const guidelineBaseWidth = () => {
  if (isSmall) {
    return 330;
  }
  return 350;
};

const horizontalScale = (size) => (width / guidelineBaseWidth()) * size;

const guidelineBaseHeight = () => {
  if (isSmall) {
    return 550;
  } else if (width > 410) {
    return 620;
  }
  return 680;
};

const verticalScale = (size) => (height / guidelineBaseHeight()) * size;

const guidelineBaseFont = () => {
  if (width > 410) {
    return 430;
  }

  return 400;
};

const scaleFontSize = (size) =>
  Math.round((width / guidelineBaseFont()) * size);

export { horizontalScale, scaleFontSize, verticalScale };
