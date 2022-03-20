
const Contacto = () => {
    return (
        <div className="mt-4 mx-3">
            <h1>Hola padeleros del Valle Medio!</h1>
            <p>Les dejo un enlace a Messenger para que comuniquen cualquier defecto en la pagina.</p>
            <p>Si bien esta en modo de pruebas todavia, me gustaria que haya un Feedback para poder mejorarla lo antes posible.</p>
            <p>Desarrollador: <strong>Contreras Nicolás</strong> </p>
            <div className='socialMedia'>
            <a href="https://m.me/Qwerty.PC"><i class="fa-brands fa-facebook-messenger fs-1"></i></a>
            <div className="fb-like" data-href="https://www.facebook.com/Qwerty.PC/" data-width="" data-layout="button_count" data-action="like" data-size="large" data-share="false"></div>
            </div>
            
        </div>
    )
}

export default Contacto;