import { create } from "zustand";

export interface ContourMenuState {
  menuState: "temperature" | "humidity" | "pm25" | null;
  setMenuState: (
    menu: "temperature" | "humidity" | "pm25" | null
  ) => void;
}

export interface MapMenuState {
  menuState: "map" | null;
  setMenuState: (
    menu: "map" | null
  ) => void;
}

export const useContourMenuStore = create<ContourMenuState>((set) => ({
  menuState: null,
  setMenuState: (menu: "temperature" | "humidity" | "pm25" | null) => {
    set((state) => ({
      menuState: state.menuState === menu ? null : (menu as any),
    }));
  },
}));

export const useMapMenuStore = create<MapMenuState>((set) => ({
  menuState: null,
  setMenuState: (menu: "map" | null) => {
    set((state) => ({
      menuState: state.menuState === menu ? null : (menu as any),
    }));
  },
}));
