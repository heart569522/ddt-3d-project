import { EN12408Air, EN12408Light, EN124Floor8 } from "@/components/models/en124/floor-room/en12408-floor";
import { create } from "zustand";

export interface EN12408State {
  select: EN124Floor8 | EN12408Air | EN12408Light | null;
  setSelect: (room: EN124Floor8 | EN12408Air | EN12408Light | string | null) => void;
}

export const useEN12408Store = create<EN12408State>((set) => ({
  select: null,
  setSelect: (room: EN124Floor8 | EN12408Air | EN12408Light | string | null) => {
    set((state) => ({
      select: state.select === room ? null : room as any,
    }));
  },
}));