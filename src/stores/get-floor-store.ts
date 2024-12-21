import {
  useEN10401Store,
  useEN10402Store,
  useEN10501Store,
  useEN10502Store,
  useEN10601Store,
  useEN10602Store,
  useEN11001Store,
  useEN11002Store,
  useEN11601Store,
  useEN11602Store,
  useEN11603Store,
  useEN116M1Store,
  useEN12001Store,
  useEN12002Store,
  useEN12003Store,
  useEN120M1Store,
  useEN12408Store,
  useEN20201Store,
  useEN202B1Store,
} from "./use-floor-store";

const storeMap = {
  EN10401: useEN10401Store,
  EN10402: useEN10402Store,
  EN10501: useEN10501Store,
  EN10502: useEN10502Store,
  EN10601: useEN10601Store,
  EN10602: useEN10602Store,
  EN11001: useEN11001Store,
  EN11002: useEN11002Store,
  EN116M1: useEN116M1Store,
  EN11601: useEN11601Store,
  EN11602: useEN11602Store,
  EN11603: useEN11603Store,
  EN120M1: useEN120M1Store,
  EN12001: useEN12001Store, 
  EN12002: useEN12002Store, 
  EN12003: useEN12003Store, 
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
