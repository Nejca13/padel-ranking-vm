import React from 'react'

const Contador = (props) => {
  return (
    <div className='fs-5 text-secondary text-end'>
        <p className='px-2 font-monospace'>Jugadores: {props.players.length}</p>
    </div>
  )
}

export default Contador