import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Users, Check, Calendar, Tag, DollarSign, ArrowLeft, X } from 'lucide-react';
import { CardCarrossel } from '../components/CardCarrossel';
import { NavbarQuartos } from '../components/NavbarQuartos';
import { Footer } from '../components/Footer';

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

export function Rooms() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const chegadaParam = searchParams.get('chegada') || '';
  const saidaParam = searchParams.get('saida') || '';
  const pessoasParam = searchParams.get('pessoas') || '';
  const precoParam = searchParams.get('preco') || '';
  const promoParam = searchParams.get('promo') || '';

  const [chegada, setChegada] = useState(chegadaParam);
  const [saida, setSaida] = useState(saidaParam);
  const [pessoas, setPessoas] = useState(pessoasParam);
  const [precoMax, setPrecoMax] = useState(precoParam);

  const [carrinho, setCarrinho] = useState<string[]>(() => {
    const saved = sessionStorage.getItem('solarium_carrinho');
    return saved ? JSON.parse(saved) : [];
  });
  const [feedbackId, setFeedbackId] = useState<string | null>(null);

  useEffect(() => {
    sessionStorage.setItem('solarium_carrinho', JSON.stringify(carrinho));
  }, [carrinho]);

  const quartosFiltrados = quartosData.filter((quarto) => {
    if (promoParam && promoParam !== 'nenhuma' && quarto.promocao !== promoParam) {
      return false;
    }

    if (pessoasParam) {
      const numPessoas = parseInt(pessoasParam, 10);
      if (!isNaN(numPessoas) && quarto.capacidade < numPessoas) {
        return false;
      }
    }

    if (precoParam) {
      const maxPreco = parseFloat(precoParam);
      if (!isNaN(maxPreco) && quarto.precoPorNoite > maxPreco) {
        return false;
      }
    }

    return true;
  });

  const handleNovaBusca = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (chegada) params.set('chegada', chegada);
    if (saida) params.set('saida', saida);
    if (pessoas) params.set('pessoas', pessoas);
    if (precoMax) params.set('preco', precoMax);
    setSearchParams(params);
  };

  const handleReservar = (id: string) => {
    setCarrinho((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setFeedbackId(id);
    setTimeout(() => setFeedbackId(null), 2500);
  };

  const limparFiltros = () => {
    setSearchParams({});
    setChegada('');
    setSaida('');
    setPessoas('');
    setPrecoMax('');
  };

  const getTituloSecao = () => {
    if (promoParam === 'verao') return 'Ofertas Especiais de Verão';
    if (promoParam === 'natal') return 'Ofertas Especiais de Natal';
    if (promoParam === 'anonovo') return 'Ofertas Especiais de Ano Novo';
    return 'Encontre o quarto perfeito para sua estadia';
  };

  return (
    <div className="bg-[#e4e1bd] min-h-screen text-[#1a2b4c] font-sans relative overflow-x-hidden flex flex-col justify-between">
      <div>
        <NavbarQuartos 
          chegada={chegada} setChegada={setChegada}
          saida={saida} setSaida={setSaida}
          pessoas={pessoas} setPessoas={setPessoas}
          precoMax={precoMax} setPrecoMax={setPrecoMax}
          onBuscar={handleNovaBusca}
        />

        <main className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <button 
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#1a2b4c] bg-white/60 hover:bg-white px-4 py-2 rounded-full shadow-sm transition border border-amber-200 cursor-pointer"
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

          <div className="bg-white/85 backdrop-blur-md border border-amber-200/80 p-6 md:p-8 rounded-3xl shadow-md mb-10">
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
                    className="text-xs text-red-600 hover:text-red-800 font-bold underline ml-2 flex items-center gap-1 cursor-pointer"
                  >
                    <X className="w-3 h-3" /> Limpar Filtros
                  </button>
                )}
              </div>
            </div>
          </div>

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

                      <div className="p-6">
                        <h3 className="font-serif font-bold text-xl text-[#1a2b4c] group-hover:text-amber-700 transition mb-2">
                          {quarto.nome}
                        </h3>

                        <p className="text-xs text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                          {quarto.descricao}
                        </p>

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
                        className={`px-5 py-2.5 rounded-xl font-medium text-xs tracking-wide transition-all shadow flex items-center gap-1.5 cursor-pointer ${
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
                className="bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs px-6 py-3 rounded-xl transition shadow cursor-pointer"
              >
                Limpar filtros e ver todos os quartos
              </button>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}