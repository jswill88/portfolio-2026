import type { Collection, TinaField } from "tinacms";
import { iconSchema } from "../fields/icon";

const globalPillSchema: TinaField = {
  type: "object",
  label: "Pills",
  name: "pills",
  list: true,
  ui: {
    itemProps: (item: { id?: string; text?: string } | undefined) => ({
      label: item?.text || item?.id || "Pill",
    }),
    defaultItem: {
      id: "react",
      text: "React",
      icon: {
        name: "BiLogoReact",
        color: "foreground",
        style: "float",
      },
    },
  },
  fields: [
    {
      type: "string",
      label: "ID",
      name: "id",
      required: true,
      description: "Reusable key, for example react or typescript.",
    },
    {
      ...iconSchema,
      required: false,
    },
    {
      type: "string",
      label: "Text",
      name: "text",
      required: true,
    },
  ],
};

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
    globalPillSchema,
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
