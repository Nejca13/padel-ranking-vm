import {dataBase} from "../firebase";
import React, { Suspense, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import Buscador from "./buscador";
import Contador from "./contador";


const BotonArriba = React.lazy(() => import("./botonArriba"))

const ListaDePlayers = () => {
  
  const [players, setPlayers] = useState([]);
  const playersCollection = collection(dataBase, "players");

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await getDocs(playersCollection);
    setPlayers(data.docs.map((doc) => doc.data()));
  };



  return (
    <div>
      <div className="mt-3 mx-3 contenedor-img">
          <Contador players={players} />
          <Buscador players={players} />
          <Suspense fallback={<div>Cargando...</div>}>
            <BotonArriba/>
          </Suspense>
      </div>
    </div>
  );
};

export default ListaDePlayers;
