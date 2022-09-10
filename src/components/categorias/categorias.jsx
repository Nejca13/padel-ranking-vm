import React from "react"
import PlayerCard from "../PlayersCard/PlayerCard"
import styles from './categorias.module.css'
const Categorias = (props) => {
  const cat = props.players.filter((item) => item.categoria === props.categoria)
  return (
    <div>
      {cat.length > 0 ? (
        <div className={styles.cartegoriasDiv}>
          <div className={styles.categoria}>
            <p className="">
              <strong>{props.categoria[0]}° CAT</strong>
            </p>
          </div>
          <div className={styles.cards}>
            {cat.length > 0 &&
              cat.map((item, index) => (
                <PlayerCard player={item} index={index} key={index}/>
              ))}
          </div>
        </div>
      ) : (
        <span></span>
      )}
    </div>
  )
}

export default Categorias
