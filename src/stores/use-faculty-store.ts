import { create } from "zustand";

export type FacultyBuilding =
  | "EN_Activity_Areas"
  | "EN001"
  | "EN101"
  | "EN103"
  | "EN104"
  | "EN105"
  | "EN106"
  | "EN107"
  | "EN108"
  | "EN110"
  | "EN113"
  | "EN115"
  | "EN116"
  | "EN117"
  | "EN120"
  | "EN124"
  | "EN125"
  | "EN126"
  | "EN161"
  | "EN202"
  | "EN111"
  | "EN118"
  | "EN119"
  | "EN122"
  | "EN509";

export interface ClickFacultyState {
  select: FacultyBuilding | null; // เก็บชื่อของโมเดลที่ถูกคลิกล่าสุด หรือ null ถ้าไม่มี
  setSelect: (building: FacultyBuilding | null) => void;
}

const useFacultyStore = create<ClickFacultyState>((set, get) => ({
  select: null, // เริ่มต้นเป็น null แสดงว่ายังไม่มีโมเดลไหนถูกคลิก
  setSelect: (building) => {
    set((state) => ({
      select: state.select === building ? null : building,
    }));
  },
}));

export default useFacultyStore;
