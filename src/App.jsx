import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from "react"
import Ranking from "./components/Ranking/Ranking.jsx"
import Navbar1 from "./components/NavBar/navbar.jsx"
import Home from "./components/Inicio/Inicio.jsx"
import Contacto from "./components/Contacto/contacto"
import Perfil from "./components/Perfil/perfil"
import Torneo from "./components/Torneo"
import ControlPanel from "./components/cPanel/cPanel"
import { UserProvider } from "./components/Auth/Auth"
import CrearCuenta from "./components/CrearCuenta/CrearCuenta"

function App() {
  return (
    <UserProvider>
      <div>
        <BrowserRouter>
          <Navbar1 />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/crearcuenta" element={<CrearCuenta />} />
            <Route path="/torneo" element={<Torneo />} />
            <Route path="/cPanel" element={<ControlPanel />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  )
}

export default App
