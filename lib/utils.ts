import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Shared page container: consistent max width and responsive gutters. */
export const wrap = "mx-auto w-[min(1180px,92%)]";
