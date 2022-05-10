import React from 'react'
import Tablas from './torneos/tablas'

const Torneo = () => {
  return (
    <div className='d-flex text-center flex-column text-white justify-content-center align-items-center'>
        <h1>Torneo 26 parejas en total, 4 grupos de 5 y un grupo de 6</h1>
    <div className="tablasTorneo">
    <Tablas/>
    </div>
    </div>
  )
}

export default Torneo