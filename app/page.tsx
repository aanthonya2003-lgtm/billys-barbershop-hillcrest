import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { Services } from "@/components/Services";
import { BrandsMarquee } from "@/components/BrandsMarquee";

export default function Home() {
  return (
    <main>
      <Hero />
      <SocialProof />
      <Services />
      <BrandsMarquee />
    </main>
  );
}
