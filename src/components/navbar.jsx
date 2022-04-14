import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import { app } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SingOut from "./singOut";

const Navbar1 = () => {
  const [userStatus, setUserStatus] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [imagen, setImagen] = useState(null)
  const auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      
      setUsuario(user)
      setImagen(user.photoURL)
      setUserStatus(true);
    } else {
      setUserStatus(false);
    }
  });
  return (
    <div>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Padel ValleMedio</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto d-flex justify-content-center">
              <Link className="nav-link fw-bold px-2" to="/">
                INICIO
              </Link>
              <Link className="nav-link fw-bold px-2" to="/ranking">
                RANKING
              </Link>
              
              {/* <Link className="nav-link fw-bold px-2 " to="/formTorneo">
                AGREGAR TORNEO
                </Link>*/}
              <Link className="nav-link fw-bold px-2 " to="/contacto">
                CONTACTO
              </Link>
            </Nav>
            {userStatus && (
              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center mx-2">
                <img className="rounded-circle mx-2" width="40" height="40" src={imagen} alt="" />
                  <p className="my-0"><Link className="text-dark nav-link text-decoration-none" to="/perfil">{usuario.displayName}</Link></p>
                  
                </div>
                <SingOut />
              </div>
            )}
            {userStatus == false ? (
              <div>
                <Link className="btn btn-success fw-bold px-2 " to="/login">
                  INGRESAR
                </Link>
              </div>
            ) : (
              <span></span>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navbar1;
