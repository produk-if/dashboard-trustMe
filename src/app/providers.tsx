"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { LoadingProvider } from "@/components/loading-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark">
      <LoadingProvider>
        {children}
      </LoadingProvider>
    </NextThemesProvider>
  );
}
