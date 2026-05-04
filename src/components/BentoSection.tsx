'use client';

import { useEffect, useRef, useState } from 'react';

const TiltCard = ({ children, className, style }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,215,0,0.15) 0%, transparent 80%)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !glowRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    glowRef.current.style.background = `transparent`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`group relative rounded-3xl bg-zinc-900/40 backdrop-blur-md border border-white/10 overflow-hidden transition-all duration-500 ease-out will-change-transform hover:border-white/20 hover:shadow-2xl hover:shadow-[var(--color-neon-yellow)]/10 ${className}`}
    >
      <div ref={glowRef} className="absolute inset-0 z-0 pointer-events-none transition-colors duration-300" />
      <div className="relative z-10 h-full flex flex-col p-8 md:p-10">
        {children}
      </div>
    </div>
  );
};

export default function BentoSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative z-20 min-h-screen flex items-center justify-center text-white/50 pb-32 pt-24 bg-black/60 backdrop-blur-2xl border-t border-white/10 overflow-hidden"
    >
      {/* Background soft glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-neon-yellow)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl w-full px-6">
        <h2 
          className={`text-5xl md:text-7xl font-black text-white mb-20 text-center tracking-tighter transition-all duration-1000 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          Discover the <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/30">unseen.</span>
        </h2>
        
        {/* True Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[300px] gap-6">
          
          {/* Card 1: Large Feature */}
          <TiltCard 
            className={`md:col-span-2 lg:col-span-2 md:row-span-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
            style={{ transitionDelay: '100ms' }}
          >
            <div className="flex-1" />
            <h3 className="text-3xl font-bold text-white mb-4">LiDAR Topography</h3>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
              Map your fields with millimeter precision. Our dual-laser LiDAR system penetrates canopy covers to build exact 3D models of your terrain.
            </p>
            {/* Decorative mesh graphic could go here */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[var(--color-neon-yellow)]/20 to-transparent rounded-bl-full opacity-50 mix-blend-screen pointer-events-none" />
          </TiltCard>

          {/* Card 2: Medium Feature */}
          <TiltCard 
            className={`md:col-span-1 lg:col-span-2 md:row-span-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <h3 className="text-2xl font-bold text-white mb-3">Thermal Imaging</h3>
            <p className="text-zinc-400 leading-relaxed max-w-sm">
              Detect hydration stress before it's visible with high-resolution radiometric thermal sensors.
            </p>
            <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-orange-500/10 to-transparent pointer-events-none" />
          </TiltCard>

          {/* Card 3: Small Feature */}
          <TiltCard 
            className={`md:col-span-1 lg:col-span-1 md:row-span-1 flex flex-col items-center justify-center text-center ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="w-16 h-16 rounded-full border border-[var(--color-neon-yellow)]/30 flex items-center justify-center mb-6 relative group-hover:scale-110 transition-transform duration-500">
              <div className="w-8 h-8 rounded-full bg-[var(--color-neon-yellow)]/20 animate-pulse" />
              <div className="absolute inset-0 rounded-full border border-[var(--color-neon-yellow)] animate-ping opacity-20" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Real-time Sync</h3>
            <p className="text-zinc-500 text-sm">Instant uplink to your dashboard.</p>
          </TiltCard>

          {/* Card 4: Small Feature */}
          <TiltCard 
            className={`md:col-span-2 lg:col-span-1 md:row-span-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
            style={{ transitionDelay: '400ms' }}
          >
            <h3 className="text-xl font-bold text-white mb-3">Autonomous Routing</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Advanced pathfinding ensures 100% coverage with dynamic obstacle avoidance.
            </p>
            <div className="mt-auto pt-6 flex gap-2">
               <div className="h-1 flex-1 bg-[var(--color-neon-yellow)] rounded-full opacity-50" />
               <div className="h-1 flex-1 bg-[var(--color-neon-yellow)] rounded-full opacity-20" />
               <div className="h-1 flex-1 bg-[var(--color-neon-yellow)] rounded-full opacity-10" />
            </div>
          </TiltCard>

        </div>
      </div>
    </section>
  );
}
