import { EN104Floor } from "@/components/models/en104/building/en104-building";
import { EN106Floor } from "@/components/models/en106/building/en106-building";
import { EN124Floor } from "@/components/models/en124/building/en124-building";
import { EN202Floor } from "@/components/models/en202/building/en202-building";
import { create } from "zustand";

export interface EN104State {
  select: EN104Floor | null;
  setSelect: (floor: EN104Floor | null) => void;
}
export interface EN106State {
  select: EN106Floor | null;
  setSelect: (floor: EN106Floor | null) => void;
}
export interface EN124State {
  select: EN124Floor | null;
  setSelect: (floor: EN124Floor | null) => void;
}

export interface EN202State {
  select: EN202Floor | null;
  setSelect: (floor: EN202Floor | null) => void;
}


export const useEN104Store = create<EN104State>((set) => ({
  select: null,
  setSelect: (floor) => {
    set((state) => ({
      select: state.select === floor ? null : floor,
    }));
  },
}));

export const useEN106Store = create<EN106State>((set) => ({
  select: null,
  setSelect: (floor) => {
    set((state) => ({
      select: state.select === floor ? null : floor,
    }));
  },
}));

export const useEN124Store = create<EN124State>((set) => ({
  select: null,
  setSelect: (floor) => {
    set((state) => ({
      select: state.select === floor ? null : floor,
    }));
  },
}));

export const useEN202Store = create<EN202State>((set) => ({
  select: null,
  setSelect: (floor) => {
    set((state) => ({
      select: state.select === floor ? null : floor,
    }));
  },
}));
