import { EN001Floor } from "@/components/models/en001/building/en001-building";
import { EN101Floor } from "@/components/models/en101/building/en101-building";
import { EN104Floor } from "@/components/models/en104/building/en104-building";
import { EN105Floor } from "@/components/models/en105/building/en105-building";
import { EN106Floor } from "@/components/models/en106/building/en106-building";
import { EN107Floor } from "@/components/models/en107/building/en107-building";
import { EN108Floor } from "@/components/models/en108/building/en108-building";
import { EN110Floor } from "@/components/models/en110/building/en110-building";
import { EN113Floor } from "@/components/models/en113/building/en113-building";
import { EN115Floor } from "@/components/models/en115/building/en115-building";
import { EN116Floor } from "@/components/models/en116/building/en116-building";
import { EN117Floor } from "@/components/models/en117/building/en117-building";
import { EN120Floor } from "@/components/models/en120/building/en120-building";
import { EN124Floor } from "@/components/models/en124/building/en124-building";
import { EN126Floor } from "@/components/models/en126/building/en126-building";
import { EN161Floor } from "@/components/models/en161/building/en161-building";
import { EN202Floor } from "@/components/models/en202/building/en202-building";

import { create } from "zustand";

export interface EN001State {
  select: EN001Floor | null;
  setSelect: (floor: EN001Floor | null) => void;
}
export interface EN101State {
  select: EN101Floor | null;
  setSelect: (floor: EN101Floor | null) => void;
}
export interface EN104State {
  select: EN104Floor | null;
  setSelect: (floor: EN104Floor | null) => void;
}
export interface EN105State {
  select: EN105Floor | null;
  setSelect: (floor: EN105Floor | null) => void;
}
export interface EN107State {
  select: EN107Floor | null;
  setSelect: (floor: EN107Floor | null) => void;
}
export interface EN108State {
  select: EN108Floor | null;
  setSelect: (floor: EN108Floor | null) => void;
}
export interface EN110State {
  select: EN110Floor | null;
  setSelect: (floor: EN110Floor | null) => void;
}
export interface EN113State {
  select: EN113Floor | null;
  setSelect: (floor: EN113Floor | null) => void;
}
export interface EN115State {
  select: EN115Floor | null;
  setSelect: (floor: EN115Floor | null) => void;
}
export interface EN116State {
  select: EN116Floor | null;
  setSelect: (floor: EN116Floor | null) => void;
}
export interface EN120State {
  select: EN120Floor | null;
  setSelect: (floor: EN120Floor | null) => void;
}
export interface EN161State {
  select: EN161Floor | null;
  setSelect: (floor: EN161Floor | null) => void;
}
export interface EN106State {
  select: EN106Floor | null;
  setSelect: (floor: EN106Floor | null) => void;
}
export interface EN117State {
  select: EN117Floor | null;
  setSelect: (floor: EN117Floor | null) => void;
}
export interface EN124State {
  select: EN124Floor | null;
  setSelect: (floor: EN124Floor | null) => void;
}
export interface EN126State {
  select: EN126Floor | null;
  setSelect: (floor: EN126Floor | null) => void;
}
export interface EN202State {
  select: EN202Floor | null;
  setSelect: (floor: EN202Floor | null) => void;
}

export const useEN001Store = create<EN001State>((set) => ({
  select: null,
  setSelect: (floor) => {
    set((state) => ({
      select: state.select === floor ? null : floor,
    }));
  },
}));

export const useEN101Store = create<EN101State>((set) => ({
  select: null,
  setSelect: (floor) => {
    set((state) => ({
      select: state.select === floor ? null : floor,
    }));
  },
}));

export const useEN104Store = create<EN104State>((set) => ({
  select: null,
  setSelect: (floor) => {
    set((state) => ({
      select: state.select === floor ? null : floor,
    }));
  },
}));

export const useEN107Store = create<EN107State>((set) => ({
  select: null,
  setSelect: (floor) => {
    set((state) => ({
      select: state.select === floor ? null : floor,
    }));
  },
}));

export const useEN105Store = create<EN105State>((set) => ({
  select: null,
  setSelect: (floor) => {
    set((state) => ({
      select: state.select === floor ? null : floor,
    }));
  },
}));

export const useEN108Store = create<EN108State>((set) => ({
  select: null,
  setSelect: (floor) => {
    set((state) => ({
      select: state.select === floor ? null : floor,
    }));
  },
}));

export const useEN110Store = create<EN110State>((set) => ({
  select: null,
  setSelect: (floor) => {
    set((state) => ({
      select: state.select === floor ? null : floor,
    }));
  },
}));

export const useEN113Store = create<EN113State>((set) => ({
  select: null,
  setSelect: (floor) => {
    set((state) => ({
      select: state.select === floor ? null : floor,
    }));
  },
}));

export const useEN115Store = create<EN115State>((set) => ({
  select: null,
  setSelect: (floor) => {
    set((state) => ({
      select: state.select === floor ? null : floor,
    }));
  },
}));

export const useEN116Store = create<EN116State>((set) => ({
  select: null,
  setSelect: (floor) => {
    set((state) => ({
      select: state.select === floor ? null : floor,
    }));
  },
}));

export const useEN120Store = create<EN120State>((set) => ({
  select: null,
  setSelect: (floor) => {
    set((state) => ({
      select: state.select === floor ? null : floor,
    }));
  },
}));

export const useEN161Store = create<EN161State>((set) => ({
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

export const useEN117Store = create<EN117State>((set) => ({
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

export const useEN126Store = create<EN126State>((set) => ({
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
