import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toSectionId(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getSectionId(sectionId?: string | null, title?: string | null) {
  if (sectionId?.trim()) {
    return toSectionId(sectionId);
  }

  if (title?.trim()) {
    return toSectionId(title);
  }

  return undefined;
}
