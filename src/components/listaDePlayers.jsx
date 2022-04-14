import {dataBase} from "../firebase";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import Buscador from "./buscador";

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
          <Buscador players={players} />
      </div>
    </div>
  );
};

export default ListaDePlayers;
