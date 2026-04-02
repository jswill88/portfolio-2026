"use client";

import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { iconSchema } from "@/tina/fields/icon";
import { imageSchema } from "@/tina/fields/image";
import { PageBlocksHero } from "@/tina/__generated__/types";
import { sectionBlockSchemaField } from "../layout/section";
import { useLayout } from "../layout/layout-context";
import { Image } from "@/components/ui/image";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";

export const Hero = ({ data }: { data: PageBlocksHero }) => {
  const { globalSettings } = useLayout();

  return (
    <section className="relative grid sm:grid-cols-[1fr_1fr] md:grid-cols-[1fr_2fr] items-start gap-3 sm:gap-6 mx-auto mb-10 px-5 pt-8 max-w-6xl">
      {data.image && (
        <Image
          tinaField={tinaField(data, "image")}
          alt={data.image.alt ?? ""}
          src={data.image.src}
          blurDataURL={data.image.blurDataURL}
          sizes={[{ maxWidth: "40em", width: "100vw" }, { width: 640 }]}
          isLcp={true}
          className="justify-self-center sm:justify-self-auto w-full max-w-50 sm:max-w-lg rounded-full border dark:border-gray-700"
        />
      )}
      <div className="relative grid gap-3 md:gap-5 justify-items-start">
        <p className="inline-block font-sans font-black text-2xl md:text-4xl leading-tight">
          <span className="mr-2 animate-wave inline-block" aria-hidden>
            👋
          </span>
          {data.intro}
        </p>
        {globalSettings?.name && (
          <h1 className="inline-block text-5xl md:text-7xl font-display">
            {globalSettings.name}
          </h1>
        )}
        {globalSettings?.title && (
          <h2 className="font-sans text-2xl md:text-4xl font-black leading-none">
            I'm a {globalSettings.title}
          </h2>
        )}
        {data.description && (
          <p className="text-lg font-mono leading-tight">{data.description}</p>
        )}
        {data.social && (
          <div className="flex wrap gap-2">
            {data.social.map(
              (item, index) =>
                item && (
                  <Button variant="outline" asChild key={item.url + index}>
                    <a href={item.url!}>
                      {item.icon && (
                        <Icon
                          data={{ ...item.icon, size: "medium" }}
                          aria-hidden
                        />
                      )}
                      <span className="leading-none inline-block">
                        {item.label}
                      </span>
                    </a>
                  </Button>
                ),
            )}
          </div>
        )}
        {data.cta && (
          <Button variant="secondary" size="lg" asChild>
            <a href={data.cta.url!} target="_blank" className="leading-none">
              {data.cta.icon && (
                <Icon data={{ ...data.cta.icon, size: "medium" }} aria-hidden />
              )}
              {data.cta.label}
            </a>
          </Button>
        )}
      </div>
    </section>
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
      fields: [
        iconSchema,
        {
          type: "string",
          label: "Url",
          name: "url",
          required: true,
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
