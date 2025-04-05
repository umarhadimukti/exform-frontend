import { NextRequest, NextResponse } from "next/server";

export function middleware (request: NextRequest)
{
    const { cookies } = request;
    const accessToken = cookies.get('accessToken');

    // if there's no token available and trying to access protected page
    if (!accessToken && request.nextUrl.pathname.startsWith('/login')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/forms/:path*',
        '/users/:path*',
        '/questions/:path*',
        '/answers/:path*',
        '/response/:path*',
    ],
};