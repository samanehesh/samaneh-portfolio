import type { MetadataRoute } from "next";
import { indexingEnabled, siteUrl } from "../lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: indexingEnabled ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    ...(indexingEnabled && siteUrl ? { sitemap: new URL("/sitemap.xml", siteUrl).href } : {})
  };
}
