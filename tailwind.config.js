/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        solarium: {
          bg: "#F7F3E8",          // Cor de fundo geral da página
          cardBg: "#EFEADB",      // Fundo dos cards e seções
          greenPrimary: "#36451C",// Verde escuro da logo e botões
          greenAccent: "#4A6B2D", // Verde secundário
          brownText: "#4A3B2C",   // Marrom padrão dos títulos
        }
      },
    },
  },
  plugins: [],
}

