// Locale-specific layout — delegates to root layout for wrapping.
// This file exists to satisfy the [locale] route segment.
export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
