"use client";
import { useTheme } from "./theme-provider";
export function ThemeToggle({ label }: { label: string }) {
  const { dark, toggle } = useTheme();
  return <button className="theme-toggle" type="button" onClick={toggle} aria-label={label} aria-pressed={dark}><span aria-hidden="true">☀</span><span aria-hidden="true">☾</span><i /></button>;
}
