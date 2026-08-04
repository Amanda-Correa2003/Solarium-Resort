import { useQuery } from '@tanstack/react-query';

const fetchPromos = async () => {
  return [
    { id: 1, title: "Promoções de Verão", icon: "☀️" },
    { id: 2, title: "Promoções de Natal", icon: "🎄" },
    { id: 3, title: "Promoções de Ano Novo", icon: "🏖️" },
  ];
};

export function usePromotions() {
  return useQuery({
    queryKey: ['promotions'],
    queryFn: fetchPromos,
  });
}