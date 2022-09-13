import styles from './BtnLogin.module.css'
import { app } from "../../firebase"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "@firebase/auth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import { GetUser } from '../Auth/Server/Crud'

const BtnLogin = () => {
    const google = new GoogleAuthProvider()
    const auth = getAuth(app)

    const loginGoogle = async () => {
        signInWithPopup(auth, google)
            .then((result) => {
                GetUser()
            })
            .catch((error) => {
                console.log(error)
            })
    }
  return (
    <button onClick={loginGoogle} className={styles.btnLogin}>
      <FontAwesomeIcon icon={faGoogle} className={styles.googleIcon} />
      <span>Ingresar</span>
    </button>
  )
}

export default BtnLogin