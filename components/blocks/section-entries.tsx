"use client";

import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { PageBlocksSectionEntries } from "../../tina/__generated__/types";
import { Section } from "../layout/section";
import { entryBlockSchema, EntryContent } from "./entry";
import { toSectionId } from "@/lib/utils";

export const SectionEntries = ({ data }: { data: PageBlocksSectionEntries }) => {
  const hasAnyThumbnails = !!data.entries?.some(
    (entry) => !!entry?.thumbnail?.src && !!entry?.thumbnail?.blurDataURL,
  );

  return (
    <Section
      id={data.title ? toSectionId(data.title) : undefined}
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
    </Section>
  );
};

export const sectionEntriesBlockSchema: Template = {
  name: "sectionEntries",
  label: "Section Entries",
  ui: {
    defaultItem: {
      title: "Experience",
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
