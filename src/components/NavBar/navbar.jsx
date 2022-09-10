import React from "react"
import { Link } from "react-router-dom"
import SingOut from "../SingOut/SingOut.jsx"
import styles from "./navbar.module.css"
import logo from '../../img/PadelLogo.png'
import BtnLogin from '../BtnLogin/BtnLogin'
import { useUserContext } from "../Auth/Auth"

const Navbar1 = () => {
  const userApp = useUserContext()
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <img src={logo} width="70" height="50" alt="" />
        </li>
      </ul>
      <ul>
        <li>
          <Link className={styles.navLink} to="/">
            Inicio
          </Link>
        </li>
        <li>
          <Link className={styles.navLink} to="/ranking">
            Ranking
          </Link>
        </li>
        <li>
          <Link className={styles.navLink} to="/contacto">
            Contacto
          </Link>
        </li>
      </ul>
      {userApp.id || userApp.uid ? (
        <ul>
          <li>
            <img width="40" height="40" src={userApp.foto ? userApp.foto : userApp.photoURL} alt="Foto de perfil" />
          </li>
          <li>
            <p className={styles.navLink}>
              <Link to="/perfil"><b>Perfil</b></Link>
            </p>
          </li>
          <li>
            <SingOut />
          </li>
        </ul>
      ) : (
        <div>
          <BtnLogin/>
        </div>
      )}
    </nav>
  )
}

export default Navbar1
