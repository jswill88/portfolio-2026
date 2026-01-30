import Link from "next/link";
import { Icon } from "../icon";
import { JSX } from "react";

type SocialLinkProps = JSX.IntrinsicAttributes & {
  link: {
    url?: string | null;
    icon?: {
      __typename: "GlobalFooterSocialIcon";
      name?: string | null;
      color?: string | null;
      style?: string | null;
    } | null;
  } | null;
};

export function SocialLink({ link, ...rest }: SocialLinkProps) {
  return (
    <Link
      href={link!.url!}
      aria-label={link!.icon?.name ?? link!.url!}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group"
      {...rest}
    >
      <Icon
        data={{ ...link!.icon, size: "small" }}
        className="text-foreground block group-hover:opacity-0 transition-opacity ease-linear"
        aria-hidden
      />
      <Icon
        data={{ ...link!.icon, size: "small" }}
        className="text-primary block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ease-linear"
        aria-hidden
      />
    </Link>
  );
}
