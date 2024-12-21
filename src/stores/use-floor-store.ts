import { EN104Floor1 } from "@/components/models/en104/floor-room/en10401-floor";
import { EN104Floor2 } from "@/components/models/en104/floor-room/en10402-floor";
import { EN105Floor1 } from "@/components/models/en105/floor-room/en10501-floor";
import { EN105Floor2 } from "@/components/models/en105/floor-room/en10502-floor";
import { EN106Floor1 } from "@/components/models/en106/floor-room/en10601-floor";
import { EN106Floor2 } from "@/components/models/en106/floor-room/en10602-floor";
import { EN110Floor1 } from "@/components/models/en110/floor-room/en11001-floor";
import { EN110Floor2 } from "@/components/models/en110/floor-room/en11002-floor";
import { EN116Floor1 } from "@/components/models/en116/floor-room/en11601-floor";
import { EN116Floor2 } from "@/components/models/en116/floor-room/en11602-floor";
import { EN116Floor3 } from "@/components/models/en116/floor-room/en11603-floor";
import { EN116FloorM1 } from "@/components/models/en116/floor-room/en116m1-floor";
import { EN120Floor1 } from "@/components/models/en120/floor-room/en12001-floor";
import { EN120FloorM1 } from "@/components/models/en120/floor-room/en120m1-floor";
import { EN202Floor1 } from "@/components/models/en202/floor-room/en20201-floor";
import { EN202FloorB1 } from "@/components/models/en202/floor-room/en202b1-floor";
import { EN12408Air, EN12408Light, EN124Floor8 } from "@/components/models/en124/floor-room/en12408-floor";

import { create } from "zustand";
import { EN120Floor2 } from "@/components/models/en120/floor-room/en12002-floor";
import { EN120Floor3 } from "@/components/models/en120/floor-room/en12003-floor";

export interface EN10401State {
  select: EN104Floor1 | null;
  setSelect: (room: EN104Floor1 | string | null) => void;
}
export interface EN10402State {
  select: EN104Floor2 | null;
  setSelect: (room: EN104Floor2 | string | null) => void;
}
export interface EN10501State {
  select: EN105Floor1 | null;
  setSelect: (room: EN105Floor1 | string | null) => void;
}
export interface EN10502State {
  select: EN105Floor2 | null;
  setSelect: (room: EN105Floor2 | string | null) => void;
}
export interface EN10601State {
  select: EN106Floor1 | null;
  setSelect: (room: EN106Floor1 | string | null) => void;
}
export interface EN10602State {
  select: EN106Floor2 | null;
  setSelect: (room: EN106Floor2 | string | null) => void;
}
export interface EN11001State {
  select: EN110Floor1 | null;
  setSelect: (room: EN110Floor1 | string | null) => void;
}
export interface EN11002State {
  select: EN110Floor2 | null;
  setSelect: (room: EN110Floor2 | string | null) => void;
}
export interface EN116M1State {
  select: EN116FloorM1 | null;
  setSelect: (room: EN116FloorM1 | string | null) => void;
}
export interface EN11601State {
  select: EN116Floor1 | null;
  setSelect: (room: EN116Floor1 | string | null) => void;
}
export interface EN11602State {
  select: EN116Floor2 | null;
  setSelect: (room: EN116Floor2 | string | null) => void;
}
export interface EN11603State {
  select: EN116Floor3 | null;
  setSelect: (room: EN116Floor3 | string | null) => void;
}
export interface EN120M1State {
  select: EN120FloorM1 | null;
  setSelect: (room: EN120FloorM1 | string | null) => void;
}
export interface EN12001State {
  select: EN120Floor1 | null;
  setSelect: (room: EN120Floor1 | string | null) => void;
}
export interface EN12002State {
  select: EN120Floor2 | null;
  setSelect: (room: EN120Floor2 | string | null) => void;
}
export interface EN12003State {
  select: EN120Floor3 | null;
  setSelect: (room: EN120Floor3 | string | null) => void;
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

export const useEN10501Store = create<EN10501State>((set) => ({
  select: null,
  setSelect: (room: EN105Floor1 | string | null) => {
    set((state) => ({
      select: state.select === room ? null : room as any,
    }));
  },
}));

export const useEN10502Store = create<EN10502State>((set) => ({
  select: null,
  setSelect: (room: EN105Floor2 | string | null) => {
    set((state) => ({
      select: state.select === room ? null : room as any,
    }));
  },
}));

export const useEN10601Store = create<EN10601State>((set) => ({
  select: null,
  setSelect: (room: EN106Floor1 | string | null) => {
    set((state) => ({
      select: state.select === room ? null : room as any,
    }));
  },
}));

export const useEN10602Store = create<EN10602State>((set) => ({
  select: null,
  setSelect: (room: EN106Floor2 | string | null) => {
    set((state) => ({
      select: state.select === room ? null : room as any,
    }));
  },
}));

export const useEN11001Store = create<EN11001State>((set) => ({
  select: null,
  setSelect: (room: EN110Floor1 | string | null) => {
    set((state) => ({
      select: state.select === room ? null : room as any,
    }));
  },
}));

export const useEN11002Store = create<EN11002State>((set) => ({
  select: null,
  setSelect: (room: EN110Floor2 | string | null) => {
    set((state) => ({
      select: state.select === room ? null : room as any,
    }));
  },
}));

export const useEN116M1Store = create<EN116M1State>((set) => ({
  select: null,
  setSelect: (room: EN116FloorM1 | string | null) => {
    set((state) => ({
      select: state.select === room ? null : room as any,
    }));
  },
}));

export const useEN11601Store = create<EN11601State>((set) => ({
  select: null,
  setSelect: (room: EN116Floor1 | string | null) => {
    set((state) => ({
      select: state.select === room ? null : room as any,
    }));
  },
}));

export const useEN11602Store = create<EN11602State>((set) => ({
  select: null,
  setSelect: (room: EN116Floor2 | string | null) => {
    set((state) => ({
      select: state.select === room ? null : room as any,
    }));
  },
}));

export const useEN11603Store = create<EN11603State>((set) => ({
  select: null,
  setSelect: (room: EN116Floor3 | string | null) => {
    set((state) => ({
      select: state.select === room ? null : room as any,
    }));
  },
}));

export const useEN120M1Store = create<EN120M1State>((set) => ({
  select: null,
  setSelect: (room: EN120FloorM1 | string | null) => {
    set((state) => ({
      select: state.select === room ? null : room as any,
    }));
  },
}));

export const useEN12001Store = create<EN12001State>((set) => ({
  select: null,
  setSelect: (room: EN120Floor1 | string | null) => {
    set((state) => ({
      select: state.select === room ? null : room as any,
    }));
  },
}));

export const useEN12002Store = create<EN12002State>((set) => ({
  select: null,
  setSelect: (room: EN120Floor2 | string | null) => {
    set((state) => ({
      select: state.select === room ? null : room as any,
    }));
  },
}));

export const useEN12003Store = create<EN12003State>((set) => ({
  select: null,
  setSelect: (room: EN120Floor3 | string | null) => {
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