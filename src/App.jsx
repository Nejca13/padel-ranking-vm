import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormularioRanking from "./components/formularioPlayers";
import "./css/style.css";
import ListaDePlayers from "./components/listaDePlayers";
import Navbar from "./components/navbar.jsx";
import Home from "./components/Inicio.jsx";
import FormularioTorneo from "./components/formularioTorneo";
import Contacto from "./components/contacto";
import Footer from "./components/footer";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/ranking" element={<ListaDePlayers />}/>
          <Route path="/formulario" element={<FormularioRanking />}/>
          <Route path="/formtorneo" element={<FormularioTorneo />} />
          <Route path="/contacto" element={<Contacto/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
