'use client';

import { useEffect, useRef } from 'react';

const FRAME_COUNT = 186;

function currentFrame(index: number) {
  return `/drone-frames/drone_frame_%23%23%23%23${index.toString().padStart(8, '0')}.jpg`;
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    let animationFrameId: number;

    const preloadImages = () => {
      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        imagesRef.current[i] = img;
      }
    };

    const render = (image: HTMLImageElement) => {
      if (!image?.complete) return;
      
      const scale = Math.max(canvas.width / image.width, canvas.height / image.height);
      const x = (canvas.width / 2) - (image.width / 2) * scale;
      const y = (canvas.height / 2) - (image.height / 2) * scale;
      
      // Clear canvas before drawing
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, x, y, image.width * scale, image.height * scale);
    };

    let maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      render(imagesRef.current[frameIndexRef.current]);
      applyTransform(window.scrollY > 0 ? window.scrollY / maxScroll : 0);
    };

    const applyTransform = (fraction: number) => {
      if (canvasRef.current) {
        // Drone starts higher (Y: -100px), and moves down (Y: 100px) as you scroll down.
        // Therefore, scrolling up moves the drone higher.
        const translateY = (fraction * 200) - 100; 
        const scale = 1 + fraction * 0.15; // Zoom in as you scroll down
        canvasRef.current.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
      }
    };

    const updateImage = (index: number) => {
      frameIndexRef.current = index;
      if (imagesRef.current[index]) {
        render(imagesRef.current[index]);
      }
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      
      // Prevent division by zero
      const scrollFraction = maxScroll > 0 ? scrollTop / maxScroll : 0;
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.floor(scrollFraction * FRAME_COUNT)
      );

      // Apply continuous 3D parallax effect on every scroll tick for smoothness
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        if (frameIndex !== frameIndexRef.current) {
          updateImage(frameIndex);
        }
        applyTransform(scrollFraction);
      });
    };

    // Initialization
    preloadImages();
    handleResize();

    // Draw the first frame as soon as it loads
    const firstImage = imagesRef.current[0];
    if (firstImage) {
      if (firstImage.complete) {
        render(firstImage);
      } else {
        firstImage.onload = () => render(firstImage);
      }
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-screen z-0 bg-black">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover opacity-60 mix-blend-screen"
      />
      {/* Gradient overlay for better text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/50 z-10 pointer-events-none" />
    </div>
  );
}
