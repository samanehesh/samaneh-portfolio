import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../i18n/routing";
import { projects } from "./projects";

export function getPortfolioRoute(segments: string[] = []) {
  const parts = [...segments];
  const locale = hasLocale(routing.locales, parts[0]) ? parts.shift()! : routing.defaultLocale;
  if (!parts.length) return { locale, project: null };
  if (parts.length !== 2 || parts[0] !== "projects") notFound();
  const project = projects.find((item) => item.featured && item.id === parts[1]);
  if (!project) notFound();
  return { locale, project };
}
