import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/select-role";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Check if user has a role set already
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        // If role is still default 'seeker' and no profile completed, go to role selection
        if (profile?.role === "seeker") {
          return NextResponse.redirect(`${origin}/select-role`);
        }

        // Otherwise redirect based on role
        switch (profile?.role) {
          case "admin":
            return NextResponse.redirect(`${origin}/admin/suppliers`);
          case "institution":
            return NextResponse.redirect(`${origin}/institution/dashboard`);
          case "supplier":
            return NextResponse.redirect(`${origin}/supplier/dashboard`);
          default:
            return NextResponse.redirect(`${origin}/jobs`);
        }
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Auth code error — redirect to login with error
  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
