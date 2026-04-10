import React from "react";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Roboto, Nanum_Gothic_Coding, Rock_Salt } from "next/font/google";
import { cn } from "@/lib/utils";

import "@/styles.css";

const fontSans = Roboto({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "700", "900"],
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
  adjustFontFallback: true,
});

const fontMono = Nanum_Gothic_Coding({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
  display: "swap",
  fallback: [
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Monaco",
    "Consolas",
    "monospace",
  ],
  adjustFontFallback: true,
});

const fontDisplay = Rock_Salt({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400"],
  display: "swap",
  fallback: ["Segoe Print", "Bradley Hand", "Comic Sans MS", "cursive"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Josh Williams",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(fontSans.variable, fontMono.variable, fontDisplay.variable)}
    >
      <body className="min-h-screen font-sans antialiased grid grid-rows-[auto_1fr_auto]">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
