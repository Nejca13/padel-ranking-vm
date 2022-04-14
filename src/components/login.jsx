import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const google = new GoogleAuthProvider();
  const navigate = useNavigate();
  const auth = getAuth(app);

  const loginGoogle = () => {
    signInWithPopup(auth, google)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        navigate("/perfil");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div className="container d-flex justify-content-center my-5 loginDiv">
      <div className="mt-5 d-flex flex-column">
        <button
          className="px-5 py-2 my-2 ingresoConGoogle"
          onClick={loginGoogle}
        >
          <FontAwesomeIcon className="iconoGoogle" icon={faGoogle} /> Ingresar
          con Google
        </button>
        <button
          className="px-5 py-2 my-2 ingresoConFacebook"
          onClick={(e) => alert("Funcion en desarrollo.")}
        >
          <FontAwesomeIcon className="iconoFacebook" icon={faFacebook} />{" "}
          Ingresar con Facebook
        </button>
      </div>
    </div>
  );
};

export default Login;
