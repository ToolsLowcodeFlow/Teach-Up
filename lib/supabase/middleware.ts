import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const path = request.nextUrl.pathname;

  // Public routes — no auth needed, skip Supabase entirely
  const publicRoutes = [
    "/", "/jobs", "/login", "/register", "/check-email",
    "/forgot-password", "/reset-password", "/select-role",
    "/institution/onboarding", "/institution/onboarding/success",
    "/supplier/onboarding",
  ];
  const isPublicRoute = publicRoutes.some(
    (route) => path === route || path.startsWith("/jobs/")
  ) || path.startsWith("/profile") || path.startsWith("/messages")
    || path.startsWith("/contact") || path.startsWith("/favorites")
    || path.startsWith("/supplier-database") || path.startsWith("/about")
    || path.startsWith("/prices");

  if (isPublicRoute) {
    return supabaseResponse;
  }

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            supabaseResponse = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Auth required — redirect to login
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    // Admin routes — check role
    if (path.startsWith("/admin")) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile?.role !== "admin") {
        const url = request.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
      }
    }
  } catch {
    // If Supabase fails, allow the request through for public-ish routes
    // and redirect to login for protected ones
    if (!isPublicRoute) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
