import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CardCarrosselProps {
  imagens: string[];
  altBase: string;
}

export function CardCarrossel({ imagens, altBase }: CardCarrosselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? imagens.length - 1 : prev - 1));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === imagens.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative h-56 overflow-hidden group/carrossel bg-gray-100">
      <img 
        src={imagens[currentIndex]} 
        alt={`${altBase} - foto ${currentIndex + 1}`} 
        className="w-full h-full object-cover group-hover/carrossel:scale-105 transition duration-500" 
      />
      
      {imagens.length > 1 && (
        <>
          <button 
            type="button"
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1.5 rounded-full shadow opacity-0 group-hover/carrossel:opacity-100 transition"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <button 
            type="button"
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1.5 rounded-full shadow opacity-0 group-hover/carrossel:opacity-100 transition"
            aria-label="Próxima foto"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
            {imagens.map((_, idx) => (
              <span 
                key={idx} 
                className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-amber-400 w-3' : 'bg-white/60'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}