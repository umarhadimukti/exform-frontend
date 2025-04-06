import { NextRequest, NextResponse } from "next/server";

export function middleware (request: NextRequest)
{
    const { cookies } = request;
    const accessToken = cookies.get('accessToken')?.value;

    // URL that requires authentication
    const authRequiredPaths: string[] = [
        '/forms', '/form', '/users', '/roles', 'current-user',
    ];
    const currentPath = request.nextUrl.pathname;
    
    // check if the current path requires authentication
    const isAuthRequired = authRequiredPaths.some(path => 
        currentPath.startsWith(path)
    );
    
    // if path requires authentication and no token provided
    if (isAuthRequired && !accessToken) {
        const loginUrl = new URL('/login', request.url);
        // store the origin URL for redirect after login
        loginUrl.searchParams.set('callbackUrl', currentPath);
        return NextResponse.redirect(loginUrl);
    }
    
    // if the user is already logged in try to access the login/register page
    if ((currentPath === '/login' || currentPath === '/register') && accessToken) {
        return NextResponse.redirect(new URL('/forms', request.url));
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/forms/:path*',
        '/form/:path*',
        '/users/:path*',
        '/login',
        '/register',
    ],
}