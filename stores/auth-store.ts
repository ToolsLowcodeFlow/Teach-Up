"use client";

import { create } from "zustand";
import type { Profile, UserRole } from "@/lib/types";

interface AuthState {
  user: { id: string; email: string } | null;
  profile: Profile | null;
  role: UserRole | null;
  isLoading: boolean;
  setUser: (user: { id: string; email: string } | null) => void;
  setProfile: (profile: Profile | null) => void;
  setRole: (role: UserRole | null) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  role: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile, role: profile?.role ?? null }),
  setRole: (role) => set({ role }),
  setLoading: (isLoading) => set({ isLoading }),
  reset: () => set({ user: null, profile: null, role: null, isLoading: false }),
}));
