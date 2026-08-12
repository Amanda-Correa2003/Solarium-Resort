import React from 'react';
import { SunMedium, Gift, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PROMOTIONS_DATA = [
  {
    id: 'verao',
    title: 'Promoções de Verão',
    description: 'Descontos especiais para a estação mais quente do ano.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    icon: SunMedium,
  },
  {
    id: 'natal',
    title: 'Promoções de Natal',
    description: 'Celebre momentos mágicos com condições especiais.',
    image: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=600&q=80',
    icon: Gift,
  },
  {
    id: 'anonovo',
    title: 'Promoções de Ano Novo',
    description: 'Comece o novo ano em grande estilo com o Solarium Resort.',
    image: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?auto=format&fit=crop&w=600&q=80',
    icon: Sparkles,
  },
];

export function Promotions() {
  const navigate = useNavigate();

  return (
    <section className="max-w-6xl mx-auto px-6 pt-8 pb-16 text-center">
      <span className="text-xs uppercase tracking-[0.25em] text-amber-600 font-bold">Promoções Limitadas</span>
      <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#1a2b4c] mt-1 mb-2">Aproveite ofertas exclusivas</h3>
      <div className="flex justify-center items-center my-3">
        <span className="text-amber-600 text-sm">_______________________________</span>
      </div>
      <p className="text-xs text-gray-600 max-w-xl mx-auto mb-10">
        Viva experiências únicas com benefícios imperdíveis para cada estação do ano.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PROMOTIONS_DATA.map((promo) => {
          const IconComponent = promo.icon;
          return (
            <div key={promo.id} className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition border border-amber-100/80 flex flex-col text-left group">
              <div className="h-44 overflow-hidden relative">
                <img src={promo.image} alt={promo.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute top-4 left-4 w-10 h-10 bg-white/95 backdrop-blur rounded-full flex items-center justify-center shadow-md">
                  <IconComponent className="w-5 h-5 text-amber-600" />
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h4 className="font-serif font-bold text-xl text-[#1a2b4c] mb-1">{promo.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{promo.description}</p>
                </div>
                <button 
                  onClick={() => navigate(`/quartos?promo=${promo.id}`)}
                  className="mt-6 text-sm font-semibold text-amber-600 hover:text-amber-700 transition flex items-center gap-1"
                >
                  Ver ofertas →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}