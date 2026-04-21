"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Search, Plus, MoreHorizontal, MapPin, BadgeCheck, Image, Paperclip, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { SeekerNavbar } from "@/components/seeker/seeker-navbar";

const conversations = [
  { id: "1", name: "Yotam Israeli", preview: "Lorem Ipsum Dolor Lorem Ipsum...", time: "Today at 16:40", unread: false, active: false },
  { id: "2", name: "Yotam Israeli", preview: "Lorem Ipsum Dolor Lorem Ipsum...", time: "Today at 16:40", unread: true, active: false },
  { id: "3", name: "Yotam Israeli", preview: "Lorem Ipsum Dolor Lorem Ipsum...", time: "Today at 16:40", unread: false, active: false },
  { id: "4", name: "Yotam Israeli", preview: "Lorem Ipsum Dolor Lorem Ipsum...", time: "Today at 16:40", unread: false, active: true },
  { id: "5", name: "Yotam Israeli", preview: "Lorem Ipsum Dolor Lorem Ipsum...", time: "Today at 16:40", unread: false, active: false },
  { id: "6", name: "Yotam Israeli", preview: "Lorem Ipsum Dolor Lorem Ipsum...", time: "Today at 16:40", unread: false, active: false },
  { id: "7", name: "Yotam Israeli", preview: "Lorem Ipsum Dolor Lorem Ipsum...", time: "Today at 16:40", unread: false, active: false },
];

