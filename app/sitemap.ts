import type { MetadataRoute } from "next";
import { projects } from "../lib/projects";
import { projectPath, siteUrl } from "../lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  return [undefined, ...projects.filter(project => project.featured).map(project => project.id)]
    .flatMap(id => ["en", "fa"].map(locale => ({
      url: new URL(projectPath(locale, id), siteUrl).href,
      alternates: { languages: {
        en: new URL(projectPath("en", id), siteUrl).href,
        fa: new URL(projectPath("fa", id), siteUrl).href
      } }
    })));
}
