import { EN1248Air, EN124Floor8 } from "@/components/models/en124/floor-room/en12408-floor";
import { create } from "zustand";

export interface EN12408State {
  select: EN124Floor8 | EN1248Air | null;
  setSelect: (room: EN124Floor8 | EN1248Air | string | null) => void;
}

export const useEN12408Store = create<EN12408State>((set) => ({
  select: null,
  setSelect: (room: EN124Floor8 | EN1248Air | string | null) => {
    set((state) => ({
      select: state.select === room ? null : room as any,
    }));
  },
}));