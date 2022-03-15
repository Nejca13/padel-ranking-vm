import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormularioRanking from "./components/inputs.jsx";
import "./css/style.css";
import ListaDePlayers from "./components/players.jsx";
import Navbar from "./components/navbar.jsx";
import Home from "./components/home.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/ranking" element={<ListaDePlayers />}/>
          <Route path="/formulario" element={<FormularioRanking />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
