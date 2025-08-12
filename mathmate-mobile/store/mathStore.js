import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useMathStore = create(
  persist(
    (set) => ({
      /* --- toggle --- */
      mode: 'camera', // 'camera' | 'type'
      setMode: (mode) => set({ mode }),
      toggleMode: () =>
        set((s) => ({ mode: s.mode === 'camera' ? 'type' : 'camera' })),

      /* (future: problems, results, history, etc.) */
    }),
    {
      name: 'math-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
