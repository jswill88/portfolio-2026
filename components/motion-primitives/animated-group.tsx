"use client";
import { motion, Variants } from "motion/react";
import React from "react";
import { animationPresets, type PresetType } from "@/lib/constants/animations";

export type AnimatedGroupProps = React.HTMLAttributes<HTMLElement> & {
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  preset?: PresetType;
  as?: keyof JSX.IntrinsicElements;
  asChild?: keyof JSX.IntrinsicElements;
};

const defaultContainerVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const addDefaultVariants = (variants: Variants) => ({
  hidden: { ...defaultItemVariants.hidden, ...variants.hidden },
  visible: { ...defaultItemVariants.visible, ...variants.visible },
});

function AnimatedGroup({
  children,
  className,
  variants,
  preset,
  as = "div",
  asChild = "div",
  ...rest
}: AnimatedGroupProps) {
  const presetItemVariants = preset ? animationPresets[preset].variants : {};
  const selectedItemVariants = addDefaultVariants(presetItemVariants);
  const itemVariants = variants?.item || selectedItemVariants;
  const containerVariants =
    variants?.container || addDefaultVariants(defaultContainerVariants);

  const MotionComponent = React.useMemo(() => motion.create(as), [as]);
  const MotionChild = React.useMemo(() => motion.create(asChild), [asChild]);

  return (
    <MotionComponent
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
      className={className}
      {...(rest as Record<string, any>)}
    >
      {React.Children.map(children, (child, index) => (
        <MotionChild key={index} variants={itemVariants}>
          {child}
        </MotionChild>
      ))}
    </MotionComponent>
  );
}

export { AnimatedGroup };
