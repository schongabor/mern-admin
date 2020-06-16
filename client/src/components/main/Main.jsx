import React from "react";
import "./Main.css";

function Main(props) {
    return(
        <div className={`MainContainer ${props.mainContainerClass}`}>
            {props.children}
        </div>
    )
}

export default Main;