import React, { useEffect, useState } from "react";
import { app } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import FormularioRanking from "./formularioPlayers";
import { dataBase } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import Categorias from "./categorias/categorias";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import FormularioEdit from "./formularioEdit";
import { faClose, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [player, setPlayer] = useState(null);
  const [category, setCategory] = useState(null);
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);
  const playersCollection = collection(dataBase, "players");
  const auth = getAuth(app);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await getDocs(playersCollection);
    const db = data.docs.map((doc) => doc.data());
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //const uid = user.uid;
        const filtrado = db.filter((item) => item.email === user.email);
        setUsuario(user);

        if (filtrado.length > 0) {
          const cat = filtrado.map((item) => item.categoria);
          setCategory(cat[0]);
          setPlayer(filtrado);
        }
      }
    });
  };

  const editar = () => {
    if (edit === true) {
      setEdit(false);
    }
    if (edit === false) {
      setEdit(true);
    }
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const borrarJugador = async () => {
    const id = player.map((item) => item.id);
    const storage = getStorage();
    const imagenId = player.map((item) => item.imagenId);
    const storageRef = ref(storage, imagenId[0]);

    // Delete the file
    deleteObject(storageRef)
      .then(() => {
        console.log("Borro foto");
      })
      .catch((error) => {
        console.log("No borro nada porque" + error);
      });
    await deleteDoc(doc(dataBase, "players", id[0]));
    window.location.reload();
  };

  return (
    <div>
      {usuario &&
        (player === null ? (
          <div>
            <div className="d-flex text-center flex-column text-white justify-content-center">
              <h1 className="mt-5">Bienvenido {usuario.displayName}</h1>
              <p>No tenes ningun jugador asignado a esta cuenta, agregate!</p>
              <p>
                Asegurate de seleccionar el area de la foto a recortar para que
                se suba correctamente!
              </p>
            </div>
            <FormularioRanking email={usuario.email} />
          </div>
        ) : (
          <div>
            <div className="d-flex text-white justify-content-center">
              <h1 className="mt-5">Bienvenido {usuario.displayName} </h1>
            </div>
            <div className="mt-5 mx-4 d-flex flex-column justify-content-center">
              {edit ? (
                <span></span>
              ) : (
                <Categorias players={player} categoria={category} />
              )}
              <div className="d-flex justify-content-center">
                <div>
                  <OverlayTrigger
                    key="editarTop"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        Editar <strong>Jugador</strong>.
                      </Tooltip>
                    }
                  >
                    <button
                      className="my-3 mx-2 btn btn-light"
                      onClick={editar}
                      href="editar"
                    >
                      <FontAwesomeIcon icon={edit ? faClose : faEdit} />
                    </button>
                  </OverlayTrigger>
                  <OverlayTrigger
                    key="borrarTop"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        Borrar <strong>Jugador</strong>.
                      </Tooltip>
                    }
                  >
                    <button
                      className="my-3 mx-2 btn btn-danger"
                      onClick={handleShow}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </OverlayTrigger>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Borrar Jugador</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      ¿Esta seguro que quiere borrar el jugador?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                      </Button>
                      <Button variant="danger" onClick={borrarJugador}>
                        Borrar Jugador
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
              <div id="44"></div>
              {edit && <FormularioEdit player={player} />}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Perfil;
