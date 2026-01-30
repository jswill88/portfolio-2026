"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Icon } from "../../icon";
import { useLayout } from "../layout-context";
import { Menu, X } from "lucide-react";
import { AnimatedGroup } from "../../motion-primitives/animated-group";
import { AnimatePresence } from "motion/react";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { NavLink } from "@/components/ui/nav-link";

export const Header = () => {
  const { globalSettings } = useLayout();
  const header = globalSettings!.header!;

  const [menuState, setMenuState] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

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
          <AnimatedGroup
            preset="fade"
            className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden z-15"
            onClick={() => setMenuState(false)}
            aria-hidden="true"
          ></AnimatedGroup>
        )}
      </AnimatePresence>

      <header className="relative z-20">
        <nav
          data-state={menuState && "active"}
          className="border-b w-full bg-background"
        >
          <div className="mx-auto max-w-7xl px-5 transition-all duration-300">
            <div className="lg:flex flex-wrap items-center justify-between py-2 lg:py-4">
              <div className="flex w-full items-center justify-between gap-12">
                <Link href="/" aria-label="home">
                  <Icon
                    className="shrink-0 w-12 lg:w-18"
                    data={{
                      name: header.icon!.name,
                      color: header.icon!.color,
                      style: header.icon!.style,
                      size: "custom",
                    }}
                  />
                </Link>

                <button
                  ref={menuButtonRef}
                  onClick={() => setMenuState(!menuState)}
                  aria-label="Menu"
                  aria-expanded={menuState}
                  aria-controls="mobile-menu"
                  aria-haspopup="dialog"
                  className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                >
                  <Menu className="in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                  <X className="in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 opacity-0 duration-200" />
                </button>

                <div className="hidden lg:block">
                  <ul className="flex gap-8 text-sm">
                    {header.nav!.map((item, index) => (
                      <li key={index}>
                        <NavLink href={item!.href!} label={item!.label!} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <AnimatePresence>
                {menuState && (
                  <AnimatedGroup
                    id="mobile-menu"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="mobile-menu-label"
                    className="dark:shadow-none absolute lg:hidden top-full right-0 min-w-80"
                  >
                    <h2 id="mobile-menu-label" className="sr-only">
                      Main navigation
                    </h2>
                    <ul
                      ref={menuRef}
                      className="space-y-2 text-base p-5 bg-popover rounded-bl-2xl border-l border-b shadow-lg"
                    >
                      {header.nav!.map((item, index) => (
                        <li key={index}>
                          <NavLink href={item!.href!} label={item!.label!} />
                        </li>
                      ))}
                    </ul>
                  </AnimatedGroup>
                )}
              </AnimatePresence>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
