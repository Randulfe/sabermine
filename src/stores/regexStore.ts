import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IRegex } from "@/entities/regex";

interface RegexStore {
  regexes: IRegex[];
  addRegex: (value: string) => void;
  removeRegex: (id: string) => void;
  setRegex: (regex: Pick<IRegex, "id"> & Partial<Omit<IRegex, "id">>) => void;
}

export const useRegexStore = create<RegexStore>()(
  persist(
    (set) => ({
      regexes: [],
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
        })),
      setRegex: (regex: Pick<IRegex, "id"> & Partial<Omit<IRegex, "id">>) => {
        set((state) => ({
          regexes: state.regexes.map((item) =>
            item.id === regex.id ? { ...item, ...regex } : item,
          ),
        }));
      },
    }),
    { name: "regexStore" },
  ),
);
