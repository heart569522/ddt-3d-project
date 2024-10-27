import { useEN104Store, useEN106Store, useEN124Store } from "@/stores/use-building-store";

const storeMap = {
  //   EN101: useEN101Store,
  EN104: useEN104Store,
  EN106: useEN106Store,
  EN124: useEN124Store,
  // Add more stores here as needed
};

export const getBuildingStore = (building: string) => {
  const store = storeMap[building as keyof typeof storeMap];
  if (!store) {
    throw new Error(`Store for building ${building} not found`);
  }
  return store();
};
