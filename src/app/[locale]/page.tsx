import HeroSection from '@/components/sections/HeroSection';
import DNASection from '@/components/sections/DNASection';
import ImpactSection from '@/components/sections/ImpactSection';
import CDIMarquee from '@/components/sections/CDIMarquee';
import GalleriesSection from '@/components/sections/GalleriesSection';
import VolunteerSection from '@/components/sections/VolunteerSection';
import DonationSection from '@/components/sections/DonationSection';
import ContactSection from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DNASection />
      <ImpactSection />
      <CDIMarquee />
      <GalleriesSection />
      <VolunteerSection />
      <DonationSection />
      <ContactSection />
    </>
  );
}
