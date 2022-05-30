import React, { useEffect, useState } from "react";
import Square from "./Square";
import Piece from "./Piece";
import { useDrop } from "react-dnd";
import { handleMove, gameSubject, setPendingMove } from "./Game";
import Promote from "./Promote";
import PossibleMove from "./PossibleMove";

export default function BoardSquare({ piece, black, position }) {
  const [promotion, setPromotion] = useState(null);
  const [possMove, setPossMove] = useState(null);
  const [, drop] = useDrop({
    accept: "piece",
    drop: (item) => {
      const [fromPosition] = item.id.split("_");
      handleMove(fromPosition, position);
    },
  });
  useEffect(() => {
    const subscribe = gameSubject.subscribe(({ pendingPromotion }) =>
      pendingPromotion && pendingPromotion.to === position
        ? setPromotion(pendingPromotion)
        : setPromotion(null)
    );
    return () => subscribe.unsubscribe();
  }, [position]);

  useEffect(() => {
    const subscribe = gameSubject.subscribe(({ pendingMoves }) =>
      pendingMoves && pendingMoves.includes(position)
        ? setPossMove(position)
        : setPossMove(null)
    );
    return () => subscribe.unsubscribe();
  });

  return (
    <div
      className="board-square"
      ref={drop}
      // onClick={()=> 
      //   console.log(position)}
      onClick={() =>
        setPendingMove(promotion, position)
      }
    > 
      <Square black={black}>
        {promotion ? (
          <Promote promotion={promotion} />
        ) : piece ? (
          <Piece piece={piece} position={position} />
        ) : null}
        {possMove ? (
          <PossibleMove from={position} to={possMove} piece={piece} />
        ) : null}
      </Square>
    </div>
  );
}
