import React from "react";
export default function Box(props){

    return(
        <div className="single--box" onClick={props.onClick}>
            <h1>{props.value}</h1>
        </div>
    );
};