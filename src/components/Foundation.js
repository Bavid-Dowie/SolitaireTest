import React from "react";
import { useDrop } from "react-dnd";
import Card from "./Card";
import "../styles/Foundation.css";

const Foundation = ({ foundationIndex, cards = [], moveCardToFoundation }) => {
  const foundationSuit = cards.length > 0 ? cards[0].suit : null; // ✅ Derive suit from first card

  const canPlaceOnFoundation = (card, foundationPile = []) => {
    if (!card) return false;
    if (foundationPile.length === 0) return card.value === "A";

    const topCard = foundationPile[foundationPile.length - 1];
    return card.suit === foundationSuit && card.rank === topCard.rank + 1;
  };

  const [{ isOver }, drop] = useDrop({
    accept: "CARD",
    drop: (item) => {
      if (!item.card || item.fromColumn === undefined) {
        console.log(`❌ Missing parameters!`, { item });
        return;
      }

      console.log(`🛑 Dropping ${item.card.value} of ${item.card.suit} onto foundation ${foundationIndex}`);

      if (cards.length === 0 && item.card.value === "A") {
        console.log(`✅ Foundation ${foundationIndex} set to ${item.card.suit}`);
        moveCardToFoundation(item.card, foundationIndex, item.fromColumn);
      } else if (canPlaceOnFoundation(item.card, cards)) {
        console.log(`✅ Moving ${item.card.value} of ${item.card.suit} to foundation`);
        moveCardToFoundation(item.card, foundationIndex, item.fromColumn);
      } else {
        console.log(`❌ Invalid move: ${item.card.value} of ${item.card.suit} does not match foundation ${foundationIndex}`);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className={`foundation ${isOver ? "highlight" : ""}`}>
      {cards.length > 0 ? (
        <Card card={cards[cards.length - 1]} />
      ) : (
        <div className="empty-foundation">♠♥♦♣</div>
      )}
    </div>
  );
};

export default Foundation;
