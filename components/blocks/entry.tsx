"use client";

import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { PageBlocksEntry, PageBlocksSectionEntriesEntries } from "../../tina/__generated__/types";
import { TinaField } from "tinacms";
import { imageSchema } from "@/tina/fields/image";
import { Image } from "@/components/ui/image";
import { Section } from "../layout/section";
import { RichTextContent } from "../ui/rich-text-content";

export const Entry = ({ data }: { data: PageBlocksEntry }) => {
  return (
    <Section>
      <EntryContent data={data} reserveThumbnailColumn={true} />
    </Section>
  );
};

export const EntryContent = ({
  data,
  reserveThumbnailColumn,
}: {
  data: PageBlocksEntry | PageBlocksSectionEntriesEntries;
  reserveThumbnailColumn: boolean;
}) => {
  const hasThumbnail = !!data.thumbnail?.src && !!data.thumbnail?.blurDataURL;
  const thumbnail = hasThumbnail ? data.thumbnail! : null;

  return (
    <div
      className={
        reserveThumbnailColumn
          ? "grid items-start gap-5 md:grid-cols-[112px_1fr] md:gap-8"
          : "space-y-3 text-center md:text-left"
      }
    >
      {thumbnail ? (
        <Image
          tinaField={tinaField(data, "thumbnail")}
          alt={thumbnail.alt ?? ""}
          src={thumbnail.src!}
          blurDataURL={thumbnail.blurDataURL!}
          sizes={[{ maxWidth: "48em", width: 96 }, { width: 112 }]}
          className="mx-auto aspect-square w-24 rounded-2xl border shadow-none md:mx-0 md:w-28"
        />
      ) : reserveThumbnailColumn ? (
        <div aria-hidden className="hidden md:block" />
      ) : null}

      <div className="space-y-3 text-center md:text-left">
        <div className="space-y-1">
          <h2
            className="text-2xl font-semibold tracking-tight"
            data-tina-field={tinaField(data, "heading")}
          >
            {data.heading}
          </h2>
          {data.subheading ? (
            <p
              className="text-sm font-mono uppercase tracking-[0.18em] text-muted-foreground dark:text-gray-300"
              data-tina-field={tinaField(data, "subheading")}
            >
              {data.subheading}
            </p>
          ) : null}
        </div>

        <div data-tina-field={tinaField(data, "body")}>
          <RichTextContent
            content={data.body}
            className="max-w-[72ch] text-base leading-relaxed [&>p+p]:mt-4 [&>h1]:mt-8 [&>h1]:text-3xl [&>h2]:mt-7 [&>h2]:text-2xl [&>h3]:mt-6 [&>h3]:text-xl"
          />
        </div>
      </div>
    </div>
  );
};

const optionalImageSchema = {
  ...imageSchema,
  name: "thumbnail",
  label: "Thumbnail",
  fields: imageSchema.fields.map((field) => {
    if (field.name === "src" || field.name === "blurDataURL") {
      return {
        ...field,
        required: false,
      };
    }

    return field;
  }),
} satisfies TinaField;

export const entryBlockSchema: Template = {
  name: "entry",
  label: "Entry",
  ui: {
    defaultItem: {
      heading: "Software Engineer",
      subheading: "Company or School • Dates",
      thumbnail: {
        src: "/uploads/IMG_7513.jpg",
        alt: "Entry image",
        blurDataURL:
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAPAA8DASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAECBf/EAB8QAAICAgIDAQAAAAAAAAAAAAECAxEEEiExQVEiMv/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFhEBAQEAAAAAAAAAAAAAAAAAABEh/9oADAMBAAIRAxEAPwC7G1l1dck1iQ2lZ8R2cK9jvTnK5rYk2pJYx1mQWQpKjI9wOR7V2N0l2mM7Gm2hLQm4KQf/Z",
      },
      body: {
        type: "root",
        children: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Describe your role, accomplishments, or studies here.",
              },
            ],
          },
        ],
      },
    },
  },
  fields: [
    optionalImageSchema as any,
    {
      type: "string",
      label: "Heading",
      name: "heading",
      required: true,
    },
    {
      type: "string",
      label: "Subheading",
      name: "subheading",
      required: false,
    },
    {
      type: "rich-text",
      label: "Body",
      name: "body",
    },
  ],
};
