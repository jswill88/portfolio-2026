import type { Collection } from "tinacms";
import { heroBlockSchema } from "@/components/blocks/hero";
import { contentBlockSchema } from "@/components/blocks/content";
import { testimonialBlockSchema } from "@/components/blocks/testimonial";
import { videoBlockSchema } from "@/components/blocks/video";
import { calloutBlockSchema } from "@/components/blocks/callout";
import { statsBlockSchema } from "@/components/blocks/stats";
import { ctaBlockSchema } from "@/components/blocks/call-to-action";
import { aboutBlockSchema } from "@/components/blocks/about";
import { pillTagsBlockSchema } from "@/components/blocks/pill-tags";
import { entryBlockSchema } from "@/components/blocks/entry";
import { sectionEntriesBlockSchema } from "@/components/blocks/section-entries";

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
        calloutBlockSchema,
        statsBlockSchema,
        ctaBlockSchema,
        contentBlockSchema,
        testimonialBlockSchema,
        videoBlockSchema,
        aboutBlockSchema,
        pillTagsBlockSchema,
        entryBlockSchema,
        sectionEntriesBlockSchema,
      ],
    },
  ],
};

export default Page;
