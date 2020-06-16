import React from "react";
import "./Span.css";

function Span(props){
    return(
        <span className={props.className}>
            {props.content}
            {props.children}
        </span>
    )
}

export default Span;