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
        "group block text-base font-mono tracking-widest text-gray-900 transition-colors duration-150 hover:text-teal-700 dark:text-slate-100 dark:hover:text-teal-400",
        customClasses,
      )}
    >
      <span className="relative inline-block">
        {label ?? href}
        <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-current transition-transform duration-200 group-hover:scale-x-100" />
      </span>
    </Link>
  );
}
