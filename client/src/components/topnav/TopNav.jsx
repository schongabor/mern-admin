import React from "react";
import MaterialIcon from "../icons/MaterialIcon";
import Ul from "../html-components/Ul";
import Li from "../html-components/Ul";
import A from "../html-components/A";
import Image from "../html-components/Image";
import "./TopNav.css";

function TopNav(props) {
    return(
        <nav className="TopNav">
            <Ul>
                <Li>
                    <A
                        href={props.href}
                        className={props.className}
                    >
                        <Image 
                            src="logo.png"
                            alt="brand_logo"
                            className="logo"
                        />                         
                    </A>
                    <A 
                        content="WimPi"
                        className="brand"
                        href={props.href} 

                    />
                    <A className="top-menu-elements">
                        <MaterialIcon 
                            className="top-nav" 
                            iconName="power_settings_new"
                        />
                    </A>
                    <A className="top-menu-elements">
                        <MaterialIcon 
                            className="top-nav" 
                            iconName="settings"
                        />
                    </A>
                    <A className="top-menu-elements">
                        <MaterialIcon 
                            className="top-nav" 
                            iconName="account_circle"
                        />
                    </A>          
                </Li>
            </Ul>
        </nav>
    )
}

export default TopNav;
