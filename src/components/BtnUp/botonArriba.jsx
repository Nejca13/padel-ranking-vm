import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUp } from "@fortawesome/free-solid-svg-icons"
import styles from './BtnUp.module.css'

const BotonArriba = () => {
  const [visible, setVisible] = useState(false)
  const volverVisible = () => {
    const scrolled = document.documentElement.scrollTop
    if (scrolled > 400) {
      setVisible(true)
    } else if (scrolled <= 400) {
      setVisible(false)
    }
  }
  const toUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }
  window.addEventListener("scroll", volverVisible)
  return (
    <div>
      {visible && (
        <button onClick={toUp} className={styles.btn}>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}
    </div>
  )
}

export default BotonArriba
