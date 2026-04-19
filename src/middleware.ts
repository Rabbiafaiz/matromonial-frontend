import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // Define protected route prefixes (including nested routes)
  const protectedRoutes = ["/dashbaord", "/tell-us-more-about-yourself"];

  // Redirect if not logged in
  // if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
  //   return NextResponse.redirect(new URL("/auth/login", req.url));
  // }

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtectedRoute) {
    if (!token) {
      const loginUrl = new URL("/auth/login", req.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Prevent caching for protected routes
    const response = NextResponse.next();
    response.headers.set("Cache-Control", "no-store, max-age=0");
    return response;
  }

  return NextResponse.next();
}

// Apply to specific routes
export const config = {
  matcher: ["/dashbaord/:path*", "/tell-us-more-about-yourself/:path*"],
};
