"use client";
import { iconSchema } from "@/tina/fields/icon";
import { imageSchema } from "@/tina/fields/image";
import NextImage from "next/image";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { PageBlocksHero } from "../../tina/__generated__/types";
import { Section, sectionBlockSchemaField } from "../layout/section";

export const Hero = ({ data }: { data: PageBlocksHero }) => {
  return (
    <Section background={data.background!}>
      {data.image && (
        <div
          className="relative overflow-hidden rounded-full shadow-2xl w-full aspect-square"
          data-tina-field={tinaField(data, "image")}
        >
          <NextImage
            className="
              transition-filter
              transition-opacity
              duration-400
              absolute
              inset-0
            "
            alt={data.image.alt || ""}
            src={data.image.src || ""}
            preload={true}
            loading="eager"
            fill={true}
            objectFit="cover"
            placeholder="blur"
            blurDataURL={data.image.blurDataURL ?? undefined}
            sizes="(max-width: 640px) 100vw, 640px"
          />
        </div>
      )}
    </Section>
  );
};

export const heroBlockSchema: Template = {
  name: "hero",
  label: "Hero",
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Intro",
      name: "intro",
    },
    {
      type: "string",
      label: "Description",
      name: "description",
    },
    {
      type: "object",
      label: "Links",
      name: "social",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.icon?.name || "undefined" };
        },
      },
      fields: [
        iconSchema,
        {
          type: "string",
          label: "Url",
          name: "url",
        },
        {
          type: "string",
          label: "Label",
          name: "label",
        },
      ],
    },
    {
      type: "object",
      label: "CTA",
      name: "cta",
      fields: [
        iconSchema,
        {
          type: "string",
          label: "Url",
          name: "url",
        },
        {
          type: "string",
          label: "Label",
          name: "label",
        },
      ],
    },
    imageSchema,
  ],
};
