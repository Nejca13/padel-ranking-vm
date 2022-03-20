import uniqid from "uniqid";

const Cuarta = (props) => {
    const cuarta = props.players.filter((item) => item.categoria === "4ta" );

    return (
        <div>
            {cuarta.length > 0 ?
          (
        <div>
        <div className="bg-black container-fluid mx-0">
          <p className="text-white-50 fs-4 text-center mb-0 font-monospace pt-1">4° CUARTA</p>
        </div>
        <div className="cards">
        {
          cuarta.length > 0 && (
            cuarta.map((item) => (
              <div key={uniqid()} className="border border-3 rounded my-4 mx-4 playerCard">
                <div className="mx-3 my-3 player">
                  <div className="">
                    <h5 className="text-center">
                      {item.firstName} {item.lastName}
                    </h5>
                  </div>
                  <p className="text-dark fs-5 d-flex justify-content-between container-fluid">
                    {item.position}
                    <span className="ml-5 text-dark  fs-5">
                      Cat: {item.categoria}
                    </span>
                  </p>
                  <img
                    className="rounded-circle border border-dark border-3"
                    src={item.foto}
                    width="200"
                    height="200"
                    alt=""
                  />
                </div>
              </div>
            ))
          )
        }
        </div>
        
        </div>
        ) : <span></span>}
        </div>
    )
};

export default Cuarta;