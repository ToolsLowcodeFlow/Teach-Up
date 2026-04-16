import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const response = NextResponse.redirect(new URL("http://localhost:3000/login"));
  for (const cookie of allCookies) {
    response.cookies.delete(cookie.name);
  }
  return response;
}
