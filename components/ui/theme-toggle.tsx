"use client";

import { useEffect } from "react";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themeOptions = [
    { key: "system", Icon: Laptop },
    { key: "light", Icon: Sun },
    { key: "dark", Icon: Moon },
  ];

  const normalizedTheme =
    theme === "system" || theme === "light" || theme === "dark" ? theme : "system";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem("theme");
    if (saved && ["system", "light", "dark"].includes(saved)) {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!theme) return;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const activeIndex = themeOptions.findIndex((opt) => opt.key === normalizedTheme);

  return (
    <div
      className="relative inline-flex items-center rounded-full p-1 bg-gray-200 dark:bg-gray-700"
      style={{
        '--toggle-button-width': '32px'
      } as React.CSSProperties}
    >
      <div
        className="absolute top-1 rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out dark:bg-gray-800"
        style={{
          width: "var(--toggle-button-width)",
          height: "var(--toggle-button-width)",
          transform: `translateX(calc(${activeIndex} * var(--toggle-button-width)))`,
        }}
      />

      {themeOptions.map((option) => (
        <button
          key={option.key}
          type="button"
          onClick={() => setTheme(option.key)}
          aria-label={`Set ${option.key} theme`}
          aria-pressed={normalizedTheme === option.key}
          className="relative flex items-center justify-center rounded-full text-gray-600 transition-colors hover:text-slate-800 dark:text-gray-400 dark:hover:text-slate-200 cursor-pointer"
          style={{
            width: 'var(--toggle-button-width)',
            height: 'var(--toggle-button-width)',
          }}
        >
          <option.Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  );
}
