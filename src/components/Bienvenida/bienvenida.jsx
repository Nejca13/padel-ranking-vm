import React from "react"
import BtnLogin from "../BtnLogin/BtnLogin"
import styles from './Bienvenida.module.css'
import { useUserContext } from "../Auth/Auth"

const Bienvenida = () => {
  const userApp = useUserContext()
  return (
    <div className={styles.container}>
      <h1>Bienvenido a Padel Ranking</h1>
      <p>
      Si queres formar parte y aparecer en los resultados, <strong>inicia sesion</strong> con tu cuenta de google y carga tu perfil de jugador.
      </p>
      <p>
        <strong>Tener encuenta que para cargar el perfil la foto es requerida, de lo contrario no se cargara.</strong>
      </p>
      {
        !userApp.id && <BtnLogin/>
      }
    </div>
  )
}

export default Bienvenida