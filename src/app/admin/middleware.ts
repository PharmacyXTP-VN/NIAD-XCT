import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Chỉ kiểm tra cookie, không dùng localStorage hay window (server-side only)
  const isLoggedIn = request.cookies.get("admin_auth")?.value === "true";
  const isLoginPage = request.nextUrl.pathname === "/admin/login";
  if (!isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
