import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';

const SingOut = () => {
    const auth = getAuth(app);
    const navigate = useNavigate()

    const cerrarSesion = () => {
        signOut(auth).then(() => {
            navigate("/")
          }).catch((error) => {
            alert(error)
          });
    }
  return (
    <div>
        <button className='btn btn-danger' onClick={cerrarSesion}>
        Cerrar Sesion
        </button>
    </div>
  )
}

export default SingOut