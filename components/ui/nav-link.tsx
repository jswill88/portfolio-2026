import Link from "next/link";

type NavLinkProps = {
  href: string;
  label?: string;
  customClasses?: string;
};

export function NavLink({ href, label }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="font-mono text-foreground hover:text-accent-foreground hover:underline block duration-150 tracking-widest text-base"
    >
      <span>{label ?? href}</span>
    </Link>
  );
}
