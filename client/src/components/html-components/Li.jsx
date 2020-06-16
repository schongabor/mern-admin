import React from "react";
import "./Li.css";

function Li(props){
    return(
        <li
            className={props.className}
        >
            {props.children}
        </li>
    )
}

export default Li;