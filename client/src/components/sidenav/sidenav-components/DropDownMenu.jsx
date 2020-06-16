import React, {useState} from "react";
import DropDownMenuElement from "./DropDownMenuElement";
import Animation from "./Animation";
import DropDownSubMenuElement from "./DropDownSubMenuElement";
import Li from "../../html-components/Li";
import Ul from "../../html-components/Ul";
import "./DropDownMenu.css";

function DropDownMenu(props) {
    
    const [visibility, setVisibility] = useState(false);
    const [arrowDirection, setArrowDirection] = useState("keyboard_arrow_down")

    function handleClick(event){

        event.preventDefault();

        setVisibility(!visibility);

        if(arrowDirection === "keyboard_arrow_down") {
            setArrowDirection("keyboard_arrow_up");
        } else {
            setArrowDirection("keyboard_arrow_down");
        }
    }

    // function handleAnchorClick(event){
    //     event.preventDefault();
    // }

    return(
        <Li>
            <DropDownMenuElement 
                aClassName="" //complete row
                materialIconClassName={props.leftMenuIconClass} //left icon from row
                menuNameClassName={props.menuTextClass} //menu text in row
                toggleButtonClassName={props.rightMenuIconClass} //right icon in row

                iconName={props.iconName}
                content={props.content}

                toggleArrowDirection={arrowDirection}
                onClick={handleClick}
                // onClickAnchor={handleAnchorClick}
            />
            <Ul>
                <Animation
                    transitionTrigger={visibility}
                    animations="dropdown0"
                >
                    <DropDownSubMenuElement
                        iconName={props.firstIcon}
                        content={props.firstContent}
                        materialIconClassName={props.subMenuIconClass}
                        menuTextClassName={props.subMenuTextClass}
                        link={props.firstLink}
                        onClick={props.onSubMenuClick}
                    />
                    <DropDownSubMenuElement
                        iconName={props.secondIcon}
                        content={props.secondContent}
                        materialIconClassName={props.subMenuIconClass}
                        menuTextClassName={props.subMenuTextClass}
                        link={props.secondLink}
                        onClick={props.onSubMenuClick}
                    />
                    <DropDownSubMenuElement
                        iconName={props.thirdIcon}
                        content={props.thirdContent}
                        materialIconClassName={props.subMenuIconClass}
                        menuTextClassName={props.subMenuTextClass}
                        link={props.thirdLink}
                        onClick={props.onSubMenuClick}
                    />
                </Animation>
            </Ul>
        </Li>
    )
}

export default DropDownMenu;
