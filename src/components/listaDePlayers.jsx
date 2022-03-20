import dataBase from "../firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import Cuarta from "./categorias/cuarta.jsx";
import Quinta from "./categorias/quinta";
import Sexta from "./categorias/sexta";
import Septima from "./categorias/septima";
import Octava from "./categorias/octava";

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
      <div className="mt-5 mx-3 contenedor-img">
        <Cuarta players={players} />
        <Quinta players={players} />
        <Sexta players={players} />
        <Septima players={players} />
        <Octava players={players} />
      </div>
    </div>
  );
};

export default ListaDePlayers;
