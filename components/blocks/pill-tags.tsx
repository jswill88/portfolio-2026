"use client";

import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import type { PageBlocksPillTags } from "../../tina/__generated__/types";
import globalContent from "@/content/global/index.json";
import { Section } from "../layout/section";
import { getSectionId } from "@/lib/utils";
import { useLayout } from "../layout/layout-context";
import { PillTag } from "../ui/pill-tag";

const globalPillOptions = (globalContent.pills ?? [])
  .filter((pill): pill is NonNullable<(typeof globalContent.pills)[number]> => Boolean(pill?.id && pill?.text))
  .map((pill) => ({
    label: pill.text,
    value: pill.id,
  }));

const getPillLabel = (pillId?: string | null) =>
  globalContent.pills?.find((pill) => pill?.id === pillId)?.text ?? pillId ?? "Pill";

export const PillTags = ({ data }: { data: PageBlocksPillTags }) => {
  const { globalSettings } = useLayout();
  const globalPills = globalSettings?.pills ?? [];

  const reusablePills =
    data.pills
      ?.map((pillRef) => globalPills.find((pill) => pill?.id === pillRef?.pillId))
      .filter((pill): pill is NonNullable<typeof pill> => Boolean(pill)) ?? [];

  return (
    <Section
      id={getSectionId(data.sectionId, data.title)}
      title={data.title || undefined}
      data-tina-field={data.title ? tinaField(data, "title") : undefined}
    >
      <div className="flex flex-wrap gap-3">
        {reusablePills.map((item, index) =>
          item ? (
            <PillTag
              key={`${item.id ?? item.text}-${index}`}
              item={item}
              tinaField={data.pills?.[index] ? tinaField(data.pills[index]) : undefined}
            />
          ) : null,
        )}
      </div>
    </Section>
  );
};

export const pillTagsBlockSchema: Template = {
  name: "pillTags",
  label: "Pill Tags",
  ui: {
    defaultItem: {
      title: "Tools I Use",
      pills: [{ pillId: "typescript" }, { pillId: "react" }, { pillId: "node-js" }],
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
      type: "string",
      label: "Section ID",
      name: "sectionId",
      required: false,
      description: "Optional stable anchor id for nav links. Falls back to a slug from the title.",
    },
    {
      type: "object",
      label: "Pill Tags",
      name: "pills",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: getPillLabel(item?.pillId),
        }),
        defaultItem: {
          pillId: globalPillOptions[0]?.value ?? "",
        },
      },
      fields: [
        {
          type: "string",
          label: "Pill",
          name: "pillId",
          required: true,
          options: globalPillOptions,
        },
      ],
    },
  ],
};
