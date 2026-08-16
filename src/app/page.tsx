'use client';

import dynamic from 'next/dynamic';
import HeroSection from '@/components/sections/HeroSection';
import DNASection from '@/components/sections/DNASection';
import VolunteerSection from '@/components/sections/VolunteerSection';

const ImpactSection = dynamic(() => import('@/components/sections/ImpactSection'), {
  ssr: false,
});
const GalleriesSection = dynamic(() => import('@/components/sections/GalleriesSection'), {
  ssr: false,
});
const DonationSection = dynamic(() => import('@/components/sections/DonationSection'), {
  ssr: false,
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DNASection />
      <ImpactSection />
      <GalleriesSection />
      <VolunteerSection />
      <DonationSection />
    </>
  );
}
