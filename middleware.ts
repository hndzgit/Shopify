import { auth } from "@/src/lib/auth/config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith("/admin") && !pathname.includes("/login")) {
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Redirect logged in admins away from login page
  if (pathname === "/admin/login" && session) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
