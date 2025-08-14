// hooks/useHasNotch.js
import { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useHasNotch = () => {
  const insets = useSafeAreaInsets();
  const [hasNotch, setHasNotch] = useState(false);

  useEffect(() => {
    // Top inset > 20 usually indicates a notch (especially on iOS)
    if (insets.top > 20) {
      setHasNotch(true);
    }
  }, [insets.top]);

  return hasNotch;
};
