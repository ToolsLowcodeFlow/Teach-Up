"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/lib/i18n/context";
import { AuthLayout } from "@/components/auth/auth-layout";

export default function LoginPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "candidate">("login");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({ email: data.email, password: data.password });
      if (authError) { setError(t.login.invalidCredentials); return; }
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
        if (!profile) {
          // No profile yet — go to role selection
          router.push("/select-role");
        } else {
          switch (profile.role) {
            case "admin": router.push("/admin/suppliers"); break;
            case "institution": router.push("/institution/dashboard"); break;
            case "supplier": router.push("/supplier/dashboard"); break;
            case "seeker": router.push("/jobs"); break;
            default: router.push("/select-role");
          }
        }
      }
    } catch { setError(t.login.genericError); }
    finally { setIsLoading(false); }
  };

  const handleGoogleLogin = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${window.location.origin}/api/auth/callback` } });
  };

  return (
    <AuthLayout>
      {/* Card: 587×802, white, rounded-20, p-10 */}
      <div
        className="bg-white rounded-[20px] w-[587px] max-w-full flex items-center justify-center"
        style={{ padding: 10, minHeight: 802 }}
      >
        {/* Inner: w-499, flex-col, gap-40, items-center */}
        <div className="w-[499px] max-w-full flex flex-col gap-[40px] items-center">

          <div className="w-full flex flex-col gap-[40px] items-start">

            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-[40px] items-center">

              {/* Title: w-418, gap-6, centered */}
              <div
                className="w-[418px] max-w-full flex flex-col gap-[6px] items-center text-center"
                style={{ fontFamily: "'Abel', sans-serif", lineHeight: "normal" }}
              >
                <p className="text-[32px] text-[#0E1117] tracking-[-0.64px] min-w-full">
                  {t.login.title}
                </p>
                <p className="text-[18px] text-[#647787] tracking-[-0.36px] whitespace-nowrap">
                  {t.login.subtitle}.
                </p>
              </div>

              {/* Tabs: h-64, white, border #EAEBEB, rounded-10 */}
              <div className="w-full h-[64px] bg-white border border-[#EAEBEB] rounded-[10px] px-[16px] py-[10px] flex flex-col items-center justify-center">
                <div className="w-[465px] max-w-full flex gap-[13px] items-center">
                  {/* Login tab first (left in LTR) */}
                  <button
                    type="button"
                    onClick={() => setActiveTab("login")}
                    className="w-[226px] h-[40px] rounded-[10px] flex items-center justify-center p-[10px] cursor-pointer"
                    style={{
                      background: activeTab === "login" ? "rgba(119,191,255,0.17)" : "#F3F3F6",
                      border: activeTab === "login" ? "1px solid #4C96FF" : "none",
                      fontFamily: "'Abel', sans-serif", fontSize: 16, lineHeight: 1.1,
                      color: activeTab === "login" ? "#4C96FF" : "#647787",
                    }}
                  >
                    {t.login.tabLogin}
                  </button>
                  {/* Candidate tab second (right in LTR) */}
                  <button
                    type="button"
                    onClick={() => setActiveTab("candidate")}
                    className="w-[226px] h-[40px] rounded-[10px] flex items-center justify-center p-[10px] cursor-pointer"
                    style={{
                      background: activeTab === "candidate" ? "rgba(119,191,255,0.17)" : "#F3F3F6",
                      border: activeTab === "candidate" ? "1px solid #4C96FF" : "none",
                      fontFamily: "'Abel', sans-serif", fontSize: 16, lineHeight: 1.1,
                      color: activeTab === "candidate" ? "#4C96FF" : "#647787",
                    }}
                  >
                    {t.login.tabCandidate}
                  </button>
                </div>
              </div>

              {/* Fields: gap-30 */}
              <div className="w-full flex flex-col gap-[30px] items-start">

                {/* Email */}
                <div className="w-full flex flex-col gap-[11px] items-start">
                  <p className="text-[18px] text-[#414042] text-start whitespace-nowrap" style={{ fontFamily: "'Abel', sans-serif", lineHeight: 1.1 }}>
                    {t.login.email}
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
                        padding: "0 20px",
                        borderRadius: 10,
                      }}
                    />
                  </div>
                  {errors.email && <p style={{ fontFamily: "'Abel', sans-serif", fontSize: 12, color: "#EF4444" }}>{errors.email.message}</p>}
                </div>

                {/* Password group: gap-12 */}
                <div className="w-full flex flex-col gap-[12px] items-start">
                  <div className="w-full flex flex-col gap-[11px] items-start">
                    <p className="text-[18px] text-[#414042] text-start whitespace-nowrap" style={{ fontFamily: "'Abel', sans-serif", lineHeight: 1.1 }}>
                      {t.login.password}
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
                          padding: "0 20px",
                          borderRadius: 10,
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
                  </div>
                  {/* Forgot: text-end, underline */}
                  <Link
                    href="/forgot-password"
                    className="w-full text-start underline"
                    style={{ fontFamily: "'Abel', sans-serif", fontSize: 16, color: "#4C96FF", lineHeight: 1.1, textDecorationStyle: "solid" }}
                  >
                    {t.login.forgotPassword}.
                  </Link>
                </div>
              </div>

              {error && (
                <div className="w-full rounded-[10px] px-4 py-3" style={{ background: "#FEF2F2", color: "#EF4444", fontFamily: "'Abel', sans-serif", fontSize: 14 }}>
                  {error}
                </div>
              )}

              {/* Login button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-[50px] rounded-[10px] flex items-center justify-center px-[7px] py-[17px] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  backgroundImage: "linear-gradient(175.27deg, rgb(76, 150, 255) 12.19%, rgb(22, 103, 219) 93.76%)",
                  border: "none", fontFamily: "'Abel', sans-serif", fontSize: 16, color: "#FFFFFF",
                }}
              >
                {isLoading ? t.login.loggingIn : t.login.loginButton}
              </button>
            </form>

            {/* "or" divider */}
            <div className="w-full flex gap-[12px] items-center">
              <div className="flex-1 h-px bg-[#EAEBEB]" />
              <span style={{ fontFamily: "'Assistant', sans-serif", fontSize: 13, fontWeight: 400, color: "#696969", letterSpacing: "0.1755px" }}>or</span>
              <div className="flex-1 h-px bg-[#EAEBEB]" />
            </div>

            {/* Google button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-[499px] max-w-full h-[48px] bg-white border border-[#F3F3F6] rounded-[10px] overflow-hidden px-[10px] py-[12px] flex flex-col items-center justify-center cursor-pointer hover:bg-[#FAFBFC] transition-colors"
            >
              <div className="flex gap-[4px] items-center justify-center w-full">
                <span style={{ fontFamily: "'Abel', sans-serif", fontSize: 14, color: "#0E1117", lineHeight: 1.1, textAlign: "center" }}>
                  {t.login.googleButton}
                </span>
                <img src="/images/google-icon.png" alt="Google" className="w-[20px] h-[20px] object-cover shrink-0" />
              </div>
            </button>
          </div>

          {/* Terms */}
          <p style={{ fontFamily: "'Abel', sans-serif", fontSize: 14, color: "#647787", textAlign: "center", lineHeight: 1.1 }}>
            {t.common.termsText} {t.common.termsLink} {t.common.and} {t.common.privacyLink}.
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
