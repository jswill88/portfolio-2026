"use client";

import type { Template, TinaField } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import type { PageBlocksProjectCardsSection } from "../../tina/__generated__/types";
import globalContent from "@/content/global/index.json";
import { imageSchema } from "@/tina/fields/image";
import { Section } from "../layout/section";
import { getSectionId } from "@/lib/utils";
import { RichTextContent } from "../ui/rich-text-content";
import { ProjectCard } from "./project-card";

const pillOptions = (globalContent.pills ?? [])
  .filter((pill): pill is NonNullable<(typeof globalContent.pills)[number]> =>
    Boolean(pill?.id && pill?.text),
  )
  .map((pill) => ({
    label: pill.text,
    value: pill.id,
  }));

const getPillLabel = (pillId?: string | null) =>
  globalContent.pills?.find((pill) => pill?.id === pillId)?.text ??
  pillId ??
  "Pill";

type GlobalPill = NonNullable<(typeof globalContent.pills)[number]>;

const makeImageSchema = (name: string, label: string) =>
  ({
    ...imageSchema,
    name,
    label,
  }) satisfies TinaField;

const primaryImageSchema = makeImageSchema("primaryImage", "Primary Image");
const secondaryImageSchema = makeImageSchema(
  "secondaryImage",
  "Secondary Image",
);

const defaultCardDescription = {
  type: "root",
  children: [
    {
      type: "p",
      children: [
        {
          type: "text",
          text: "Describe the project, your role, and what makes it worth highlighting.",
        },
      ],
    },
  ],
};

const defaultCard = {
  title: "Project Title",
  primaryImage: {
    src: "/uploads/IMG_7513.jpg",
    alt: "Primary project image",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAPAA8DASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAECBf/EAB8QAAICAgIDAQAAAAAAAAAAAAECAxEEEiExQVEiMv/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFhEBAQEAAAAAAAAAAAAAAAAAABEh/9oADAMBAAIRAxEAPwC7G1l1dck1iQ2lZ8R2cK9jvTnK5rYk2pJYx1mQWQpKjI9wOR7V2N0l2mM7Gm2hLQm4KQf/Z",
  },
  secondaryImage: {
    src: "/uploads/IMG_7513.jpg",
    alt: "Secondary project image",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAPAA8DASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAECBf/EAB8QAAICAgIDAQAAAAAAAAAAAAECAxEEEiExQVEiMv/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFhEBAQEAAAAAAAAAAAAAAAAAABEh/9oADAMBAAIRAxEAPwC7G1l1dck1iQ2lZ8R2cK9jvTnK5rYk2pJYx1mQWQpKjI9wOR7V2N0l2mM7Gm2hLQm4KQf/Z",
  },
  links: [
    {
      label: "Live Site",
      url: "https://example.com",
    },
    {
      label: "GitHub",
      url: "https://github.com",
    },
  ],
  description: defaultCardDescription,
  pills: [{ pillId: "typescript" }, { pillId: "react" }, { pillId: "next-js" }],
};

export const ProjectCardsSection = ({
  data,
}: {
  data: PageBlocksProjectCardsSection;
}) => {
  const globalPills = (globalContent.pills ?? []).filter(
    (pill): pill is GlobalPill => Boolean(pill?.id && pill?.text),
  );

  return (
    <Section
      id={getSectionId(data.sectionId, data.title)}
      title={data.title || undefined}
      data-tina-field={data.title ? tinaField(data, "title") : undefined}
    >
      <div className="grid gap-8">
        {data.cards?.map((card, index) =>
          card ? (
            <div
              key={`${card.title}-${index}`}
              data-tina-field={tinaField(card)}
            >
              <ProjectCard card={card} globalPills={globalPills} />
            </div>
          ) : null,
        )}
      </div>
      {data.body ? (
        <div className="mt-10" data-tina-field={tinaField(data, "body")}>
          <RichTextContent content={data.body} />
        </div>
      ) : null}
    </Section>
  );
};

export const projectCardsSectionBlockSchema: Template = {
  name: "projectCardsSection",
  label: "Project Cards Section",
  ui: {
    defaultItem: {
      title: "Selected Work",
      body: {
        type: "root",
        children: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Use this space to introduce the projects in this section before the cards begin.",
              },
            ],
          },
        ],
      },
      cards: [defaultCard],
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
      type: "rich-text",
      label: "Body",
      name: "body",
    },
    {
      type: "object",
      name: "cards",
      label: "Cards",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.title || "Project Card",
        }),
        defaultItem: defaultCard,
      },
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
          required: true,
        },
        primaryImageSchema as any,
        secondaryImageSchema as any,
        {
          type: "object",
          name: "links",
          label: "Links",
          list: true,
          ui: {
            itemProps: (item) => ({
              label: item?.label || item?.url || "Link",
            }),
            defaultItem: defaultCard.links[0],
          },
          fields: [
            {
              type: "string",
              label: "Label",
              name: "label",
              required: true,
            },
            {
              type: "string",
              label: "URL",
              name: "url",
              required: true,
            },
          ],
        },
        {
          type: "rich-text",
          label: "Description",
          name: "description",
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
              pillId: pillOptions[0]?.value ?? "",
            },
          },
          fields: [
            {
              type: "string",
              label: "Pill",
              name: "pillId",
              required: true,
              options: pillOptions,
            },
          ],
        },
      ],
    },
  ],
};
