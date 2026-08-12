import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const navigate = useNavigate();

  return (
    <section 
      className="relative w-full bg-[#071328] text-white flex flex-col justify-between pt-16" 
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(5,13,30,0.5), rgba(5,13,30,0.7)), url('https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1920&q=80')`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}
    >
      <div className="max-w-7xl mx-auto w-full px-8 pb-28 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl md:text-6xl font-serif text-white tracking-wide drop-shadow-lg leading-tight">
            Viva momentos <br />
            <span className="text-[#f1cc64]">inesquecíveis</span> <br />
            no paraíso.
          </h2> 
          <p className="text-sm md:text-base text-gray-200 mt-4 max-w-md font-light">
            Conforto, lazer e natureza em perfeita harmonia para você viver o extraordinário.
          </p>
        </div>
        <button 
          onClick={() => navigate('/quartos')}
          className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium px-8 py-3.5 rounded-xl shadow-xl hover:brightness-105 transition tracking-wide text-sm"
        >
          RESERVE AGORA →
        </button>
      </div>

      <div className="relative z-10 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-16 text-[#b8870e]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C150,90 350,-40 500,40 C650,120 900,20 1200,50 L1200,120 L0,120 Z" fill="#c79a29"></path>
        </svg>
      </div>
    </section>
  );
}