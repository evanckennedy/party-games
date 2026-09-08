"use client";

import { MantineProvider } from "@mantine/core";
import type { ReactNode } from "react";
import "@mantine/core/styles.css";

const theme = {
  primaryColor: "orange",
  defaultRadius: "md",
  fontFamily: "var(--font-body), sans-serif",
  headings: { fontFamily: "var(--font-display), sans-serif" },
  colors: {
    orange: [
      "#fff4e6",
      "#ffe8cc",
      "#ffd8a8",
      "#ffc078",
      "#ffa94d",
      "#ff922b",
      "#fd7e14",
      "#f76707",
      "#e8590c",
      "#d9480f",
    ],
  },
} as const;

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      {children}
    </MantineProvider>
  );
}
