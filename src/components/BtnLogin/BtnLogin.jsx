import styles from './BtnLogin.module.css'
import { app } from "../../firebase"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "@firebase/auth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import { useNavigate } from 'react-router-dom'

const BtnLogin = () => {
    const google = new GoogleAuthProvider()
    const auth = getAuth(app)
    const navigate = useNavigate()

    const loginGoogle = () => {
        signInWithPopup(auth, google)
            .then((result) => {
                navigate('/perfil')
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