import {
  useEN10401Store,
  useEN10402Store,
  useEN12408Store,
  useEN20201Store,
  useEN202B1Store,
} from "./use-floor-store";

const storeMap = {
  EN10401: useEN10401Store,
  EN10402: useEN10402Store,
  EN12408: useEN12408Store,
  EN20201: useEN20201Store,
  EN202B1: useEN202B1Store,
  // Add more stores here as needed
};

export const getFloorStore = (floor: string) => {
  const store = storeMap[floor as keyof typeof storeMap];
  // if (!store) {
  //   throw new Error(`Store for floor ${floor} not found`);
  // }
  return store && store();
};
