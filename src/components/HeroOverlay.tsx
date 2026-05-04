export default function HeroOverlay() {
  return (
    <div className="fixed inset-0 z-20 flex flex-col justify-between pointer-events-none p-6 md:p-12 lg:p-20">
      
      {/* Top Navbar Area */}
      <header className="flex justify-between items-center w-full">
        <div className="text-2xl font-bold tracking-tighter text-white">
          RX<span className="text-[var(--color-neon-yellow)]">.</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium tracking-wide text-white/80">
          <span className="cursor-pointer hover:text-white transition-colors pointer-events-auto">Products</span>
          <span className="cursor-pointer hover:text-white transition-colors pointer-events-auto">Technology</span>
          <span className="cursor-pointer hover:text-white transition-colors pointer-events-auto">About</span>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex flex-col items-start max-w-5xl gap-8">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight">
          We are your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
            agricultural partner
          </span>
        </h1>
        
        <p className="max-w-xl text-lg md:text-xl text-white/70 font-light leading-relaxed">
          Elevate your farming precision with next-generation autonomous drone technology. 
          Scan, analyze, and optimize your yield seamlessly.
        </p>

        <button className="pointer-events-auto mt-4 px-8 py-4 bg-[var(--color-neon-yellow)] text-black font-semibold tracking-wide uppercase text-sm rounded-full shadow-[0_0_40px_rgba(255,215,0,0.3)] hover:scale-105 hover:shadow-[0_0_60px_rgba(255,215,0,0.5)] transition-all duration-300">
          Request a demo
        </button>
      </main>

      {/* Bottom Data Points */}
      <footer className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 w-full border-t border-white/10 pt-8 mt-12 backdrop-blur-sm">
        <div className="flex flex-col gap-1">
          <span className="text-3xl md:text-4xl font-bold text-white tracking-tight">91,372+</span>
          <span className="text-xs uppercase tracking-widest text-[var(--color-neon-yellow)] font-medium">Active Users</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-3xl md:text-4xl font-bold text-white tracking-tight">1.2M+</span>
          <span className="text-xs uppercase tracking-widest text-[var(--color-neon-yellow)] font-medium">Acres Scanned</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-3xl md:text-4xl font-bold text-white tracking-tight">99.8%</span>
          <span className="text-xs uppercase tracking-widest text-[var(--color-neon-yellow)] font-medium">Precision Rate</span>
        </div>
        <div className="flex flex-col gap-1 hidden md:flex">
          <span className="text-3xl md:text-4xl font-bold text-white tracking-tight">24/7</span>
          <span className="text-xs uppercase tracking-widest text-[var(--color-neon-yellow)] font-medium">Fleet Support</span>
        </div>
      </footer>
      
    </div>
  );
}
