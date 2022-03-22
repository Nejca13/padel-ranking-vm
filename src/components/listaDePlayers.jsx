import dataBase from "../firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import Categorias from "./categorias/categorias";
//import Buscador from "./buscador";

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
        {
          // <Buscador players={players} />
        }
        <Categorias players={players} categoria="4ta" />
        <Categorias players={players} categoria="5ta" />
        <Categorias players={players} categoria="6ta" />
        <Categorias players={players} categoria="7ma" />
        <Categorias players={players} categoria="8va" />
      </div>
    </div>
  );
};

export default ListaDePlayers;
