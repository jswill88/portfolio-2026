 "use client";

import React, { ReactNode } from "react";
import { motion } from "motion/react";
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
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="motion-reduce:transform-none motion-reduce:transition-none"
    >
      <section
        className={cn("mx-auto mb-10 max-w-6xl scroll-mt-24 px-5 md:mb-16 md:scroll-mt-28", className)}
        {...props}
      >
        {title ? (
          <div className="mb-4 md:mb-6" data-tina-field={dataTinaField}>
            <h2 className="text-4xl font-mono text-orange-500 dark:text-orange-400 md:text-6xl">{title}</h2>
          </div>
        ) : null}
        {children}
      </section>
    </motion.div>
  );
};
