import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/lib/session";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login"];
const roleBasedRoutes: Record<string, string> = {
  "/admin": "admin", 
  "/manager": "manager", 
  "/cto": "cto", 
  
};

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  // Check for role-based access
  for (const route in roleBasedRoutes) {
    if (path.startsWith(route)) {
      const requiredRole = roleBasedRoutes[route];
      if (session?.role !== requiredRole) {
        return NextResponse.redirect(new URL("/unauthorized", req.nextUrl));
      }
    }
  }

  return NextResponse.next();
}
