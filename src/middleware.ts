import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('at')?.value;

  const authPages: string[] = ['/register', '/login'];
  const protectedPages: string[] = ['/forms', '/form', '/users', '/roles', '/response'];

  // check if pathname is auth path
  const isAuthPage = authPages.some((path) => {
    return request.nextUrl.pathname.startsWith(path);
  });

  // check if pathname is protected path
  const isProtectedRoute = protectedPages.some((path) => {
    return request.nextUrl.pathname.startsWith(path);
  });

  // if there's no token provided and pathname is protected path, then redirect to login page
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

 // if there's token provided and pathname is auth path, then redirect to default after login page
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/forms', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/register',
    '/login',
    '/forms/:path*',
  ],
};