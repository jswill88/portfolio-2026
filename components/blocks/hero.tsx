"use client";

import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { iconSchema } from "@/tina/fields/icon";
import { imageSchema } from "@/tina/fields/image";
import { PageBlocksHero } from "@/tina/__generated__/types";
import { useLayout } from "../layout/layout-context";
import { Image } from "@/components/ui/image";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";

export const Hero = ({ data }: { data: PageBlocksHero }) => {
  const { globalSettings } = useLayout();
  const heroNameSegments = globalSettings?.name
    ? globalSettings.name.split(/(\s+)/).reduce<
        Array<
          | { type: "space"; value: string }
          | {
              type: "word";
              value: string;
              letters: Array<{ character: string; revealIndex: number }>;
            }
        >
      >((segments, part) => {
        if (!part) {
          return segments;
        }

        if (/^\s+$/.test(part)) {
          segments.push({ type: "space", value: part });
          return segments;
        }

        const revealStart = segments.reduce((count, segment) => {
          if (segment.type === "space") {
            return count;
          }

          return count + segment.letters.length;
        }, 0);

        segments.push({
          type: "word",
          value: part,
          letters: Array.from(part).map((character, index) => ({
            character,
            revealIndex: revealStart + index,
          })),
        });

        return segments;
      }, [])
    : [];

  return (
    <section className="relative grid sm:grid-cols-[1fr_1fr] md:grid-cols-[1fr_2fr] items-start gap-3 sm:gap-6 mx-auto mb-10 px-5 max-w-6xl">
      {data.image && (
        <Image
          tinaField={tinaField(data, "image")}
          alt={data.image.alt ?? ""}
          src={data.image.src}
          blurDataURL={data.image.blurDataURL}
          sizes={[{ maxWidth: "40em", width: "100vw" }, { width: 361 }]}
          isLcp={true}
          className="justify-self-center sm:justify-self-auto w-full max-w-50 sm:max-w-lg rounded-full border dark:border-gray-700"
        />
      )}
      <div className="relative grid gap-3 md:gap-5 justify-items-start">
        <p className="inline-block font-sans font-bold text-2xl md:text-4xl leading-tight">
          <span className="mr-2 animate-wave inline-block" aria-hidden>
            👋
          </span>
          {data.intro}
        </p>
        {globalSettings?.name && (
          <h1 className="inline-block text-5xl md:text-7xl font-display">
            {heroNameSegments.map((segment, segmentIndex) =>
              segment.type === "space" ? (
                <span key={`space-${segmentIndex}`} aria-hidden="true">
                  {segment.value.replaceAll(" ", "\u00A0")}
                </span>
              ) : (
                <span
                  key={`${segment.value}-${segmentIndex}`}
                  className="inline-block whitespace-nowrap"
                  aria-hidden="true"
                >
                  {segment.letters.map(({ character, revealIndex }, letterIndex) => (
                    <span
                      key={`${character}-${letterIndex}`}
                      className="inline-block opacity-0 motion-safe:animate-letter-reveal motion-reduce:opacity-100 motion-reduce:animate-none"
                      style={{ animationDelay: `${revealIndex * 0.1}s` }}
                    >
                      {character}
                    </span>
                  ))}
                </span>
              ),
            )}
            <span className="sr-only">{globalSettings.name}</span>
          </h1>
        )}
        {globalSettings?.title && (
          <h2 className="font-sans text-2xl md:text-4xl font-bold leading-none">
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
                          ariaHidden={true}
                          focusable={false}
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
                <Icon
                  data={{ ...data.cta.icon, size: "medium" }}
                  ariaHidden={true}
                  focusable={false}
                />
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
