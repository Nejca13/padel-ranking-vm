import React from "react"

const Bienvenida = () => {
  return (
    <div className="my-5 mx-3 bg-white p-2 bienvenidaDiv text-center">
      <h1>Bienvenidos!</h1>
      <p className="mx-5">
        En esta plataforma esta en construccion un Ranking de padel para el valle medio.
        
      </p>
      <p className="mx-5">
      Si queres formar parte y aparecer en los resultados, <strong>inicia sesion</strong> con tu cuenta de google y carga tu perfil de jugador.
      </p>
      <p>
        <strong>Tener encuenta que para cargar el perfil la foto es requerida, de lo contrario no se cargara.</strong>
      </p>
    </div>
  )
}

export default Bienvenida