import { create } from "zustand";

export interface ContourMenuState {
  menuState: "temperature" | "humidity" | "pm25" | null;
  setMenuState: (
    contour: "temperature" | "humidity" | "pm25" | null
  ) => void;
}

export const useContourMenuStore = create<ContourMenuState>((set) => ({
  menuState: null,
  setMenuState: (contour: "temperature" | "humidity" | "pm25" | null) => {
    set((state) => ({
      menuState: state.menuState === contour ? null : (contour as any),
    }));
  },
}));
