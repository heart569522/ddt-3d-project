import { EN104Floor1 } from "@/components/models/en104/floor-room/en10401-floor";
import { EN104Floor2 } from "@/components/models/en104/floor-room/en10402-floor";
import { EN12408Air, EN12408Light, EN124Floor8 } from "@/components/models/en124/floor-room/en12408-floor";
import { EN202Floor1 } from "@/components/models/en202/floor-room/en20201-floor";
import { EN202FloorB1 } from "@/components/models/en202/floor-room/en202b1-floor";

import { create } from "zustand";

export interface EN10401State {
  select: EN104Floor1 | null;
  setSelect: (room: EN104Floor1 | string | null) => void;
}
export interface EN10402State {
  select: EN104Floor2 | null;
  setSelect: (room: EN104Floor2 | string | null) => void;
}
export interface EN12408State {
  select: EN124Floor8 | EN12408Air | EN12408Light | null;
  setSelect: (room: EN124Floor8 | EN12408Air | EN12408Light | string | null) => void;
}
export interface EN20201State {
  select: EN202Floor1 | null;
  setSelect: (room: EN202Floor1 | string | null) => void;
}
export interface EN202B1State {
  select: EN202FloorB1 | null;
  setSelect: (room: EN202FloorB1 | string | null) => void;
}

export const useEN10401Store = create<EN10401State>((set) => ({
  select: null,
  setSelect: (room: EN104Floor1 | string | null) => {
    set((state) => ({
      select: state.select === room ? null : room as any,
    }));
  },
}));

export const useEN10402Store = create<EN10402State>((set) => ({
  select: null,
  setSelect: (room: EN104Floor2 | string | null) => {
    set((state) => ({
      select: state.select === room ? null : room as any,
    }));
  },
}));

export const useEN12408Store = create<EN12408State>((set) => ({
  select: null,
  setSelect: (room: EN124Floor8 | EN12408Air | EN12408Light | string | null) => {
    set((state) => ({
      select: state.select === room ? null : room as any,
    }));
  },
}));

export const useEN20201Store = create<EN20201State>((set) => ({
  select: null,
  setSelect: (room: EN202Floor1 | string | null) => {
    set((state) => ({
      select: state.select === room ? null : room as any,
    }));
  },
}));

export const useEN202B1Store = create<EN202B1State>((set) => ({
  select: null,
  setSelect: (room: EN202FloorB1 | string | null) => {
    set((state) => ({
      select: state.select === room ? null : room as any,
    }));
  },
}));