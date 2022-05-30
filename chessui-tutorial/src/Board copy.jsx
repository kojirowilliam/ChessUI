import React, { useState, useEffect } from "react";
import BoardSquare from "./BoardSquare";
import PossibleMove from "./PossibleMove";
import { getPossMoves } from "./Game";

export default function Board({ board, turn }) {
  function getXYPosition(i) {
    const x = turn == "w" ? i % 8 : Math.abs((i % 8) - 7);
    const y = turn == "w" ? Math.abs(Math.floor(i / 8) - 7) : Math.floor(i / 8);
    return { x, y };
  }

/** 
* Takes in the index of the move and sets the possible moves in FEN position convention
* @param {i} Index - The numerical position of the piece
*/
  function usePossibleMoves(i, boolean) {
    console.log("Finding possible moves...")
    useEffect(() => {
      if (boolean) {
        setPossMoves((getPossMoves(i)));
      }
    });
    showPossMoves = false
  }

  function isBlack(i) {
    const { x, y } = getXYPosition(i);
    return (x + y) % 2 === 1;
  }

  function getPosition(i) {
    const { x, y } = getXYPosition(i);
    const letter = ["a", "b", "c", "d", "e", "f", "g", "h"][x];
    return `${letter}${y + 1}`;
  }

  function isPossMove(i) {
    if (possMoves.includes(getPosition(i))) {
      return true;
    }
    return false;
  }

  const [curBoard, setCurBoard] = useState([]);
  const [possMoves, setPossMoves] = useState(null);

  let showPossMoves = false

  useEffect(() => {
    setCurBoard(turn === "w" ? board.flat() : board.flat().reverse());
  }, [board, turn]);
  return (
    <div className="board">
      {curBoard.flat().map((piece, i) => (
        <div key={i} className="square" 
        onClick={showPossMoves = true}>
          <BoardSquare
            piece={piece}
            black={isBlack(i)}
            position={getPosition(i)}
          />
          {usePossibleMoves(i, showPossMoves)}
          {possMoves != null && possMoves.includes(getPosition(i)) ? (
            <PossibleMove />
          ) : null}
        </div>
      ))}
    </div>
  );
}
