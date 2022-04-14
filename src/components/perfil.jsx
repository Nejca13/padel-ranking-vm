import React, { useEffect, useState } from "react";
import { app } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import FormularioRanking from "./formularioPlayers";
import { dataBase } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import Categorias from "./categorias/categorias";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [player, setPlayer] = useState(null);
  const [category, setCategory] = useState(null);
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
        const uid = user.uid;
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

  return (
    <div>
      {usuario &&
        (player === null ? (
          <div>
            <div className="d-flex text-center flex-column text-white justify-content-center">
              <h1 className="mt-5">Bienvenido</h1>
              <p>No tenes ningun jugador asignado a esta cuenta agregate!</p>
            </div>
            <FormularioRanking email={usuario.email} />
          </div>
        ) : (
          <div>
            <div className="d-flex text-white justify-content-center">
              <h1 className="mt-5">Bienvenido {usuario.displayName}</h1>
            </div>
            <div className="mt-5 d-flex justify-content-center">
              <Categorias players={player} categoria={category} />
              <div>
              <button className="mt-5 btn btn-light" onClick={(e) => alert("Funcion en desarrollo")}>
              <FontAwesomeIcon className="" icon={faEdit} /> 
              </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Perfil;
