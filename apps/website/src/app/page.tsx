import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { SegmentsSection } from '@/components/sections/SegmentsSection';
import { TechnologiesSection } from '@/components/sections/TechnologiesSection';
import { PartnersSection } from '@/components/sections/PartnersSection';
import { ContentSection } from '@/components/sections/ContentSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <SegmentsSection />
      <TechnologiesSection />
      <PartnersSection />
      <ContentSection />
    </>
  );
}
