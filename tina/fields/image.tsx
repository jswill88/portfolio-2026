import { useEffect, useRef } from "react";
import { ImageField, TinaField } from "tinacms";

function CustomImageField(props: any) {
  const { form, input, field } = props;
  const prevValue = useRef<string>(input.value);

  useEffect(() => {
    if (input.value && input.value !== prevValue.current) {
      prevValue.current = input.value;
      getBlurPlaceholder(input.value)
        .then((blur) => {
          const name = field.name;
          const namespace = field.namespace;
          const prefix = name.replace(namespace.at(-1), "");
          form.change(`${prefix}blurDataURL`, blur);
        })
        .catch((err) => {
          console.error("Error generating blur placeholder:", err);
        });
    }
  }, [form, input.value, field.name, field.namespace]);

  return ImageField(props);
}

async function getBlurPlaceholder(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img: HTMLImageElement = new Image();
    img.onload = () => {
      const canvas: HTMLCanvasElement = document.createElement("canvas");
      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

      if (!ctx) {
        return reject(new Error("Could not get 2D context"));
      }

      // Calculate dimensions for a small thumbnail (max 20px)
      const maxDimension = 20;
      const ratio = img.width / img.height;
      canvas.width =
        img.width > img.height
          ? maxDimension
          : Math.round(maxDimension * ratio);
      canvas.height =
        img.height >= img.width
          ? maxDimension
          : Math.round(maxDimension / ratio);

      // Draw the loaded img object onto the canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Export as a low-quality JPEG string
      resolve(canvas.toDataURL("image/jpeg", 0.1));
    };
    img.onerror = (err) => reject(`Error loading image at ${filePath}: ${err}`);
    img.src = filePath;
  });
}

export const imageSchema = {
  type: "object",
  label: "Image",
  name: "image",
  fields: [
    {
      type: "image",
      label: "src",
      name: "src",
      required: true,
      ui: {
        component: CustomImageField,
      },
    },
    {
      name: "alt",
      label: "Alt Text",
      type: "string",
    },
    {
      name: "blurDataURL",
      type: "string",
      required: true,
      ui: {
        component: "hidden",
      },
    },
  ],
} satisfies TinaField;
