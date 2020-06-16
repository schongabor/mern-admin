import React from "react";
import DropDownMenu from "./sidenav-components/DropDownMenu"
import Ul from "../html-components/Ul";
import "./SideNav.css"


function SideNav(props) {

    // function preventReload(event){
    //     event.preventDefault();
    //     console.log(event.target);
    // }

    return(

        <nav className={`SideNav ${props.sideNavClass}`}>
            
            <Ul className="side-nav-ul">    

                <DropDownMenu
                    /*Dropdown Head Content*/
                    iconName = "table_chart"
                    content = "Adattörzsek"

                    /*Dropdown Head Addable Classes*/
                    leftMenuIconClass={props.leftMenuIconClass}
                    menuTextClass={props.menuTextClass}
                    rightMenuIconClass={props.rightMenuIconClass}

                    /*Dropdown Submenu Addable Classes*/
                    subMenuIconClass={props.subMenuIconClass}
                    subMenuTextClass={props.subMenuTextClass}

                    /*href-s*/
                    firstLink="/Clients"
                    secondLink="/Subcontractors"
                    thirdLink="/Sites"

                    //submenus
                    firstIcon="business_center"
                    firstContent="Vevők"
                    secondIcon="local_shipping"
                    secondContent="Szállítók"
                    thirdIcon="location_city"
                    thirdContent="Telepek"
                />

                <DropDownMenu
                    /*Dropdown Head Content*/
                    iconName = "local_shipping"
                    content = "További dropdown"

                    /*Dropdown Head Addable Classes*/
                    leftMenuIconClass={props.leftMenuIconClass}
                    menuTextClass={props.menuTextClass}
                    rightMenuIconClass={props.rightMenuIconClass}

                    /*Dropdown Submenu Addable Classes*/
                    subMenuIconClass={props.subMenuIconClass}
                    subMenuTextClass={props.subMenuTextClass}

                    firstLink="/Valamiendpoint1"
                    secondLink="/Valamiendpoint2"
                    thirdLink="/Valamiendpoint3"

                    //submenus
                    firstIcon="square_foot"
                    firstContent="Valami almenü1"
                    secondIcon="square_foot"
                    secondContent="Valami almenü2"
                    thirdIcon="square_foot"
                    thirdContent="Valami almenü3"
                />

            </Ul>

        </nav>
    )
}

export default SideNav;