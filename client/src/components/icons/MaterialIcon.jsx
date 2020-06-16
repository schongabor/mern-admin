import React from "react";
import "./MaterialIcon.css";


function MaterialIcon(props){

    const defaultClass = "material-icons"

    return(
    <span 
        className={`${defaultClass} ${props.className}`}
        onClick={props.onClick}
        id={props.id}
    >
        {props.iconName}
    </span>
    )
}

export default MaterialIcon;