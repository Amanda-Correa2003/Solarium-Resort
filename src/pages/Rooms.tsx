import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  SunMedium, 
  Gift, 
  Sparkles, 
  Users, 
  Check, 
  Filter, 
  Calendar, 
  Tag, 
  DollarSign, 
  ArrowLeft,
  X
} from 'lucide-react';


// 1. DADOS MOCKADOS DOS QUARTOS 

export interface Quarto {
  id: string;
  nome: string;
  descricao: string;
  imagens: string[];
  precoPorNoite: number;
  capacidade: number;
  promocao: 'verao' | 'natal' | 'anonovo' | 'nenhuma';
  desconto?: string;
  comodidades: string[];
}

export const quartosData: Quarto[] = [
  {
    id: 'SOL-01',
    nome: 'Bangalô Vista Mar Premium',
    descricao: 'Bangalô espaçoso com deck privativo, hidromassagem externa e vista panorâmica privilegiada para o oceano.',
    imagens: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80'
    ],
    precoPorNoite: 850,
    capacidade: 3,
    promocao: 'verao',
    desconto: '20% OFF Verão',
    comodidades: ['King Size', 'Hidromassagem', 'Wi-Fi Grátis', 'Café Inclusos']
  },
  {
    id: 'SOL-02',
    nome: 'Suíte Luxo Família Solarium',
    descricao: 'Ideal para famílias que buscam conforto máximo, com dois ambientes integrados e varanda aconchegante.',
    imagens: [
      'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=800&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80'
    ],
    precoPorNoite: 1200,
    capacidade: 5,
    promocao: 'natal',
    desconto: 'Especial Natal',
    comodidades: ['2 Camas Queen', 'Varanda', 'Smart TV 55"', 'Frigobar Premium']
  },
  {
    id: 'SOL-03',
    nome: 'Chalé Romântico Jardim Tropical',
    descricao: 'Ambiente intimista cercado pela natureza exuberante do resort, perfeito para casais celebrarem momentos especiais.',
    imagens: [
      'https://plus.unsplash.com/premium_photo-1687960116497-0dc41e1808a2?w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80'
    ],
    precoPorNoite: 620,
    capacidade: 2,
    promocao: 'anonovo',
    desconto: 'Réveillon 15% OFF',
    comodidades: ['Cama Queen', 'Lareira Ecológica', 'Rede na Varanda', 'Banheira de Imersão']
  },
  {
    id: 'SOL-04',
    nome: 'Suíte Master Pôr do Sol',
    descricao: 'Localizada no ponto mais alto, oferece uma visão espetacular do pôr do sol sobre as colinas e mar.',
    imagens: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80'
    ],
    precoPorNoite: 980,
    capacidade: 3,
    promocao: 'verao',
    desconto: '15% OFF Verão',
    comodidades: ['Vista Panorâmica', 'Café na Cama', 'Serviço de Quarto 24h', 'Ar Condicionado Split']
  },
  {
    id: 'SOL-05',
    nome: 'Bangalô Master Família',
    descricao: 'Espaço amplo com pé-direito alto, sala de estar privativa e proximidade direta com a piscina principal.',
    imagens: [
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80',
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=800&q=80'
    ],
    precoPorNoite: 1450,
    capacidade: 6,
    promocao: 'natal',
    desconto: 'Pacote Natalino',
    comodidades: ['3 Quartos', 'Cozinha Compacta', '2 Banheiros', 'Piscina Privativa']
  },
  {
    id: 'SOL-06',
    nome: 'Quarto Standard Confort',
    descricao: 'Aconchegante, moderno e funcional. Ótimo custo-benefício sem abrir mão do padrão de excelência Solarium.',
    imagens: [
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80'
    ],
    precoPorNoite: 420,
    capacidade: 2,
    promocao: 'nenhuma',
    comodidades: ['Cama Casal', 'Wi-Fi', 'TV a Cabo', 'Cofre Digital']
  }
];

