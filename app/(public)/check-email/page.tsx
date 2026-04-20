"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/lib/i18n/context";
import { AuthLayout } from "@/components/auth/auth-layout";

function CheckEmailContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleResend = async () => {
    if (!email) return;
    setStatus("sending");
    setErrorMsg(null);
    const supabase = createClient();
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: { emailRedirectTo: `${window.location.origin}/api/auth/callback` },
    });
    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
      return;
    }
    setStatus("sent");
  };

  return (
    <AuthLayout>
      <div
        className="flex w-[587px] max-w-full items-center justify-center rounded-[20px] bg-white"
        style={{ padding: 10, minHeight: 500 }}
      >
        <div className="flex w-[499px] max-w-full flex-col items-center gap-[32px]">
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: 80,
              height: 80,
              background: "linear-gradient(140deg, #4C96FF 12%, #1667DB 94%)",
            }}
          >
            <Mail size={40} color="#FFFFFF" />
          </div>

          <div
            className="flex w-full flex-col items-center gap-[10px] text-center"
            style={{ fontFamily: "'Abel', sans-serif", lineHeight: "normal" }}
          >
            <p className="text-[32px] text-[#0E1117] tracking-[-0.64px]">
              {t.checkEmail.title}
            </p>
            <p className="text-[18px] text-[#647787] tracking-[-0.36px]">
              {t.checkEmail.subtitle}
            </p>
            {email && (
              <p
                className="text-[16px] text-[#0E1117]"
                style={{ fontFamily: "'Assistant', sans-serif", fontWeight: 500, marginTop: 8 }}
              >
                {email}
              </p>
            )}
          </div>

          <p
            className="w-full text-center"
            style={{ fontFamily: "'Abel', sans-serif", fontSize: 14, color: "#647787", lineHeight: 1.4 }}
          >
            {t.checkEmail.instructions}
          </p>

          <div className="flex w-full flex-col gap-[12px] items-center">
            <button
              type="button"
              onClick={handleResend}
              disabled={status === "sending" || !email}
              className="w-full h-[50px] rounded-[10px] flex items-center justify-center cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              style={{
                backgroundImage:
                  "linear-gradient(175.27deg, rgb(76, 150, 255) 12.19%, rgb(22, 103, 219) 93.76%)",
                border: "none",
                fontFamily: "'Abel', sans-serif",
                fontSize: 16,
                color: "#FFFFFF",
              }}
            >
              {status === "sending"
                ? t.checkEmail.resending
                : status === "sent"
                ? t.checkEmail.resent
                : t.checkEmail.resend}
            </button>

            {status === "error" && errorMsg && (
              <p style={{ fontFamily: "'Abel', sans-serif", fontSize: 13, color: "#EF4444" }}>
                {errorMsg}
              </p>
            )}

            <Link
              href="/login"
              className="underline"
              style={{
                fontFamily: "'Abel', sans-serif",
                fontSize: 16,
                color: "#4C96FF",
                lineHeight: 1.1,
              }}
            >
              {t.checkEmail.backToLogin}
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default function CheckEmailPage() {
  return (
    <Suspense fallback={null}>
      <CheckEmailContent />
    </Suspense>
  );
}
