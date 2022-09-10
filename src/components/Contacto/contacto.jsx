import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faWhatsapp,
  faFacebookMessenger,
} from "@fortawesome/free-brands-svg-icons"
import React from "react"
import styles from './Contacto.module.css'

const Contacto = () => {
  return (
    <div className={styles.container}>
      <div className="">
        <h1>Hola padeleros!</h1>
        <p>
          Les dejo un enlace a Messenger y otro a Whatsapp para que comuniquen
          cualquier defecto en la pagina.
        </p>
        <p>
          Si bien esta en modo de pruebas todavia, me gustaria que haya un
          Feedback para poder mejorarla lo antes posible.
        </p>
        <p>
          <strong className="">Saludos!</strong>
        </p>
        <div className="">
          <a href="https://m.me/Qwerty.PC" className={styles.icon}>
            <FontAwesomeIcon icon={faFacebookMessenger} />
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=+542984406895&text=Tengo un problema."
            className={styles.icon}
          >
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Contacto
