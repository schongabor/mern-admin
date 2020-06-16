import React from "react";
import "./Animation.css";
import Li from "../../html-components/Li";
import { CSSTransition } from "react-transition-group";

function Animation(props) {

    return(
        <CSSTransition
            in={props.transitionTrigger}
            timeout={100}
            classNames={props.animations}
            unmountOnExit
            appear
        >
            <Li>
                {props.children}
            </Li>

        </CSSTransition>

    )
}

export default Animation;