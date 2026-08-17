'use client';

import { useEffect } from 'react';
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
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash;
      const scrollToHash = () => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };

      // Try immediately and shortly after client components mount
      scrollToHash();
      const t1 = setTimeout(scrollToHash, 200);
      const t2 = setTimeout(scrollToHash, 600);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, []);

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
