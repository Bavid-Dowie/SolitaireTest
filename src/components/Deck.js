import React from "react";
import "../styles/Deck.css";

const Deck = ({ drawCard, remainingCards }) => {
  return (
    <div className="deck-container" onClick={drawCard}>
      {remainingCards > 0 ? <div className="deck-back"></div> : <div className="empty-deck">No Cards</div>}
    </div>
  );
};

export default Deck;
