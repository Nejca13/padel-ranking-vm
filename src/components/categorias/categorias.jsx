import uniqid from "uniqid";
import React from "react";

const Categorias = (props) => {
    const cat = props.players.filter((item) => item.categoria === props.categoria );

    return (
        <div>
            {cat.length > 0 ?
          (
        <div className="categoriasDiv">
        <div className="bg-primary mx-0 categoria">
          <p className="text-dark-50 fs-4 text-center mb-0 font-monospace pt-1"><strong>{props.categoria[0]}° CAT</strong></p>
        </div>
        <div className="cards">
        {
          cat.length > 0 && (
            cat.map((item) => (
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
                    className="rounded-circle border border-dark border-3 imgPlayer"
                    src={item.foto}
                    width="200"
                    height="200"
                    alt=""
                  />
                  <div>
                    <p className="text-dark fs-5 d-flex justify-content-between container-fluid mb-0 mt-1 ">
                      {item.localidad}
                    </p>
                  </div>
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

export default Categorias;