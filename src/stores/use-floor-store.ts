import { EN104Floor } from "@/components/models/en104/building/en104-building";
import { EN106Floor } from "@/components/models/en106/building/en106-building";
import { EN124Floor } from "@/components/models/en124/building/en124-building";
import { EN124Floor8 } from "@/components/models/en124/floor-room/en12408-floor";
import { EN202Floor } from "@/components/models/en202/building/en202-building";
import { create } from "zustand";

export interface EN12408State {
  select: EN124Floor8 | null;
  setSelect: (room: EN124Floor8 | null) => void;
}

export const useEN12408Store = create<EN12408State>((set) => ({
  select: null,
  setSelect: (room) => {
    set((state) => ({
      select: state.select === room ? null : room,
    }));
  },
}));