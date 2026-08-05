import React, { useState } from 'react';
import { usePromotions } from '../services/queries';
import { SunMedium, Gift, Sparkles } from 'lucide-react';

export function Home() {
  const { data: promos } = usePromotions();
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Obrigado, ${nome}! Cadastrado com sucesso.`);
  };

  return (
    <div className="bg-[#0a4b77] min-h-screen text-[#2c231b] font-sans relative">
      
      {/* 1. HEADER / NAVBAR SUPERIOR */}
      <header className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-20 h-20 rounded-full bg-[#0b3169] flex items-center justify-center shadow-md border-4 border-[#ecc410]">
            <span className="text-4xl">☀️</span>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-wider text-[#ecc410] uppercase leading-none">SOLARIUM</h1>
            <span className="text-xs font-bold tracking-widest text-[#ecc410] uppercase">RESORT</span>
          </div>
        </div>

        {/* Barra de Filtros Flutuante Superior */}
        <div className="bg-white/90 backdrop-blur-md border border-[#ece90d] rounded-full px-4 py-2 shadow-sm flex items-center gap-3 text-sm">
          <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#1a7edb] rounded-full transition">
            <span>📅</span> data, ida e volta
          </button>
          <div className="h-4 w-[1px] bg-gray-300"></div>
          <button className="flex items-center gap-2 px-3 py-1. hover:bg-[#1a7edb] rounded-full transition">
            <span>👤</span> Pessoas
          </button>
          <div className="h-4 w-[1px] bg-gray-400"></div>
          <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#1a7edb] rounded-full transition">
            <span>💳</span> Preço
          </button>
          <button className="bg-[#c9c612] text-white px-5 py-2 rounded-full font-medium hover:bg-[#a89e13] transition shadow">
            Pesquisar
          </button>
        </div>
      </header>

      {/* 2. HERO SECTION COM IMAGEM DE FUNDO E ONDAS */}
      <section className="relative w-full bg-[#040d27] text-white flex flex-col justify-between shadow-md" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1920&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center', }}>
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="max-w-7xl mx-auto w-full px-6 pt-12 relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif text-yellow-600 drop-shadow-md leading-tight">
            Viva momentos <br />inesquecíveis
          </h2> 
          <p className="text-xl text-yellow-600 font-serif mt-2 drop-shadow">no paraíso.</p>
        </div>

        <div className="relative z-10 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-24 text-[#b0b309]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,90 350,-40 500,40 C650,120 900,20 1200,50 L1200,120 L0,120 Z" fill="currentColor"></path>
          </svg>
        </div>
      </section>

      {/* 3. PROMOÇÕES LIMITADAS */}
      <section className="max-w-5xl mx-auto bg-cyan-950 px-4 py-10 text-center">
        <h3 className="text-3xl font-serif font-bold text-yellow-600 tracking-wide mb-3">Promoções Limitadas</h3>
        <p className="text-sm md:text-base text-yellow-600 max-w-2xl mx-auto mb-8">
          Viva momentos inesquecíveis com tarifas e pacotes exclusivos. Garanta sua estadia dos sonhos com vantagens imperdíveis para cada estação do ano.
        </p>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
  
  {/* Card 1: Verão */}
  <div className="bg-white/90 backdrop-blur-sm border border-white/40 rounded-2xl p-8 shadow-lg hover:shadow-xl transition flex flex-col items-center text-center text-[#4A3B2C]">
    <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-4 shadow-sm">
      <SunMedium className="w-8 h-8 text-blue-900" />
    </div>
    <span className="font-semibold text-xl">Promoções de Verão</span>
  </div>

  {/* Card 2: Natal */}
  <div className="bg-white/90 backdrop-blur-sm border border-white/40 rounded-2xl p-8 shadow-lg hover:shadow-xl transition flex flex-col items-center text-center text-[#4A3B2C]">
    <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-4 shadow-sm">
      <Gift className="w-8 h-8 text-blue-900" />
    </div>
    <span className="font-semibold text-xl">Promoções de Natal</span>
  </div>

  {/* Card 3: Ano Novo */}
  <div className="bg-white/90 backdrop-blur-sm border border-white/40 rounded-2xl p-8 shadow-lg hover:shadow-xl transition flex flex-col items-center text-center text-[#4A3B2C]">
    <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 shadow-sm">
      <Sparkles className="w-8 h-8 text-blue-900" />
    </div>
    <span className="font-semibold text-xl">Promoções de Ano Novo</span>
  </div>

</div>
      </section>

      {/* 4. BENEFÍCIOS DO RESORT */}
      <section className="max-w-6xl mx-auto px-4 py-12 text-center border-t border-[#E5DFD3]">
        <h3 className="text-3xl font-serif font-bold text-[#000000] mb-10">Benefícios do Resort</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div className="flex flex-col gap-2 items-center">
            <span className="text-4xl mb-4  text-yellow-600">👥</span>
            <p className="font-medium text-sm">Crianças até 6 <br/> anos grátis.</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl mb-4 text-yellow-600">☕</span>
            <p className="font-medium text-sm">Café da <br/> manhã.</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl mb-4 text-yellow-600">✉️</span>
            <p className="font-medium text-sm">Até 12x sem <br/> juros</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl mb-4 text-yellow-600">🌐</span>
            <p className="font-medium text-sm">Lazer <br/> completo</p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 relative items-center">
          <img src="https://plus.unsplash.com/premium_photo-1687960116497-0dc41e1808a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVzb3J0fGVufDB8fDB8fHww" alt="Restaurante" className="rounded-xl shadow-md h-64 object-cover w-full" />
         <img src="https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlc29ydHxlbnwwfHwwfHx8MA%3D%3D" alt="resort imagem piscina" className="rounded-xl shadow-md h-64 object-cover w-full" />
          <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80" alt="Resort Vista" className="rounded-xl shadow-md h-64 object-cover w-full" />
        </div>

      </section>

      {/* 5. NEWSLETTER & ASSISTENTE VIRTUAL */}
      <section className="bg-[#dbd827] border-t border-b border-[#E3D9C3] py-10 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="w-full md:w-2/3">
            <h4 className="text-lg font-bold text-[#36451C] mb-4">Receba ofertas e novidades:</h4>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-[#5c4a38] mb-1">Nome</label>
                <input 
                  type="text" 
                  value={nome} 
                  onChange={(e) => setNome(e.target.value)} 
                  className="w-full bg-white/80 border border-[#D5CBB3] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#36451C]" 
                  required 
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-semibold text-[#5c4a38] mb-1">E-mail</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full bg-white/80 border border-[#D5CBB3] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#36451C]" 
                  required 
                />
              </div>
              <div className="flex items-end">
                <button type="submit" className="w-full sm:w-auto bg-[#36451C] text-white font-medium px-6 py-2 rounded-md hover:bg-[#2A3615] transition shadow">
                  ENVIAR
                </button>
              </div>
            </form>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-md relative max-w-[200px] text-xs font-medium text-center border border-[#E5DFD3]">
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45 border-r border-t border-[#E5DFD3]"></div>
              Olá! Eu sou o Sol, seu assistente virtual. Posso ajudar?
            </div>
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border border-[#36451C] text-3xl">
              🤖
            </div>
          </div>

        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="bg-[#EFEADB] py-12 px-4 border-t border-[#DED4BD]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          <div className="flex items-center gap-3">
            <div className="w-20 h-20 rounded-full bg-[#15218f] flex items-center justify-center shadow border-4 border-[#c0b412]">
              <span className="text-4xl">☀️</span>

            </div>
            <div>
              <h2 className="text-xl font-black tracking-wider text-yellow-500 uppercase leading-none">SOLARIUM</h2>
              <span className="text-xs font-bold tracking-widest text-yellow-500 uppercase">RESORT</span>
            </div>
          </div>

          <div className="space-y-2 text-sm text-[#4A3B2C]">
            <p className="flex items-center gap-2">
              <span>📞</span> (21) 99999-9999 / (21) 99999-9999
            </p>
            <p className="flex items-center gap-2">
              <span>✉️</span> reservas@solariumresort.com
            </p>
            <p className="flex items-center gap-2">
              <span>📍</span> Atendimento de Segunda a Sexta (08:00 – 17:00)
            </p>
          </div>

          <div className="flex items-center justify-start md:justify-end gap-4 text-2xl text-[#36451C]">
             <a href="#" className="hover:opacity-75 transition">𓇼 ⋆.˚ 𓆉 𓆝 𓆡⋆.˚ 𓇼</a>
          
            <a href="#" className="hover:opacity-75 transition">📷</a>
            <a href="#" className="hover:opacity-75 transition">​✈️​</a>
            <a href="#" className="hover:opacity-75 transition">▶️</a>
            <a href="#" className="hover:opacity-75 transition">🌎​</a>
            <a href="#" className="hover:opacity-75 transition">𓇼 ⋆.˚ 𓆉 𓆝 𓆡⋆.˚ 𓇼</a>
          </div>

        </div>
      </footer>

      {/* Botão de Chat Flutuante */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="w-12 h-12 bg-[#464e1f] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition">
          💬
        </button>
      </div>

    </div>
  );
}