import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const API_URL = 'http://10.76.145.8:4000/api/solutions';
// const API_URL = 'http://localhost:4000/api/solutions';

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
      questionHistory: [],
      solutionContent: null,

      /* 1️⃣  set image (from camera OR gallery) */
      setImage: (uri) => set({ imageUri: uri, error: null, result: null }),

      /* 2️⃣  upload image to server */
      uploadImage: async () => {
        console.log('upload...');
        const uri = get().imageUri;
        if (!uri) {
          Alert.alert('No image', 'Take or pick a photo first.');
          return;
        }

        set({ uploading: true, error: null });

        try {
          // compress & resize to max 1080p to reduce payload
          // const compressed = await ImageManipulator.manipulateAsync(
          //   uri,
          //   [{ resize: { width: 1080 } }],
          //   {
          //     compress: 0.8,
          //     format: ImageManipulator.SaveFormat.JPEG,
          //     base64: true,
          //   }
          // );

          // const base64 = `data:image/jpeg;base64,${compressed.base64}`;

          console.log(55, uri);
          const base64 = uri;
          const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'image',
              base64Data: base64,
              mimeType: 'image/jpeg',
            }),
          });

          if (!res.ok) throw new Error(`Server error: ${res.status}`);

          const data = await res.json();

          // Add to history
          const newHistoryItem = {
            id: Date.now(),
            type: 'image',
            content: 'Image Question',
            timestamp: new Date().toISOString(),
            result: data,
            status: 'completed',
          };

          set((state) => ({
            result: data,
            uploading: false,
            questionHistory: [
              newHistoryItem,
              ...state.questionHistory.slice(0, 49),
            ], // Keep last 50
          }));

          Alert.alert('Success', 'Image uploaded successfully!');
        } catch (err) {
          console.error(err);
          set({ error: err.message, uploading: false });
          Alert.alert('Upload failed', err.message);
        }
      },

      /* 3️⃣  upload typed question to server */
      uploadTypedQuestion: async (question, questionType = 'general') => {
        console.log('95 uploadtype', 'calling');
        if (!question.trim()) {
          Alert.alert('Error', 'Please enter a question first.');
          return;
        }

        set({ uploading: true, error: null });

        try {
          const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'text',
              problem: question.trim(),
              questionType: questionType,
            }),
          });

          if (!res.ok) throw new Error(`Server error: ${res.status}`);

          const data = await res.json();

          if (data.data.content.includes('not-math-problem')) {
            set({
              imageUri: null,
              uploading: false,
              error: "Your question doesn't seem to be a math problem.",
              result: null,
            });
            throw new Error("Your question doesn't seem to be a math problem.");
          }

          // Add to history
          const newHistoryItem = {
            _id: Date.now(),
            type: 'text',
            content: question.trim(),
            questionType: questionType,
            timestamp: new Date().toISOString(),
            result: data,
            status: 'completed',
          };

          set((state) => ({
            solutionContent: data.data.content,
            uploading: false,
            questionHistory: [
              newHistoryItem,
              ...state.questionHistory.slice(0, 49),
            ], // Keep last 50
          }));

          return { ...data, ok: true };
        } catch (err) {
          console.error('error', err);
          set({ error: err.message, uploading: false });
          throw err;
        }
      },

      /* 4️⃣  get question history */
      getQuestionHistory: () => {
        return get().questionHistory;
      },

      setSolutionContent: (id) => {
        const { questionHistory } = get();
        const historyItem = questionHistory.find((item) => item._id === id);

        if (historyItem) {
          set({
            solutionContent: historyItem.result?.data?.content || '',
          });
        } else {
          console.warn(`No history item found with ID: ${id}`);
          set({ solutionContent: '' });
        }
      },

      /* 5️⃣  get question by id */
      getQuestionById: (id) => {
        return get().questionHistory.find((q) => q._id === id);
      },

      deleteHistoryItem: async (id) => {
        const { questionHistory } = get();
        const filtered = questionHistory.filter((item) => item._id !== id);

        set({ questionHistory: filtered });

        // Update AsyncStorage manually
        try {
          const currentPersisted = await AsyncStorage.getItem('math-store');
          if (currentPersisted) {
            const parsed = JSON.parse(currentPersisted);
            parsed.state.questionHistory = filtered;
            await AsyncStorage.setItem('math-store', JSON.stringify(parsed));
          }
        } catch (e) {
          console.error('Failed to delete history item from AsyncStorage', e);
        }

        // API call to notify backend
        try {
          await fetch(`${API_URL}/history/${id}`, { method: 'DELETE' });
        } catch (e) {
          console.warn('Could not delete server-side record', e);
        }
      },

      clearHistory: async () => {
        set({ questionHistory: [] });

        // Update AsyncStorage manually
        try {
          const currentPersisted = await AsyncStorage.getItem('math-store');
          if (currentPersisted) {
            const parsed = JSON.parse(currentPersisted);
            parsed.state.questionHistory = [];
            await AsyncStorage.setItem('math-store', JSON.stringify(parsed));
          }
        } catch (e) {
          console.error('Failed to clear history in AsyncStorage', e);
        }

        //API call
        // try {
        //   await fetch(`${API_URL}/history`, { method: 'DELETE' });
        // } catch (e) {
        //   console.warn('Could not clear server-side history', e);
        // }
      },

      /* 7️⃣  reset state */
      reset: () =>
        set({
          imageUri: null,
          uploading: false,
          error: null,
          result: null,
        }),

      /* 8️⃣  reset everything including history */
      resetAll: () =>
        set({
          imageUri: null,
          uploading: false,
          error: null,
          result: null,
          questionHistory: [],
        }),
    }),
    {
      name: 'math-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        mode: state.mode,
        questionHistory: state.questionHistory,
      }), // persist mode and history
    }
  )
);
