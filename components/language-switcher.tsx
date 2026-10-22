import NextLink from "next/link";
import { getPathname } from "../i18n/navigation";

export function LanguageSwitcher({ locale, href = "/" }: { locale: string; href?: string }) {
  return <nav className="language-switcher" aria-label={locale === "fa" ? "انتخاب زبان" : "Select language"}>
    {([ ["en", "EN"], ["fa", "فارسی"] ] as const).map(([language, label]) =>
      <NextLink key={language} href={getPathname({ locale: language, href })}
        lang={language} hrefLang={language} aria-current={locale === language ? "page" : undefined}
        className={locale === language ? "language-option is-selected" : "language-option"}>
        {label}
      </NextLink>
    )}
  </nav>;
}
