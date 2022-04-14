import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";



const BotonArriba = () => {
    const toUp = () => {
        window.scrollTo(0, 0)
    }
    return(
        <div>
            <button onClick={toUp} className="botonArriba text-dark">
           <FontAwesomeIcon icon={faArrowUp} />
            </button> 
        </div>
        
    )
}

export default BotonArriba;