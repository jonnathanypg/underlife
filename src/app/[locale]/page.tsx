import HeroSection from '@/components/sections/HeroSection';
import DNASection from '@/components/sections/DNASection';
import ImpactSection from '@/components/sections/ImpactSection';
// import CDIMarquee from '@/components/sections/CDIMarquee'; // Temporarily hidden
import GalleriesSection from '@/components/sections/GalleriesSection';
import VolunteerSection from '@/components/sections/VolunteerSection';
import DonationSection from '@/components/sections/DonationSection';
import ContactSection from '@/components/sections/ContactSection';

import { setRequestLocale } from 'next-intl/server';

export function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }, { locale: 'pt' }];
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <DNASection />
      <ImpactSection />
      {/* <CDIMarquee /> — Temporarily hidden */}
      <GalleriesSection />
      <VolunteerSection />
      <DonationSection />
      <ContactSection />
    </>
  );
}
