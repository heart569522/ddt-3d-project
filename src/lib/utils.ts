import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
