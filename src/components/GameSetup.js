import React, { useState } from "react";

const GameSetup = ({ onStartGame }) => {
  const [drawMode, setDrawMode] = useState(null);

  const handleStart = () => {
    if (drawMode) {
      onStartGame(drawMode);
    }
  };

  return (
    <div className="game-setup">
      <h2>Choose Draw Mode</h2>
      <button onClick={() => setDrawMode(1)}>Draw 1 Card</button>
      <button onClick={() => setDrawMode(3)}>Draw 3 Cards</button>
      <br />
      <button onClick={handleStart} disabled={!drawMode}>Start Game</button>
    </div>
  );
};

export default GameSetup;