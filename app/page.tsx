import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { Services } from "@/components/Services";
import { Team } from "@/components/Team";
import { BrandsMarquee } from "@/components/BrandsMarquee";
import { StorySection } from "@/components/StorySection";
import { VisitUs } from "@/components/VisitUs";

export default function Home() {
  return (
    <main>
      <Hero />
      <SocialProof />
      <Services />
      <Team />
      <BrandsMarquee />
      <StorySection />
      <VisitUs />
    </main>
  );
}
