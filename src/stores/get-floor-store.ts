
import { useEN12408Store } from "./use-floor-store";

const storeMap = {
  EN12408: useEN12408Store,
  // Add more stores here as needed
};

export const getFloorStore = (floor: string) => {
  const store = storeMap[floor as keyof typeof storeMap];
  if (!store) {
    throw new Error(`Store for floor ${floor} not found`);
  }
  return store();
};
