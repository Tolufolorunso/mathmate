import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useThemeStore = create(
  persist(
    (set, get) => ({
      mode: 'system', // 'light' | 'dark' | 'system'
      toggle: () => {
        const { mode } = get();
        const next = mode === 'light' ? 'dark' : 'light';
        set({ mode: next });
      },
      setMode: (m) => set({ mode: m }),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
