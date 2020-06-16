import React from "react";
import MaterialIcon from "../../icons/MaterialIcon";
import Span from "../../html-components/Span"; 
import "./DropDownSubMenuElement.css";
import  { Link } from "react-router-dom";


function DropDownSubMenuElement(props) {
    return(
        <Link 
            className="side-nav-row"
            to={props.link}
            onClick={props.onClick}
        >   
            <MaterialIcon 
                className={`side-nav-sub-icon ${props.materialIconClassName}`}
                iconName={props.iconName}
            />
            <Span 
                className={`sub-menu-name ${props.menuTextClassName}`}
                content={props.content}
            />
        </Link>
    )
}

export default DropDownSubMenuElement;