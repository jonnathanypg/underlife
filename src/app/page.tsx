'use client';

import HeroSection from '@/components/sections/HeroSection';
import DNASection from '@/components/sections/DNASection';
import ImpactSection from '@/components/sections/ImpactSection';
import GalleriesSection from '@/components/sections/GalleriesSection';
import VolunteerSection from '@/components/sections/VolunteerSection';
import DonationSection from '@/components/sections/DonationSection';

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
