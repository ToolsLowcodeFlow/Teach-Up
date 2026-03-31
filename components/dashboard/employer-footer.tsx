"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";

export function EmployerFooter() {
  const { t } = useLanguage();

  const footerSections = [
    {
      title: t.footer.links,
      items: [
        { label: t.footer.allTeachers, href: "/teachers" },
        { label: t.footer.forum, href: "/forum" },
        { label: t.footer.blog, href: "/blog" },
        { label: t.footer.myJobs, href: "/institution/dashboard" },
        { label: t.footer.joiningTeachUp, href: "/join" },
        { label: t.footer.allGuides, href: "/guides" },
      ],
    },
    {
      title: t.footer.professions,
      items: [
        { label: t.footer.development, href: "/professions/development" },
        { label: t.footer.design, href: "/professions/design" },
        { label: t.footer.informationSciences, href: "/professions/information-sciences" },
        { label: t.footer.marketing, href: "/professions/marketing" },
        { label: t.footer.productManagement, href: "/professions/product-management" },
      ],
    },
    {
      title: t.footer.more,
      items: [
        { label: t.footer.about, href: "/about" },
        { label: t.footer.contactUs, href: "/contact" },
        { label: t.footer.faq, href: "/faq" },
      ],
    },
  ];

  return (
    <footer className="mt-auto overflow-hidden bg-linear-to-b from-white to-[#EEF3FD]">
      <div style={{ padding: "50px 40px 24px" }}>
        {/* Main footer content */}
        <div className="flex flex-wrap items-start gap-10">
          {/* Logo + description - left side */}
          <div className="flex w-full min-w-0 flex-col gap-6 lg:w-auto lg:max-w-sm">
            <div className="flex items-center gap-3 text-4xl leading-tight lg:text-5xl">
              <span className="text-foreground">TEACH</span>
              <span className="text-[#2C7AEA]">UP</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground lg:text-base">
              {t.footer.description}
            </p>
          </div>

          {/* Link columns - right side */}
          <div className="flex min-w-0 flex-1 flex-wrap justify-end gap-10 lg:gap-16">
            {footerSections.map((section) => (
              <div key={section.title} className="flex flex-col gap-4">
                <h4 className="text-sm font-medium text-foreground">{section.title}</h4>
                <div className="flex flex-col gap-2.5">
                  {section.items.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="whitespace-nowrap text-sm text-foreground transition-colors hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 h-px w-full bg-border" />

        {/* Social icons */}
        <div style={{ marginTop: 16 }} className="flex items-center justify-end gap-3">
          <Link href="#" aria-label="YouTube" className="flex h-5 w-5 items-center justify-center text-primary-dark transition-colors hover:text-foreground">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="currentColor"/>
            </svg>
          </Link>
          <Link href="#" aria-label="Instagram" className="flex h-5 w-5 items-center justify-center text-primary-dark transition-colors hover:text-foreground">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" fill="currentColor"/>
            </svg>
          </Link>
          <Link href="#" aria-label="TikTok" className="flex h-5 w-5 items-center justify-center text-primary-dark transition-colors hover:text-foreground">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.89 2.89 2.89 0 0 1 2.88-2.89c.28 0 .56.04.82.12V9a6.33 6.33 0 0 0-.82-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.04a8.16 8.16 0 0 0 4.76 1.51v-3.4a4.85 4.85 0 0 1-1-.46z" fill="currentColor"/>
            </svg>
          </Link>
          <Link href="#" aria-label="Facebook" className="flex h-5 w-5 items-center justify-center text-primary-dark transition-colors hover:text-foreground">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="currentColor"/>
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
