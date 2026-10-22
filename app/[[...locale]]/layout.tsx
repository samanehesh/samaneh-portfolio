import "../globals.css";
import { ThemeProvider } from "../../components/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { resolveLocale } from "../../i18n/locale";
export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale?: string[] }> }) {
  const locale = resolveLocale((await params).locale);
  return (
    <html lang={locale} dir={locale === "fa" ? "rtl" : "ltr"} suppressHydrationWarning>
      <body><ThemeProvider><NextIntlClientProvider>{children}</NextIntlClientProvider></ThemeProvider></body>
    </html>
  );
}
