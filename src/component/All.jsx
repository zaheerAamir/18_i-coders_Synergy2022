import React from "react";


function All(props){

    return(
        <>
            <section id="Allevents">
                <div className="img-cont">
                    <img src={props.image} alt="new" className="img-user"/>
                </div>
                <div className="info-cont">
                    <p>{props.name}</p>
                    <p className="info-para">{props.info}</p>
                    <p>{props.contact}</p>
                </div>
                <button>Register</button>
            </section>
            
        </>
    )
}

export default All