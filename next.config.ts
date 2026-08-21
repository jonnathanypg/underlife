import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  compress: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000,
  },

  async headers() {
    // Shared 1-year immutable header
    const immutable = [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }];

    return [
      // ── Named static asset folders (1 year immutable) ──────────────────────
      { source: '/recursos_opt/:path*', headers: immutable },
      { source: '/logos/:path*', headers: immutable },
      { source: '/icons/:path*', headers: immutable },
      { source: '/_next/static/:path*', headers: immutable },
      { source: '/_next/image/:path*', headers: immutable },

      // ── Well-known static root files ────────────────────────────────────────
      {
        source: '/:file(favicon\\.ico|icon\\.png|icon\\.webp|apple-icon\\.png|apple-icon\\.webp|llms\\.txt|robots\\.txt|sitemap\\.xml|manifest\\.json)',
        headers: immutable,
      },

      // ── Gallery image folders ───────────────────────────────────────────────
      // FIX: These showed "None" TTL in PageSpeed → 891 KiB re-downloaded every visit
      { source: '/hiphop/:path*', headers: immutable },
      { source: '/ninos/:path*', headers: immutable },
      { source: '/talleres/:path*', headers: immutable },
      { source: '/hackathon/:path*', headers: immutable },
      { source: '/artivismo-img/:path*', headers: immutable },
      { source: '/cdi-amiguitos-a-jugar/:path*', headers: immutable },
      { source: '/cdi-caritas-alegres/:path*', headers: immutable },
      { source: '/cdi-gotitas-del-saber/:path*', headers: immutable },
      { source: '/cdi-pedacitos-de-amor/:path*', headers: immutable },

      // ── Security headers for ALL routes ────────────────────────────────────
      // CRITICAL: HTML must never be cached by CDN/Edge — only /_next/static/* is safe to cache
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(self "https://app.aikrofy.com"), geolocation=()' },
          // Best Practices: COOP for cross-origin isolation (allows PayPal popups)
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
        ],
      },

      // ── HTML documents: no CDN cache — prevents chunk hash mismatch after deploy ─
      {
        source: '/((?!_next/static|_next/image|favicon\\.ico|logos|icons|recursos_opt|hiphop|ninos|talleres|hackathon|artivismo-img|cdi-).*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
    ];
  },

  async redirects() {
    return [
      { source: '/es', destination: '/', permanent: false },
      { source: '/es/:path*', destination: '/:path*', permanent: false },
      { source: '/en', destination: '/', permanent: false },
      { source: '/en/:path*', destination: '/:path*', permanent: false },
      { source: '/pt', destination: '/', permanent: false },
      { source: '/pt/:path*', destination: '/:path*', permanent: false },
    ];
  },
};

export default nextConfig;
