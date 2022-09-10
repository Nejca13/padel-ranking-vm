import React from "react"
import { getAuth, signOut } from "firebase/auth"
import { app } from "../../firebase"
import { useNavigate } from "react-router-dom"
import styles from './SingOut.module.css'

const SingOut = () => {
  const auth = getAuth(app)
  const navigate = useNavigate()

  const cerrarSesion = () => {
    signOut(auth)
      .then(() => {
        setTimeout(() => {
          window.location.reload()
        }, 1000)
        navigate("/")
      })
      .catch((error) => {
        alert(error)
      })
  }
  return (
    <div className={styles.signOut}>
      <button onClick={cerrarSesion}>Cerrar Sesion</button>
    </div>
  )
}

export default SingOut
