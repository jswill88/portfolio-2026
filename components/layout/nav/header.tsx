"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Icon } from "../../icon";
import { useLayout } from "../layout-context";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ui/theme-toggle";
import { motion, AnimatePresence } from "motion/react";
import { animationPresets } from "@/lib/constants/animations";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { NavLink } from "@/components/ui/nav-link";

export const Header = () => {
  const { globalSettings } = useLayout();
  const [menuState, setMenuState] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const header = globalSettings?.header;

  useScrollLock(menuState);
  useFocusTrap(menuState, menuRef, menuButtonRef);

  useEffect(() => {
    if (!menuState) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuState(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuState]);

  return (
    <>
      <AnimatePresence>
        {menuState && (
          <motion.div
            {...animationPresets.fade}
            className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-1"
            onClick={() => setMenuState(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <header className="relative z-1">
        <nav
          data-state={menuState && "active"}
          className="w-full bg-gray-100 border-b border-gray-400 backdrop-blur-sm dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="mx-auto max-w-7xl">
            <div className="lg:flex flex-wrap items-center justify-between">
              <div className="w-full flex items-center justify-between gap-4">
                <Link href="/" aria-label="home">
                  <Icon
                    className="w-20 lg:w-30 py-2 px-4 lg:px-6 shrink-0"
                    data={{
                      name: header?.icon?.name,
                      color: header?.icon?.color,
                      style: header?.icon?.style,
                      size: "custom",
                    }}
                  />
                </Link>

                <div className="flex items-center gap-2">
                  <ThemeToggle />

                  <button
                    ref={menuButtonRef}
                    onClick={() => setMenuState(!menuState)}
                    aria-label="Menu"
                    aria-expanded={menuState}
                    aria-controls="mobile-menu"
                    aria-haspopup="dialog"
                    className="block lg:hidden relative p-2.5 z-20 cursor-pointer"
                  >
                    <Menu className="in-data-[state=active]:opacity-0 size-6 duration-200" />
                    <X className="absolute inset-0 m-auto opacity-0 in-data-[state=active]:opacity-100 size-6 duration-200" />
                  </button>
                  <div className="hidden lg:block">
                    <ul className="flex text-sm">
                      {header?.nav &&
                        header.nav.map(
                          (item, index) =>
                            item !== null && (
                              <li key={index}>
                                <NavLink
                                  href={item.href}
                                  label={item.label ?? item.href}
                                  customClasses="p-5"
                                />
                              </li>
                            ),
                        )}
                    </ul>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {menuState && (
                  <motion.div
                    {...animationPresets.fade}
                    id="mobile-menu"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="mobile-menu-label"
                    className="lg:hidden absolute top-full right-0 min-w-80"
                  >
                    <h2 id="mobile-menu-label" className="sr-only">
                      Main navigation
                    </h2>
                    <ul
                      ref={menuRef}
                      className="text-base bg-gray-100 rounded-bl-xl border-l border-b border-gray-400 shadow-lg dark:bg-gray-800 dark:border-gray-700"
                    >
                      {header?.nav &&
                        header.nav.map(
                          (item, index) =>
                            item !== null && (
                              <li key={index}>
                                <NavLink
                                  href={item.href}
                                  label={item.label ?? item.href}
                                  customClasses="py-2 px-5"
                                />
                              </li>
                            ),
                        )}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
