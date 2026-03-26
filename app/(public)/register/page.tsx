"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/lib/i18n/context";
import { AuthLayout } from "@/components/auth/auth-layout";
import { GoogleButton } from "@/components/auth/google-button";

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "" },
  });

  const passwordValue = watch("password", "");

  const passwordRules = [
    { label: t.register.passwordRules.minLength, test: (v: string) => v.length >= 8 },
    { label: t.register.passwordRules.lowercase, test: (v: string) => /[a-z]/.test(v) },
    { label: t.register.passwordRules.uppercase, test: (v: string) => /[A-Z]/.test(v) },
    { label: t.register.passwordRules.symbol, test: (v: string) => /[!@#$%^&*(),.?":{}|<>]/.test(v) },
  ];

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });

      if (authError) {
        if (authError.message.includes("already registered")) {
          setError(t.register.alreadyRegistered);
        } else {
          setError(authError.message);
        }
        return;
      }

      router.push("/select-role");
    } catch {
      setError(t.login.genericError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
  };

  return (
    <AuthLayout>
      <div className="bg-white rounded-2xl shadow-lg px-10 py-10 w-full">
        <h1 className="text-[22px] font-bold text-center text-[#1F2937] mb-1.5">
          {t.register.title}
        </h1>
        <p className="text-[13px] text-[#6B7280] text-center mb-7">
          {t.register.subtitle}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-[13px] text-[#6B7280] mb-2">
              {t.register.email}
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

          <div>
            <label className="block text-[13px] text-[#6B7280] mb-2">
              {t.register.password}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`w-full h-[44px] rounded-lg border bg-white px-4 pe-11 text-[14px] text-[#1F2937] outline-none transition-colors ${
                  errors.password
                    ? "border-[#EF4444] focus:ring-2 focus:ring-[#EF4444]/20"
                    : "border-[#E5E7EB] focus:border-[#4B7BF5] focus:ring-2 focus:ring-[#4B7BF5]/20"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 end-3 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
              </button>
            </div>

            {passwordValue.length > 0 && (
              <div className="mt-2.5 space-y-1.5">
                {passwordRules.map((rule) => {
                  const passed = rule.test(passwordValue);
                  return (
                    <div
                      key={rule.label}
                      className={`flex items-center gap-2 text-[12px] ${
                        passed ? "text-[#22C55E]" : "text-[#1F2937]"
                      }`}
                    >
                      {passed ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <X className="h-3.5 w-3.5 text-[#D1D5DB]" />
                      )}
                      <span>{rule.label}</span>
                    </div>
                  );
                })}
              </div>
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
            {isLoading ? t.register.creatingAccount : t.register.createAccount}
          </button>
        </form>

        <div className="mt-7 text-center">
          <GoogleButton
            label={t.register.googleButton}
            onClick={handleGoogleRegister}
          />
        </div>

        <p className="text-[13px] text-[#6B7280] text-center mt-5">
          {t.register.haveAccount}{" "}
          <Link href="/login" className="text-[#4B7BF5] font-medium hover:underline">
            {t.register.loginLink}
          </Link>
        </p>

        <p className="text-[11px] text-[#9CA3AF] text-center mt-4 leading-relaxed">
          {t.common.termsText}{" "}
          <Link href="/terms" className="text-[#4B7BF5] hover:underline">
            {t.common.termsLink}
          </Link>{" "}
          {t.common.and}{" "}
          <Link href="/privacy" className="text-[#4B7BF5] hover:underline">
            {t.common.privacyLink}
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
