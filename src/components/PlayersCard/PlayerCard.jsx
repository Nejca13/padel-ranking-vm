import { faPeopleRobbery } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import styles from "./PlayerCard.module.css"
import fotoPerfilError from '../../img/perfilError.png'

const PlayerCard = ({ player, index }) => {
  return (
    <div key={index} className={styles.playerCard}>
      <div className={styles.player}>
        <div className="nameDiv">
          <h5>
            {player.firstName} {player.lastName}
          </h5>
        </div>
        <p className={styles.infoDiv}>
          {player.position}
          <span className="">Cat: {player.categoria}</span>
        </p>
        <img className="" src={player.foto ? player.foto : fotoPerfilError} width="150" height="150" alt="" />
        <div>
          <p className={styles.bottomInfo}>
            {player.localidad}
            {player.buscaPareja === true && (
              <a
                href={player.telefono ? `https://wa.me/+54${player.telefono}` : null}
                className={styles.tooltip}
                data-tooltip="Este jugador busca pareja para torneros"
              >
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={faPeopleRobbery}
                />
              </a>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PlayerCard
