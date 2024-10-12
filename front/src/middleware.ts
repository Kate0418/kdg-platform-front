import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (req.nextUrl.pathname.startsWith('/service/')) {
    if (!token) {
      return NextResponse.redirect(new URL('/site/login', req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/service/:path*'],
}
