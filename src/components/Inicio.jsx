import ListaDeTorneos from "./listaDeTorneos";
import mercadoPago from "../img/MercadoPago.svg"

const Home = () => {
  return (
    <div className="containerHome">
      <ListaDeTorneos />
      <div className="position-relative bottom-0 donantes pb-3">
        <form
          className=""
          action="https://www.paypal.com/donate"
          method="post"
          target="_top"
        >
          <input type="hidden" name="hosted_button_id" value="JSUSBPCLTS65W" />
          <input
            type="image"
            src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif"
            border="0"
            name="submit"
            title="PayPal - Donacion a Padel Ranking!"
            alt="Donar via Paypal"
          />
          <img
            alt=""
            border="0"
            src="https://www.paypal.com/en_AR/i/scr/pixel.gif"
            width="1"
            height="1"
          />
        </form>
        <button className="botonMercadoPago"> 
          <a className="text-white botonMercadoPago" 
          href="https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380847fa2d1c8017fa319a64f0009&fbclid=IwAR1-C_PNy8-R93rJp88fMmYUP-B1PaZkJKfGeDc_-tmJHnpxPckPaOj8FDA">
             <img src={mercadoPago} alt="" width="50" />
          </a>
         
        </button>
      </div>
    </div>
  );
};

export default Home;
