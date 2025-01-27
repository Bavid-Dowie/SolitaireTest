import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { generateDeck } from "../utils/deckUtils";
import Tableau from "./Tableau";
import Foundation from "./Foundation";
import GameSetup from "./GameSetup";
import Deck from "./Deck";
import WastePile from "./WastePile";
import "../styles/SolitaireGame.css";

const SolitaireGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [drawMode, setDrawMode] = useState(null);
  const [tableau, setTableau] = useState(Array.from({ length: 7 }, () => []));
  const [foundation, setFoundation] = useState([[], [], [], []]);
  const [stock, setStock] = useState([]);
  const [waste, setWaste] = useState([]);
  const [forceRender, setForceRender] = useState(false);

  const handleStartGame = (selectedDrawMode) => {
    setDrawMode(selectedDrawMode);
    setGameStarted(true);
  };

  useEffect(() => {
    if (!gameStarted) return;

    const deck = generateDeck();
    let newTableau = Array(7).fill(null).map(() => []);

    for (let i = 0; i < 7; i++) {
      newTableau[i] = deck.splice(0, i + 1);
      newTableau[i][newTableau[i].length - 1].faceUp = true;
    }

    setTableau(newTableau);
    setStock(deck);
  }, [gameStarted]);

  const drawCard = () => {
    if (stock.length === 0) {
      console.log("Stock is empty. Resetting from waste.");
      setStock([...waste.reverse()]); // Reset stock from waste
      setWaste([]); // Empty waste
      return;
    }

    const numCardsToDraw = Math.min(drawMode, stock.length); // Draw up to `drawMode` cards
    const drawnCards = stock.slice(0, numCardsToDraw); // Get the top `numCardsToDraw` cards

    console.log(`Drawing ${numCardsToDraw} card(s):`, drawnCards);

    // Ensure state updates trigger a re-render by creating new array references
    setWaste((prevWaste) => {
      const updatedWaste = [...prevWaste, ...drawnCards];
      console.log("Updated waste pile:", updatedWaste); // ✅ Check if waste state updates
      return [...updatedWaste]; // Force state update by creating a new array
    });
    setForceRender(prev => !prev); // ✅ Toggle state to trigger re-render
    console.log("Waste state after update:", waste);
    setStock((prevStock) => [...prevStock.slice(numCardsToDraw)]); // Slice and spread to ensure a new array reference

    console.log("Updated Waste:", [...waste, ...drawnCards]); // Confirm waste updates
    console.log("Updated Stock:", [...stock.slice(numCardsToDraw)]); // Confirm stock updates
  };

  console.log("Updated waste pile state:", waste);

  const canPlaceOnFoundation = (card, foundationPile) => {
    if (!card) return false;
    if (foundationPile.length === 0) return card.value === "A";
    const topCard = foundationPile[foundationPile.length - 1];
    return card.suit === topCard.suit && card.rank === topCard.rank + 1;
  };

  const moveCardToFoundation = (card, foundationIndex, fromColumnIndex) => {
    if (!card || foundationIndex === undefined || fromColumnIndex === undefined) return;

    setTableau((prevTableau) =>
      prevTableau.map((column, index) =>
        index === fromColumnIndex ? column.filter((c) => c.id !== card.id) : column
      )
    );

    setFoundation((prevFoundation) => {
      const newFoundation = [...prevFoundation];
      if (!canPlaceOnFoundation(card, newFoundation[foundationIndex])) return prevFoundation;
      newFoundation[foundationIndex] = [...newFoundation[foundationIndex], card];
      return newFoundation;
    });
  };

  const canPlaceOnTableau = (card, column) => {
    if (!card) return false;
    if (column.length === 0) return card.value === "K";
    const topCard = column[column.length - 1];
    const isOppositeColor =
      (card.suit === "hearts" || card.suit === "diamonds") !==
      (topCard.suit === "hearts" || topCard.suit === "diamonds");
    return isOppositeColor && card.rank === topCard.rank - 1;
  };

  const moveCardToTableau = (card, fromColumnIndex, toColumnIndex) => {
    if (!card || fromColumnIndex === undefined || toColumnIndex === undefined) return;

    setTableau((prevTableau) => {
      let newTableau = [...prevTableau];
      if (!canPlaceOnTableau(card, newTableau[toColumnIndex])) return prevTableau;
      newTableau[fromColumnIndex] = newTableau[fromColumnIndex].filter((c) => c.id !== card.id);
      newTableau[toColumnIndex] = [...newTableau[toColumnIndex], card];
      return newTableau;
    });
  };

  if (!gameStarted) {
    return <GameSetup onStartGame={handleStartGame} />;
  }

  console.log("Rendering SolitaireGame. Waste Pile:", waste);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="solitaire-container">
        <h1>Solitaire</h1>
        <div className="game-area">
          <div className="deck-area">
            <Deck drawCard={drawCard} remainingCards={stock.length} />
            <WastePile key={`${waste.map(card => card.id).join(",")}-${forceRender}`} cards={waste} />
          </div>
          <div className="foundation-container">
            {foundation.map((pile, index) => (
              <Foundation key={index} foundationIndex={index} cards={pile} moveCardToFoundation={moveCardToFoundation} />
            ))}
          </div>
        </div>
        <Tableau tableau={tableau} moveCardToTableau={moveCardToTableau} canPlaceOnTableau={canPlaceOnTableau} />
      </div>
    </DndProvider>
  );
};

export default SolitaireGame;
