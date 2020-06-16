import React from "react";
import "./Image.css";

function Image(props){
    return(
        <img 
            src={require(`../topnav/${props.src}`)} 
            alt={props.alt}
            className={props.className} 
            onClick={props.onClick}
        /> 
        // <img src={require(`${props.src}`)} alt={props.alt} /> 
    )
}

export default Image;
