"use client";
import * as BoxIcons from "react-icons/bi";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import React from "react";

export const IconOptions = {
  Logo: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 258 268"
      role="img"
      aria-labelledby="logo-title"
      {...props}
    >
      <title id="logo-title">Josh Williams Logo</title>
      <g>
        <path
          d="M 72.00 265.00 C56.64,263.45 48.60,261.86 41.18,258.91 C31.75,255.16 21.19,248.87 15.00,243.31 C9.90,238.72 4.00,228.53 4.00,224.31 C4.00,220.12 6.61,215.31 9.14,214.82 C14.25,213.85 17.79,215.85 23.38,222.85 C29.29,230.25 36.51,234.82 48.90,238.97 C58.28,242.12 91.48,244.50 105.82,243.06 C111.61,242.48 119.76,242.00 123.92,241.99 C137.59,241.97 158.27,236.04 181.72,225.41 C193.14,220.24 196.82,216.70 212.65,195.68 C216.08,191.13 222.34,175.90 223.42,169.50 C223.79,167.30 225.29,161.00 226.75,155.50 C229.24,146.15 229.41,144.06 229.46,123.50 C229.48,111.40 228.88,89.57 228.13,75.00 C226.41,41.79 227.03,25.46 230.23,19.73 C233.59,13.72 236.99,11.62 243.43,11.55 C247.44,11.51 249.58,12.05 251.67,13.61 C256.30,17.06 256.88,21.32 254.68,35.85 C253.11,46.27 252.82,53.07 253.02,74.50 C253.69,144.79 253.64,146.40 250.59,159.00 C249.06,165.32 247.16,173.20 246.37,176.50 C241.60,196.56 230.81,214.33 212.31,232.59 C204.47,240.33 197.41,244.33 177.50,252.33 C150.92,263.02 141.66,264.73 107.00,265.37 C92.43,265.64 76.68,265.48 72.00,265.00 ZM 69.36 214.01 C61.88,210.99 62.52,198.03 70.21,196.65 C75.61,195.68 85.02,195.09 114.71,193.87 C148.33,192.49 148.00,192.41 148.00,201.50 C148.00,209.65 148.21,209.57 116.50,213.92 C107.14,215.20 72.48,215.27 69.36,214.01 ZM 43.65 160.55 C41.56,158.62 41.00,157.17 41.00,153.72 C41.00,148.75 43.09,146.19 49.19,143.67 C53.30,141.98 73.01,131.26 74.37,129.98 C75.93,128.51 67.76,126.89 54.82,126.10 C40.66,125.23 37.61,124.05 36.50,118.99 C35.67,115.22 37.73,111.71 42.10,109.45 C51.87,104.40 84.91,108.51 93.67,115.87 C97.12,118.76 99.99,124.21 100.00,127.85 C100.01,135.83 94.32,141.89 77.31,152.02 C58.90,162.98 48.99,165.50 43.65,160.55 ZM 134.23 161.33 C133.53,161.05 132.27,159.48 131.42,157.85 C127.89,151.03 133.11,145.05 151.17,135.22 L 162.30 129.16 L 158.40 128.12 C156.25,127.55 149.53,125.92 143.46,124.51 C137.38,123.09 130.98,121.06 129.23,120.00 C123.33,116.41 123.99,109.16 130.45,106.46 C133.52,105.17 135.18,105.23 145.70,107.00 C178.79,112.55 188.98,117.45 189.00,127.82 C189.00,134.22 187.94,135.31 169.90,147.53 C152.24,159.49 140.72,163.94 134.23,161.33 ZM 44.04 71.74 C38.49,68.96 36.86,67.46 32.54,61.18 C29.77,57.16 23.94,48.83 19.58,42.68 C5.76,23.17 1.99,16.68 1.36,11.35 C0.61,4.95 3.38,1.00 8.62,1.00 C14.58,1.00 22.10,9.34 44.47,40.75 C47.71,45.29 50.69,49.00 51.10,49.00 C51.52,49.00 53.12,47.50 54.68,45.66 C66.06,32.19 88.85,8.83 92.47,6.90 C96.38,4.83 97.01,4.76 100.12,6.05 C101.98,6.81 107.10,10.84 111.50,15.00 C115.90,19.15 122.65,25.20 126.50,28.44 C130.35,31.69 136.80,37.53 140.84,41.42 C147.52,47.85 148.29,48.33 149.34,46.68 C164.57,22.66 175.59,7.18 179.19,4.76 C186.45,-0.11 195.00,2.02 195.00,8.71 C195.00,11.86 190.52,21.54 183.74,33.03 C175.13,47.64 168.35,56.83 160.36,64.75 C153.51,71.53 152.76,72.00 148.66,72.00 C145.18,72.00 143.29,71.25 139.39,68.33 C132.16,62.90 122.64,54.63 112.50,44.94 C107.55,40.21 102.27,35.54 100.76,34.56 C97.15,32.21 93.75,33.13 90.82,37.25 C86.69,43.05 57.93,72.47 55.18,73.70 C51.43,75.39 51.25,75.36 44.04,71.74 Z"
          fill="currentColor"
        />
      </g>
    </svg>
  ),
  ...BoxIcons,
  FaFacebookF,
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
  AiFillInstagram,
};

