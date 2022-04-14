import {dataBase} from "../firebase";
import React, {useEffect, useState} from 'react';
import { collection, getDocs } from "firebase/firestore";
import uniqid from 'uniqid';

const ListaDeTorneos = () => {

  const [torneos, setTorneos] = useState([]);
  const torneosCollection = collection(dataBase, "torneos");

  useEffect(() => {
		obtenerDatos();
	}, [torneos.length]);
 

    const obtenerDatos = async() => {
      const data = await getDocs(torneosCollection);
      setTorneos(data.docs.map(doc => doc.data()))
    };
  return (
    <div className="torneosDiv">
      <div className="d-flex mt-5 contenedor-img">
      {
        torneos.length > 0 ? (torneos.map((item) => (
          <div key={uniqid()} className="mb-5">
            <div className="bannerTorneo">
            <h4 className="text-center text-white">{item.lugarDelTorneo} {item.categorias}</h4>
            <p className="text-white">{item.fechaTorneo}</p>
            <img className="border border-dark border-3" src={item.foto} width="400" height="400" alt=""/>
            </div>
          </div>
        ))
        ) : <span></span>
      }
      </div>
      
    </div>
  )
}



export default ListaDeTorneos;