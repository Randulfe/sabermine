import { generateRandomString } from "@/app/utils/generateRandomString";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ContentStore {
  text: string;
  isLoading: boolean;
  generateRandomText: () => void;
  setText: (value: string) => void;
  setLoaded: () => void;
}

export const useContentStore = create<ContentStore>()(
  persist(
    (set) => ({
      text: generateRandomString(),
      isLoading: true,
      generateRandomText: () =>
        set(() => ({
          text: generateRandomString(),
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
