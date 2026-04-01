"use client";

import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Israel Israel", role: "Guide", date: "10/25/2025", text: "This is dummy paragraph text that is intended to fill space in a website design and demonstrate how the actual text will look. It can be used to test the overall look of the design before inserting real content." },
  { name: "Israel Israel", role: "is an employer", date: "10/25/2025", text: "This is dummy paragraph text that is intended to fill space in a website design and demonstrate how the actual text will look. It can be used to test the overall look of the design before inserting real content." },
  { name: "Israel Israel", role: "is an employer", date: "10/25/2025", text: "This is dummy paragraph text that is intended to fill space in a website design and demonstrate how the actual text will look. It can be used to test the overall look of the design before inserting real content." },
];

export function TestimonialsSection() {
  return (
    <section style={{ padding: "60px 40px" }} className="bg-white">
      {/* Header */}
      <div style={{ marginBottom: 40 }} className="flex flex-col items-center lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col items-start text-start">
          <h2 style={{ marginBottom: 16 }} className="text-4xl leading-tight text-foreground">
            Teach Up users share
            <br />
            their experience
          </h2>
          <p style={{ marginBottom: 20 }} className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Here you can read real opinions from users who have already tried the platform. Stories, experiences, and recommendations that will help you understand what it&apos;s like to use and get the most out of the tool.
          </p>
          {/* Navigation arrows */}
          <div className="flex items-center gap-3">
            <button className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-gray-50">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-gray-50">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Testimonial cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <div
            key={i}
            style={{ padding: "28px 24px" }}
            className="flex flex-col rounded-2xl bg-[#F7F9FC] shadow-md"
          >
            {/* Top: date + quote icon */}
            <div style={{ marginBottom: 18 }} className="flex items-start justify-between">
              <span className="text-xs text-muted-foreground">Published on: {t.date}</span>
              <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
                <path d="M0 22V13.2C0 10.87 0.467 8.8 1.4 6.99C2.38 5.13 3.73 3.64 5.46 2.52C7.19 1.35 9.1 0.63 11.2 0.35L12.04 3.22C10.22 3.64 8.63 4.48 7.28 5.74C5.97 7 5.18 8.47 4.9 10.15H11.2V22H0ZM15.96 22V13.2C15.96 10.87 16.43 8.8 17.36 6.99C18.34 5.13 19.69 3.64 21.42 2.52C23.15 1.35 25.06 0.63 27.16 0.35L28 3.22C26.18 3.64 24.59 4.48 23.24 5.74C21.93 7 21.14 8.47 20.86 10.15H27.16V22H15.96Z" fill="#4C96FF" opacity="0.6"/>
              </svg>
            </div>

            {/* Author */}
            <div style={{ marginBottom: 14 }} className="flex items-center gap-3">
              <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-white bg-muted-foreground/20 shadow-sm">
                <img src="/images/avatar-1.jpg" alt={t.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">{t.name}</span>
                <span className="text-xs text-muted-foreground">{t.role}</span>
              </div>
            </div>

            {/* Stars */}
            <div style={{ marginBottom: 16 }} className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-4 w-4 fill-warning text-warning" />
              ))}
            </div>

            {/* Review text */}
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
