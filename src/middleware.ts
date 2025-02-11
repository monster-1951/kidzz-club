// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Define public routes that don't require authentication
const publicRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the current route is public
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Get the token from the request
  const token = await getToken({ req: request });

  // If no token and the route is not public, redirect to sign-in
  if (!token) {
    const signInUrl = new URL("/sign-in", request.url);
    return NextResponse.redirect(signInUrl);
  }

  // Allow access to the requested route
  return NextResponse.next();
}

// Define the routes the middleware should run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};