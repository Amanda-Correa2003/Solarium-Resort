import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const RESORT_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80",
    alt: "Restaurante"
  },
  {
    url: "https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=500&auto=format&fit=crop&q=60",
    alt: "Resort imagem piscina"
  },
  {
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop&q=60",
    alt: "Quarto do Resort"
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1687960116497-0dc41e1808a2?w=500&auto=format&fit=crop&q=60",
    alt: "Vista extra"
  }
];

export function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 3 >= RESORT_IMAGES.length ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, RESORT_IMAGES.length - 3) : prev - 1));
  };

  const visibleImages = RESORT_IMAGES.slice(currentIndex, currentIndex + 3);

  return (
    <div className="relative px-14">
      <button 
        onClick={prevSlide}
        className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 text-[#071328] p-3 rounded-full shadow-lg transition"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {visibleImages.map((image, index) => (
          <img 
            key={index} 
            src={image.url} 
            alt={image.alt} 
            className="rounded-2xl shadow-xl h-60 object-cover w-full transition-all duration-300 border border-white/10" 
          />
        ))}
      </div>

      <button 
        onClick={nextSlide}
        className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 text-[#071328] p-3 rounded-full shadow-lg transition"
        aria-label="Próximo"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}