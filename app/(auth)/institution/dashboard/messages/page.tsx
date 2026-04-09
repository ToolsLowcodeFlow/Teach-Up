"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Search, MoreHorizontal, MapPin, BadgeCheck, Plus, Send, Image, Paperclip, X } from "lucide-react";
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

function getMockConversations(name: string): Conversation[] {
  return [
    { id: "1", name, preview: "Lorem Ipsum Dolor Lorem Ipsum...", time: "Today at 16:40", avatar: avatars[0] },
    { id: "2", name, preview: "Lorem Ipsum Dolor Lorem Ipsum...", time: "Today at 16:40", unread: true, avatar: avatars[1] },
    { id: "3", name, preview: "Lorem Ipsum Dolor Lorem Ipsum...", time: "Today at 16:40", avatar: avatars[2] },
    { id: "4", name, preview: "Lorem Ipsum Dolor Lorem Ipsum...", time: "Today at 16:40", avatar: avatars[0] },
    { id: "5", name, preview: "Lorem Ipsum Dolor Lorem Ipsum...", time: "Today at 4:40 PM", avatar: avatars[1] },
    { id: "6", name, preview: "Lorem Ipsum Dolor Lorem Ipsum...", time: "Today at 4:40 PM", avatar: avatars[2] },
    { id: "7", name, preview: "Lorem Ipsum Dolor Lorem Ipsum...", time: "Today at 4:40 PM", avatar: avatars[0] },
  ];
}

