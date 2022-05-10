import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Suspense } from "react";
import ListaDePlayers from "./components/listaDePlayers";
import Navbar1 from "./components/navbar.jsx";
import Home from "./components/Inicio.jsx";
import Contacto from "./components/contacto";
import Login from "./components/login";
import Perfil from "./components/perfil";
import Torneo from "./components/Torneo";
import ControlPanel from "./components/cPanel";


const Footer = React.lazy(() => import("./components/footer"));

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar1 />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ranking" element={<ListaDePlayers />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/torneo" element={<Torneo/>} />
          <Route path="/cPanel" element={<ControlPanel/>}/>
        </Routes>
        <Suspense fallback={<div>Cargando...</div>}>
          <Footer />
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
