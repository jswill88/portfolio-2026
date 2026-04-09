"use client";

import { Icon } from "@/components/icon";

type PillIcon = {
  source?: string | null;
  name?: string | null;
  svg?: string | null;
  color?: string | null;
  style?: string | null;
};

type PillTagData = {
  icon?: PillIcon | null;
  text?: string | null;
};

type PillTagProps = {
  item: PillTagData;
  tinaField?: string;
};

export function PillTag({ item, tinaField }: PillTagProps) {
  if (!item.text) return null;

  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-slate-800 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
      {...(tinaField ? { "data-tina-field": tinaField } : {})}
    >
      {item.icon ? (
        <Icon
          data={{ ...item.icon, size: "xs" }}
          ariaHidden={true}
          focusable={false}
        />
      ) : null}
      <span>{item.text}</span>
    </div>
  );
}
