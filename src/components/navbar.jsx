import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="containerUl ">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ulLink">
            <li className="nav-item">
              <Link className="nav-link h5 border rounded-3 border-3 border-light" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link h5 border rounded-3 border-3 border-light"  to="/ranking">Ranking</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link h5 border rounded-3 border-3 border-light"  to="/formulario">Agregar Jugador</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;