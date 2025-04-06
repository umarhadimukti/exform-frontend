import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const { cookies } = request;
    const accessToken = cookies.get('accessToken')?.value;

    if(!accessToken) {
        return NextResponse.redirect(new URL('/login',request.url))
     }
     else {
      return NextResponse.redirect(new URL('/', request.url))
     }
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