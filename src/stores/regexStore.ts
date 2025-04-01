import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IRegex } from "@/entities/regex";

interface RegexStore {
  regexes: IRegex[];
  selectedId: string | null;
  isLoading: boolean;
  addRegex: (value: string) => void;
  removeRegex: (id: string) => void;
  setRegex: (regex: Pick<IRegex, "id"> & Partial<Omit<IRegex, "id">>) => void;
  setSelectedRegex: (id: string) => void;
  setLoaded: () => void;
}

export const useRegexStore = create<RegexStore>()(
  persist(
    (set) => ({
      regexes: [],
      selectedId: null,
      isLoading: true,
      addRegex: (value: string) =>
        set((state) => ({
          regexes: [
            ...state.regexes,
            { id: crypto.randomUUID(), value, isApproved: false },
          ],
        })),
      removeRegex: (id: string) =>
        set((state) => ({
          regexes: state.regexes.filter((item) => item.id !== id),
          selectedId: state.selectedId === id ? null : state.selectedId,
        })),
      setRegex: (regex: Pick<IRegex, "id"> & Partial<Omit<IRegex, "id">>) => {
        set((state) => ({
          regexes: state.regexes.map((item) =>
            item.id === regex.id
              ? {
                  ...item,
                  ...regex,
                  ...(regex.value ? { isApproved: false } : {}),
                }
              : item,
          ),
        }));
      },
      setSelectedRegex: (id: string) => {
        set(() => ({ selectedId: id }));
      },
      setLoaded: () => set({ isLoading: false }),
    }),
    {
      name: "regexStore",
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setLoaded();
        }
      },
    },
  ),
);
