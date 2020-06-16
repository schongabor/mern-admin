import React from "react";
import "./Ul.css";

function Ul(props){
    return(
        <ul className={props.className}>
            {props.children}
        </ul>
    )
}

export default Ul;