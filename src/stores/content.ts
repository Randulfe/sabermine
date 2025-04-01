import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loremIpsum } from "lorem-ipsum";

interface ContentStore {
  text: string;
  isLoading: boolean;
  generateRandomText: () => void;
  setText: (value: string) => void;
  setLoaded: () => void;
}

const generateRandomText = (): string => {
  return loremIpsum({
    count: Math.floor(Math.random() * 3) + 1,
    units: "paragraphs",
    sentenceLowerBound: 3,
    sentenceUpperBound: 7,
    paragraphLowerBound: 2,
    paragraphUpperBound: 4,
  });
};

export const useContentStore = create<ContentStore>()(
  persist(
    (set) => ({
      text: generateRandomText(),
      isLoading: true,
      generateRandomText: () =>
        set(() => ({
          text: generateRandomText(),
        })),
      setText: (value: string) =>
        set(() => ({
          text: value,
        })),
      setLoaded: () => set({ isLoading: false }),
    }),
    {
      name: "contentStore",
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setLoaded();
        }
      },
    },
  ),
);
