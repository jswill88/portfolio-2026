export type PresetType =
  | "fade"
  | "slide"
  | "scale"
  | "blur"
  | "blur-slide"
  | "zoom"
  | "flip"
  | "bounce"
  | "rotate"
  | "swing";

const baseMotionProps = {
  initial: "hidden",
  animate: "visible",
  whileInView: "visible",
  exit: "hidden",
} as const;

export const animationPresets = {
  fade: {
    ...baseMotionProps,
    variants: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  },
  slide: {
    ...baseMotionProps,
    variants: {
      hidden: { y: 20 },
      visible: { y: 0 },
    },
  },
  scale: {
    ...baseMotionProps,
    variants: {
      hidden: { scale: 0.8 },
      visible: { scale: 1 },
    },
  },
  blur: {
    ...baseMotionProps,
    variants: {
      hidden: { filter: "blur(4px)" },
      visible: { filter: "blur(0px)" },
    },
  },
  "blur-slide": {
    ...baseMotionProps,
    variants: {
      hidden: { filter: "blur(4px)", y: 20 },
      visible: { filter: "blur(0px)", y: 0 },
    },
  },
  zoom: {
    ...baseMotionProps,
    variants: {
      hidden: { scale: 0.5 },
      visible: {
        scale: 1,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      },
    },
  },
  flip: {
    ...baseMotionProps,
    variants: {
      hidden: { rotateX: -90 },
      visible: {
        rotateX: 0,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      },
    },
  },
  bounce: {
    ...baseMotionProps,
    variants: {
      hidden: { y: -50 },
      visible: {
        y: 0,
        transition: { type: "spring", stiffness: 400, damping: 10 },
      },
    },
  },
  rotate: {
    ...baseMotionProps,
    variants: {
      hidden: { rotate: -180 },
      visible: {
        rotate: 0,
        transition: { type: "spring", stiffness: 200, damping: 15 },
      },
    },
  },
  swing: {
    ...baseMotionProps,
    variants: {
      hidden: { rotate: -10 },
      visible: {
        rotate: 0,
        transition: { type: "spring", stiffness: 300, damping: 8 },
      },
    },
  },
} as const;
