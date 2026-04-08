"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <div className="relative inline-flex h-10 w-18 items-center rounded-full bg-gray-200 p-1 dark:bg-gray-700">
      <span className="absolute left-1 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out dark:translate-x-8 dark:bg-gray-800">
        <Sun className="h-4 w-4 text-amber-500 dark:hidden" />
        <Moon className="hidden h-4 w-4 text-gray-100 dark:block" />
      </span>

      <div className="pointer-events-none relative z-10 flex w-full items-center justify-between">
        <span className="flex h-8 w-8 items-center justify-center text-amber-500">
          <Sun className="h-4 w-4" />
        </span>
        <span className="flex h-8 w-8 items-center justify-center text-gray-700 dark:text-gray-100">
          <Moon className="h-4 w-4" />
        </span>
      </div>

      <button
        type="button"
        aria-label="Switch to dark mode"
        onClick={() => setTheme("dark")}
        className="absolute inset-0 z-20 cursor-pointer rounded-full dark:pointer-events-none"
      />

      <button
        type="button"
        aria-label="Switch to light mode"
        onClick={() => setTheme("light")}
        className="pointer-events-none absolute inset-0 z-20 cursor-pointer rounded-full dark:pointer-events-auto"
      />
    </div>
  );
}
