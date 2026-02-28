import type { Collection } from "tinacms";
import { iconSchema } from "../fields/icon";

const Global: Collection = {
  label: "Global",
  name: "global",
  path: "content/global",
  format: "json",
  ui: {
    global: true,
  },
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
      required: true,
    },
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "object",
      label: "Header",
      name: "header",
      fields: [
        iconSchema,
        {
          type: "object",
          label: "Nav Links",
          name: "nav",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.label };
            },
            defaultItem: {
              href: "home",
              label: "Home",
            },
          },
          fields: [
            {
              type: "string",
              label: "Link",
              name: "href",
              required: true,
            },
            {
              type: "string",
              label: "Label",
              name: "label",
            },
          ],
        },
      ],
    },
    {
      type: "object",
      label: "Footer",
      name: "footer",
      fields: [
        {
          type: "object",
          label: "Social Links",
          name: "social",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.icon?.name || "undefined" };
            },
          },
          fields: [
            {
              ...iconSchema,
              required: true,
            },
            {
              type: "string",
              label: "Url",
              name: "url",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};

export default Global;
