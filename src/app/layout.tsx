import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fundación Underlife — Pensamiento Divergente',
  description:
    'No solo asistimos a la vulnerabilidad; innovamos para erradicarla. Protección infantil, acceso tecnológico a la justicia y desarrollo comunitario en Ecuador.',
  keywords: [
    'Fundación Underlife',
    'ONG Ecuador',
    'desarrollo infantil',
    'innovación social',
    'donaciones',
    'pensamiento divergente',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
