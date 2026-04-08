import React, { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface SectionProps extends Omit<React.ComponentPropsWithoutRef<"section">, "title"> {
  children: ReactNode;
  title?: ReactNode;
  "data-tina-field"?: string;
}

export const Section: React.FC<SectionProps> = ({
  className,
  children,
  title,
  "data-tina-field": dataTinaField,
  ...props
}) => {
  return (
    <div>
      <section className={cn("mx-auto mb-10 max-w-7xl px-5 md:mb-16", className)} {...props}>
        {title ? (
          <div className="mb-4 md:mb-5" data-tina-field={dataTinaField}>
            <h2 className="text-5xl font-mono text-orange-500 dark:text-orange-400 md:text-7xl">{title}</h2>
          </div>
        ) : null}
        {children}
      </section>
    </div>
  );
};
