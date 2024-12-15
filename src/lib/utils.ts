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

export const getFloorActiveStatus = (
  buildingKey?: string,
  floorKey?: string
): boolean => {
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

export const getRoomActiveStatus = (
  buildingKey?: string,
  floorKey?: string,
  roomKey?: string
): boolean => {
  if (!buildingKey || !floorKey || !roomKey) {
    return false; // Return false if keys are missing
  }

  const building = configs.building[buildingKey.toLowerCase()]; // Get the building
  if (!building?.floor) {
    return false; // Building or floors don't exist
  }

  const floor = building.floor[floorKey.toLowerCase()]; // Get the floor
  if (!floor?.room) {
    return false; // Floor or rooms don't exist
  }

  const room = floor.room[roomKey.toLowerCase()]; // Get the room
  return room?.active ?? false; // Return room active status or false
};

export const getColorFromScale = (
  value: number,
  scale: Array<[number, string]>
) => {
  for (let i = 0; i < scale.length - 1; i++) {
    const [start, startColor] = scale[i];
    const [end, endColor] = scale[i + 1];

    if (value >= start && value <= end) {
      const ratio = (value - start) / (end - start);
      return interpolateColor(startColor, endColor, ratio);
    }
  }
  return scale[scale.length - 1][1];
};

export const interpolateColor = (
  color1: string,
  color2: string,
  ratio: number
) => {
  const hexToRgb = (hex: string) =>
    hex
      .replace(/^#/, "")
      .match(/.{2}/g)
      ?.map((x) => parseInt(x, 16)) || [0, 0, 0];

  const rgbToHex = (rgb: number[]) =>
    `#${rgb.map((x) => x.toString(16).padStart(2, "0")).join("")}`;

  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  const interpolatedRgb = rgb1.map((c, i) =>
    Math.round(c + (rgb2[i] - c) * ratio)
  );

  return rgbToHex(interpolatedRgb);
};
