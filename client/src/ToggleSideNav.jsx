import React from "react";
import MaterialIcon from "./components/icons/MaterialIcon";
import "./ToggleSideNav.css"

function ToggleSideNav(props) {
    return(
        <MaterialIcon 
            className={`side-nav-toggle-btn ${props.sideNavToggleBtnClass}`}
            iconName={props.arrowDirection}
            onClick={props.onClick}
        />
    )
}

export default ToggleSideNav;
