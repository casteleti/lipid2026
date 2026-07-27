import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { ApplicationsSection } from '@/components/sections/ApplicationsSection';
import { TechnologiesSection } from '@/components/sections/TechnologiesSection';
import { PartnersSection } from '@/components/sections/PartnersSection';
import { ContentSection } from '@/components/sections/ContentSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ApplicationsSection />
      <TechnologiesSection />
      <PartnersSection />
      <ContentSection />
    </>
  );
}
