import Link from "next/link";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  label?: string;
  customClasses?: string;
};

export function NavLink({ href, label, customClasses }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "block text-base font-mono tracking-widest text-gray-900 hover:text-teal-700 hover:underline duration-150 ",
        customClasses,
      )}
    >
      <span>{label ?? href}</span>
    </Link>
  );
}