// ==========================================
// 2. COMPONENTE DO CARROSSEL DE CADA CARD
// ==========================================
function CardCarrossel({ imagens, altBase }: { imagens: string[]; altBase: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? imagens.length - 1 : prev - 1));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === imagens.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative h-56 overflow-hidden group/carrossel bg-gray-100">
      <img 
        src={imagens[currentIndex]} 
        alt={`${altBase} - foto ${currentIndex + 1}`} 
        className="w-full h-full object-cover group-hover/carrossel:scale-105 transition duration-500" 
      />
      
      {imagens.length > 1 && (
        <>
          <button 
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1.5 rounded-full shadow opacity-0 group-hover/carrossel:opacity-100 transition"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <button 
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1.5 rounded-full shadow opacity-0 group-hover/carrossel:opacity-100 transition"
            aria-label="Próxima foto"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Indicadores de bolinha */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
            {imagens.map((_, idx) => (
              <span 
                key={idx} 
                className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-amber-400 w-3' : 'bg-white/60'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ==========================================
// 3. PÁGINA PRINCIPAL DE QUARTOS
// ==========================================
export function QuartosPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Capturar parâmetros da URL passados pela Home
  const chegadaParam = searchParams.get('chegada') || '';
  const saidaParam = searchParams.get('saida') || '';
  const pessoasParam = searchParams.get('pessoas') || '';
  const precoParam = searchParams.get('preco') || '';
  const promoParam = searchParams.get('promo') || '';

  // Estados locais para inputs do Header (caso queira refazer a busca direto na página)
  const [chegada, setChegada] = useState(chegadaParam);
  const [saida, setSaida] = useState(saidaParam);
  const [pessoas, setPessoas] = useState(pessoasParam);
  const [precoMax, setPrecoMax] = useState(precoParam);

  // Estados dos popups do Header (igual na Home)
  const [showChegada, setShowChegada] = useState(false);
  const [showSaida, setShowSaida] = useState(false);
  const [showPessoas, setShowPessoas] = useState(false);
  const [showPreco, setShowPreco] = useState(false);

  // Estado do Carrinho / Reservas persistido na sessão
  const [carrinho, setCarrinho] = useState<string[]>(() => {
    const saved = sessionStorage.getItem('solarium_carrinho');
    return saved ? JSON.parse(saved) : [];
  });
  const [feedbackId, setFeedbackId] = useState<string | null>(null);

  // Atualizar sessionStorage quando carrinho mudar
  useEffect(() => {
    sessionStorage.setItem('solarium_carrinho', JSON.stringify(carrinho));
  }, [carrinho]);

  // Lógica de Filtragem dos Quartos
  const quartosFiltrados = quartosData.filter((quarto) => {
    // 1. Filtro por Promoção da Home
    if (promoParam && promoParam !== 'nenhuma') {
      if (quarto.promocao !== promoParam) return false;
    }

    // 2. Filtro por Quantidade de Hóspedes/Pessoas
    if (pessoasParam) {
      const numPessoas = parseInt(pessoasParam, 10);
      if (!isNaN(numPessoas) && quarto.capacidade < numPessoas) {
        return false;
      }
    }

    // 3. Filtro por Faixa de Preço / Orçamento
    if (precoParam) {
      const maxPreco = parseFloat(precoParam);
      if (!isNaN(maxPreco) && quarto.precoPorNoite > maxPreco) {
        return false;
      }
    }

    return true;
  });

  // Ação de Pesquisar pelo Header interno
  const handleNovaBusca = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (chegada) params.set('chegada', chegada);
    if (saida) params.set('saida', saida);
    if (pessoas) params.set('pessoas', pessoas);
    if (precoMax) params.set('preco', precoMax);
    setSearchParams(params);
  };

  // Adicionar ao Carrinho com Feedback Visual
  const handleReservar = (id: string) => {
    if (!carrinho.includes(id)) {
      setCarrinho([...carrinho, id]);
    }
    setFeedbackId(id);
    setTimeout(() => {
      setFeedbackId(null);
    }, 2500);
  };

  // Limpar Filtros
  const limparFiltros = () => {
    setSearchParams({});
    setChegada('');
    setSaida('');
    setPessoas('');
    setPrecoMax('');
  };

  // Título dinâmico baseado na origem
  const getTituloSecao = () => {
    if (promoParam === 'verao') return 'Ofertas Especiais de Verão';
    if (promoParam === 'natal') return 'Ofertas Especiais de Natal';
    if (promoParam === 'anonovo') return 'Ofertas Especiais de Ano Novo';
    return 'Encontre o quarto perfeito para sua estadia';
  };

  return (
    <div className="bg-[#e4e1bd] min-h-screen text-[#1a2b4c] font-sans relative overflow-x-hidden flex flex-col justify-between">
      
      <div>
        {/* ==========================================
            HEADER (Idêntico e funcional à Home)
           ========================================== */}
        <header className="max-w-10xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4 bg-[#0a1b38] sticky top-0 z-50 shadow-md">
          {/* Logo com clique para voltar à Home */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-400 flex items-center justify-center shadow-md">
              <span className="text-2xl">☀️</span>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-widest text-[#f3d37a] uppercase leading-none">SOLARIUM</h1>
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#f3d37a] uppercase">RESORT</span>
            </div>
          </div>

          {/* Barra de Filtros Integrada no Header */}
          <form onSubmit={handleNovaBusca} className="bg-white/95 backdrop-blur-md border border-amber-200/60 rounded-full px-3 py-2 shadow-sm flex items-center gap-2 text-xs md:text-sm text-gray-700 relative">
            
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

        {/* ==========================================
            CONTEÚDO PRINCIPAL / RESULTADOS
           ========================================== */}
        <main className="max-w-7xl mx-auto px-6 py-10">
          
          {/* Botão Voltar para a Home & Carrinho Badge */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <button 
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#1a2b4c] bg-white/60 hover:bg-white px-4 py-2 rounded-full shadow-sm transition border border-amber-200"
            >
              <ArrowLeft className="w-4 h-4 text-amber-600" /> Voltar para a Home
            </button>

           {carrinho.length > 0 && (
  <button 
    onClick={() => navigate('/carrinho')}
    className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-4 py-2 rounded-full shadow transition flex items-center gap-2 cursor-pointer"
  >
    <span>🛒 Carrinho de Reservas:</span>
    <span className="bg-white text-amber-800 px-2 py-0.5 rounded-full font-bold">
      {carrinho.length} quarto(s) selecionado(s)
    </span>
  </button>
)}
          </div>

          {/* Cabeçalho de Resultados e Critérios Ativos */}
          <div className="bg-white/80 backdrop-blur-md border border-amber-200/80 p-6 md:p-8 rounded-3xl shadow-md mb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-amber-600 font-bold">Catálogo Solarium Resort</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1a2b4c] mt-1">
                  {getTituloSecao()}
                </h2>
                <p className="text-xs md:text-sm text-gray-600 mt-2">
                  Exibindo <span className="font-bold text-amber-700">{quartosFiltrados.length}</span> quarto(s) compatíveis com sua busca.
                </p>
              </div>

              {/* Badges dos filtros aplicados */}
              <div className="flex flex-wrap gap-2 items-center">
                {promoParam && (
                  <span className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-medium border border-amber-300 flex items-center gap-1">
                    <Tag className="w-3 h-3" /> Promoção: {promoParam.toUpperCase()}
                  </span>
                )}
                {chegadaParam && (
                  <span className="bg-white text-gray-700 text-xs px-3 py-1 rounded-full font-medium border border-gray-200 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-600" /> Ent: {chegadaParam}
                  </span>
                )}
                {saidaParam && (
                  <span className="bg-white text-gray-700 text-xs px-3 py-1 rounded-full font-medium border border-gray-200 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-600" /> Sai: {saidaParam}
                  </span>
                )}
                {pessoasParam && (
                  <span className="bg-white text-gray-700 text-xs px-3 py-1 rounded-full font-medium border border-gray-200 flex items-center gap-1">
                    <Users className="w-3 h-3 text-amber-600" /> {pessoasParam} hóspede(s)
                  </span>
                )}
                {precoParam && (
                  <span className="bg-white text-gray-700 text-xs px-3 py-1 rounded-full font-medium border border-gray-200 flex items-center gap-1">
                    <DollarSign className="w-3 h-3 text-amber-600" /> Até R$ {precoParam}
                  </span>
                )}

                {(promoParam || chegadaParam || saidaParam || pessoasParam || precoParam) && (
                  <button 
                    onClick={limparFiltros}
                    className="text-xs text-red-600 hover:text-red-800 font-bold underline ml-2 flex items-center gap-1"
                  >
                    <X className="w-3 h-3" /> Limpar Filtros
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ==========================================
              GRID DE CARDS DOS QUARTOS
             ========================================== */}
          {quartosFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {quartosFiltrados.map((quarto) => {
                const isAdicionado = carrinho.includes(quarto.id);
                const isFeedbackAtivo = feedbackId === quarto.id;

                return (
                  <div 
                    key={quarto.id} 
                    className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-amber-100 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Carrossel de Imagens do Quarto */}
                      <div className="relative">
                        <CardCarrossel imagens={quarto.imagens} altBase={quarto.nome} />
                        
                        {quarto.desconto && (
                          <div className="absolute top-4 left-4 bg-amber-600/95 backdrop-blur text-white text-[10px] font-bold tracking-wider px-3 py-1.5 rounded-full shadow uppercase">
                            {quarto.desconto}
                          </div>
                        )}

                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-gray-800 text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                          ID: {quarto.id}
                        </div>
                      </div>

                      {/* Informações do Quarto */}
                      <div className="p-6">
                        <div className="flex justify-between items-start gap-2 mb-2">
                          <h3 className="font-serif font-bold text-xl text-[#1a2b4c] group-hover:text-amber-700 transition">
                            {quarto.nome}
                          </h3>
                        </div>

                        <p className="text-xs text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                          {quarto.descricao}
                        </p>

                        {/* Capacidade e Comodidades */}
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4 bg-amber-50/50 p-2.5 rounded-xl border border-amber-100">
                          <Users className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>Capacidade máxima: <strong className="text-gray-700">{quarto.capacidade} pessoas</strong></span>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {quarto.comodidades.map((comodidade, idx) => (
                            <span key={idx} className="bg-gray-100 text-gray-600 text-[10px] font-medium px-2.5 py-1 rounded-md">
                              {comodidade}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Rodapé do Card: Preço e Botão de Reserva Funcional */}
                    <div className="p-6 pt-0 border-t border-gray-100 mt-auto flex items-center justify-between">
                      <div>
                        <span className="block text-[10px] text-gray-400 font-semibold uppercase">Diária a partir de</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl font-bold text-[#1a2b4c]">R$ {quarto.precoPorNoite}</span>
                          <span className="text-[10px] text-gray-500">/noite</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => handleReservar(quarto.id)}
                        className={`px-5 py-2.5 rounded-xl font-medium text-xs tracking-wide transition-all shadow flex items-center gap-1.5 ${
                          isFeedbackAtivo || isAdicionado
                            ? 'bg-emerald-600 text-white shadow-emerald-200' 
                            : 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:brightness-105'
                        }`}
                      >
                        {isFeedbackAtivo ? (
                          <>
                            <Check className="w-4 h-4" /> Adicionado ✓
                          </>
                        ) : isAdicionado ? (
                          <>
                            <Check className="w-4 h-4" /> No Carrinho
                          </>
                        ) : (
                          'Reservar'
                        )}
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            /* Estado Vazio Elegante */
            <div className="bg-white/90 backdrop-blur border border-amber-200 rounded-3xl p-12 text-center max-w-xl mx-auto shadow-sm">
              <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                🔍
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#1a2b4c] mb-2">Não encontramos quartos para esses critérios</h3>
              <p className="text-xs text-gray-600 mb-6 leading-relaxed">
                Tente ajustar os filtros de preço, quantidade de hóspedes ou remover a promoção selecionada para visualizar mais opções disponíveis no Solarium Resort.
              </p>
              <button 
                onClick={limparFiltros}
                className="bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs px-6 py-3 rounded-xl transition shadow"
              >
                Limpar filtros e ver todos os quartos
              </button>
            </div>
          )}

        </main>
      </div>

      {/* ==========================================
          FOOTER
         ========================================== */}
      <footer className="bg-[#EFEADB] py-12 px-4 border-t border-[#DED4BD] mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          <div className="flex items-center gap-3">
            <div className="w-20 h-20 rounded-full bg-[#15218f] flex items-center justify-center shadow border-4 border-[#c0b412]">
              <span className="text-4xl">☀️</span>
            </div>
            <div>
              <h2 className="text-xl font-black tracking-wider text-yellow-600 uppercase leading-none">SOLARIUM</h2>
              <span className="text-xs font-bold tracking-widest text-yellow-600 uppercase">RESORT</span>
            </div>
          </div>

          <div className="space-y-2 text-sm text-[#4A3B2C]">
            <p className="flex items-center gap-2">
              <span className="text-yellow-600 font-bold">📞</span> (21) 99999-9999 / (21) 99999-9999
            </p>
            <p className="flex items-center gap-2">
              <span className="text-yellow-600 font-bold">✉️</span> reservas@solariumresort.com
            </p>
            <p className="flex items-center gap-2">
              <span className="text-yellow-600 font-bold">⏰</span> Atendimento de Segunda a Sexta (08:00 – 17:00)
            </p>
          </div>

          <div className="flex items-center justify-start md:justify-end gap-4 text-2xl text-[#36451C]">
            <a href="https://www.instagram.com/projetosdev.amanda?igsh=YTB4dXB4NzlicjFt" target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition">
              <svg className="w-8 h-8 text-blue-900" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
              </svg>
            </a>
            <a href="https://github.com/Amanda-Correa2003" target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition">
              <svg className="w-8 h-8 text-blue-900" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 010-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 010 2.93c.83.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0012 1.27"></path>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/amanda-corrêa-machado-72a525258/" target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition">
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