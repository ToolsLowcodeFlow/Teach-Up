"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { PublicNavbar } from "@/components/home/public-navbar";
import { EasyWaySection } from "@/components/home/easy-way-section";
import { PublicFooter } from "@/components/home/public-footer";

const stats = [
  { number: "257,000", label: "Jobs filled this month" },
  { number: "257,000", label: "Jobs filled this month" },
  { number: "257,000", label: "Total jobs on the site" },
  { number: "257,000", label: "Lorem Ipsum Dolor Lorem" },
];

const faqs = [
  { question: "Does using TeachUP cost money?", answer: "Lorem Ipsum Dolor Sit Emmet, Consectetur Adipiscing Elite Goler Monferrer Sobert Lorem Shabdach Yehol, Lakoris Art Sale Litz, And Shebaget Lore Salgak." },
  { question: "Does using TeachUP cost money?", answer: "Lorem Ipsum Dolor Sit Emmet, Consectetur Adipiscing Elite Goler Monferrer Sobert Lorem." },
  { question: "Does using TeachUP cost money?", answer: "Lorem Ipsum Dolor Sit Emmet, Consectetur Adipiscing Elite Goler Monferrer Sobert Lorem." },
  { question: "Does using TeachUP cost money?", answer: "Lorem Ipsum Dolor Sit Emmet, Consectetur Adipiscing Elite Goler Monferrer Sobert Lorem." },
  { question: "Does using TeachUP cost money?", answer: "Lorem Ipsum Dolor Sit Emmet, Consectetur Adipiscing Elite Goler Monferrer Sobert Lorem." },
];

function FaqItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="border-b border-border-light">
      <button
        onClick={() => setOpen(!open)}
        style={{ padding: "18px 0" }}
        className="flex w-full items-center justify-between text-start"
      >
        <span className="text-sm text-foreground">{faq.question}</span>
        {open ? (
          <X className="h-4 w-4 shrink-0 text-muted-foreground" />
        ) : (
          <Plus className="h-4 w-4 shrink-0 text-muted-foreground" />
        )}
      </button>
      {open && (
        <p style={{ paddingBottom: 18 }} className="text-sm leading-relaxed text-muted-foreground">
          {faq.answer}
        </p>
      )}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <PublicNavbar />

      {/* Hero */}
      <section className="relative min-h-[600px] overflow-hidden bg-linear-to-b from-[#D6E4FF] via-primary-light to-[#F7F9FC]">
        {/* Grid boxes - left side */}
        <div className="pointer-events-none absolute left-[-200px] top-[100px]" style={{ opacity: 0.3 }}>
          <div className="flex flex-col">
            {[0, 1, 2].map((row) => (
              <div key={row} className="flex" style={{ marginBottom: -2 }}>
                {[0, 1, 2, 3].map((col) => (
                  <div key={col} style={{ width: 200, height: 200, border: "2px solid white", marginRight: -2 }} />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Grid boxes - right side (partial) */}
        <div className="pointer-events-none absolute right-[-200px] top-[100px]" style={{ opacity: 0.3 }}>
          <div className="flex flex-col">
            {[0, 1, 2].map((row) => (
              <div key={row} className="flex" style={{ marginBottom: -2 }}>
                {[0, 1, 2, 3].map((col) => (
                  <div key={col} style={{ width: 200, height: 200, border: "2px solid white", marginRight: -2 }} />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "110px 40px 60px" }} className="relative flex flex-col gap-10 lg:flex-row lg:items-start">
          {/* Left: Handshake image */}
          <div className="flex items-start justify-center lg:w-[40%]">
            <div className="h-72 w-full max-w-sm overflow-hidden rounded-3xl lg:h-96">
              <img src="/images/about-handshake.png" alt="Handshake" className="h-full w-full object-cover" />
            </div>
          </div>

          {/* Right: Text */}
          <div className="flex flex-1 flex-col items-start">
            <span style={{ marginBottom: 8 }} className="text-xl text-primary">about</span>
            <h1 style={{ marginBottom: 32 }} className="text-4xl leading-none text-foreground lg:text-6xl">
              Nice to meet you!
            </h1>
            <p style={{ marginBottom: 24 }} className="text-sm leading-relaxed text-muted-foreground">
              Lorem Ipsum Dolor Sit Amet, Consector Adipiscing Elite Golar Monferrer Sobert Lorem Shabdach Yehol, Lorem Ipsum Dolor Sit Amet, Consector Adipiscing Elite Golar Monferrer Sobert Lorem Shabdach Yehol, Lorem Ipsum Dolor Sit Amet, Consector Adipiscing Elite Golar Monferrer Sobert Lorem Shabdach Yehol, Lorem Ipsum Dolor Sit Amet, Consector Adipiscing Elite Golar Monferrer Sobert Lorem Shabdach Yehol, Lorem Shabdach Yehol, Lorem Ipsum Dolor Sit Aemmm.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Lorem Ipsum Dolor Sit Emmet, Consecteur Adipiscing Elite Goler Monferrer Sobert Lorem Shabdach Yehol, Lorem Ipsum Dolor Sit Emmet, Consecteur Adipiscing Elite Goler Monferrer Sobert Lorem Shabdach Yehol, Lorem Ipsum Dolor Sit Emmet, Consecteur Adipiscing Elite Goler Monferrer Sobert Lorem Shabdach Yehol,
            </p>
          </div>
        </div>
      </section>

      {/* Easy way + Feature cards (reused from homepage) */}
      <EasyWaySection />

      {/* Stats */}
      <section style={{ padding: "60px 40px" }} className="flex flex-col items-center bg-white">
        <h2 style={{ marginBottom: 16 }} className="text-center text-3xl leading-tight text-foreground">
          Lorem Ipsum Dolores
        </h2>
        <p style={{ marginBottom: 40 }} className="max-w-lg text-center text-sm leading-relaxed text-muted-foreground">
          Lorem Ipsum Dolor Sit Emmet, Consectetur Adipiscing Elite Goler Monferrer Sobert Lorem Shabdach Yehol, Lakoris Art Sale Litz, And Shebaget Lore Salgak.
        </p>
        <div className="grid w-full max-w-4xl grid-cols-2 gap-5 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{ padding: "28px 16px" }}
              className="flex flex-col items-center rounded-2xl bg-primary text-center text-white"
            >
              <span className="text-3xl font-medium">{stat.number}</span>
              <span className="mt-2 text-xs opacity-80">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "60px 40px" }} className="flex flex-col items-center bg-[#F7F9FC]">
        <h2 style={{ marginBottom: 32 }} className="text-center text-3xl leading-tight text-foreground">
          Frequently Asked Questions
        </h2>
        <div className="w-full max-w-2xl">
          {faqs.map((faq, i) => (
            <FaqItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
