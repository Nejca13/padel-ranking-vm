import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from "react"
import ListaDePlayers from "./components/listaDePlayers"
import Navbar1 from "./components/NavBar/navbar.jsx"
import Home from "./components/Inicio/Inicio.jsx"
import Contacto from "./components/Contacto/contacto"
import Login from "./components/login"
import Perfil from "./components/Perfil/perfil"
import Torneo from "./components/Torneo"
import ControlPanel from "./components/cPanel"
import { UserProvider } from "./components/Auth/Auth"

function App() {
  return (
    <UserProvider>
      <main>
        <BrowserRouter>
          <Navbar1 />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ranking" element={<ListaDePlayers />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/torneo" element={<Torneo />} />
            <Route path="/cPanel" element={<ControlPanel />} />
          </Routes>
        </BrowserRouter>
      </main>
    </UserProvider>
  )
}

export default App
