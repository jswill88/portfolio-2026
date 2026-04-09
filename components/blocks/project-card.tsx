"use client";

import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { PageBlocksProjectCardsSectionCards } from "../../tina/__generated__/types";
import { Image } from "../ui/image";
import { PillTag } from "../ui/pill-tag";

type GlobalPill = {
  id: string;
  text: string;
  icon?: {
    name?: string | null;
    source?: string | null;
    svg?: string | null;
    color?: string | null;
    style?: string | null;
  } | null;
};

export const ProjectCard = ({
  card,
  globalPills,
}: {
  card: PageBlocksProjectCardsSectionCards;
  globalPills: GlobalPill[];
}) => {
  const pills =
    card.pills
      ?.map((pillRef) =>
        globalPills.find((pill) => pill.id === pillRef?.pillId),
      )
      .filter((pill): pill is GlobalPill => Boolean(pill)) ?? [];

  return (
    <article>
      <div className="grid items-stretch gap-1 sm:grid-cols-[minmax(0,1.7fr)_minmax(0,0.9fr)]">
        <Image
          tinaField={tinaField(card, "primaryImage")}
          alt={card.primaryImage?.alt ?? ""}
          src={card.primaryImage?.src ?? ""}
          blurDataURL={card.primaryImage?.blurDataURL ?? ""}
          sizes={[
            { maxWidth: "40em", width: "100vw" },
            { maxWidth: "64em", width: "66vw" },
            { width: "420px" },
          ]}
          aspectRatio={4 / 3}
          className="h-full"
        />
        <Image
          tinaField={tinaField(card, "secondaryImage")}
          alt={card.secondaryImage?.alt ?? ""}
          src={card.secondaryImage?.src ?? ""}
          blurDataURL={card.secondaryImage?.blurDataURL ?? ""}
          sizes={[
            { maxWidth: "40em", width: "56vw" },
            { maxWidth: "64em", width: "32vw" },
            { width: "220px" },
          ]}
          aspectRatio={3 / 4}
          className="mx-auto h-full w-full sm:mx-0 sm:justify-self-end"
        />
      </div>

      <div className="mt-5 space-y-5">
        <div className="space-y-3">
          <h3
            className="text-2xl font-semibold tracking-tight"
            data-tina-field={tinaField(card, "title")}
          >
            {card.title}
          </h3>

          {card.links?.length ? (
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {card.links.map((link, index) =>
                link?.url ? (
                  <li
                    key={`${link.url}-${index}`}
                    data-tina-field={tinaField(link)}
                  >
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-block text-sm font-medium text-foreground transition-colors duration-150 hover:text-teal-700 dark:hover:text-teal-400"
                    >
                      <span className="relative inline-block">
                        {link.label || link.url}
                        <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-current transition-transform duration-200 group-hover:scale-x-100" />
                      </span>
                    </a>
                  </li>
                ) : null,
              )}
            </ul>
          ) : null}
        </div>

        <div
          className="max-w-[72ch] text-base leading-relaxed [&>p+p]:mt-4"
          data-tina-field={tinaField(card, "description")}
        >
          <TinaMarkdown content={card.description} />
        </div>

        {pills.length ? (
          <div className="flex flex-wrap gap-3">
            {pills.map((pill, index) => (
              <PillTag key={`${pill.id ?? pill.text}-${index}`} item={pill} />
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
};
