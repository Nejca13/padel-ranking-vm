import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faFacebookMessenger,
} from "@fortawesome/free-brands-svg-icons";
import React from "react";

const Contacto = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="my-4 mx-3 bg-white p-2 contactoDiv text-center">
      <h1>Hola padeleros del Valle Medio!</h1>
      <p> 
        Les dejo un enlace a Messenger y otro a Whatsapp para que comuniquen
        cualquier defecto en la pagina.
      </p>
      <p> 
        Si bien esta en modo de pruebas todavia, me gustaria que haya un
        Feedback para poder mejorarla lo antes posible.
      </p>
      <p> 
        <strong className="saludo">Saludos!</strong>
      </p>
      <div className="socialMedia mb-4">
        <a href="https://m.me/Qwerty.PC" className="message">
          <FontAwesomeIcon icon={faFacebookMessenger} />
        </a>
        <a
          href="https://api.whatsapp.com/send?phone=+542984406895&text=Tengo un problema."
          className="whatsapp"
        >
          <FontAwesomeIcon icon={faWhatsapp} />
        </a>
      </div>
      </div>
    </div>
  );
};

export default Contacto;
