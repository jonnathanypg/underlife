import dynamic from 'next/dynamic';
import HeroSection from '@/components/sections/HeroSection';
import DNASection from '@/components/sections/DNASection';

const ImpactSection = dynamic(() => import('@/components/sections/ImpactSection'), {
  ssr: true,
});
const GalleriesSection = dynamic(() => import('@/components/sections/GalleriesSection'), {
  ssr: true,
});
const VolunteerSection = dynamic(() => import('@/components/sections/VolunteerSection'), {
  ssr: true,
});
const DonationSection = dynamic(() => import('@/components/sections/DonationSection'), {
  ssr: true,
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

