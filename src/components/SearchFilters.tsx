import React, { useState } from 'react';
import { Calendar, Users, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function SearchFilters() {
  const navigate = useNavigate();
  const [showChegada, setShowChegada] = useState(false);
  const [showSaida, setShowSaida] = useState(false);
  const [showPessoas, setShowPessoas] = useState(false);
  const [showPreco, setShowPreco] = useState(false);

  return (
    <div className="bg-white/95 backdrop-blur-md border border-amber-200/60 rounded-full px-3 py-2 shadow-sm flex items-center gap-2 text-xs md:text-sm text-gray-700 relative">
      <button 
        onClick={() => setShowChegada(!showChegada)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-amber-50 transition text-left"
      >
        <Calendar className="w-4 h-4 text-amber-600 shrink-0" /> 
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
        <Calendar className="w-4 h-4 text-amber-600 shrink-0" /> 
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
        <Users className="w-4 h-4 text-amber-600 shrink-0" /> 
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
        <Tag className="w-4 h-4 text-amber-600 shrink-0" /> 
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
  );
}