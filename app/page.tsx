import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { Services } from "@/components/Services";
import { Team } from "@/components/Team";
import { BrandsMarquee } from "@/components/BrandsMarquee";
import { StorySection } from "@/components/StorySection";
import { VisitUs } from "@/components/VisitUs";
import { BookingCTA } from "@/components/BookingCTA";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { StickyCTA } from "@/components/StickyCTA";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <main>
        <Hero />
        <SocialProof />
        <Services />
        <Team />
        <BrandsMarquee />
        <StorySection />
        <VisitUs />
        <BookingCTA />
        <Footer />
      </main>
      <StickyCTA />
    </>
  );
}
