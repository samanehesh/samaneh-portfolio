import { LanguageSwitcher } from "../../components/language-switcher";
import { indexingEnabled, siteUrl, projectPath } from "../../lib/site";
import { getPortfolioRoute } from "../../lib/portfolio-route";
import { ProjectDetails } from "../../components/project-details";
import { ProjectCard } from "../../components/project-card";
import { CopyEmail } from "../../components/copy-email";
import { SkillsCarousel } from "../../components/skills-carousel";
import { contact } from "../../lib/contact";
import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "../../i18n/routing";
import { projects } from "../../lib/projects";
import { Link } from "../../i18n/navigation";
import { ThemeToggle } from "../../components/theme-toggle";
import { SiteNavigation } from "../../components/site-navigation";

export const dynamicParams = false;
export function generateStaticParams() {
  return [
    { locale: [] },
    ...routing.locales.map((locale) => ({ locale: [locale] })),
    ...[[], ...routing.locales.map(locale => [locale])].flatMap(prefix =>
      projects.filter(project => project.featured).map(project => ({ locale: [...prefix, "projects", project.id] }))
    )
  ];
}
export async function generateMetadata({ params }: { params: Promise<{ locale?: string[] }> }): Promise<Metadata> {
  const { locale, project } = getPortfolioRoute((await params).locale);
  const t = await getTranslations({ locale });
  const title = project ? `${t(`projects.${project.id}.title`)} — ${t("metadataTitle")}` : t("metadataTitle");
  const description = project ? t(`projects.${project.id}.description`) : t("intro");
  const path = projectPath(locale, project?.id);
  return {
    title, description,
    metadataBase: siteUrl,
    applicationName: "Samaneh Heshmatzadeh Portfolio",
    authors: [{ name: "Samaneh Heshmatzadeh", url: contact.github }],
    robots: { index: indexingEnabled, follow: indexingEnabled },
    icons: { icon: [{ url: "/favicon.ico", sizes: "32x32" }, { url: "/favicon.svg", type: "image/svg+xml" }], apple: "/apple-touch-icon.png" },
    ...(siteUrl ? {
      alternates: { canonical: path, languages: { en: projectPath("en", project?.id), fa: projectPath("fa", project?.id), "x-default": projectPath("en", project?.id) } },
      openGraph: { type: "website", title, description, url: path, siteName: "Samaneh Heshmatzadeh", locale: locale === "fa" ? "fa_IR" : "en_CA", alternateLocale: locale === "fa" ? "en_CA" : "fa_IR", images: [{ url: "/social-preview.png", width: 1200, height: 630, alt: "Samaneh Heshmatzadeh — Full-stack developer" }] },
      twitter: { card: "summary_large_image", title, description, images: ["/social-preview.png"] }
    } : {})
  };
}

export default async function Home({ params }: { params: Promise<{ locale?: string[] }> }) {
  const { locale, project } = getPortfolioRoute((await params).locale);
  if (project) return <ProjectDetails project={project} locale={locale} />;
  const t = await getTranslations({ locale });
  const resumeAvailable = existsSync(join(process.cwd(), "public", "resume.pdf"));
  return <>
    <div id="top" aria-hidden="true" />
    <a className="skip" href="#main">{t("skip")}</a>
    <div className="aurora" aria-hidden="true" />
    <header className="header wrap">
      <Link className="brand" href="/"><span className="terminal" aria-hidden="true">&gt;_</span>{t("brand")}</Link>
      <SiteNavigation />
      <div className="tools"><LanguageSwitcher locale={locale} /><span className="tool-divider" /><ThemeToggle label={t("theme")} /></div>
    </header>
    <main id="main">
      <section className="hero wrap" aria-labelledby="intro-title">
        <div className="hero-copy"><p className="eyebrow"><span />{t("label")}</p><h1 id="intro-title">{t("heroTitle")}<br /><span>{t("heroEmphasis")}</span></h1><p className="intro">{t("intro")}</p><div className="hero-actions"><a className="button primary" href="#projects">{t("work")}<span aria-hidden="true">↗</span></a><span className="resume-action">{resumeAvailable ? <a className="button secondary" href="/resume.pdf" download="resume.pdf">{t("downloadResume")}<span aria-hidden="true">↓</span></a> : <><button className="button secondary" type="button" disabled aria-describedby="resume-status">{t("downloadResume")}<span aria-hidden="true">↓</span></button><small id="resume-status">{t("resumeUnavailable")}</small></>}</span><a className="text-link" href="#about">{t("about")}<span aria-hidden="true">↓</span></a></div></div>
      </section>
      <section className="about wrap" id="about" aria-labelledby="about-title">
        <div className="section-top">
          <p className="eyebrow">{t("nav.about")}</p>
          <h2 id="about-title">{t("aboutTitle")}</h2>
          <p className="about-bio">{t("aboutBio")}</p>
        </div>
        <details className="experience-details">
          <summary className="experience-toggle"><span className="experience-show">{t("showExperience")}</span><span className="experience-hide">{t("hideExperience")}</span><span className="experience-toggle-icon" aria-hidden="true">＋</span></summary>
        <ul className="experience-highlights">
          {(["sparkbridge", "pdf", "pellonia"] as const).map((id) => <li key={id}>
            <div className="experience-heading"><h4>{t(`experience.${id}.company`)}</h4><p>{t(`experience.${id}.role`)}</p></div>
            <p className="experience-description">{t(`experience.${id}.description`)}</p>
          </li>)}
        </ul>
        </details>
        <SkillsCarousel />
      </section>
      <section className="projects wrap" id="projects" aria-labelledby="work-title">
        <div className="section-top"><p className="eyebrow">{t("projectLabel")}</p><h2 id="work-title">{t("projectTitle")}</h2><p className="section-intro">{t("projectIntro")}</p></div>
        <div className="project-grid featured-grid">{projects.filter(p => p.featured).map((p,i) => <ProjectCard key={p.id} project={p} index={i} featured />)}</div>
      </section>
      <section className="contact wrap" id="contact"><p className="eyebrow">{t("contactLabel")}</p><h2>{t("contactTitle")}</h2><p>{t("contactIntro")}</p><div className="contact-links"><a className="button primary" href={contact.composeUrl} target="_blank" rel="noopener noreferrer">{t("emailMe")}<span aria-hidden="true">↗</span></a><a className="button secondary" href={contact.linkedin} target="_blank" rel="noopener noreferrer">{t("linkedin")}<span aria-hidden="true">↗</span></a><a className="button secondary" href={contact.github} target="_blank" rel="noopener noreferrer">GitHub<span aria-hidden="true">↗</span></a><CopyEmail email={contact.email} /></div><span className="contact-flower" aria-hidden="true">✳</span></section>
    </main>
    <footer className="footer wrap"><a className="brand" href="#top"><span className="terminal" aria-hidden="true">&gt;_</span>{t("brand")}</a><p>{t("footer")}</p><a className="text-link" href="#top">{t("backTop")}<span aria-hidden="true">↑</span></a></footer>
  </>;
}