const iconColorClass: {
  [name: string]: { regular: string; circle: string };
} = {
  blue: {
    regular: "text-blue-400",
    circle: "bg-blue-400 dark:bg-blue-500 text-blue-50",
  },
  teal: {
    regular: "text-teal-400",
    circle: "bg-teal-400 dark:bg-teal-500 text-teal-50",
  },
  green: {
    regular: "text-green-400",
    circle: "bg-green-400 dark:bg-green-500 text-green-50",
  },
  red: {
    regular: "text-red-400",
    circle: "bg-red-400 dark:bg-red-500 text-red-50",
  },
  pink: {
    regular: "text-pink-400",
    circle: "bg-pink-400 dark:bg-pink-500 text-pink-50",
  },
  purple: {
    regular: "text-purple-400",
    circle: "bg-purple-400 dark:bg-purple-500 text-purple-50",
  },
  orange: {
    regular: "text-orange-400",
    circle: "bg-orange-400 dark:bg-orange-500 text-orange-50",
  },
  yellow: {
    regular: "text-yellow-400",
    circle: "bg-yellow-400 dark:bg-yellow-500 text-yellow-50",
  },
  white: {
    regular: "text-white opacity-80",
    circle: "bg-white-400 dark:bg-white-500 text-white-50",
  },
  foreground: {
    regular: "text-color-foreground",
    circle: "bg-color-foreground text-color-background",
  },
};

const iconSizeClass = {
  xs: "w-6 h-6 shrink-0",
  small: "w-8 h-8 shrink-0",
  medium: "w-12 h-12 shrink-0",
  large: "w-14 h-14 shrink-0",
  xl: "w-16 h-16 shrink-0",
  custom: "",
};

export const Icon = ({
  //@ts-ignore
  data,
  className = "",
  tinaField = "",
}) => {
  //@ts-ignore
  if (IconOptions[data.name] === null || IconOptions[data.name] === undefined) {
    return null;
  }

  const { name, color, size = "medium", style = "regular" } = data;

  //@ts-ignore
  const IconSVG = IconOptions[name];

  const iconSizeClasses =
  typeof size === "string"
      //@ts-ignore
      ? iconSizeClass[size]
      //@ts-ignore
      : iconSizeClass[Object.keys(iconSizeClass)[size]];

  const iconColor = color in iconColorClass ? color : "foreground";

  if (style == "circle") {
    return (
      <div
        {...(tinaField ? { "data-tina-field": tinaField } : {})} // only render data-tina-field if it exists
        className={`relative z-10 inline-flex items-center justify-center shrink-0 ${iconSizeClasses} rounded-full ${iconColorClass[iconColor].circle} ${className}`}
      >
        <IconSVG className="w-2/3 h-2/3" />
      </div>
    );
  } else {
    return (
      <IconSVG
        {...(tinaField ? { "data-tina-field": tinaField } : {})} // only render data-tina-field if it exists
        className={`${iconSizeClasses} ${iconColorClass[iconColor].regular} ${className}`}
      />
    );
  }
};
