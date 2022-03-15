import dataBase from "../firebase";
import {useEffect, useState} from 'react';
import { collection, getDocs } from "firebase/firestore";

const ListaDePlayers = () => {

  const [players, setPlayers] = useState([]);
  const playersCollection = collection(dataBase, "players");

  useEffect(() => {
		obtenerDatos();
	}, [])
 

    const obtenerDatos = async() => {
      const data = await getDocs(playersCollection);
      setPlayers(data.docs.map(doc => doc.data()))
      console.log(players)
    };
  return (
    <div>
      <button onClick={obtenerDatos} className="mx-4 my-5 btn btn-success" >
        Obtener Jugador
      </button>
      <div className="d-flex mt-5 mx-3 contenedor-img">
      {
        players.length > 0 ? (players.map((item) => (
          <div key={players} className="my-4 mx-4">
            <div className="mx-3 my-3">
            <h4 className="">{item.firstName} {item.lastName}</h4>
            <p className="text-dark">{item.position}</p>
            <img className="rounded-circle border border-dark border-3" src={item.foto} width="200" height="200" alt=""/>
            </div>
          </div>
        ))
        ) : <span></span>
      }
      </div>
      
    </div>
  )
}



export default ListaDePlayers;
