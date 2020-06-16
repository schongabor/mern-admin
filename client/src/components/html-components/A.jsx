import React from "react";
import "./A.css";


function A(props){
    return(
    <a 
        href={props.href} 
        className={props.className}
        onClick = {props.onClick}
    >
        {props.content}
        {props.children}
    </a>
    )
}

export default A;


