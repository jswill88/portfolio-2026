import React from "react";
import NextImage from "next/image";
import { cn } from "@/lib/utils";

type ImageProps = React.HTMLAttributes<HTMLDivElement> & {
  src: string;
  alt: string;
  blurDataURL: string;
  sizes: Size[];
  aspectRatio?: number;
  isLcp?: boolean;
  tinaField?: string;
};

/**
 * @prop width - The width of the image in pixels or as a string with units (e.g., "100px", "50%").
 */
type Size = {
  maxWidth?: `${number}em`;
  width: string | number;
};

export const Image = ({
  src,
  alt,
  blurDataURL,
  sizes,
  isLcp = false,
  tinaField,
  aspectRatio = 1,
  className,
  ...divProps
}: ImageProps) => {
  const sizesString = sizes
    .map(({ maxWidth, width }) => {
      if (typeof width === "number") {
        width = `${width}px`;
      }

      if (maxWidth === undefined) {
        return width;
      }

      return `(max-width: ${maxWidth}) ${width}`;
    })
    .join(", ");

  return (
    <div
      style={{ aspectRatio }}
      data-tina-field={tinaField}
      {...divProps}
      className={cn(
        "relative w-auto overflow-hidden shadow-lg rounded-lg",
        className,
      )}
    >
      <NextImage
        className="absolute inset-0 object-cover transition-opacity duration-300"
        alt={alt ?? ""}
        src={src}
        preload={isLcp}
        loading={isLcp ? "eager" : "lazy"}
        fetchPriority={isLcp ? "high" : "low"}
        fill={true}
        placeholder="blur"
        blurDataURL={blurDataURL}
        sizes={sizesString}
      />
    </div>
  );
};
