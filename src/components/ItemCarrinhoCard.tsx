import { Trash2, Plus, Minus } from 'lucide-react';
import type { Quarto } from '../pages/Rooms';

interface Crianca {
  id: string;
  idade: number;
}

interface ItemCarrinhoConfig {
  quartoId: string;
  adultos: number;
  criancas: Crianca[];
  chegada: string;
  saida: string;
}

interface ItemCarrinhoCardProps {
  quarto: Quarto;
  config: ItemCarrinhoConfig;
  noites: number;
  subtotalQuarto: number;
  totalHospedesQuarto: number;
  pagantesQuarto: number;
  criancasPagantes: number;
  excedeuCapacidade: boolean;
  onRemover: (id: string) => void;
  onAlterarAdultos: (quartoId: string, delta: number, capacidadeMax: number) => void;
  onAdicionarCrianca: (quartoId: string, capacidadeMax: number) => void;
  onRemoverCrianca: (quartoId: string, criancaId: string) => void;
  onAlterarIdadeCrianca: (quartoId: string, criancaId: string, novaIdade: number) => void;
  onAtualizarConfig: (quartoId: string, novaConfig: ItemCarrinhoConfig) => void;
}

export function ItemCarrinhoCard({
  quarto,
  config,
  noites,
  subtotalQuarto,
  totalHospedesQuarto,
  pagantesQuarto,
  criancasPagantes,
  excedeuCapacidade,
  onRemover,
  onAlterarAdultos,
  onAdicionarCrianca,
  onRemoverCrianca,
  onAlterarIdadeCrianca,
  onAtualizarConfig,
}: ItemCarrinhoCardProps) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-md border border-amber-100 flex flex-col gap-6 relative">
      {/* Topo do Card: Imagem, Nome e Botão Remover */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
        <div className="flex gap-4 items-center">
          <img 
            src={quarto.imagens[0]} 
            alt={quarto.nome} 
            className="w-24 h-24 rounded-2xl object-cover border border-amber-100 shadow-sm shrink-0" 
          />
          <div>
            <span className="text-[10px] font-bold tracking-wider text-amber-600 uppercase">ID: {quarto.id}</span>
            <h3 className="font-serif font-bold text-xl text-[#1a2b4c]">{quarto.nome}</h3>
            <p className="text-xs text-gray-500 line-clamp-1 mt-1">{quarto.descricao}</p>
            <span className="inline-block mt-2 text-xs font-semibold bg-amber-50 text-amber-800 px-2.5 py-1 rounded-md border border-amber-200">
              Capacidade máxima: {quarto.capacidade} pessoas
            </span>
          </div>
        </div>

        <button 
          onClick={() => onRemover(quarto.id)}
          className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-xl transition text-xs flex items-center gap-1 font-medium"
          title="Remover quarto"
        >
          <Trash2 className="w-4 h-4" /> Remover
        </button>
      </div>

      <hr className="border-gray-100" />

      {/* Configuração de Datas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Data de Entrada</label>
          <input 
            type="date" 
            value={config.chegada}
            onChange={(e) => onAtualizarConfig(quarto.id, { ...config, chegada: e.target.value })}
            className="w-full p-2 bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-700 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Data de Saída</label>
          <input 
            type="date" 
            value={config.saida}
            onChange={(e) => onAtualizarConfig(quarto.id, { ...config, saida: e.target.value })}
            className="w-full p-2 bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-700 shadow-sm"
          />
        </div>
      </div>

      {/* Configuração de Hóspedes */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-amber-50/40 p-4 rounded-2xl border border-amber-100">
          
          {/* Adultos */}
          <div className="flex items-center gap-3">
            <div>
              <span className="block text-xs font-bold text-[#1a2b4c]">Adultos</span>
              <span className="text-[10px] text-gray-500">A partir de 13 anos</span>
            </div>
            <div className="flex items-center gap-2 bg-white border border-amber-200 rounded-xl px-2 py-1 shadow-sm">
              <button 
                onClick={() => onAlterarAdultos(quarto.id, -1, quarto.capacidade)}
                className="w-6 h-6 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-amber-100 text-gray-700 transition"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-6 text-center text-xs font-bold">{config.adultos}</span>
              <button 
                onClick={() => onAlterarAdultos(quarto.id, 1, quarto.capacidade)}
                className="w-6 h-6 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-amber-100 text-gray-700 transition"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Crianças */}
          <div className="flex items-center gap-3">
            <div>
              <span className="block text-xs font-bold text-[#1a2b4c]">Crianças</span>
              <span className="text-[10px] text-gray-500">0 a 12 anos (Até 5 grátis)</span>
            </div>
            <button 
              onClick={() => onAdicionarCrianca(quarto.id, quarto.capacidade)}
              className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium px-3 py-1.5 rounded-xl shadow transition flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Adicionar Criança
            </button>
          </div>

        </div>

        {/* Listagem de Crianças */}
        {config.criancas.length > 0 && (
          <div className="space-y-2 bg-white p-3 rounded-xl border border-amber-200">
            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Idade das Crianças (Regra: Até 5 anos não pagam)</span>
            <div className="space-y-2">
              {config.criancas.map((crianca, idx) => (
                <div key={crianca.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg text-xs">
                  <span className="font-medium text-gray-700">Criança {idx + 1}</span>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <span className="text-gray-500 text-[10px]">Idade:</span>
                      <select 
                        value={crianca.idade}
                        onChange={(e) => onAlterarIdadeCrianca(quarto.id, crianca.id, parseInt(e.target.value))}
                        className="p-1 border rounded bg-white text-xs font-bold text-amber-700"
                      >
                        {Array.from({ length: 13 }, (_, i) => (
                          <option key={i} value={i}>{i} ano{i !== 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                    <button 
                      onClick={() => onRemoverCrianca(quarto.id, crianca.id)}
                      className="text-red-500 hover:text-red-700 text-xs font-bold px-2 py-1"
                    >
                      ✕ Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Alerta de Capacidade Ultrapassada */}
        {excedeuCapacidade && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl font-medium flex items-center gap-2">
            <span>⚠️</span> A quantidade total de hóspedes ({totalHospedesQuarto}) ultrapassa a capacidade máxima deste quarto ({quarto.capacidade}). Reduza o número de hóspedes.
          </div>
        )}
      </div>

      {/* Subtotal e Detalhes */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t border-gray-100 text-xs">
        <div className="space-y-1 text-gray-600">
          <p>Duração da estadia: <strong className="text-[#1a2b4c]">{noites} noite(s)</strong></p>
          <p>Hóspedes pagantes: <strong className="text-amber-700">{pagantesQuarto}</strong> (Adultos: {config.adultos} | Crianças &gt; 5 anos: {criancasPagantes})</p>
          <p>Crianças isentas (&le; 5 anos): <strong className="text-emerald-700">{config.criancas.filter(c => c.idade <= 5).length}</strong></p>
        </div>

        <div className="text-right mt-4 sm:mt-0">
          <span className="block text-[10px] text-gray-400 font-semibold uppercase">Subtotal do Quarto</span>
          <span className="text-2xl font-bold font-serif text-[#1a2b4c]">R$ {subtotalQuarto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
        </div>
      </div>
    </div>
  );
}