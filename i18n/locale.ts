import { getPortfolioRoute } from "../lib/portfolio-route";

export function resolveLocale(segments: string[] | undefined) {
  return getPortfolioRoute(segments).locale;
}
