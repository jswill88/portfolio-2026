"use client";

import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { PageBlocksSectionEntries } from "../../tina/__generated__/types";
import { Section } from "../layout/section";
import { entryBlockSchema, EntryContent } from "./entry";
import { getSectionId } from "@/lib/utils";
import { RichTextContent } from "../ui/rich-text-content";

export const SectionEntries = ({ data }: { data: PageBlocksSectionEntries }) => {
  const hasAnyThumbnails = !!data.entries?.some(
    (entry) => !!entry?.thumbnail?.src && !!entry?.thumbnail?.blurDataURL,
  );

  return (
    <Section
      id={getSectionId(data.sectionId, data.title)}
      title={data.title || undefined}
      data-tina-field={data.title ? tinaField(data, "title") : undefined}
    >
      <div className="space-y-10">
        {data.entries?.map((entry, index) =>
          entry ? (
            <div key={`${entry.heading}-${index}`} data-tina-field={tinaField(entry)}>
              <EntryContent data={entry} reserveThumbnailColumn={hasAnyThumbnails} />
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

export const sectionEntriesBlockSchema: Template = {
  name: "sectionEntries",
  label: "Section Entries",
  ui: {
    defaultItem: {
      title: "Experience",
      body: {
        type: "root",
        children: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Add any additional context, smaller projects, or supporting notes here.",
              },
            ],
          },
        ],
      },
      entries: [entryBlockSchema.ui?.defaultItem],
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
      list: true,
      name: "entries",
      label: "Entries",
      ui: {
        itemProps: (item) => ({
          label: item?.heading || "Entry",
        }),
      },
      fields: entryBlockSchema.fields,
    },
  ],
};
