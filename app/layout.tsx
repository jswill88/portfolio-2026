import React from "react";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Roboto, Nanum_Gothic_Coding, Rock_Salt } from "next/font/google";
import { cn } from "@/lib/utils";
import { VideoDialogProvider } from "@/components/ui/VideoDialogContext";
import VideoDialog from "@/components/ui/VideoDialog";

import "@/styles.css";
import { TailwindIndicator } from "@/components/ui/breakpoint-indicator";

const fontSans = Roboto({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "700", "900"],
});

const fontMono = Nanum_Gothic_Coding({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
});

const fontDisplay = Rock_Salt({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Tina",
  description: "Tina Cloud Starter",
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
          <VideoDialogProvider>
            {children}
            <VideoDialog />
          </VideoDialogProvider>
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
