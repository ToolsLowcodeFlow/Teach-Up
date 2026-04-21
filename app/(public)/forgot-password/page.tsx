"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/lib/validations/auth";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/lib/i18n/context";
import { AuthLayout } from "@/components/auth/auth-layout";

export default function ForgotPasswordPage() {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        data.email,
        { redirectTo: `${window.location.origin}/reset-password` }
      );

      if (resetError) {
        setError(resetError.message);
        return;
      }

      setSent(true);
    } catch {
      setError(t.login.genericError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div
        className="flex w-[587px] max-w-full items-center justify-center rounded-[20px] bg-white"
        style={{ padding: 10, minHeight: 500 }}
      >
        <div className="flex w-[499px] max-w-full flex-col items-center gap-[40px]">
          {/* Title */}
          <div
            className="flex w-[418px] max-w-full flex-col items-center gap-[6px] text-center"
            style={{ fontFamily: "'Heebo', sans-serif", lineHeight: "normal" }}
          >
            <p className="min-w-full text-[32px] tracking-[-0.64px] text-[#0E1117]">
              {t.forgotPassword.title}
            </p>
            <p className="text-[18px] tracking-[-0.36px] text-[#647787]">
              {t.forgotPassword.subtitle}
            </p>
          </div>

          {sent ? (
            <div className="flex w-full flex-col items-center gap-[24px]">
              <p
                className="w-full text-center"
                style={{ color: "#22C55E", fontFamily: "'Heebo', sans-serif", fontSize: 14, margin: 0, lineHeight: 1.4 }}
              >
                {t.forgotPassword.successMessage}
              </p>
              <Link
                href="/login"
                style={{ fontFamily: "'Heebo', sans-serif", fontSize: 16, color: "#4C96FF", textDecoration: "underline" }}
              >
                {t.forgotPassword.backToLogin}
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-[30px]">
              {/* Email */}
              <div className="flex w-full flex-col items-start gap-[11px]">
                <p
                  className="whitespace-nowrap text-start text-[18px] text-[#414042]"
                  style={{ fontFamily: "'Heebo', sans-serif", lineHeight: 1.1 }}
                >
                  {t.forgotPassword.email}
                </p>
                <div
                  className="flex h-[48px] w-full items-center rounded-[10px] bg-white"
                  style={{ border: errors.email ? "1px solid #EF4444" : "1px solid #F3F3F6" }}
                >
                  <input
                    type="email"
                    placeholder="Type here..."
                    {...register("email")}
                    className="h-full flex-1 text-start placeholder:text-[#647787] placeholder:opacity-30"
                    style={{
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      fontFamily: "'Heebo', sans-serif",
                      fontSize: 14,
                      color: "#0E1117",
                      letterSpacing: "-0.28px",
                      lineHeight: "normal",
                      padding: "0 20px",
                      borderRadius: 10,
                    }}
                  />
                </div>
                {errors.email && (
                  <p style={{ fontFamily: "'Heebo', sans-serif", fontSize: 12, color: "#EF4444" }}>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {error && (
                <div
                  className="w-full rounded-[10px] px-4 py-3"
                  style={{ background: "#FEF2F2", color: "#EF4444", fontFamily: "'Heebo', sans-serif", fontSize: 14 }}
                >
                  {error}
                </div>
              )}

              {/* Send button */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex h-[50px] w-full cursor-pointer items-center justify-center rounded-[10px] disabled:cursor-not-allowed disabled:opacity-70"
                style={{
                  backgroundImage: "linear-gradient(175.27deg, rgb(76, 150, 255) 12.19%, rgb(22, 103, 219) 93.76%)",
                  border: "none",
                  fontFamily: "'Heebo', sans-serif",
                  fontSize: 16,
                  color: "#FFFFFF",
                }}
              >
                {isLoading ? t.forgotPassword.sending : t.forgotPassword.sendButton}
              </button>

              {/* Back to login */}
              <div className="text-center">
                <Link
                  href="/login"
                  style={{
                    fontFamily: "'Heebo', sans-serif",
                    fontSize: 16,
                    color: "#4C96FF",
                    textDecoration: "underline",
                    textDecorationStyle: "solid" as const,
                  }}
                >
                  {t.forgotPassword.backToLogin}
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </AuthLayout>
  );
}
