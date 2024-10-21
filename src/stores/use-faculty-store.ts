import { create } from "zustand";

export type FacultyBuilding =
  | "EN_Activity_Areas"
  | "EN001"
  | "EN101"
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
  | "EN126"
  | "EN161"
  | "EN202";

export interface ClickFacultyState {
  click: FacultyBuilding | null; // เก็บชื่อของโมเดลที่ถูกคลิกล่าสุด หรือ null ถ้าไม่มี
  setClick: (building: FacultyBuilding | null) => void;
}

const useFacultyStore = create<ClickFacultyState>((set, get) => ({
  click: null, // เริ่มต้นเป็น null แสดงว่ายังไม่มีโมเดลไหนถูกคลิก
  setClick: (building) => {
    set((state) => ({
      click: state.click === building ? null : building,
    }));
  },
}));

export default useFacultyStore;
