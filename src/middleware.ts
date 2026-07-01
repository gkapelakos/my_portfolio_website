import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import {NextRequest, NextResponse} from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Only apply geolocation redirect on root '/' before cookie is set
  if (pathname === '/') {
    const hasLocaleCookie = request.cookies.has('NEXT_LOCALE');
    
    if (!hasLocaleCookie) {
      const country = request.headers.get('x-vercel-ip-country') || '';
      
      if (country.toUpperCase() === 'GR') {
        const url = request.nextUrl.clone();
        url.pathname = '/el';
        const response = NextResponse.redirect(url);
        response.cookies.set('NEXT_LOCALE', 'el', {
          maxAge: 31536000, // 1 year
          path: '/'
        });
        return response;
      }
    }
  }

  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|el)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
