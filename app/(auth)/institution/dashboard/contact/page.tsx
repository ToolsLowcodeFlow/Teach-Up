"use client";

import { MessageCircle, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export default function ContactUsPage() {
  const { t } = useLanguage();

  return (
    <div style={{ padding: "40px 40px 64px" }} className="w-full">
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
        {/* Left: Info */}
        <div className="flex flex-col items-start gap-6 lg:max-w-md">
          <h1 className="text-4xl font-medium text-foreground">
            {t.contactUs.title}
          </h1>
          <p className="text-lg leading-relaxed text-foreground">
            {t.contactUs.subtitle}
          </p>
          <p className="text-sm text-muted-foreground">
            {t.contactUs.feelFree}
          </p>

          {/* Contact methods */}
          <div className="flex flex-wrap items-center gap-4">
            <div style={{ padding: "10px 16px" }} className="flex items-center gap-2 rounded-full border border-border-light bg-white text-sm text-foreground">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success">
                <MessageCircle className="h-3.5 w-3.5 text-white" />
              </div>
              <span>052-7040414</span>
            </div>
            <div style={{ padding: "10px 16px" }} className="flex items-center gap-2 rounded-full border border-border-light bg-white text-sm text-foreground">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                <Mail className="h-3.5 w-3.5 text-white" />
              </div>
              <span>loramipsum@gmail.com</span>
            </div>
            <div style={{ padding: "10px 16px" }} className="flex items-center gap-2 rounded-full border border-border-light bg-white text-sm text-foreground">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                <Phone className="h-3.5 w-3.5 text-white" />
              </div>
              <span>02 - 6793021</span>
            </div>
          </div>
        </div>

        {/* Right: Contact form */}
        <div className="flex-1">
          <div style={{ padding: 28 }} className="flex flex-col gap-5 rounded-2xl border border-border-light bg-white shadow-sm">
            {/* Full name */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-foreground">{t.contactUs.fullName}</label>
              <input
                type="text"
                placeholder={t.createJob.typePlaceholder}
                style={{ padding: "14px 16px" }}
                className="w-full rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/30 focus:bg-white focus:outline-none"
              />
            </div>

            {/* Mobile number */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-foreground">{t.contactUs.mobileNumber}</label>
              <input
                type="text"
                placeholder={t.createJob.typePlaceholder}
                style={{ padding: "14px 16px" }}
                className="w-full rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/30 focus:bg-white focus:outline-none"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-foreground">{t.contactUs.email}</label>
              <input
                type="email"
                placeholder={t.createJob.typePlaceholder}
                style={{ padding: "14px 16px" }}
                className="w-full rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/30 focus:bg-white focus:outline-none"
              />
            </div>

            {/* Email (message) */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-foreground">{t.contactUs.email}</label>
              <textarea
                placeholder={t.contactUs.message}
                rows={5}
                style={{ padding: "14px 16px" }}
                className="w-full resize-none rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/30 focus:bg-white focus:outline-none"
              />
            </div>

            {/* Send button */}
            <div className="flex justify-end">
              <button
                style={{ padding: "9px 40px" }}
                className="rounded-lg bg-primary text-sm text-white transition-colors hover:bg-primary-dark"
              >
                {t.contactUs.sending}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
