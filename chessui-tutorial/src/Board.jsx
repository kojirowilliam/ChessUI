import React, { useState, useEffect } from "react";
import BoardSquare from "./BoardSquare";
import { getPossMoves } from "./Game";

export default function Board({ board, turn }) {
  function getXYPosition(i) {
    const x = turn == "w" ? i % 8 : Math.abs((i % 8) - 7);
    const y = turn == "w" ? Math.abs(Math.floor(i / 8) - 7) : Math.floor(i / 8);
    return { x, y };
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

  const [curBoard, setCurBoard] = useState([]);

  useEffect(() => {
    setCurBoard(turn === "w" ? board.flat() : board.flat().reverse());
  }, [board, turn]);
  return (
    <div className="board">
      {curBoard.flat().map((piece, i) => (
        <div key={i} className="square" >
          <BoardSquare
            piece={piece}
            black={isBlack(i)}
            position={getPosition(i)}
          />
        </div>
      ))}
    </div>
  );
}
