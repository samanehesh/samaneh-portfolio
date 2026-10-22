const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://samanehesh.vercel.app";
export const siteUrl = configuredUrl ? new URL(configuredUrl) : undefined;
if (siteUrl && !["https:", "http:"].includes(siteUrl.protocol)) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTP or HTTPS URL.");
}
export const indexingEnabled = process.env.NODE_ENV === "production"
  && (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production")
  && process.env.ENABLE_INDEXING !== "false";

export function projectPath(locale: string, id?: string) {
  return `${locale === "fa" ? "/fa" : ""}${id ? `/projects/${id}` : ""}/`;
}
