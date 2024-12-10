import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { configs } from "./configs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const suffixesNumber = (num: number) => {
  const suffixes = ["", "K", "M", "B", "T"];
  let suffixIndex = 0;
  while (num >= 1000 && suffixIndex < suffixes.length - 1) {
    suffixIndex++;
    num /= 1000;
  }
  return num.toFixed(0) + suffixes[suffixIndex];
};

export const getFloorActiveStatus = (buildingKey?: string, floorKey?: string): boolean => {
  if (!buildingKey || !floorKey) {
    return false; // Return false if keys are missing
  }

  const building = configs.building[buildingKey.toLowerCase()]; // Get the building
  if (!building?.floor) {
    return false; // Building or floors don't exist
  }

  const floor = building.floor[floorKey.toLowerCase()]; // Get the floor
  return floor?.active ?? false; // Return floor active status or false
};
