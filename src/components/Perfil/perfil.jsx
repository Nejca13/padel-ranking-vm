import React, { useState } from "react"
import FormularioRanking from "../Formularios/formularioPlayers"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit } from "@fortawesome/free-regular-svg-icons"
import { faClose, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useUserContext } from "../Auth/Auth"
import styles from './Perfil.module.css'
import { deleteUser } from "../Auth/Server/Crud"
import PlayerCard from "../PlayersCard/PlayerCard"

const Perfil = () => {
  const userApp = useUserContext()
  const [edit, setEdit] = useState(false)

  const editar = () => {
    if (edit === true) {
      setEdit(false)
    }
    if (edit === false) {
      setEdit(true)
    }
  }

  return (
    <div className={styles.container}>
      {!userApp.id ? (
        <div>
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
      ) : (
        <div>
          <div className={styles.msgBienvenida}>
            <h1>Bienvenido {userApp.displayName} </h1>
          </div>
          <div>
            {edit ? (
              <span></span>
            ) : (
              
              <PlayerCard player={userApp}/>
            )}
            <div>
                  <button onClick={editar} href="editar" data-tooltip={edit === true ? "Dejar de Editar" : "Editar Jugador"}>
                    <FontAwesomeIcon icon={edit ? faClose : faEdit} />
                  </button>
                  <button onClick={() => deleteUser(userApp)} data-tooltip="Borrar jugador">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
            </div>
            {edit && <FormularioRanking user={userApp} editStatus={edit}/>}
          </div>
        </div>
      )}
    </div>
  )
}

export default Perfil
