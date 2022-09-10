import React from "react"
import Bienvenida from "../Bienvenida/bienvenida"
import styles from './Inicio.module.css'

const Home = () => {
  return (
    <div className={styles.container}>
      <Bienvenida />
    </div>
  )
}

export default Home
