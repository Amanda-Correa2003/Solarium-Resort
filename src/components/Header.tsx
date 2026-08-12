import React from 'react';
import { SearchFilters } from './SearchFilters';

export function Header() {
  return (
    <header className="max-w-10xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4 bg-[#0a1b38]">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-400 flex items-center justify-center shadow-md">
          <span className="text-2xl">☀️</span>
        </div>
        <div>
          <h1 className="text-xl font-black tracking-widest text-[#f3d37a] uppercase leading-none">SOLARIUM</h1>
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#f3d37a] uppercase">RESORT</span>
        </div>
      </div>

      <SearchFilters />
    </header>
  );
}