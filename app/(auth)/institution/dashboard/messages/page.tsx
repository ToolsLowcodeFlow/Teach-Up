"use client";

import { useState } from "react";
import { ChevronDown, Search, MoreHorizontal, MapPin, BadgeCheck, Plus, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/context";

interface Conversation {
  id: string;
  name: string;
  preview: string;
  time: string;
  unread?: boolean;
  avatar: string;
}

const avatars = ["/images/avatar-1.jpg", "/images/avatar-2.jpg", "/images/avatar-3.jpg"];

const mockConversations: Conversation[] = [
  { id: "1", name: "Yotam Israeli", preview: "Lorem Ipsum Dolor Lorem Ipsum...", time: "Today at 16:40", avatar: avatars[0] },
  { id: "2", name: "Yotam Israeli", preview: "Lorem Ipsum Dolor Lorem Ipsum...", time: "Today at 16:40", unread: true, avatar: avatars[1] },
  { id: "3", name: "Yotam Israeli", preview: "Lorem Ipsum Dolor Lorem Ipsum...", time: "Today at 16:40", avatar: avatars[2] },
  { id: "4", name: "Yotam Israeli", preview: "Lorem Ipsum Dolor Lorem Ipsum...", time: "Today at 16:40", avatar: avatars[0] },
  { id: "5", name: "Yotam Israeli", preview: "Lorem Ipsum Dolor Lorem Ipsum...", time: "Today at 4:40 PM", avatar: avatars[1] },
  { id: "6", name: "Yotam Israeli", preview: "Lorem Ipsum Dolor Lorem Ipsum...", time: "Today at 4:40 PM", avatar: avatars[2] },
  { id: "7", name: "Yotam Israeli", preview: "Lorem Ipsum Dolor Lorem Ipsum...", time: "Today at 4:40 PM", avatar: avatars[0] },
];

export default function MessagesPage() {
  const { t } = useLanguage();
  const [activeChat, setActiveChat] = useState<string>("1");
  const [chatMenuOpen, setChatMenuOpen] = useState(false);

  return (
    <div style={{ padding: "24px 40px 0" }} className="flex min-h-0 w-full flex-1 gap-5 bg-[#F7F9FC]">
      {/* Left block: Chat view */}
      <div className="order-2 flex h-[calc(100vh-128px)] flex-1 flex-col rounded-t-2xl bg-white">
        {/* Contact header */}
        <div style={{ padding: "16px 24px", margin: "16px 16px 0" }} className="flex items-center gap-4 rounded-xl border border-border-light bg-[#F7F9FC]">
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full">
            <img src="/images/avatar-3.jpg" alt="Yotam Israeli" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-1 flex-col">
            <span className="text-base font-medium text-foreground">Yotam Israeli</span>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>{t.messages.yearsOfExperience}: 06 {t.candidateSearch.years}</span>
              <span>{t.messages.area}: Tel Aviv, Israel</span>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setChatMenuOpen(!chatMenuOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/60"
            >
              <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
            </button>
            {chatMenuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setChatMenuOpen(false)} />
                <div
                  style={{ padding: "12px 16px" }}
                  className="absolute inset-e-0 top-9 z-20 flex min-w-48 flex-col gap-2 rounded-xl border border-border-light bg-white shadow-lg"
                >
                  <button
                    className="flex w-full whitespace-nowrap py-1 text-start text-sm text-foreground transition-colors hover:text-primary"
                    onClick={() => setChatMenuOpen(false)}
                  >
                    {t.messages.markAsUnread}
                  </button>
                  <button
                    className="flex w-full whitespace-nowrap py-1 text-start text-sm text-foreground transition-colors hover:text-primary"
                    onClick={() => setChatMenuOpen(false)}
                  >
                    {t.messages.viewCandidateProfile}
                  </button>
                  <button
                    className="flex w-full whitespace-nowrap py-1 text-start text-sm text-danger transition-colors hover:text-danger/70"
                    onClick={() => setChatMenuOpen(false)}
                  >
                    {t.messages.deletion}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Chat messages */}
        <div style={{ padding: "24px 24px" }} className="flex flex-1 flex-col gap-4 overflow-y-auto">
          {/* Sent message */}
          <div className="flex justify-start">
            <div style={{ padding: "12px 16px" }} className="max-w-md rounded-2xl rounded-es-sm bg-border text-sm text-foreground">
              Hi, I&apos;m contacting you regarding the job you posted. Is this relevant?
            </div>
          </div>

          {/* Job card embed */}
          <div className="flex justify-start">
            <div style={{ padding: 20 }} className="max-w-sm overflow-hidden rounded-2xl border border-border-light bg-white shadow-sm">
              {/* Job info */}
              <div className="flex items-center gap-1.5 text-base font-medium text-foreground">
                Computer Science Teacher
                <BadgeCheck className="h-4 w-4 text-primary" />
              </div>
              <p style={{ marginBottom: 8 }} className="text-sm text-foreground">with at least 4 years of experience</p>
              <p style={{ marginBottom: 12 }} className="text-xs leading-relaxed text-muted-foreground">
                This is a dummy paragraph about spacer experience and demonstrate how the actual text will look. It can be used...
              </p>

              {/* Location + Salary */}
              <div className="mb-2 flex items-center gap-1.5 text-xs text-foreground">
                <MapPin className="h-3 w-3 text-primary" />
                <span>Jaffa - Tel Aviv</span>
              </div>
              <div style={{ marginBottom: 14 }} className="text-xs text-muted-foreground">
                Salary &#8362; <span className="text-base font-medium text-foreground">30,000 - 50,000</span>
              </div>

              {/* Company footer */}
              <div style={{ padding: "10px 14px" }} className="flex items-center gap-3 rounded-xl bg-[#F7F9FC]">
                <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full">
                  <img src="/images/avatar-woman.jpg" alt="Company" className="h-full w-full object-cover" />
                </div>
                <span className="text-xs text-foreground">Company Name · 08/12/2025</span>
              </div>
            </div>
          </div>

          {/* Timestamp */}
          <p className="text-center text-xs text-muted-foreground">April 15, 2024, 3:00 PM</p>

          {/* Received message */}
          <div className="flex items-end justify-end gap-2">
            <div style={{ padding: "12px 16px" }} className="max-w-md rounded-2xl rounded-ee-sm bg-primary-light text-sm text-foreground">
              Blah blah
            </div>
            <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full">
              <img src="/images/avatar-2.jpg" alt="Yotam Israeli" className="h-full w-full object-cover" />
            </div>
          </div>

          {/* Sent message */}
          <div className="flex justify-start">
            <div style={{ padding: "12px 16px" }} className="max-w-md rounded-2xl rounded-es-sm bg-border text-sm text-foreground">
              Hi, I&apos;m contacting you regarding the job you posted. Is this relevant?
            </div>
          </div>
        </div>

        {/* Message input */}
        <div style={{ padding: "16px 24px" }} className="flex items-center gap-3 border-t border-border-light">
          <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-light transition-colors hover:bg-gray-50">
            <Plus className="h-5 w-5 text-foreground" />
          </button>
          <input
            type="text"
            placeholder={t.messages.typeMessage}
            style={{ padding: "12px 16px" }}
            className="flex-1 rounded-full border border-border-light text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/30 focus:outline-none"
          />
          <button className="flex shrink-0 items-center justify-center transition-colors hover:opacity-70">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ transform: "scaleX(-1)" }}><path d="M8 18c0-1.2.6-2.3 1.6-3l12-8c2-1.3 4.4.3 4.4 2.7v16.6c0 2.4-2.4 4-4.4 2.7l-12-8A3.5 3.5 0 0 1 8 18z" fill="#1667DB" /></svg>
          </button>
        </div>
      </div>

      {/* Right block: Message sidebar */}
      <div className="order-1 hidden h-[calc(100vh-128px)] w-72 shrink-0 flex-col rounded-t-2xl bg-white lg:flex">
        <div style={{ padding: "20px 16px" }} className="flex flex-col gap-3">
          <button
            style={{ padding: "12px 14px" }}
            className="flex w-full items-center justify-between rounded-xl border border-border-light bg-[#F7F9FC] text-sm text-foreground transition-colors hover:bg-gray-100"
          >
            <span>{t.messages.allMessages}</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>

          <div
            style={{ padding: "12px 14px" }}
            className="flex items-center gap-2 rounded-xl border border-border-light"
          >
            <Search className="h-4 w-4 text-muted-foreground/40" />
            <span className="flex-1 text-sm text-muted-foreground/40">
              {t.messages.searchMessages}
            </span>
          </div>
        </div>

        {/* Conversation list */}
        <div style={{ padding: "0 12px" }} className="flex-1 overflow-y-auto">
          {mockConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setActiveChat(conv.id)}
              style={{ padding: "8px 12px" }}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl text-start transition-colors",
                activeChat === conv.id
                  ? "my-1 bg-white shadow-md border border-border-light"
                  : "my-0.5 hover:bg-gray-50"
              )}
            >
              <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full">
                <img src={conv.avatar} alt={conv.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{conv.name}</span>
                  {conv.unread && <span className="h-2 w-2 rounded-full bg-danger" />}
                </div>
                <span className="text-xs text-muted-foreground">{conv.preview}</span>
                <span className="text-xs text-muted-foreground/60">{conv.time}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
