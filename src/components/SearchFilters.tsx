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
    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-1 w-full max-w-4xl bg-white p-2 rounded-xl shadow-lg">
      <div className="grid grid-cols-2 md:flex md:flex-row items-center gap-1 w-full">
        <button 
          onClick={() => setShowChegada(!showChegada)}
          className="flex items-center gap-1.5 px-2 py-1.5 w-full rounded-lg md:rounded-full hover:bg-amber-50 transition text-left"
        >
          <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" /> 
          <div>
            <span className="block text-[8px] text-gray-400 font-semibold uppercase leading-none">Chegada</span>
            <span className="text-[11px] font-medium text-gray-700">Data</span>
          </div>
        </button>

        <button 
          onClick={() => setShowSaida(!showSaida)}
          className="flex items-center gap-1.5 px-2 py-1.5 w-full rounded-lg md:rounded-full hover:bg-amber-50 transition text-left"
        >
          <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" /> 
          <div>
            <span className="block text-[8px] text-gray-400 font-semibold uppercase leading-none">Saída</span>
            <span className="text-[11px] font-medium text-gray-700">Data</span>
          </div>
        </button>

        <button 
          onClick={() => setShowPessoas(!showPessoas)}
          className="flex items-center gap-1.5 px-2 py-1.5 w-full rounded-lg md:rounded-full hover:bg-amber-50 transition text-left"
        >
          <Users className="w-3.5 h-3.5 text-amber-600 shrink-0" /> 
          <div>
            <span className="block text-[8px] text-gray-400 font-semibold uppercase leading-none">Hóspedes</span>
            <span className="text-[11px] font-medium text-gray-700">Pessoas</span>
          </div>
        </button>

        <button 
          onClick={() => setShowPreco(!showPreco)}
          className="flex items-center gap-1.5 px-2 py-1.5 w-full rounded-lg md:rounded-full hover:bg-amber-50 transition text-left"
        >
          <Tag className="w-3.5 h-3.5 text-amber-600 shrink-0" /> 
          <div>
            <span className="block text-[8px] text-gray-400 font-semibold uppercase leading-none">Orçamento</span>
            <span className="text-[11px] font-medium text-gray-700">Preço</span>
          </div>
        </button>
      </div>

      <button 
        onClick={() => navigate('/quartos')}
        className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-1.5 w-full md:w-auto rounded-lg md:rounded-full text-xs font-medium hover:brightness-105 transition shadow md:ml-1 flex items-center justify-center shrink-0"
      >
        Pesquisar
      </button>
    </div>
  );
}