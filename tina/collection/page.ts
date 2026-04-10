import type { Collection } from "tinacms";
import { heroBlockSchema } from "@/components/blocks/hero";
import { contentBlockSchema } from "@/components/blocks/content";
import { aboutBlockSchema } from "@/components/blocks/about";
import { pillTagsBlockSchema } from "@/components/blocks/pill-tags";
import { entryBlockSchema } from "@/components/blocks/entry";
import { sectionEntriesBlockSchema } from "@/components/blocks/section-entries";
import { projectCardsSectionBlockSchema } from "@/components/blocks/project-cards-section";

const Page: Collection = {
  label: "Pages",
  name: "page",
  path: "content/pages",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      const filepath = document._sys.breadcrumbs.join("/");
      if (filepath === "home") {
        return "/";
      }
      return `/${filepath}`;
    },
  },
  fields: [
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Sections",
      ui: {
        visualSelector: true,
      },
      templates: [
        heroBlockSchema,
        contentBlockSchema,
        aboutBlockSchema,
        pillTagsBlockSchema,
        entryBlockSchema,
        sectionEntriesBlockSchema,
        projectCardsSectionBlockSchema,
      ],
    },
  ],
};

export default Page;
