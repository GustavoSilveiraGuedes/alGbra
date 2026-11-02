import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";
import { About } from "./pages/About";
import { DailyChallenge } from "./pages/DailyChallenge";
import FormulaContainer from "./pages/FormulaContainer";

import "./styles/global.css";
import "./styles/components.css";
import "./styles/account.css";
import { useEffect } from "react";

export default function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    // Pega o valor real da variável --color-primary definida no seu CSS (:root)
    const rootColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-primary').trim();

    // Codifica o caractere # para %23
    const encodedColor = encodeURIComponent(rootColor);

    // SVG do ícone Sigma do Lucide React
    const svgIcon = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='${encodedColor}' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><path d='M18 7V4H6l6 8-6 8h12v-3'/></svg>`;

    // Atualiza ou cria a tag link do favicon na aba
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.type = 'image/svg+xml';
    link.href = `data:image/svg+xml,${svgIcon}`;
  }, []);

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/dailyChallenge" element={<DailyChallenge />} />
            <Route path="/formula/:id" element={<FormulaContainer />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}