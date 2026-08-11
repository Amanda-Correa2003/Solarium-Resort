import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Home } from './pages/Home';
import { QuartosPage } from './pages/Rooms';
import { CarrinhoPage } from './pages/CarrinhoPage';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quartos" element={<QuartosPage />} />
          <Route path="/carrinho" element={<CarrinhoPage />} /> {/* <- Adicione a rota aqui */}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;