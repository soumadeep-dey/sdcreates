import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ytThumb(
  videoId: string,
  quality: "mqdefault" | "hqdefault" | "maxresdefault" = "mqdefault",
) {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

export function ytUrl(videoId: string) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