export default function MessageDetailPage() {
  const router = useRouter();
  const { locale, direction, t } = useLanguage();
  const [message, setMessage] = useState("");
  const [activeChat, setActiveChat] = useState("4");
  const [chatMenuOpen, setChatMenuOpen] = useState(false);
  const [attachMenuOpen, setAttachMenuOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ text: string; sent: boolean; attachments?: { name: string; type: "photo" | "file"; preview?: string }[] }[]>([
    { text: "Hi, I'm contacting you regarding the job you posted. Is this relevant?", sent: true, attachments: [] },
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!message.trim() && attachments.length === 0) return;
    setChatMessages((prev) => [...prev, { text: message, sent: true, attachments: attachments.length > 0 ? [...attachments] : undefined }]);
    setMessage("");
    setAttachments([]);
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };
  const [attachments, setAttachments] = useState<{ name: string; type: "photo" | "file"; preview?: string }[]>([]);
  const photoRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const isHe = locale === "he";

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

  const removeAttachment = (index: number) => setAttachments((prev) => prev.filter((_, i) => i !== index));

  useEffect(() => {
    const el = document.querySelector(".lang-switcher-global") as HTMLElement;
    if (el) el.style.display = "none";
    return () => { if (el) el.style.display = ""; };
  }, []);

  return (
    <div className="flex h-screen flex-col bg-[#F7F9FC]" style={{ fontFamily: "'Heebo', sans-serif" }}>
      <SeekerNavbar />

      {/* Content */}
      <div className="flex w-full flex-1 gap-5 overflow-hidden" style={{ padding: "20px 40px" }} dir={direction}>
        {/* Left — Conversations sidebar */}
        <div className="flex shrink-0 flex-col rounded-t-2xl bg-white" style={{ width: 280 }}>
          <div className="flex flex-col gap-3" style={{ padding: "20px 16px" }}>
            <button className="flex w-full items-center justify-between rounded-xl border border-border-light bg-[#F7F9FC] text-sm text-foreground" style={{ padding: "12px 14px" }}>
              <span>{t.messages.allMessages}</span>
              <ChevronDown size={16} className="text-muted-foreground" />
            </button>
            <div className="flex items-center gap-2 rounded-xl border border-border-light" style={{ padding: "12px 14px" }}>
              <Search size={16} className="text-muted-foreground/40" />
              <input type="text" placeholder="{t.messages.searchMessages}" className="flex-1 border-none bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/40" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto" style={{ padding: "0 12px" }}>
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => { setActiveChat(conv.id); router.push(`/messages/${conv.id}`); }}
                className="flex w-full items-center gap-3 rounded-xl text-start transition-colors"
                style={{
                  padding: "8px 12px",
                  margin: activeChat === conv.id ? "4px 0" : "2px 0",
                  background: activeChat === conv.id ? "white" : "transparent",
                  boxShadow: activeChat === conv.id ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                  border: activeChat === conv.id ? "1px solid #F3F3F6" : "1px solid transparent",
                }}
              >
                <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full">
                  <img src="/images/job-avatar.png" alt="" className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-foreground">{conv.name}</span>
                    {conv.unread && <span className="h-2 w-2 rounded-full bg-red-400" />}
                  </div>
                  <span className="text-xs text-muted-foreground">{conv.preview}</span>
                  <span className="text-[10px] text-muted-foreground/60">{conv.time}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right — Chat area */}
        <div className="flex flex-1 flex-col rounded-t-2xl bg-white">
          {/* Contact header */}
          <div className="flex items-center justify-between rounded-xl border border-border-light bg-[#F7F9FC]" style={{ padding: "16px 24px", margin: "16px 16px 0" }}>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#0E1117]" style={{ padding: 10 }}>
                <img src="/images/chat-company-logo.png" alt="Logo" className="h-full w-full object-contain" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-foreground">Computer Science Teacher for a Recognized College</span>
                <div className="flex items-center gap-8 text-[10px] text-muted-foreground">
                  <span>Scope of work</span>
                  <span>area</span>
                  <span>Salary range ₪</span>
                </div>
                <div className="flex items-center gap-8 text-xs text-foreground">
                  <span>Full-time</span>
                  <span>Tel Aviv, Israel</span>
                  <span>10,000 - 20,000</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <button onClick={() => setChatMenuOpen(!chatMenuOpen)} className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none bg-transparent transition-colors hover:bg-white/60">
                <MoreHorizontal size={20} className="text-muted-foreground" />
              </button>
              {chatMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setChatMenuOpen(false)} />
                  <div className="absolute right-0 top-9 z-20 flex min-w-48 flex-col gap-2 rounded-xl border border-border-light bg-white shadow-lg" style={{ padding: "12px 16px" }}>
                    <button className="flex w-full whitespace-nowrap py-1.5 text-start text-sm text-foreground transition-colors hover:text-primary" onClick={() => { setChatMenuOpen(false); alert(isHe ? "הודעה סומנה כלא נקראה" : "Message marked as unread"); }}>{t.messages.markAsUnread}</button>
                    <button className="flex w-full whitespace-nowrap py-1.5 text-start text-sm text-foreground transition-colors hover:text-primary" onClick={() => { setChatMenuOpen(false); router.push("/jobs/1"); }}>{isHe ? "צפייה במשרה" : "Viewing a job"}</button>
                    <button className="flex w-full whitespace-nowrap py-1.5 text-start text-sm text-red-400 transition-colors hover:text-red-600" onClick={() => { setChatMenuOpen(false); router.push("/messages"); }}>{isHe ? "מחיקה" : "Deletion"}</button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Chat messages */}
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto" style={{ padding: "24px 24px" }}>
            {/* Job card embed */}
            <div className="flex justify-start">
              <div className="overflow-hidden rounded-xl border border-border-light bg-white shadow-sm" style={{ padding: 14, maxWidth: 260 }}>
                <div className="flex items-center gap-1 text-sm text-foreground">
                  Computer Science Teacher
                  <BadgeCheck size={14} className="text-primary" />
                </div>
                <p className="text-xs text-foreground" style={{ marginBottom: 6 }}>with at least 4 years of experience</p>
                <p className="text-[10px] leading-[1.4] text-muted-foreground" style={{ marginBottom: 8 }}>
                  This is a dummy paragraph about spacer experience and demonstrate how the actual text will look. It can be used...
                </p>
                <div className="mb-1 flex items-center gap-1 text-[10px] text-foreground">
                  <MapPin size={10} className="text-primary" />
                  <span>Jaffa - Tel Aviv</span>
                </div>
                <div className="text-[10px] text-muted-foreground" style={{ marginBottom: 10 }}>
                  Salary ₪ <span className="text-sm text-foreground">30,000 - 50,000</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-[#F7F9FC]" style={{ padding: "6px 10px" }}>
                  <div className="h-6 w-6 shrink-0 overflow-hidden rounded-full">
                    <img src="/images/job-avatar.png" alt="" className="h-full w-full object-cover" />
                  </div>
                  <span className="text-[10px] text-foreground">Company Name · 08/12/2025</span>
                </div>
              </div>
            </div>

            {/* Timestamp */}
            <p className="text-center text-xs text-muted-foreground">April 15, 2024, 3:00 PM</p>

            {/* Received message */}
            <div className="flex items-end justify-end gap-2">
              <div className="max-w-md rounded-2xl rounded-ee-sm bg-primary-light text-sm text-foreground" style={{ padding: "12px 16px" }}>
                Blah blah
              </div>
              <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full">
                <img src="/images/job-avatar.png" alt="" className="h-full w-full object-cover" />
              </div>
            </div>

            {/* Dynamic messages */}
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sent ? "justify-start" : "items-end justify-end gap-2"}`}>
                <div className={`max-w-md rounded-2xl text-sm text-foreground ${msg.sent ? "rounded-es-sm bg-border-light" : "rounded-ee-sm bg-primary-light"}`} style={{ padding: "12px 16px" }}>
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
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Message input */}
          <div className="flex items-center gap-3 border-t border-border-light" style={{ padding: "16px 24px" }}>
            <div className="relative">
              <button onClick={() => setAttachMenuOpen(!attachMenuOpen)} className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border-light bg-white transition-colors hover:bg-gray-50">
                <Plus size={20} className="text-foreground" />
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
                    <button onClick={() => removeAttachment(i)} className="cursor-pointer border-none bg-transparent text-muted-foreground hover:text-foreground">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <input
              type="text"
              placeholder={t.messages.typeMessage}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
              className="flex-1 rounded-full border border-border-light text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/30 focus:outline-none"
              style={{ padding: "12px 16px" }}
            />
            <button onClick={handleSend} className="flex shrink-0 cursor-pointer items-center justify-center border-none bg-transparent transition-colors hover:opacity-70">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><path d="M28 18c0-1.2-.6-2.3-1.6-3l-12-8c-2-1.3-4.4.3-4.4 2.7v16.6c0 2.4 2.4 4 4.4 2.7l12-8A3.5 3.5 0 0 0 28 18z" fill="#1667DB" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
