import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import {
  faWhatsapp,
  faFacebookMessenger,
} from "@fortawesome/free-brands-svg-icons";

const Contacto = () => {
  return (
    <div className="mt-4 mx-3">
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
      <p>
        Desarrollador: <strong>Contreras Nicolás</strong>
      </p>
      <div className="socialMedia mb-4">
        <a href="https://m.me/Qwerty.PC" className="message">
          <FontAwesomeIcon icon={faFacebookMessenger} />
        </a>
        <a
          href="https://api.whatsapp.com/send?phone=+542946410256&text=Quiero Tengo un problema."
          className="whatsapp"
        >
          <FontAwesomeIcon icon={faWhatsapp} />
        </a>
      </div>
    </div>
  );
};

export default Contacto;
