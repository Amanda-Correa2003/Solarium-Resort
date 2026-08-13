import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavbarQuartosProps {
  chegada: string;
  setChegada: (val: string) => void;
  saida: string;
  setSaida: (val: string) => void;
  pessoas: string;
  setPessoas: (val: string) => void;
  precoMax: string;
  setPrecoMax: (val: string) => void;
  onBuscar: (e: React.FormEvent) => void;
}

export function NavbarQuartos({
  chegada, setChegada,
  saida, setSaida,
  pessoas, setPessoas,
  precoMax, setPrecoMax,
  onBuscar
}: NavbarQuartosProps) {
  const navigate = useNavigate();
  const [showChegada, setShowChegada] = useState(false);
  const [showSaida, setShowSaida] = useState(false);
  const [showPessoas, setShowPessoas] = useState(false);
  const [showPreco, setShowPreco] = useState(false);

  return (
    <header className="max-w-10xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4 bg-[#0a1b38] sticky top-0 z-50 shadow-md">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-400 flex items-center justify-center shadow-md">
          <span className="text-2xl">☀️</span>
        </div>
        <div>
          <h1 className="text-xl font-black tracking-widest text-[#f3d37a] uppercase leading-none">SOLARIUM</h1>
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#f3d37a] uppercase">RESORT</span>
        </div>
      </div>

      <form onSubmit={onBuscar} className="bg-white/95 backdrop-blur-md border border-amber-200/60 rounded-full px-3 py-2 shadow-sm flex items-center gap-2 text-xs md:text-sm text-gray-700 relative">
        <div className="relative">
          <button 
            type="button"
            onClick={() => { setShowChegada(!showChegada); setShowSaida(false); setShowPessoas(false); setShowPreco(false); }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-amber-50 transition text-left"
          >
            <span className="text-amber-600">📅</span> 
            <div>
              <span className="block text-[10px] text-gray-400 font-semibold uppercase">Chegada</span>
              <span className="font-medium text-gray-700">{chegada || 'Adicionar data'}</span>
            </div>
          </button>
          {showChegada && (
            <div className="absolute top-12 left-0 bg-white p-3 rounded-xl shadow-xl border border-gray-200 z-50 w-48">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Data de Chegada</label>
              <input 
                type="date" 
                value={chegada} 
                onChange={(e) => setChegada(e.target.value)}
                className="w-full mt-1 p-1.5 border rounded text-xs text-gray-800"
              />
              <button type="button" onClick={() => setShowChegada(false)} className="mt-2 w-full bg-amber-600 text-white py-1 rounded text-xs">OK</button>
            </div>
          )}
        </div>

        <div className="h-4 w-[1px] bg-gray-300"></div>

        <div className="relative">
          <button 
            type="button"
            onClick={() => { setShowSaida(!showSaida); setShowChegada(false); setShowPessoas(false); setShowPreco(false); }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-amber-50 transition text-left"
          >
            <span className="text-amber-600">📅</span> 
            <div>
              <span className="block text-[10px] text-gray-400 font-semibold uppercase">Saída</span>
              <span className="font-medium text-gray-700">{saida || 'Adicionar data'}</span>
            </div>
          </button>
          {showSaida && (
            <div className="absolute top-12 left-0 bg-white p-3 rounded-xl shadow-xl border border-gray-200 z-50 w-48">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Data de Saída</label>
              <input 
                type="date" 
                value={saida} 
                onChange={(e) => setSaida(e.target.value)}
                className="w-full mt-1 p-1.5 border rounded text-xs text-gray-800"
              />
              <button type="button" onClick={() => setShowSaida(false)} className="mt-2 w-full bg-amber-600 text-white py-1 rounded text-xs">OK</button>
            </div>
          )}
        </div>

        <div className="h-4 w-[1px] bg-gray-300"></div>

        <div className="relative">
          <button 
            type="button"
            onClick={() => { setShowPessoas(!showPessoas); setShowChegada(false); setShowSaida(false); setShowPreco(false); }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-amber-50 transition text-left"
          >
            <span className="text-amber-600">👤</span> 
            <div>
              <span className="block text-[10px] text-gray-400 font-semibold uppercase">Hóspedes</span>
              <span className="font-medium text-gray-700">{pessoas ? `${pessoas} pessoa(s)` : 'Quantas pessoas?'}</span>
            </div>
          </button>
          {showPessoas && (
            <div className="absolute top-12 left-0 bg-white p-3 rounded-xl shadow-xl border border-gray-200 z-50 w-48">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Qtd de Hóspedes</label>
              <select 
                value={pessoas} 
                onChange={(e) => setPessoas(e.target.value)}
                className="w-full mt-1 p-1.5 border rounded text-xs text-gray-800 bg-white"
              >
                <option value="">Qualquer quantidade</option>
                <option value="1">1 Hóspede</option>
                <option value="2">2 Hóspedes</option>
                <option value="3">3 Hóspedes</option>
                <option value="4">4 Hóspedes</option>
                <option value="5">5+ Hóspedes</option>
              </select>
              <button type="button" onClick={() => setShowPessoas(false)} className="mt-2 w-full bg-amber-600 text-white py-1 rounded text-xs">OK</button>
            </div>
          )}
        </div>

        <div className="h-4 w-[1px] bg-gray-300"></div>

        <div className="relative">
          <button 
            type="button"
            onClick={() => { setShowPreco(!showPreco); setShowChegada(false); setShowSaida(false); setShowPessoas(false); }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-amber-50 transition text-left"
          >
            <span className="text-amber-600">🏷️</span> 
            <div>
              <span className="block text-[10px] text-gray-400 font-semibold uppercase">Orçamento</span>
              <span className="font-medium text-gray-700">{precoMax ? `Até R$ ${precoMax}` : 'Faixa de preço'}</span>
            </div>
          </button>
          {showPreco && (
            <div className="absolute top-12 left-0 bg-white p-3 rounded-xl shadow-xl border border-gray-200 z-50 w-52">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Preço Máximo por Noite</label>
              <input 
                type="number" 
                placeholder="Ex: 1000" 
                value={precoMax} 
                onChange={(e) => setPrecoMax(e.target.value)}
                className="w-full mt-1 p-1.5 border rounded text-xs text-gray-800"
              />
              <button type="button" onClick={() => setShowPreco(false)} className="mt-2 w-full bg-amber-600 text-white py-1 rounded text-xs">OK</button>
            </div>
          )}
        </div>

        <button type="submit" className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-2.5 rounded-full font-medium hover:brightness-105 transition shadow ml-2">
          Pesquisar
        </button>
      </form>
    </header>
  );
}