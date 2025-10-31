import { type NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/app/data/users";

// Specify protected and public routes
const protectedRoutes = ["/", "/new-post", "/[author]/[slug]"];
const publicRoutes = ["/login"];

// TODO: fix this function
export default async function proxy(req: NextRequest) {
  // Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const session = await getCurrentUser();

  // Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.session.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Redirect to / if the user is authenticated
  if (
    isPublicRoute &&
    session?.session.userId &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Proxy should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
