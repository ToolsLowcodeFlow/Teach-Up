"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
  role: string | null;
  initial: string;
  companyName: string;
  phone: string;
  numberOfEmployees: string;
  employerType: string;
  website: string;
  companyDescription: string;
  socialMediaLinks: string[];
  companyLogoUrl: string | null;
}

export function useUser() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const supabase = createClient();
        const { data: { user: authUser } } = await supabase.auth.getUser();

        if (!authUser) {
          setUser(null);
          setLoading(false);
          return;
        }

        // Try to get profile from profiles table
        const { data: profile } = await supabase
          .from("profiles")
          .select("role, full_name, first_name, last_name, avatar_url, company_name, phone, mobile, number_of_employees, employer_type, website, company_description, social_media_links, company_logo_url")
          .eq("id", authUser.id)
          .single();

        const email = authUser.email || "";
        const fullName = profile?.full_name
          || (profile?.first_name ? `${profile.first_name} ${profile.last_name || ""}`.trim() : "")
          || authUser.user_metadata?.full_name
          || authUser.user_metadata?.name
          || email.split("@")[0]
          || "";

        const meta = authUser.user_metadata || {};
        const avatarUrl = profile?.avatar_url || profile?.company_logo_url || meta.avatar_url || meta.picture || meta.company_logo_url || null;

        const initial = fullName
          ? fullName.charAt(0).toUpperCase()
          : email.charAt(0).toUpperCase();

        setUser({
          id: authUser.id,
          email,
          fullName,
          avatarUrl,
          role: profile?.role || null,
          initial,
          companyName: profile?.company_name || meta.company_name || fullName || "",
          phone: profile?.phone || profile?.mobile || meta.phone || "",
          numberOfEmployees: profile?.number_of_employees || meta.number_of_employees || "",
          employerType: profile?.employer_type || meta.employer_type || "",
          website: profile?.website || meta.website || "",
          companyDescription: profile?.company_description || meta.company_description || "",
          socialMediaLinks: profile?.social_media_links || meta.social_media_links || [],
          companyLogoUrl: profile?.company_logo_url || meta.company_logo_url || null,
        });
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
}
