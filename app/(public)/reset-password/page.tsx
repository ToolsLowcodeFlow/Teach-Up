"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { resetPasswordSchema, type ResetPasswordFormData } from "@/lib/validations/auth";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/lib/i18n/context";
import { AuthLayout } from "@/components/auth/auth-layout";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      router.push("/login");
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
              {t.resetPassword.title}
            </p>
            <p className="text-[18px] tracking-[-0.36px] text-[#647787]">
              {t.resetPassword.subtitle}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-[30px]">
            {/* New Password */}
            <div className="flex w-full flex-col items-start gap-[11px]">
              <p
                className="whitespace-nowrap text-start text-[18px] text-[#414042]"
                style={{ fontFamily: "'Heebo', sans-serif", lineHeight: 1.1 }}
              >
                {t.resetPassword.newPassword}
              </p>
              <div
                className="flex h-[48px] w-full items-center rounded-[10px] bg-white"
                style={{ border: errors.password ? "1px solid #EF4444" : "1px solid #EAEBEB" }}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Type your password here."
                  {...register("password")}
                  className="h-full flex-1 text-start placeholder:text-[#B6B6B6]"
                  style={{
                    border: "none", outline: "none", background: "transparent",
                    fontFamily: "'Heebo', sans-serif", fontSize: 14, color: "#0E1117",
                    letterSpacing: "-0.28px", lineHeight: "normal",
                    padding: "0 20px", borderRadius: 10,
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="flex shrink-0 cursor-pointer p-0"
                  style={{ background: "none", border: "none", color: "#B6B6B6", marginInlineEnd: 16 }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p style={{ fontFamily: "'Heebo', sans-serif", fontSize: 12, color: "#EF4444" }}>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex w-full flex-col items-start gap-[11px]">
              <p
                className="whitespace-nowrap text-start text-[18px] text-[#414042]"
                style={{ fontFamily: "'Heebo', sans-serif", lineHeight: 1.1 }}
              >
                {t.resetPassword.confirmPassword}
              </p>
              <div
                className="flex h-[48px] w-full items-center rounded-[10px] bg-white"
                style={{ border: errors.confirmPassword ? "1px solid #EF4444" : "1px solid #EAEBEB" }}
              >
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm your password."
                  {...register("confirmPassword")}
                  className="h-full flex-1 text-start placeholder:text-[#B6B6B6]"
                  style={{
                    border: "none", outline: "none", background: "transparent",
                    fontFamily: "'Heebo', sans-serif", fontSize: 14, color: "#0E1117",
                    letterSpacing: "-0.28px", lineHeight: "normal",
                    padding: "0 20px", borderRadius: 10,
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="flex shrink-0 cursor-pointer p-0"
                  style={{ background: "none", border: "none", color: "#B6B6B6", marginInlineEnd: 16 }}
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p style={{ fontFamily: "'Heebo', sans-serif", fontSize: 12, color: "#EF4444" }}>
                  {errors.confirmPassword.message}
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

            {/* Update button */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex h-[50px] w-full cursor-pointer items-center justify-center rounded-[10px] disabled:cursor-not-allowed disabled:opacity-70"
              style={{
                backgroundImage: "linear-gradient(175.27deg, rgb(76, 150, 255) 12.19%, rgb(22, 103, 219) 93.76%)",
                border: "none", fontFamily: "'Heebo', sans-serif", fontSize: 16, color: "#FFFFFF",
              }}
            >
              {isLoading ? t.resetPassword.updating : t.resetPassword.updateButton}
            </button>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}
