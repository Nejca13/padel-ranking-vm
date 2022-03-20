const Footer = () => {
  return (
    <div className="position-relative bottom-0 mb-5 text-center">
      creado por <strong>
          <a
          className="text-decoration-none creador" 
          href="https://www.facebook.com/Nejca.13">Contreras Nicolás</a>
          </strong>
          <div
        className="fb-like"
        data-href="http://www.facebook.com/Qwerty.PC/"
        data-width=""
        data-layout="button_count"
        data-action="like"
        data-size="large"
        data-share="false"
      ></div>
    </div>
  );
};

export default Footer;
