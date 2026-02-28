import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  `
    relative
    inline-block
    rounded-md
    text-md
    font-normal
    shrink-0
    outline-none
    focus-visible:border-ring
    focus-visible:ring-primary/50
    focus-visible:ring-[2px]
    aria-invalid:ring-red-500/20
    aria-invalid:border-red-500
    [&_svg]:shrink-0
    [&_svg]:pointer-events-none
    [&_svg:not([class*='size-'])]:size-4
    group
  `,
  {
    variants: {
      variant: {
        default: "bg-orange-400 text-black shadow-md",
        destructive:
          "bg-red-500 text-white focus-visible:ring-red-500/20 dark:focus-visible:ring-red-500/40",
        outline: "text-teal-800 bg-gray-100 border-2 border-teal-800 shadow-md",
        secondary: "bg-teal-400 text-black shadow-md",
        ghost: "",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const sizeVariants = cva(
  "relative inline-flex justify-center items-end gap-1 whitespace-nowrap rounded-[inherit]",
  {
    variants: {
      size: {
        default: "px-4 py-2 has-[>svg]:px-3",
        sm: "gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "py-3 px-6 has-[>svg]:px-4 text-lg",
      },
      defaultVariants: { size: "default" },
    },
  },
);

const hoverVariants = cva(
  "relative scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-out origin-left motion-reduce:duration-0",
  {
    variants: {
      variant: {
        default: "bg-gray-100",
        destructive: "bg-destructive/90",
        outline: "bg-teal-100",
        secondary: "bg-teal-200",
        ghost: "bg-accent",
        link: "none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Button({
  className,
  variant,
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> &
  VariantProps<typeof sizeVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <div className={cn(buttonVariants({ variant, className }))}>
      <div className="absolute inset-0 grid rounded-md overflow-hidden pointer-events-none">
        <div className={cn(hoverVariants({ variant }))} />
        <div
          className={cn(hoverVariants({ variant }), "motion-safe:delay-75")}
        />
        <div
          className={cn(hoverVariants({ variant }), "motion-safe:delay-150")}
        />
        <div
          className={cn(hoverVariants({ variant }), "motion-safe:delay-225")}
        />
      </div>
      <Comp
        data-slot="button"
        className={cn(sizeVariants({ size }))}
        {...props}
      />
    </div>
  );
}

export { Button, buttonVariants };
