import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,  
  ShieldCheck, 
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { quartosData } from './Rooms';
import type { Quarto } from './Rooms';
import { ItemCarrinhoCard } from '../components/ItemCarrinhoCard';

interface Crianca {
  id: string;
  idade: number;
}

interface ItemCarrinhoState {
  quartoId: string;
  adultos: number;
  criancas: Crianca[];
  chegada: string;
  saida: string;
}

export function CarrinhoPage() {
  const navigate = useNavigate();

  const [carrinhoIds, setCarrinhoIds] = useState<string[]>(() => {
    const saved = sessionStorage.getItem('solarium_carrinho');
    return saved ? JSON.parse(saved) : [];
  });

  const [detalhesReserva, setDetalhesReserva] = useState<Record<string, ItemCarrinhoState>>(() => {
    const saved = sessionStorage.getItem('solarium_carrinho');
    const ids: string[] = saved ? JSON.parse(saved) : [];
    const inicial: Record<string, ItemCarrinhoState> = {};
    
    ids.forEach((id: string) => {
      inicial[id] = {
        quartoId: id,
        adultos: 2,
        criancas: [],
        chegada: '2026-09-10',
        saida: '2026-09-13',
      };
    });
    return inicial;
  });

  const removerDoCarrinho = (id: string) => {
    const novosIds = carrinhoIds.filter((item: string) => item !== id);
    setCarrinhoIds(novosIds);
    sessionStorage.setItem('solarium_carrinho', JSON.stringify(novosIds));
  };

  const alterarAdultos = (quartoId: string, delta: number, capacidadeMax: number) => {
    setDetalhesReserva(prev => {
      const atual = prev[quartoId] || { quartoId, adultos: 2, criancas: [], chegada: '', saida: '' };
      const novoAdultos = Math.max(1, atual.adultos + delta);
      const totalHospedes = novoAdultos + atual.criancas.length;
      
      if (totalHospedes > capacidadeMax) return prev;

      return {
        ...prev,
        [quartoId]: { ...atual, adultos: novoAdultos }
      };
    });
  };

  const adicionarCrianca = (quartoId: string, capacidadeMax: number) => {
    setDetalhesReserva(prev => {
      const atual = prev[quartoId] || { quartoId, adultos: 2, criancas: [], chegada: '', saida: '' };
      const totalHospedes = atual.adultos + atual.criancas.length;

      if (totalHospedes >= capacidadeMax) return prev;

      const novasCriancas = [...atual.criancas, { id: Math.random().toString(), idade: 3 }];
      return {
        ...prev,
        [quartoId]: { ...atual, criancas: novasCriancas }
      };
    });
  };

  const removerCrianca = (quartoId: string, criancaId: string) => {
    setDetalhesReserva(prev => {
      const atual = prev[quartoId];
      if (!atual) return prev;
      return {
        ...prev,
        [quartoId]: { ...atual, criancas: atual.criancas.filter(c => c.id !== criancaId) }
      };
    });
  };

  const alterarIdadeCrianca = (quartoId: string, criancaId: string, novaIdade: number) => {
    setDetalhesReserva(prev => {
      const atual = prev[quartoId];
      if (!atual) return prev;
      return {
        ...prev,
        [quartoId]: {
          ...atual,
          criancas: atual.criancas.map(c => c.id === criancaId ? { ...c, idade: novaIdade } : c)
        }
      };
    });
  };

  const atualizarConfigQuarto = (quartoId: string, novaConfig: ItemCarrinhoState) => {
    setDetalhesReserva(prev => ({
      ...prev,
      [quartoId]: novaConfig
    }));
  };

  const calcularNoites = (chegada: string, saida: string) => {
    if (!chegada || !saida) return 1;
    const d1 = new Date(chegada);
    const d2 = new Date(saida);
    const diffTime = d2.getTime() - d1.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const quartosNoCarrinho: Quarto[] = quartosData.filter(q => carrinhoIds.includes(q.id));

  let subtotalGeral = 0;
  let totalHospedesGeral = 0;
  let totalAdultosGeral = 0;
  let totalCriancasGeral = 0;

  quartosNoCarrinho.forEach(quarto => {
    const config = detalhesReserva[quarto.id] || { quartoId: quarto.id, adultos: 2, criancas: [], chegada: '2026-09-10', saida: '2026-09-13' };
    const noites = calcularNoites(config.chegada, config.saida);
    const criancasPagantes = config.criancas.filter(c => c.idade > 5).length;
    const hospedesPagantes = config.adultos + criancasPagantes;

    subtotalGeral += quarto.precoPorNoite * noites * hospedesPagantes;
    totalAdultosGeral += config.adultos;
    totalCriancasGeral += config.criancas.length;
    totalHospedesGeral += config.adultos + config.criancas.length;
  });

  const totalGeral = subtotalGeral;

  return (
    <div className="bg-[#e4e1bd] min-h-screen text-[#1a2b4c] font-sans relative overflow-x-hidden flex flex-col justify-between">
      <div>
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

          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/quartos')}
              className="bg-white/10 hover:bg-white/20 text-[#f3d37a] px-4 py-2 rounded-full text-xs font-medium transition border border-amber-400/30 flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" /> Continuar Escolhendo Quartos
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-10">
          <div className="mb-8">
            <button 
              onClick={() => navigate('/quartos')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#1a2b4c] bg-white/60 hover:bg-white px-4 py-2 rounded-full shadow-sm transition border border-amber-200"
            >
              <ArrowLeft className="w-4 h-4 text-amber-600" /> Voltar para Quartos
            </button>
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-amber-200/80 p-6 md:p-8 rounded-3xl shadow-md mb-10">
            <span className="text-xs uppercase tracking-[0.25em] text-amber-600 font-bold">Reserva Solarium Resort</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1a2b4c] mt-1">
              Sua reserva
            </h2>
            <p className="text-xs md:text-sm text-gray-600 mt-2">
              Revise os quartos selecionados e configure os detalhes da sua estadia. <strong className="text-amber-700">({carrinhoIds.length} quarto(s) no carrinho)</strong>
            </p>
          </div>

          {quartosNoCarrinho.length === 0 ? (
            <div className="bg-white/90 backdrop-blur border border-amber-200 rounded-3xl p-12 text-center max-w-xl mx-auto shadow-sm">
              <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                🛒
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#1a2b4c] mb-2">Seu carrinho está vazio</h3>
              <p className="text-xs text-gray-600 mb-6 leading-relaxed">
                Escolha um dos nossos quartos para começar sua reserva e vivenciar momentos inesquecíveis.
              </p>
              <button 
                onClick={() => navigate('/quartos')}
                className="bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs px-6 py-3 rounded-xl transition shadow"
              >
                Ver quartos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2 space-y-6">
                {quartosNoCarrinho.map((quarto) => {
                  const config = detalhesReserva[quarto.id] || { quartoId: quarto.id, adultos: 2, criancas: [], chegada: '2026-09-10', saida: '2026-09-13' };
                  const noites = calcularNoites(config.chegada, config.saida);
                  const totalHospedesQuarto = config.adultos + config.criancas.length;
                  const excedeuCapacidade = totalHospedesQuarto > quarto.capacidade;
                  const criancasPagantes = config.criancas.filter(c => c.idade > 5).length;
                  const pagantesQuarto = config.adultos + criancasPagantes;
                  const subtotalQuarto = quarto.precoPorNoite * noites * pagantesQuarto;

                  return (
                    <ItemCarrinhoCard
                      key={quarto.id}
                      quarto={quarto}
                      config={config}
                      noites={noites}
                      subtotalQuarto={subtotalQuarto}
                      totalHospedesQuarto={totalHospedesQuarto}
                      pagantesQuarto={pagantesQuarto}
                      criancasPagantes={criancasPagantes}
                      excedeuCapacidade={excedeuCapacidade}
                      onRemover={removerDoCarrinho}
                      onAlterarAdultos={alterarAdultos}
                      onAdicionarCrianca={adicionarCrianca}
                      onRemoverCrianca={removerCrianca}
                      onAlterarIdadeCrianca={alterarIdadeCrianca}
                      onAtualizarConfig={atualizarConfigQuarto}
                    />
                  );
                })}
              </div>

              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-amber-200 sticky top-24">
                <div className="flex items-center gap-2 text-amber-600 mb-2">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">Resumo da Reserva</span>
                </div>
                
                <h3 className="font-serif font-bold text-2xl text-[#1a2b4c] mb-6">Detalhes do Valor</h3>

                <div className="space-y-3 text-xs text-gray-600 border-b border-gray-100 pb-6 mb-6">
                  <div className="flex justify-between">
                    <span>Quartos selecionados:</span>
                    <strong className="text-[#1a2b4c]">{quartosNoCarrinho.length}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Total de Hóspedes:</span>
                    <strong className="text-[#1a2b4c]">{totalHospedesGeral} ({totalAdultosGeral} adultos, {totalCriancasGeral} crianças)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Subtotal das diárias:</span>
                    <strong className="text-[#1a2b4c]">R$ {subtotalGeral.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
                  </div>
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Desconto de Verão / Ofertas:</span>
                    <span>R$ 0,00</span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline mb-8">
                  <span className="font-serif font-bold text-lg text-[#1a2b4c]">Total Geral:</span>
                  <span className="font-serif font-bold text-3xl text-amber-700">R$ {totalGeral.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>

                <button 
                  onClick={() => alert('Parabéns! Reserva encaminhada com sucesso para o sistema do Solarium Resort.')}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-105 text-white font-medium py-3.5 rounded-2xl shadow-xl transition text-sm tracking-wide text-center"
                >
                  Prosseguir para confirmação →
                </button>

                <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-gray-400 text-center">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Reserva 100% segura e garantida pelo Solarium Resort</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

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
    </div>
  );
}