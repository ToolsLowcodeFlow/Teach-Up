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

  const inputClass =
    "w-full h-[44px] rounded-lg border border-[#E5E7EB] bg-white px-4 text-[14px] text-[#1F2937] outline-none focus:border-[#4B7BF5] focus:ring-2 focus:ring-[#4B7BF5]/20 transition-colors";

  return (
    <AuthLayout>
      <div className="bg-white rounded-2xl shadow-lg px-10 py-10 w-full">
        <h1 className="text-[22px] font-bold text-center text-[#1F2937] mb-1.5">
          {t.resetPassword.title}
        </h1>
        <p className="text-[13px] text-[#6B7280] text-center mb-7">
          {t.resetPassword.subtitle}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-[13px] text-[#6B7280] mb-2">
              {t.resetPassword.newPassword}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`${inputClass} pe-11 ${errors.password ? "border-[#EF4444]" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 end-3 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-[12px] text-[#EF4444] mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[13px] text-[#6B7280] mb-2">
              {t.resetPassword.confirmPassword}
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              className={`${inputClass} ${errors.confirmPassword ? "border-[#EF4444]" : ""}`}
            />
            {errors.confirmPassword && (
              <p className="text-[12px] text-[#EF4444] mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {error && (
            <div className="bg-[#FEF2F2] text-[#EF4444] text-[13px] rounded-lg p-3">{error}</div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[46px] bg-[#4B7BF5] hover:bg-[#3A62C4] text-white text-[15px] font-medium rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? t.resetPassword.updating : t.resetPassword.updateButton}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}
