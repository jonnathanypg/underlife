'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/sections/HeroSection';
import DNASection from '@/components/sections/DNASection';
const VolunteerSection = dynamic(() => import('@/components/sections/VolunteerSection'), {
  ssr: false,
});
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
      const scrollToHash = () => {
        try {
          const rawHash = window.location.hash.split('?')[0].split('&')[0];
          if (rawHash && /^#[a-zA-Z0-9_-]+$/.test(rawHash)) {
            const el = document.getElementById(rawHash.slice(1)) || document.querySelector(rawHash);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        } catch (err) {
          console.warn('Scroll to hash safely skipped:', err);
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
