import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all routes except: API, Next.js internals, static files (with extensions),
  // and special well-known files that must serve as text/plain or application/xml
  matcher: [
    '/((?!api|_next|_vercel|robots\\.txt|sitemap\\.xml|llms\\.txt|.*\\..*).*)',
  ],
};
