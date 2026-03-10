import { create } from "zustand";

interface ThemeStore {
  tema: string;
  setTema: (tema: string) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  tema: "ligth",
  setTema: (tema) => set({ tema: tema }),
}));
