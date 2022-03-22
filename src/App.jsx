import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormularioRanking from "./components/formularioPlayers";
import "./css/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Suspense} from "react";
import ListaDePlayers from "./components/listaDePlayers";
import Navbar from "./components/navbar.jsx";
import Home from "./components/Inicio.jsx";
import FormularioTorneo from "./components/formularioTorneo";
import Contacto from "./components/contacto";
//import Footer from "./components/footer";

const Footer = React.lazy(() => import('./components/footer'));

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
        <Suspense fallback={<div>Cargando...</div>}>
        <Footer/>
        </Suspense>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
