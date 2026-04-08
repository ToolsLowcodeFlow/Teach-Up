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
import { PrivacyPolicyModal } from "@/components/shared/privacy-policy-modal";

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

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
        options: { emailRedirectTo: `${window.location.origin}/api/auth/callback` },
      });
      if (authError) {
        setError(authError.message.includes("already registered") ? t.register.alreadyRegistered : authError.message);
        return;
      }
      router.push("/select-role");
    } catch { setError(t.login.genericError); }
    finally { setIsLoading(false); }
  };

  const handleGoogleRegister = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${window.location.origin}/api/auth/callback` } });
  };

  return (
    <AuthLayout>
      {/* Same card style as login — 587px, white, rounded-20, p-10 */}
      <div
        className="bg-white rounded-[20px] w-[587px] max-w-full flex items-center justify-center"
        style={{ padding: 10, minHeight: 802 }}
      >
        <div className="w-[499px] max-w-full flex flex-col gap-[40px] items-center">
          <div className="w-full flex flex-col gap-[40px] items-start">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-[40px] items-center">

              {/* Title */}
              <div
                className="w-[418px] max-w-full flex flex-col gap-[6px] items-center text-center"
                style={{ fontFamily: "'Abel', sans-serif", lineHeight: "normal" }}
              >
                <p className="text-[32px] text-[#0E1117] tracking-[-0.64px] min-w-full">
                  {t.register.title}
                </p>
                <p className="text-[18px] text-[#647787] tracking-[-0.36px]">
                  {t.register.subtitle}
                </p>
              </div>

              {/* Fields */}
              <div className="w-full flex flex-col gap-[30px] items-start">

                {/* Email */}
                <div className="w-full flex flex-col gap-[11px] items-start">
                  <p className="text-[18px] text-[#414042] text-start whitespace-nowrap" style={{ fontFamily: "'Abel', sans-serif", lineHeight: 1.1 }}>
                    {t.register.email}
                  </p>
                  <div
                    className="w-full h-[48px] bg-white rounded-[10px] flex items-center"
                    style={{ border: errors.email ? "1px solid #EF4444" : "1px solid #F3F3F6" }}
                  >
                    <input
                      type="email"
                      placeholder="Type here..."
                      {...register("email")}
                      className="placeholder:opacity-30 placeholder:text-[#647787] text-start flex-1 h-full"
                      style={{
                        border: "none", outline: "none", background: "transparent",
                        fontFamily: "'Abel', sans-serif", fontSize: 14, color: "#0E1117",
                        letterSpacing: "-0.28px", lineHeight: "normal",
                        padding: "0 20px", borderRadius: 10,
                      }}
                    />
                  </div>
                  {errors.email && <p style={{ fontFamily: "'Abel', sans-serif", fontSize: 12, color: "#EF4444" }}>{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div className="w-full flex flex-col gap-[11px] items-start">
                  <p className="text-[18px] text-[#414042] text-start whitespace-nowrap" style={{ fontFamily: "'Abel', sans-serif", lineHeight: 1.1 }}>
                    {t.register.password}
                  </p>
                  <div
                    className="w-full h-[48px] bg-white rounded-[10px] flex items-center"
                    style={{ border: errors.password ? "1px solid #EF4444" : "1px solid #EAEBEB" }}
                  >
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Type your password here."
                      {...register("password")}
                      className="placeholder:text-[#B6B6B6] text-start flex-1 h-full"
                      style={{
                        border: "none", outline: "none", background: "transparent",
                        fontFamily: "'Assistant', sans-serif", fontSize: 14, fontWeight: 400,
                        color: "#0E1117", letterSpacing: "-0.28px", lineHeight: "normal",
                        padding: "0 20px", borderRadius: 10,
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="flex p-0 cursor-pointer shrink-0"
                      style={{ background: "none", border: "none", color: "#B6B6B6", marginInlineEnd: 16 }}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && <p style={{ fontFamily: "'Abel', sans-serif", fontSize: 12, color: "#EF4444" }}>{errors.password.message}</p>}

                  {/* Password rules */}
                  {passwordValue.length > 0 && (
                    <div className="flex flex-col gap-[6px] mt-[4px]">
                      {passwordRules.map((rule) => {
                        const passed = rule.test(passwordValue);
                        return (
                          <div key={rule.label} className="flex items-center gap-[8px]" style={{ fontFamily: "'Abel', sans-serif", fontSize: 14, color: passed ? "#22C55E" : "#0E1117" }}>
                            {passed ? <Check size={14} /> : <X size={14} style={{ color: "#D1D5DB" }} />}
                            <span>{rule.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="w-full rounded-[10px] px-4 py-3" style={{ background: "#FEF2F2", color: "#EF4444", fontFamily: "'Abel', sans-serif", fontSize: 14 }}>
                  {error}
                </div>
              )}

              {/* Register button — same gradient style as login */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-[50px] rounded-[10px] flex items-center justify-center cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  backgroundImage: "linear-gradient(175.27deg, rgb(76, 150, 255) 12.19%, rgb(22, 103, 219) 93.76%)",
                  border: "none", fontFamily: "'Abel', sans-serif", fontSize: 16, color: "#FFFFFF",
                }}
              >
                {isLoading ? t.register.creatingAccount : t.register.createAccount}
              </button>
            </form>

            {/* "or" divider */}
            <div className="w-full flex gap-[12px] items-center">
              <div className="flex-1 h-px bg-[#EAEBEB]" />
              <span style={{ fontFamily: "'Assistant', sans-serif", fontSize: 13, fontWeight: 400, color: "#696969", letterSpacing: "0.1755px" }}>or</span>
              <div className="flex-1 h-px bg-[#EAEBEB]" />
            </div>

            {/* Google button — same as login */}
            <button
              type="button"
              onClick={handleGoogleRegister}
              className="w-[499px] max-w-full h-[48px] bg-white border border-[#F3F3F6] rounded-[10px] overflow-hidden px-[10px] py-[12px] flex flex-col items-center justify-center cursor-pointer hover:bg-[#FAFBFC] transition-colors"
            >
              <div className="flex gap-[4px] items-center justify-center w-full">
                <span style={{ fontFamily: "'Abel', sans-serif", fontSize: 14, color: "#0E1117", lineHeight: 1.1 }}>
                  {t.register.googleButton}
                </span>
                <img src="/images/google-icon.png" alt="Google" className="w-[20px] h-[20px] object-cover shrink-0" />
              </div>
            </button>
          </div>

          {/* Already have account + Terms */}
          <div className="w-full flex flex-col gap-[12px] items-center">
            <p style={{ fontFamily: "'Abel', sans-serif", fontSize: 16, color: "#647787", textAlign: "center", lineHeight: 1.1 }}>
              {t.register.haveAccount}{" "}
              <Link href="/login" style={{ color: "#4C96FF", textDecoration: "underline" }}>
                {t.register.loginLink}
              </Link>
            </p>
            <p style={{ fontFamily: "'Abel', sans-serif", fontSize: 14, color: "#647787", textAlign: "center", lineHeight: 1.1 }}>
              {t.common.termsText} {t.common.termsLink} {t.common.and} <button type="button" onClick={() => setPrivacyOpen(true)} className="cursor-pointer border-none bg-transparent text-primary underline" style={{ padding: 0, fontSize: 14, fontFamily: "'Abel', sans-serif" }}>{t.common.privacyLink}</button>.
            </p>
          </div>

          <PrivacyPolicyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
        </div>
      </div>
    </AuthLayout>
  );
}
