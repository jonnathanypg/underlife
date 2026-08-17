import dynamic from 'next/dynamic';
import HeroSection from '@/components/sections/HeroSection';
import DNASection from '@/components/sections/DNASection';

const VolunteerSection = dynamic(() => import('@/components/sections/VolunteerSection'));
const ImpactSection = dynamic(() => import('@/components/sections/ImpactSection'));
const GalleriesSection = dynamic(() => import('@/components/sections/GalleriesSection'));
const DonationSection = dynamic(() => import('@/components/sections/DonationSection'));

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
