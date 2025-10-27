// import { type NextRequest, NextResponse } from "next/server";
// import { getCurrentUser } from "./data/user";

// // 1. Specify protected and public routes
// const protectedRoutes = ["/", "/new-post"];
// const publicRoutes = ["/auth/login"];

// export default async function proxy(req: NextRequest) {
//   // 2. Check if the current route is protected or public
//   const path = req.nextUrl.pathname;
//   const isProtectedRoute = protectedRoutes.includes(path);
//   const isPublicRoute = publicRoutes.includes(path);

//   const session = await getCurrentUser();

//   // 4. Redirect to /login if the user is not authenticated
//   if (isProtectedRoute && !session?.session.userId) {
//     return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
//   }

//   // 5. Redirect to /dashboard if the user is authenticated
//   if (
//     isPublicRoute &&
//     session?.session.userId &&
//     !req.nextUrl.pathname.startsWith("/dashboard")
//   ) {
//     return NextResponse.redirect(new URL("/", req.nextUrl));
//   }

//   return NextResponse.next();
// }

// // Routes Proxy should not run on
// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
// };
