"use client";

import { createContext, useContext, useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Theme = "light" | "dark";
const ThemeContext = createContext<{ dark: boolean; toggle: () => void } | null>(null);
let selectedTheme: Theme | undefined;

function readTheme(): Theme {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {}
  return selectedTheme ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<Theme>("light");

  useLayoutEffect(() => {
    const sync = () => {
      const next = readTheme();
      selectedTheme = next;
      document.documentElement.dataset.theme = next;
      setTheme(next);
    };
    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, [pathname]);

  function toggle() {
    const next = (selectedTheme ?? theme) === "dark" ? "light" : "dark";
    selectedTheme = next;
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try { localStorage.setItem("theme", next); } catch {}
  }

  return <ThemeContext.Provider value={{ dark: theme === "dark", toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const theme = useContext(ThemeContext);
  if (!theme) throw new Error("Theme controls must be inside ThemeProvider.");
  return theme;
}
