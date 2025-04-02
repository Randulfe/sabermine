import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { IRegex } from "@/entities/regex";

interface ISetRegex {
  id: string;
  value: string;
}

interface ISetApprovedMatches {
  id: string;
  approvedMatches: Set<string>;
  disapprovedMatches: Set<string>;
}

interface SerializedSet {
  type: "Set";
  data: string[];
}

interface RegexStore {
  regexes: IRegex[];
  selectedId: string | null;
  isLoading: boolean;
  addRegex: (value: string) => void;
  removeRegex: (id: string) => void;
  setRegex: ({id, value}: ISetRegex) => void;
  setApprovedMatches: ({
    id,
    approvedMatches,
    disapprovedMatches,
  }: ISetApprovedMatches) => void;
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
            { id: crypto.randomUUID(), value, approvedMatches: new Set() },
          ],
        })),
      removeRegex: (id: string) =>
        set((state) => ({
          regexes: state.regexes.filter((item) => item.id !== id),
          selectedId: state.selectedId === id ? null : state.selectedId,
        })),
      setRegex: ({id, value}: ISetRegex) =>
        set((state) => ({
          regexes: state.regexes.map((item) =>
            item.id === id
              ? { ...item, value, approvedMatches: new Set() }
              : item,
          ),
        })),
      setApprovedMatches: ({
        id,
        approvedMatches,
        disapprovedMatches,
      }: ISetApprovedMatches) =>
        set((state) => ({
          regexes: state.regexes.map((item) =>
            item.id === id
              ? {
                  ...item,
                  approvedMatches: item.approvedMatches
                    .union(approvedMatches)
                    .difference(disapprovedMatches),
                }
              : item,
          ),
        })),
      setSelectedRegex: (id: string) => {
        set(() => ({ selectedId: id }));
      },
      setLoaded: () => set({ isLoading: false }),
    }),
    {
      name: "regexStore",
      storage: createJSONStorage(() => localStorage, {
        replacer: (_key: string, value: unknown) => {
          if (value instanceof Set) {
            return { type: "Set", data: Array.from(value) };
          }
          return value;
        },
        reviver: (_key: string, value: unknown) => {
          if (
            value &&
            typeof value === "object" &&
            "type" in value &&
            (value as SerializedSet).type === "Set"
          ) {
            return new Set((value as SerializedSet).data);
          }
          return value;
        },
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setLoaded();
        }
      },
    },
  ),
);
