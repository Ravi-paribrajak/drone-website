import HeroCanvas from "@/components/HeroCanvas";
import HeroOverlay from "@/components/HeroOverlay";
import BentoSection from "@/components/BentoSection";

export default function Home() {
  return (
    <main className="relative w-full bg-transparent">
      {/* 
        This container provides the scroll height needed to trigger the scroll animations.
        400vh gives enough room to scrub through the 186 frames comfortably.
      */}
      <div className="h-[400vh] w-full">
        {/* Sticky container that stays in place while scrolling */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <HeroCanvas />
          <HeroOverlay />
        </div>
      </div>
      
      {/* Additional content below the scroll sequence */}
      <BentoSection />
    </main>
  );
}
