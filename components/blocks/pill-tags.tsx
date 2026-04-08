"use client";

import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { PageBlocksPillTags, PageBlocksPillTagsItems } from "../../tina/__generated__/types";
import { iconSchema } from "@/tina/fields/icon";
import { Icon } from "../icon";
import { Section } from "../layout/section";

export const PillTags = ({ data }: { data: PageBlocksPillTags }) => {
  return (
    <Section title={data.title || undefined} data-tina-field={data.title ? tinaField(data, "title") : undefined}>
      <div className="flex flex-wrap gap-3">
        {data.items?.map((item, index) =>
          item ? <PillTag key={`${item.text}-${index}`} item={item} /> : null,
        )}
      </div>
    </Section>
  );
};

const PillTag = ({ item }: { item: PageBlocksPillTagsItems }) => {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-slate-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
      data-tina-field={tinaField(item)}
    >
      {item.icon ? (
        <Icon
          data={{ ...item.icon, size: "xs" }}
          tinaField={tinaField(item, "icon")}
          ariaHidden={true}
          focusable={false}
        />
      ) : null}
      <span data-tina-field={tinaField(item, "text")}>{item.text}</span>
    </div>
  );
};

const defaultPillItem = {
  text: "TypeScript",
  icon: {
    name: "BiCodeAlt",
    color: "foreground",
    style: "float",
  },
};

export const pillTagsBlockSchema: Template = {
  name: "pillTags",
  label: "Pill Tags",
  ui: {
    defaultItem: {
      title: "Tools I Use",
      items: [defaultPillItem, { ...defaultPillItem, text: "React" }, { ...defaultPillItem, text: "Node.js" }],
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
      required: false,
    },
    {
      type: "object",
      label: "Pill Tags",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.text || "Pill Tag",
        }),
        defaultItem: defaultPillItem,
      },
      fields: [
        iconSchema as any,
        {
          type: "string",
          label: "Text",
          name: "text",
          required: true,
        },
      ],
    },
  ],
};
