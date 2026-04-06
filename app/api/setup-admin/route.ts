import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = createAdminClient();
    const adminEmail = "connect@lowcodeflow.co";
    const adminPassword = "Password1234";

    // Step 1: Ensure profiles table exists by trying to query it
    const { error: tableCheck } = await supabase.from("profiles").select("id").limit(1);

    if (tableCheck && (tableCheck.message?.includes("does not exist") || tableCheck.code === "42P01")) {
      // Create the table using SQL editor in Supabase Dashboard
      // For now, try creating via the REST SQL endpoint
      const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/`, {
        method: "POST",
        headers: {
          "apikey": process.env.SUPABASE_SERVICE_ROLE_KEY!,
          "Authorization": `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
          "Content-Type": "application/json",
        },
      });

      return NextResponse.json({
        error: "Profiles table does not exist. Please run this SQL in Supabase Dashboard SQL Editor:",
        sql: `CREATE TABLE IF NOT EXISTS public.profiles (id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE, role TEXT DEFAULT 'seeker', full_name TEXT, created_at TIMESTAMPTZ DEFAULT NOW()); ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY; CREATE POLICY "allow_all" ON public.profiles FOR ALL USING (true) WITH CHECK (true);`,
      }, { status: 500 });
    }

    // Step 2: Create or update admin user in auth
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const existingAdmin = existingUsers?.users?.find((u) => u.email === adminEmail);

    let userId: string;

    if (existingAdmin) {
      userId = existingAdmin.id;
      await supabase.auth.admin.updateUserById(userId, { password: adminPassword });
    } else {
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email: adminEmail,
        password: adminPassword,
        email_confirm: true,
      });
      if (createError) return NextResponse.json({ error: createError.message }, { status: 500 });
      userId = newUser.user.id;
    }

    // Step 3: Set admin role in profiles
    const { error: profileError } = await supabase.from("profiles").upsert(
      { id: userId, role: "admin", full_name: "Admin" },
      { onConflict: "id" }
    );

    if (profileError) return NextResponse.json({ error: profileError.message }, { status: 500 });

    return NextResponse.json({
      success: true,
      message: `Admin user ${adminEmail} ready with role 'admin'. Login at /login`,
      userId,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
