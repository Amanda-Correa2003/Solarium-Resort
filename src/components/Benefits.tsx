import React from 'react';
import { ImageCarousel } from './ImageCarousel';

export function Benefits() {
  return (
    <section className="bg-[#071328] text-white py-16 px-6 relative">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#f3d37a] mb-2">Benefícios do Resort</h3>
        <div className="flex justify-center items-center mb-12">
          <span className="text-[#dba91e] text-sm"></span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="flex flex-col gap-2 items-center">
            <svg className="w-10 h-10 text-[#f3d37a]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path d="M13 2v8h8c0-4.42-3.58-8-8-8m6.32 13.89C20.37 14.54 21 12.84 21 11H6.44l-.95-2H2v2h2.22s1.89 4.07 2.12 4.42c-1.1.59-1.84 1.75-1.84 3.08C4.5 20.43 6.07 22 8 22c1.76 0 3.22-1.3 3.46-3h2.08c.24 1.7 1.7 3 3.46 3 1.93 0 3.5-1.57 3.5-3.5 0-1.04-.46-1.97-1.18-2.61M8 20c-.83 0-1.5-.67-1.5-1.5S7.17 17 8 17s1.5.67 1.5 1.5S8.83 20 8 20m9 0c-.83 0-1.5-.67-1.5-1.5S16.17 17 17 17s1.5.67 1.5 1.5S17.83 20 17 20"></path>
            </svg>
            <p className="font-medium text-sm text-gray-200">Crianças até 5 <br/> anos grátis.</p>
            <span className="text-[11px] text-gray-400">Diversão garantida para <br/>os pequenos hóspedes.</span>
          </div>
          
          <div className="flex flex-col gap-2 items-center">
            <svg className="w-10 h-10 text-[#f3d37a]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.9 2-2V5c0-1.11-.89-2-2-2m0 5h-2V5h2zM4 19h16v2H4z"></path>
            </svg>
            <p className="font-medium text-sm text-gray-200">Café da <br/> manhã incluso.</p>
            <span className="text-[11px] text-gray-400">Comece o dia com nosso <br/>café da manhã completo.</span>
          </div>

          <div className="flex flex-col gap-2 items-center">
            <svg className="w-10 h-10 text-[#f3d37a]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2zm-9-2h10V8H12zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5"></path>
            </svg>
            <p className="font-medium text-sm text-gray-200">Até 12x sem <br/> juros.</p>
            <span className="text-[11px] text-gray-400">Parcele sua estadia em até <br/>12x sem juros no cartão.</span>
          </div>

          <div className="flex flex-col gap-2 items-center">
            <svg className="w-10 h-10 text-[#f3d37a]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path d="m13.127 14.56 1.43-1.43 6.44 6.443L19.57 21zm4.293-5.73 2.86-2.86c-3.95-3.95-10.35-3.96-14.3-.02 3.93-1.3 8.31-.25 11.44 2.88M5.95 5.98c-3.94 3.95-3.93 10.35.02 14.3l2.86-2.86C5.7 14.29 4.65 9.91 5.95 5.98m.02-.02-.01.01c-.38 3.01 1.17 6.88 4.3 10.02l5.73-5.73c-3.13-3.13-7.01-4.68-10.02-4.3"></path>
            </svg>
            <p className="font-medium text-sm text-gray-200">Lazer <br/> completo.</p>
            <span className="text-[11px] text-gray-400">Piscinas, spa, atividades <br/>e muito mais para você.</span>
          </div>
        </div>

        <ImageCarousel />

        <div className="flex justify-center items-center gap-2 mt-8">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-white/30"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-white/30"></div>
        </div>
      </div>
    </section>
  );
}