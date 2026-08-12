import React, { useState } from 'react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Obrigado, ${nome}! Cadastrado com sucesso.`);
  };

  return (
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
  );
}