import Link from "next/link";
import { cn } from "@/lib/utils";
import type { MouseEventHandler } from "react";

type NavLinkProps = {
  href: string;
  label?: string;
  customClasses?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function NavLink({ href, label, customClasses, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "block text-base font-mono tracking-widest text-gray-900 hover:text-teal-700 hover:underline duration-150 dark:text-slate-100 dark:hover:text-teal-400",
        customClasses,
      )}
    >
      <span>{label ?? href}</span>
    </Link>
  );
}
