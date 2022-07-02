import React, { useEffect, useState } from "react";
import "./App.css";
import { gameSubject, initGame, resetGame } from "./Game";
import Board from "./Board";

function App() {
  const [board, setBoard] = useState([]);
  const [isGameOver, setIsGameOver] = useState();
  const [result, setResult] = useState();
  const [turn, setTurn] = useState();
  useEffect(() => {
    initGame();
    const subscribe = gameSubject.subscribe((game) => {
      setBoard(game.board);
      setIsGameOver(game.isGameOver);
      setResult(game.result);
      setTurn(game.turn);
    });
    return () => subscribe.unsubscribe();
  }, []);
  return (
      <div className="container">
        <div className="header">
          <h1>AI CHESS</h1>
        </div>
        <div className="opponent-side">
        <h2>Opponent Side</h2>
        <div>
          <h3>Opponent Type</h3>
        </div>
        <h3>Moves</h3>
        </div>
        <div className="game">
          {isGameOver && (
            <h2 className="game-text">
              GAMEOVER
              <button onClick={resetGame}>
                <span className="game-text">NEW GAME</span>
              </button>
            </h2>
          )}
          <div className="board-container">
            <Board board={board} turn={turn}/>
          </div>
          {result && <p className="game-text">{result}</p>}
        </div>
        <div className="your-score">
          <h1>Your Side</h1>
        </div>
    </div>
  );
}

export default App;
