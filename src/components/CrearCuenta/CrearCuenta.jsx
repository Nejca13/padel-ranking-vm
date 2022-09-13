import { useUserContext } from "../Auth/Auth"
import styles from './CrearCuenta.module.css'
import FormularioRanking from "../Formularios/formularioPlayers"

const CrearCuenta = () => {
    const userApp = useUserContext()
  return (
    <div className={styles.container}>
          <div className={styles.msgBienvenida}>
            <h1>¡Hola! {userApp.displayName}</h1>
            <p>Parece que no tenes ningun jugador asignado a esta cuenta, agregate!</p>
            <p>
              Asegurate de seleccionar el area de la foto a recortar para que se
              suba correctamente!
            </p>
          </div>
          <FormularioRanking user={userApp} />
        </div>
  )
}

export default CrearCuenta