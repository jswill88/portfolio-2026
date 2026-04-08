"use client";
import React from "react";
import Link from "next/link";
import { Icon } from "../../icon";
import { useLayout } from "../layout-context";
import { SocialLink } from "@/components/ui/social-link";

const COPYRIGHT_YEAR = new Date().getFullYear();

export const Footer = () => {
  const { globalSettings } = useLayout();
  const { footer } = globalSettings!;

  return (
    <footer className="border-t border-gray-400 bg-gray-100 dark:bg-gray-800  dark:border-gray-700">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-wrap items-center gap-6 py-6 flex-col md:flex-row md:justify-between">
          <div className="hidden md:block">
            <CopyrightLine />
          </div>

          <div className="flex justify-center gap-6 text-sm md:justify-end">
            {footer?.social?.map((link) => (
              <SocialLink link={link} key={link!.url} />
            ))}
          </div>

          <div className="block md:hidden">
            <CopyrightLine />
          </div>
        </div>
      </div>
    </footer>
  );
};

const CopyrightLine = () => {
  const { globalSettings } = useLayout();
  const { header, name } = globalSettings!;
  return (
    <div className="flex justify-center md:justify-start">
      <Link href="/" aria-label="home">
        <Icon
          data={{
            ...header!.icon,
            size: "small",
          }}
        />
      </Link>

      <span className="self-center text-sm ml-2">
        © {COPYRIGHT_YEAR} {name}
      </span>
    </div>
  );
};
