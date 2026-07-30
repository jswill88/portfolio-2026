import React from "react";
import NextImage from "next/image";
import { cn } from "@/lib/utils";

type ImageProps = React.HTMLAttributes<HTMLDivElement> & {
  src: string;
  alt: string;
  blurDataURL: string;
  posterSrc?: string | null;
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
  posterSrc,
  sizes,
  isLcp = false,
  tinaField,
  aspectRatio = 1,
  className,
  style,
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
      style={{
        aspectRatio,
        backgroundImage: posterSrc ? `url("${posterSrc}")` : undefined,
        backgroundPosition: "center",
        backgroundSize: "cover",
        ...style,
      }}
      data-tina-field={tinaField}
      {...divProps}
      className={cn(
        "relative w-auto overflow-hidden shadow-lg rounded-lg",
        className,
      )}
    >
      <picture>
        {posterSrc ? (
          <source
            media="(prefers-reduced-motion: reduce)"
            srcSet={posterSrc}
          />
        ) : null}
        <NextImage
          className="absolute inset-0 object-cover transition-opacity duration-300"
          alt={alt ?? ""}
          src={src}
          preload={isLcp}
          loading={isLcp ? "eager" : "lazy"}
          fetchPriority={isLcp ? "high" : "low"}
          fill={true}
          placeholder={posterSrc ? "empty" : "blur"}
          blurDataURL={blurDataURL}
          sizes={sizesString}
        />
      </picture>
    </div>
  );
};
