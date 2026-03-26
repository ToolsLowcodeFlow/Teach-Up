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
      <div className="bg-white rounded-2xl shadow-lg px-10 py-10 w-full">
        <h1 className="text-[22px] font-bold text-center text-[#1F2937] mb-1.5">
          {t.forgotPassword.title}
        </h1>
        <p className="text-[13px] text-[#6B7280] text-center mb-7">
          {t.forgotPassword.subtitle}
        </p>

        {sent ? (
          <div className="text-center space-y-4">
            <div className="bg-[#F0FDF4] text-[#22C55E] rounded-lg p-4 text-[13px]">
              {t.forgotPassword.successMessage}
            </div>
            <Link href="/login" className="text-[#4B7BF5] text-[13px] hover:underline">
              {t.forgotPassword.backToLogin}
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-[13px] text-[#6B7280] mb-2">
                {t.forgotPassword.email}
              </label>
              <input
                type="email"
                {...register("email")}
                className={`w-full h-[44px] rounded-lg border bg-white px-4 text-[14px] text-[#1F2937] outline-none transition-colors ${
                  errors.email
                    ? "border-[#EF4444] focus:ring-2 focus:ring-[#EF4444]/20"
                    : "border-[#E5E7EB] focus:border-[#4B7BF5] focus:ring-2 focus:ring-[#4B7BF5]/20"
                }`}
              />
              {errors.email && (
                <p className="text-[12px] text-[#EF4444] mt-1">{errors.email.message}</p>
              )}
            </div>

            {error && (
              <div className="bg-[#FEF2F2] text-[#EF4444] text-[13px] rounded-lg p-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[46px] bg-[#4B7BF5] hover:bg-[#3A62C4] text-white text-[15px] font-medium rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? t.forgotPassword.sending : t.forgotPassword.sendButton}
            </button>

            <div className="text-center">
              <Link href="/login" className="text-[13px] text-[#4B7BF5] hover:underline">
                {t.forgotPassword.backToLogin}
              </Link>
            </div>
          </form>
        )}
      </div>
    </AuthLayout>
  );
}
