import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// export { auth as middleware } from "@/auth"

// import { decrypt } from "./app/lib/session";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/"];

export async function middleware(req){
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value
    const access = cookieStore.get('access')?.value

    if (isProtectedRoute && (!token || !access)) {
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    if (isPublicRoute && token && access) {
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       */
      '/',
      '/dashboard',
      '/dashboard/points',
      '/dashboard/points/earn',
      '/dashboard/points/manage',
      '/dashboard/points/manage/[id]',
      '/dashboard/points/manage/grant',
      '/dashboard/points/earn',
      '/dashboard/rewards',
      '/dashboard/rewards/earn',
      '/dashboard/rewards/manage',
      '/dashboard/rewards/manage/[id]',
      '/dashboard/rewards/manage',
      '/dashboard/rewards/spend',
      '/dashboard/users',
      '/dashboard/users/[id]'
    ],
  }