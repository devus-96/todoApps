import { NextResponse, NextRequest } from "next/server";

const privateRoute = [
  '/'
]

const authRoute = [
  '/auth/login',
  '/auth/register',
  '/auth/callback'
]

export default function (request: NextRequest) {
  if (privateRoute.includes(request.nextUrl.pathname)) {
    if (!request.cookies.has('authCookies')) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  if (authRoute.includes(request.nextUrl.pathname)) {
    if (request.cookies.has("authCookies")) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
  
}

export const config = {
  matcher: ["/"]
}