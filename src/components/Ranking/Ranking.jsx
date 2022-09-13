import React, { useEffect, useState } from "react"
import Buscador from "../Buscador/buscador"
import Loader from "../Loader/Loader"
import styles from "./Ranking.module.css"
import BotonArriba from "../BtnUp/botonArriba"
import { getAllUsers } from "../Auth/Server/Crud"

const Ranking = () => {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    ;(async function () {
      await getAllUsers().then((data) => setPlayers(data))
    })()
  }, [players.length])

  return (
    <div className={styles.container}>
      {players.length > 0 ? <Buscador players={players} /> : <Loader />}
      <BotonArriba />
    </div>
  )
}

export default Ranking
