'use client';

import HeroSection from '@/components/sections/HeroSection';
import ArtivismoTourBannerSection from '@/components/sections/ArtivismoTourBannerSection';
import DNASection from '@/components/sections/DNASection';
import LeFriAppSection from '@/components/sections/LeFriAppSection';
import ImpactSection from '@/components/sections/ImpactSection';
import GalleriesSection from '@/components/sections/GalleriesSection';
import VolunteerSection from '@/components/sections/VolunteerSection';
import DonationSection from '@/components/sections/DonationSection';

export default function HomeClient() {
  return (
    <>
      <HeroSection />
      <ArtivismoTourBannerSection />
      <DNASection />
      <LeFriAppSection />
      <ImpactSection />
      <GalleriesSection />
      <VolunteerSection />
      <DonationSection />
    </>
  );
}
