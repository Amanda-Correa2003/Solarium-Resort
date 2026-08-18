import React, { useState } from 'react';
import { CalendarDays, Users, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function SearchFilters() {
  const navigate = useNavigate();
  const [showChegada, setShowChegada] = useState(false);
  const [showSaida, setShowSaida] = useState(false);
  const [showPessoas, setShowPessoas] = useState(false);
  const [showPreco, setShowPreco] = useState(false);

  const handleToggle = (menu: 'chegada' | 'saida' | 'pessoas' | 'preco') => {
    setShowChegada(menu === 'chegada' ? !showChegada : false);
    setShowSaida(menu === 'saida' ? !showSaida : false);
    setShowPessoas(menu === 'pessoas' ? !showPessoas : false);
    setShowPreco(menu === 'preco' ? !showPreco : false);
  };

  return (
    <div className="relative">
      {/* Container: Vertical com bordas no mobile, horizontal e pílula no tablet/desktop (md:) */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-0.5 w-full md:max-w-4xl md:ml-auto md:mr-4 bg-white p-2 md:p-1.5 rounded-2xl md:rounded-full shadow-lg">
        <div className="grid grid-cols-2 md:flex md:flex-row items-center gap-0.5 w-full divide-y md:divide-y-0 divide-x divide-gray-200">
          
          {/* Botão Chegada */}
          <div className="relative w-full">
            <button 
              onClick={() => handleToggle('chegada')}
              className="flex items-center gap-2 px-3 py-2.5 md:py-2.5 w-full rounded-tl-2xl md:rounded-l-full md:rounded-r-none hover:bg-amber-50 transition text-left group"
            >
              <CalendarDays className="w-4 h-4 text-amber-600 group-hover:text-amber-700 shrink-0" /> 
              <div className="w-full">
                <span className="block text-[8px] text-gray-500 font-semibold uppercase leading-none tracking-wide">Chegada</span>
                <span className="text-xs md:text-sm font-semibold text-gray-900 truncate block mt-0.5">Adicionar data</span>
              </div>
            </button>

            {showChegada && (
              <div className="absolute top-full mt-2 left-0 bg-white rounded-2xl shadow-xl p-4 w-72 z-50 border border-gray-100">
                <p className="text-xs font-semibold text-gray-700 mb-2">Selecione a data de chegada</p>
                <input type="date" className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-amber-500" />
              </div>
            )}
          </div>

          {/* Botão Saída */}
          <div className="relative w-full">
            <button 
              onClick={() => handleToggle('saida')}
              className="flex items-center gap-2 px-3 py-2.5 md:py-2.5 w-full rounded-tr-2xl md:rounded-none hover:bg-amber-50 transition text-left group"
            >
              <CalendarDays className="w-4 h-4 text-amber-600 group-hover:text-amber-700 shrink-0" /> 
              <div className="w-full">
                <span className="block text-[8px] text-gray-500 font-semibold uppercase leading-none tracking-wide">Saída</span>
                <span className="text-xs md:text-sm font-semibold text-gray-900 truncate block mt-0.5">Adicionar data</span>
              </div>
            </button>

            {showSaida && (
              <div className="absolute top-full mt-2 left-0 bg-white rounded-2xl shadow-xl p-4 w-72 z-50 border border-gray-100">
                <p className="text-xs font-semibold text-gray-700 mb-2">Selecione a data de saída</p>
                <input type="date" className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-amber-500" />
              </div>
            )}
          </div>

          {/* Botão Hóspedes */}
          <div className="relative w-full">
            <button 
              onClick={() => handleToggle('pessoas')}
              className="flex items-center gap-2 px-3 py-2.5 md:py-2.5 w-full hover:bg-amber-50 transition text-left group"
            >
              <Users className="w-4 h-4 text-amber-600 group-hover:text-amber-700 shrink-0" /> 
              <div className="w-full">
                <span className="block text-[8px] text-gray-500 font-semibold uppercase leading-none tracking-wide">Hóspedes</span>
                <span className="text-xs md:text-sm font-semibold text-gray-900 truncate block mt-0.5">Quantas pessoas?</span>
              </div>
            </button>

            {showPessoas && (
              <div className="absolute top-full mt-2 left-0 bg-white rounded-2xl shadow-xl p-4 w-72 z-50 border border-gray-100">
                <p className="text-xs font-semibold text-gray-700 mb-2">Número de hóspedes</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total</span>
                  <input type="number" min="1" defaultValue="1" className="w-16 border border-gray-300 rounded-lg p-1 text-center text-sm focus:outline-none focus:border-amber-500" />
                </div>
              </div>
            )}
          </div>

          {/* Botão Orçamento */}
          <div className="relative w-full">
            <button 
              onClick={() => handleToggle('preco')}
              className="flex items-center gap-2 px-3 py-2.5 md:py-2.5 w-full hover:bg-amber-50 transition text-left group"
            >
              <DollarSign className="w-4 h-4 text-amber-600 group-hover:text-amber-700 shrink-0" /> 
              <div className="w-full">
                <span className="block text-[8px] text-gray-500 font-semibold uppercase leading-none tracking-wide">Orçamento</span>
                <span className="text-xs md:text-sm font-semibold text-gray-900 truncate block mt-0.5">Faixa de preço</span>
              </div>
            </button>

            {showPreco && (
              <div className="absolute top-full mt-2 right-0 bg-white rounded-2xl shadow-xl p-4 w-72 z-50 border border-gray-100">
                <p className="text-xs font-semibold text-gray-700 mb-2">Orçamento máximo</p>
                <input type="range" min="100" max="5000" step="100" className="w-full accent-amber-500" />
              </div>
            )}
          </div>
        </div>

        {/* Botão Pesquisar: Arredondado embaixo no mobile e ponta redonda à direita no tablet/desktop */}
        <button 
          onClick={() => navigate('/quartos')}
          className="bg-amber-500 text-white px-6 py-3 w-full md:w-auto rounded-b-xl md:rounded-r-full md:rounded-l-none text-sm md:text-base font-semibold hover:bg-amber-600 transition shadow-md flex items-center justify-center shrink-0 cursor-pointer"
        >
          Pesquisar
        </button>
      </div>
    </div>
  );
}