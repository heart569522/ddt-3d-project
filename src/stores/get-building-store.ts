import {
  useEN001Store,
  useEN101Store,
  useEN104Store,
  useEN105Store,
  useEN106Store,
  useEN107Store,
  useEN108Store,
  useEN110Store,
  useEN113Store,
  useEN115Store,
  useEN116Store,
  useEN117Store,
  useEN120Store,
  useEN124Store,
  useEN126Store,
  useEN161Store,
  useEN202Store,
} from "@/stores/use-building-store";

const storeMap = {
  EN001: useEN001Store,
  EN101: useEN101Store,
  EN103: null,
  EN104: useEN104Store,
  EN105: useEN105Store,
  EN106: useEN106Store,
  EN107: useEN107Store,
  EN108: useEN108Store,
  EN110: useEN110Store,
  EN113: useEN113Store,
  EN115: useEN115Store,
  EN116: useEN116Store,
  EN117: useEN117Store,
  EN118: null,
  EN119: null,
  EN120: useEN120Store,
  EN122: null,
  EN124: useEN124Store,
  EN125: null,
  EN126: useEN126Store,
  EN161: useEN161Store,
  EN202: useEN202Store,
  EN509: null
};

export const getBuildingStore = (building: string) => {
  const store = storeMap[building as keyof typeof storeMap];
  // if (!store) {
  //   throw new Error(`Store for building ${building} not found`);
  // }
  return store && store();
};
