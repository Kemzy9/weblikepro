import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { KeywordRoute } from '@/lib/keyword';
import { keywordRoutes } from '@/models/keyword';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the current path matches any keyword routes
  const route = keywordRoutes.find(r => pathname.includes(r.keyword));

  if (route) {
    // Here you could implement view counting logic
    // For example, calling your analytics API
    // await incrementViews(route.keyword);
    
    // You can also modify the response headers
    const response = NextResponse.next();
    response.headers.set('x-keyword-route', route.keyword);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
