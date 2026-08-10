import React, { useState } from 'react';
import { usePromotions } from '../services/queries';
import { ChevronLeft, ChevronRight, SunMedium, Gift, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const { data: promos } = usePromotions();
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const navigate = useNavigate();

  // Estados para os botões do filtro superior
  const [showChegada, setShowChegada] = useState(false);
  const [showSaida, setShowSaida] = useState(false);
  const [showPessoas, setShowPessoas] = useState(false);
  const [showPreco, setShowPreco] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Obrigado, ${nome}! Cadastrado com sucesso.`);
  };

  const resortImages = [
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

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 3 >= resortImages.length ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, resortImages.length - 3) : prev - 1));
  };

  const visibleImages = resortImages.slice(currentIndex, currentIndex + 3);

  return (
    <div className="bg-[#e4e1bd] min-h-screen  text-[#1a2b4c] font-sans relative overflow-x-hidden">
      
      {/* 1. HEADER / NAVBAR SUPERIOR COM BOTÕES INTERATIVOS */}
      <header className="max-w-10xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4 bg-[#0a1b38]">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-400 flex items-center justify-center shadow-md">
            <span className="text-2xl">☀️</span>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-widest text-[#f3d37a] uppercase leading-none">SOLARIUM</h1>
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#f3d37a] uppercase">RESORT</span>
          </div>
        </div>

        {/* Barra de Filtros com Botões Reais */}
        <div className="bg-white/95 backdrop-blur-md border border-amber-200/60 rounded-full px-3 py-2 shadow-sm flex items-center gap-2 text-xs md:text-sm text-gray-700 relative">
          
          <button 
            onClick={() => setShowChegada(!showChegada)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-amber-50 transition text-left"
          >
            <span className="text-amber-600">📅</span> 
            <div>
              <span className="block text-[10px] text-gray-400 font-semibold uppercase">Chegada</span>
              <span className="font-medium text-gray-700">Adicionar data</span>
            </div>
          </button>

          <div className="h-4 w-[1px] bg-gray-300"></div>

          <button 
            onClick={() => setShowSaida(!showSaida)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-amber-50 transition text-left"
          >
            <span className="text-amber-600">📅</span> 
            <div>
              <span className="block text-[10px] text-gray-400 font-semibold uppercase">Saída</span>
              <span className="font-medium text-gray-700">Adicionar data</span>
            </div>
          </button>

          <div className="h-4 w-[1px] bg-gray-300"></div>

          <button 
            onClick={() => setShowPessoas(!showPessoas)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-amber-50 transition text-left"
          >
            <span className="text-amber-600">👤</span> 
            <div>
              <span className="block text-[10px] text-gray-400 font-semibold uppercase">Hóspedes</span>
              <span className="font-medium text-gray-700">Quantas pessoas?</span>
            </div>
          </button>

          <div className="h-4 w-[1px] bg-gray-300"></div>

          <button 
            onClick={() => setShowPreco(!showPreco)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-amber-50 transition text-left"
          >
            <span className="text-amber-600">🏷️</span> 
            <div>
              <span className="block text-[10px] text-gray-400 font-semibold uppercase">Orçamento</span>
              <span className="font-medium text-gray-700">Faixa de preço</span>
            </div>
          </button>

          <button 
  onClick={() => navigate('/quartos')}
  className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-2.5 rounded-full font-medium hover:brightness-105 transition shadow ml-2"
>
  Pesquisar
</button>
        </div>
      </header>

      {/* 2. HERO SECTION COM ONDA AMARELA */}
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

        {/* Onda de transição com a cor amarela (#f3d37a) */}
        <div className="relative z-10 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-16 text-[#b8870e]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,90 350,-40 500,40 C650,120 900,20 1200,50 L1200,120 L0,120 Z" fill="#c79a29"></path>
          </svg>
        </div>
      </section>

      {/* 3. PROMOÇÕES LIMITADAS */}
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
          
          <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition border border-amber-100/80 flex flex-col text-left group">
            <div className="h-44 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80" alt="Verão" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute top-4 left-4 w-10 h-10 bg-white/95 backdrop-blur rounded-full flex items-center justify-center shadow-md">
                <SunMedium className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1 justify-between">
              <div>
                <h4 className="font-serif font-bold text-xl text-[#1a2b4c] mb-1">Promoções de Verão</h4>
                <p className="text-xs text-gray-500 leading-relaxed">Descontos especiais para a estação mais quente do ano.</p>
              </div>
             <button 
  onClick={() => navigate('/quartos?promo=verao')}
  className="..."
>
  Ver ofertas
</button>
            </div>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition border border-amber-100/80 flex flex-col text-left group">
            <div className="h-44 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=600&q=80" alt="Natal" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute top-4 left-4 w-10 h-10 bg-white/95 backdrop-blur rounded-full flex items-center justify-center shadow-md">
                <Gift className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1 justify-between">
              <div>
                <h4 className="font-serif font-bold text-xl text-[#1a2b4c] mb-1">Promoções de Natal</h4>
                <p className="text-xs text-gray-500 leading-relaxed">Celebre momentos mágicos com condições especiais.</p>
              </div>
              <button 
  onClick={() => navigate('/quartos?promo=natal')}
  className="..."
>
  Ver ofertas
</button>
            </div>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition border border-amber-100/80 flex flex-col text-left group">
            <div className="h-44 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1467810563316-b5476525c0f9?auto=format&fit=crop&w=600&q=80" alt="Ano Novo" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute top-4 left-4 w-10 h-10 bg-white/95 backdrop-blur rounded-full flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1 justify-between">
              <div>
                <h4 className="font-serif font-bold text-xl text-[#1a2b4c] mb-1">Promoções de Ano Novo</h4>
                <p className="text-xs text-gray-500 leading-relaxed">Comece o novo ano em grande estilo com o Solarium Resort.</p>
              </div>
              <button 
  onClick={() => navigate('/quartos?promo=anonovo')}
  className="..."
>
  Ver ofertas
</button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. BENEFÍCIOS DO RESORT & CARROSSEL */}
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

          {/* Carrossel de Imagens */}
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

          {/* Indicadores do carrossel */}
          <div className="flex justify-center items-center gap-2 mt-8">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-white/30"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-white/30"></div>
          </div>

        </div>
      </section>

      {/* 5. NEWSLETTER & ASSISTENTE VIRTUAL */}
      <section className="bg-[#c79a29] py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="w-full md:w-2/3 text-left">
            <h4 className="text-xl font-serif font-bold text-[#1a2b4c] mb-1">Receba ofertas e novidades</h4>
            <p className="text-xs text-gray-700 mb-4">Cadastre-se e fique por dentro das melhores promoções do Solarium Resort.</p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input 
                  type="text" 
                  placeholder="Seu nome"
                  value={nome} 
                  onChange={(e) => setNome(e.target.value)} 
                  className="w-full bg-white border border-amber-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-600 shadow-sm" 
                  required 
                />
              </div>
              <div className="flex-1">
                <input 
                  type="email" 
                  placeholder="Seu e-mail"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full bg-white border border-amber-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-600 shadow-sm" 
                  required 
                />
              </div>
              <div>
                <button type="submit" className="w-full sm:w-auto bg-amber-600 text-white font-medium px-8 py-2.5 rounded-lg hover:bg-amber-700 transition shadow">
                  ENVIAR
                </button>
              </div>
            </form>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-md relative max-w-[210px] text-xs font-medium text-gray-700 border border-amber-100">
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45 border-r border-t border-amber-100"></div>
              Olá! Eu sou o Sol, seu assistente virtual. Posso ajudar?
            </div>
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md border border-amber-300 text-2xl shrink-0">
              🌞
            </div>
          </div>

        </div>
      </section>

     
             {/* 6. FOOTER */}
      <footer className="bg-[#EFEADB] py-12 px-4 border-t border-[#DED4BD]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          <div className="flex items-center gap-3">
            <div className="w-20 h-20 rounded-full bg-[#d69c0a] flex items-center justify-center shadow border-4 border-[#c0b412]">
              <span className="text-4xl">☀️</span>
            </div>
            <div>
              <h2 className="text-xl font-black tracking-wider text-yellow-500 uppercase leading-none">SOLARIUM</h2>
              <span className="text-xs font-bold tracking-widest text-yellow-500 uppercase">RESORT</span>
            </div>
          </div>

          <div className="space-y-2 text-sm text-[#4A3B2C]">
            <p className="flex items-center gap-2">
              <span>  
                <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02z"></path>
                </svg>
              </span> (21) 99999-9999 / (21) 99999-9999
            </p>
            <p className="flex items-center gap-2">
              <span>  
                <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57V12c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.6 3.5-3.57V12c0-5.52-4.48-10-10-10m0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3"></path>
                </svg>
              </span> reservas@solariumresort.com
            </p>
            <p className="flex items-center gap-2">
              <span>  
                <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path d="M9.996 14c.21 0 .39-.072.535-.216a.72.72 0 0 0 .219-.534v-3.5a.728.728 0 0 0-.214-.534.72.72 0 0 0-.532-.216.734.734 0 0 0-.535.216.72.72 0 0 0-.219.534v3.5c0 .213.071.39.214.534a.72.72 0 0 0 .532.216Zm0-6.5c.21 0 .39-.071.535-.214a.714.714 0 0 0 .219-.532.736.736 0 0 0-.214-.535.714.714 0 0 0-.532-.219.736.736 0 0 0-.535.214.714.714 0 0 0-.219.532c0 .21.071.39.214.535.143.146.32.219.532.219Zm.01 10.5a7.81 7.81 0 0 1-3.11-.625 8.065 8.065 0 0 1-2.552-1.719 8.066 8.066 0 0 1-1.719-2.551A7.818 7.818 0 0 1 2 9.99c0-1.104.208-2.14.625-3.105a8.066 8.066 0 0 1 4.27-4.26A7.818 7.818 0 0 1 10.009 2a7.75 7.75 0 0 1 3.106.625 8.083 8.083 0 0 1 4.26 4.265A7.77 7.77 0 0 1 18 9.994a7.81 7.81 0 0 1-.625 3.11 8.066 8.066 0 0 1-1.719 2.552 8.083 8.083 0 0 1-2.546 1.719 7.77 7.77 0 0 1-3.104.625Z"/>
                </svg>
              </span> Atendimento de Segunda a Sexta (08:00 – 17:00)
            </p>
          </div>

          <div className="flex items-center justify-start md:justify-end gap-4 text-2xl text-[#36451C]">
            <a href="#" className="hover:opacity-75 transition">𓇼 ⋆.˚ 𓆉 𓆝 𓆡⋆.˚ 𓇼</a>
            <a href="https://www.instagram.com/projetosdev.amanda?igsh=YTB4dXB4NzlicjFt" className="hover:opacity-75 transition">
              <svg className="w-8 h-8 text-blue-900" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
              </svg>
            </a>
            <a href="https://github.com/Amanda-Correa2003" className="hover:opacity-75 transition">
              <svg className="w-8 h-8 text-blue-900" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 010-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 010 2.93c.83.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0012 1.27"></path>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/amanda-corrêa-machado-72a525258/" className="hover:opacity-75 transition">
              <svg className="w-8 h-8 text-blue-900" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path>
              </svg>
            </a>
          </div>
        </div>
      </footer>

      {/* Botão de Chat Flutuante */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="w-14 h-14 bg-amber-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition text-xl" aria-label="Abrir Chat">
          💬
        </button>
      </div>

    </div>
  );
}