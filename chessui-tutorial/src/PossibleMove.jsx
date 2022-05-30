import React from 'react'
import {handleMove} from "./Game";

export default function PossibleMove({from, to, piece}) {
    let circle = "possibleMove"
    if (piece) {
        circle = "possibleMoveCapture"
    }
    console.log(`./assets/${circle}.svg`)
    return (
        <div className="poss-move-container" onClick={()=>handleMove(from, to)}>
        <img
            src={require(`./assets/${circle}.svg`)}
            alt="yellow circle"
            className="poss-move cursor-pointer"
        />
        </div>
    );
}
