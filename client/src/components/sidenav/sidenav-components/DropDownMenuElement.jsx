import React from "react";
import MaterialIcon from "../../icons/MaterialIcon";
import A from "../../html-components/A";
import Span from "../../html-components/Span"; 
import "./DropDownMenuElement.css";

function DropDownMenuElement(props) {
    return(
        <A 
            className={`side-nav-row ${props.aClassName}`}
            onClick={props.onClick}
        >   
            <MaterialIcon 
                className={`side-nav-icon ${props.materialIconClassName}`}
                iconName={props.iconName}
            />
            <Span 
                className={`menu-name ${props.menuNameClassName}`}
                content={props.content}
            />
            <MaterialIcon 
                className={`side-nav-dropdown-btn ${props.toggleButtonClassName}`}
                iconName={props.toggleArrowDirection}
            />
        </A>
    )
}

export default DropDownMenuElement;