import { dataBase } from "../../firebase"
import React, { Suspense,useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import Buscador from "../Buscador/buscador"
import Loader from "../Loader/Loader"
import styles from './Ranking.module.css'

const BotonArriba = React.lazy(() => import("../BtnUp/botonArriba"))

const Ranking = () => {
  const [players, setPlayers] = useState([])
  const playersCollection = collection(dataBase, "players")

 useEffect(() => {
    obtenerDatos()
  }, [players.length]) 

  const obtenerDatos = async () => {
    const data = await getDocs(playersCollection)
    setPlayers(data.docs.map((doc) => doc.data()))
    console.log("OBDA")
  }

  return (
      <div className={styles.container}>
        {
          players.length > 0 ? 
          <Buscador players={players} />
        : (
          <Loader/>
        )
        }
        <Suspense fallback={<div>Cargando...</div>}>
          <BotonArriba />
        </Suspense>
      </div>
  )
}

export default Ranking
