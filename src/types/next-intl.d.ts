/**
 * Ambient module declarations for next-intl@4.9.1
 *
 * This file is needed because the installed version of next-intl does not ship
 * the expected barrel type declaration files that TypeScript resolves under
 * moduleResolution:"bundler". The .d.ts files referenced in the package.json
 * exports map (e.g. ./dist/types/index.react-client.d.ts) are absent from the
 * distribution, causing TS7016 errors.
 *
 * These declarations re-export from the actual .d.ts files that DO exist, or
 * provide minimal ambient shims so the project continues to type-check and build.
 */

// Core hooks (client-side)
declare module 'next-intl' {
  export { useTranslations, useLocale, useFormatter, useNow, useTimeZone } from 'next-intl/dist/types/index';
  export function useTranslations(namespace?: string): (key: string, values?: Record<string, unknown>) => string;
  export function useLocale(): string;
  export function NextIntlClientProvider(props: {
    locale: string;
    messages: Record<string, unknown>;
    children: React.ReactNode;
    timeZone?: string;
    now?: Date;
  }): JSX.Element;
}

// Server utilities
declare module 'next-intl/server' {
  export function getMessages(opts?: { locale?: string }): Promise<Record<string, unknown>>;
  export function getTranslations(namespace?: string): Promise<(key: string, values?: Record<string, unknown>) => string>;
  export function getLocale(): Promise<string>;
  export function getRequestConfig(fn: (opts: { requestLocale: Promise<string> }) => Promise<{ locale: string; messages: Record<string, unknown> }>): unknown;
}

// Middleware
declare module 'next-intl/middleware' {
  import type { NextMiddleware } from 'next/server';
  export default function createMiddleware(routing: unknown): NextMiddleware;
}

// Routing utilities
declare module 'next-intl/routing' {
  export function defineRouting(config: {
    locales: readonly string[];
    defaultLocale: string;
    localePrefix?: 'always' | 'as-needed' | 'never';
    pathnames?: Record<string, unknown>;
  }): {
    locales: readonly string[];
    defaultLocale: string;
    localePrefix: string;
  };
}

// Navigation utilities
declare module 'next-intl/navigation' {
  type RouterOptions = { locale?: string; scroll?: boolean };
  export function createNavigation(routing: unknown): {
    Link: React.ComponentType<React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; locale?: string }>;
    redirect: (href: string, type?: 'replace' | 'push') => never;
    useRouter: () => {
      push: (href: string, options?: RouterOptions) => void;
      replace: (href: string, options?: RouterOptions) => void;
      back: () => void;
    };
    usePathname: () => string;
    getPathname: (opts: { locale: string; href: string }) => string;
  };
}

// Next.js plugin
declare module 'next-intl/plugin' {
  import type { NextConfig } from 'next';
  export default function createNextIntlPlugin(requestConfigPath?: string): (config: NextConfig) => NextConfig;
}
