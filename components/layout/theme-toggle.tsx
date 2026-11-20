"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full w-9 h-9 opacity-70"
        aria-label="Toggle theme"
      >
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative rounded-full w-9 h-9 hover:bg-primary/10 transition-colors"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <Sun
        className={`h-4 w-4 text-amber-500 transition-all ${
          isDark ? "rotate-90 scale-0 absolute" : "rotate-0 scale-100"
        }`}
      />
      <Moon
        className={`h-4 w-4 text-sky-400 transition-all ${
          isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0 absolute"
        }`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
