import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImageManipulator from 'expo-image-manipulator';
import { Alert } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const API_URL = 'https://your-backend.com/api/solve'; // <— replace with actual

export const useMathStore = create(
  persist(
    (set, get) => ({
      /* --- toggle --- */
      mode: 'camera',
      setMode: (mode) => set({ mode }),
      toggleMode: () =>
        set((s) => ({ mode: s.mode === 'camera' ? 'type' : 'camera' })),

      /* --- image flow --- */
      imageUri: null,
      uploading: false,
      error: null,
      result: null,

      /* 1️⃣  set image (from camera OR gallery) */
      setImage: (uri) => set({ imageUri: uri, error: null, result: null }),

      /* 2️⃣  upload to server */
      uploadImage: async () => {
        const uri = get().imageUri;
        if (!uri) {
          Alert.alert('No image', 'Take or pick a photo first.');
          return;
        }

        set({ uploading: true, error: null });

        try {
          // compress & resize to max 1080p to reduce payload
          const compressed = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width: 1080 } }],
            {
              compress: 0.8,
              format: ImageManipulator.SaveFormat.JPEG,
              base64: true,
            }
          );

          const base64 = `data:image/jpeg;base64,${compressed.base64}`;

          const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageBase64: base64 }),
          });

          if (!res.ok) throw new Error(`Server error: ${res.status}`);

          const data = await res.json();
          set({ result: data, uploading: false });
        } catch (err) {
          console.error(err);
          set({ error: err.message, uploading: false });
          Alert.alert('Upload failed', err.message);
        }
      },

      /* 3️⃣  reset state */
      reset: () =>
        set({
          imageUri: null,
          uploading: false,
          error: null,
          result: null,
        }),
    }),
    {
      name: 'math-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ mode: state.mode }), // persist only mode
    }
  )
);
