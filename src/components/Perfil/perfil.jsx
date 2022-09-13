import React, { useState } from "react"
import FormularioRanking from "../Formularios/formularioPlayers"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit } from "@fortawesome/free-regular-svg-icons"
import { faClose, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useUserContext } from "../Auth/Auth"
import styles from './Perfil.module.css'
import { deleteUser } from "../Auth/Server/Crud"
import PlayerCard from "../PlayersCard/PlayerCard"
import Loader from "../Loader/Loader"

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
        <Loader />
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
                  <button 
                  onClick={editar} 
                  href="editar" 
                  data-tooltip={edit === true ? "Dejar de Editar" : "Editar Jugador"}>
                    <FontAwesomeIcon icon={edit ? faClose : faEdit} className={styles.editIcon}/>
                  </button>
                  <button 
                  onClick={() => deleteUser(userApp)} 
                  data-tooltip="Borrar jugador"
                  className={styles.deleteButton}
                  >
                    <FontAwesomeIcon icon={faTrash} className={styles.deleteIcon}/>
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
