"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import createFacultyStore, { ClickFacultyState } from "./create-faculty-store";

export type FacultyStoreApi = typeof createFacultyStore;

export const FacultyStoreContext = createContext<FacultyStoreApi | undefined>(
  undefined
);

export interface FacultyStoreProviderProps {
  children: ReactNode;
}

export const FacultyStoreProvider = ({
  children,
}: FacultyStoreProviderProps) => {
  const storeRef = useRef<FacultyStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createFacultyStore; // ใช้ Zustand store ของคุณ
  }

  return (
    <FacultyStoreContext.Provider value={storeRef.current}>
      {children}
    </FacultyStoreContext.Provider>
  );
};

export const useFacultyStore = <T,>(
  selector: (store: ClickFacultyState) => T
): T => {
  const facultyStoreContext = useContext(FacultyStoreContext);

  if (!facultyStoreContext) {
    throw new Error(
      "useFacultyStore must be used within FacultyStoreProvider"
    );
  }

  const selectedValue = useStore(facultyStoreContext, selector);
  return selectedValue;
};
