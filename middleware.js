import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Check if the request is for an admin route
    if (req.nextUrl.pathname.startsWith("/admin")) {
      // If the user is not an admin, redirect to login
      if (req.nextauth.token?.role !== "admin") {
        return NextResponse.redirect(new URL("/admin/login", req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
);

export const config = { matcher: ["/admin/:path*"] };