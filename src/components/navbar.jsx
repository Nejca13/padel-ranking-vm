import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary p-0">
        <div className="containerUl ">
          <ul className="navbar-nav me-auto mb-lg-0 ulLink">
            <li className="nav-item">
              <Link className="nav-link fs-6 fw-bold px-3" to="/">INICIO</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fs-6 fw-bold px-3"  to="/ranking">RANKING</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fs-6 fw-bold px-3"  to="/formulario">AGREGAR JUGADOR</Link>
            </li>
            <li className="nav-item torneo">
            <Link className="nav-link fs-6 fw-bold px-3 "  to="/formTorneo">AGREGAR TORNEO</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link fs-6 fw-bold px-3 "  to="/contacto">CONTACTO</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;