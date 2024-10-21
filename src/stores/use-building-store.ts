import { EN124Floor } from "@/components/models/en124/building/en124-building";
import { create } from "zustand";

export interface EN124State {
  click: EN124Floor | null;
  select: EN124Floor | null;
  setClick: (floor: EN124Floor | null) => void;
  setSelect: (floor: EN124Floor | null) => void;
}

export const useEN124Store = create<EN124State>((set) => ({
  click: null,
  select: null,
  setClick: (floor) => {
    set((state) => ({
      click: state.click === floor ? null : floor,
    }));
  },
  setSelect: (floor) => {
    set((state) => ({
      select: state.select === floor ? null : floor,
    }));
  },
}));