export default function MessagesPage() {
  const router = useRouter();
  const { locale, t } = useLanguage();
  const isHe = locale === "he";
  const cs = t.candidateSearch;
  const jc = t.jobCard;
  const [activeChat, setActiveChat] = useState<string>("1");
  const [chatMenuOpen, setChatMenuOpen] = useState(false);
  const [attachMenuOpen, setAttachMenuOpen] = useState(false);
  const [attachments, setAttachments] = useState<{ name: string; type: "photo" | "file"; preview?: string }[]>([]);
  const [msgText, setMsgText] = useState("");
  const [chatMessages, setChatMessages] = useState<{ text: string; sent: boolean; attachments?: { name: string; type: "photo" | "file"; preview?: string }[] }[]>([
    { text: t.messages.contactMessage, sent: false, attachments: [] },
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!msgText.trim() && attachments.length === 0) return;
    setChatMessages((prev) => [...prev, { text: msgText, sent: true, attachments: attachments.length > 0 ? [...attachments] : undefined }]);
    setMsgText("");
    setAttachments([]);
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };
  const photoRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setAttachments((prev) => [...prev, { name: file.name, type: "photo", preview: ev.target?.result as string }]);
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAttachments((prev) => [...prev, { name: file.name, type: "file" }]);
    e.target.value = "";
  };
  const mockConversations = getMockConversations(cs.candidateName);

  return (
    <div style={{ padding: "24px 40px 0" }} className="flex min-h-0 w-full flex-1 gap-5 bg-[#F7F9FC]">
      {/* Left block: Chat view */}
      <div className="order-2 flex h-[calc(100vh-128px)] flex-1 flex-col rounded-t-2xl bg-white">
        {/* Contact header */}
        <div style={{ padding: "16px 24px", margin: "16px 16px 0" }} className="flex items-center gap-4 rounded-xl border border-border-light bg-[#F7F9FC]">
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full">
            <img src="/images/avatar-3.jpg" alt={cs.candidateName} className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-1 flex-col">
            <span className="text-base font-medium text-foreground">{cs.candidateName}</span>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>{t.messages.yearsOfExperience}: 06 {cs.years}</span>
              <span>{t.messages.area}: {cs.telAvivIsrael}</span>
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
                    onClick={() => { setChatMenuOpen(false); alert(isHe ? "הודעה סומנה כלא נקראה" : "Message marked as unread"); }}
                  >
                    {t.messages.markAsUnread}
                  </button>
                  <button
                    className="flex w-full whitespace-nowrap py-1 text-start text-sm text-foreground transition-colors hover:text-primary"
                    onClick={() => { setChatMenuOpen(false); router.push("/institution/dashboard/candidate-profile"); }}
                  >
                    {t.messages.viewCandidateProfile}
                  </button>
                  <button
                    className="flex w-full whitespace-nowrap py-1 text-start text-sm text-danger transition-colors hover:text-danger/70"
                    onClick={() => { setChatMenuOpen(false); router.push("/institution/dashboard/messages"); }}
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
              {t.messages.contactMessage}
            </div>
          </div>

          {/* Job card embed */}
          <div className="flex justify-start">
            <div style={{ padding: 20 }} className="max-w-sm overflow-hidden rounded-2xl border border-border-light bg-white shadow-sm">
              {/* Job info */}
              <div className="flex items-center gap-1.5 text-base font-medium text-foreground">
                {jc.jobTitle}
                <BadgeCheck className="h-4 w-4 text-primary" />
              </div>
              <p style={{ marginBottom: 8 }} className="text-sm text-foreground">{jc.jobSubtitle}</p>
              <p style={{ marginBottom: 12 }} className="text-xs leading-relaxed text-muted-foreground">
                {jc.jobDescription}
              </p>

              {/* Location + Salary */}
              <div className="mb-2 flex items-center gap-1.5 text-xs text-foreground">
                <MapPin className="h-3 w-3 text-primary" />
                <span>{cs.jaffaTelAviv}</span>
              </div>
              <div style={{ marginBottom: 14 }} className="text-xs text-muted-foreground">
                {t.messages.salaryLabel} <span className="text-base font-medium text-foreground">30,000 - 50,000</span>
              </div>

              {/* Company footer */}
              <div style={{ padding: "10px 14px" }} className="flex items-center gap-3 rounded-xl bg-[#F7F9FC]">
                <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full">
                  <img src="/images/avatar-woman.jpg" alt="Company" className="h-full w-full object-cover" />
                </div>
                <span className="text-xs text-foreground">{t.messages.companyNameDate}</span>
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

          {/* Dynamic messages */}
          {chatMessages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sent ? "items-end justify-end gap-2" : "justify-start"}`}>
              <div className={`max-w-md rounded-2xl text-sm text-foreground ${msg.sent ? "rounded-ee-sm bg-primary-light" : "rounded-es-sm bg-border"}`} style={{ padding: "12px 16px" }}>
                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-2">
                    {msg.attachments.map((att, j) => (
                      att.type === "photo" && att.preview ? (
                        <img key={j} src={att.preview} alt={att.name} className="h-20 w-20 rounded-lg object-cover" />
                      ) : (
                        <div key={j} className="flex items-center gap-1 rounded-lg bg-white/60 px-2 py-1 text-xs text-primary">
                          <Paperclip size={10} /> {att.name}
                        </div>
                      )
                    ))}
                  </div>
                )}
                {msg.text && <span>{msg.text}</span>}
              </div>
              {msg.sent && (
                <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full">
                  <img src="/images/avatar-2.jpg" alt="" className="h-full w-full object-cover" />
                </div>
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Message input */}
        <div style={{ padding: "16px 24px" }} className="flex items-center gap-3 border-t border-border-light">
          <div className="relative">
            <button onClick={() => setAttachMenuOpen(!attachMenuOpen)} className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border-light transition-colors hover:bg-gray-50">
              <Plus className="h-5 w-5 text-foreground" />
            </button>
            {attachMenuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setAttachMenuOpen(false)} />
                <div className="absolute bottom-12 left-0 z-20 flex min-w-44 flex-col gap-1 rounded-xl border border-border-light bg-white shadow-lg" style={{ padding: "10px 14px" }}>
                  <button className="flex w-full items-center gap-2 whitespace-nowrap py-1.5 text-start text-sm text-foreground transition-colors hover:text-primary" onClick={() => { setAttachMenuOpen(false); photoRef.current?.click(); }}>
                    <Image size={16} className="text-primary" />
                    {isHe ? "העלאת תמונה" : "Upload a photo"}
                  </button>
                  <button className="flex w-full items-center gap-2 whitespace-nowrap py-1.5 text-start text-sm text-foreground transition-colors hover:text-primary" onClick={() => { setAttachMenuOpen(false); fileRef.current?.click(); }}>
                    <Paperclip size={16} className="text-primary" />
                    {isHe ? "העלאת קובץ" : "Upload a file"}
                  </button>
                </div>
              </>
            )}
            <input ref={photoRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.txt,.xls,.xlsx" onChange={handleFileUpload} className="hidden" />
          </div>
          {attachments.length > 0 && (
            <div className="flex items-center gap-2">
              {attachments.map((att, i) => (
                <div key={i} className="flex items-center gap-1.5 rounded-lg border border-border-light bg-[#F7F9FC]" style={{ padding: "4px 8px" }}>
                  {att.type === "photo" && att.preview ? (
                    <img src={att.preview} alt="" className="h-7 w-7 rounded object-cover" />
                  ) : (
                    <Paperclip size={12} className="text-primary" />
                  )}
                  <span className="max-w-[80px] truncate text-[10px] text-foreground">{att.name}</span>
                  <button onClick={() => setAttachments((prev) => prev.filter((_, idx) => idx !== i))} className="cursor-pointer border-none bg-transparent text-muted-foreground hover:text-foreground">
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <input
            type="text"
            placeholder={t.messages.typeMessage}
            value={msgText}
            onChange={(e) => setMsgText(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
            style={{ padding: "12px 16px" }}
            className="flex-1 rounded-full border border-border-light text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/30 focus:outline-none"
          />
          <button onClick={handleSend} className="flex shrink-0 cursor-pointer items-center justify-center border-none bg-transparent transition-colors hover:opacity-70">
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
