import React, { useEffect } from "react";
import Card from "./Card";
import "../styles/WastePile.css";

const WastePile = ({ cards = [], drawMode }) => {
  console.log("WastePile received cards:", cards);

  const numVisibleCards = drawMode === 1 ? 1 : 3; // Adjust based on draw mode
  const visibleCards = cards.slice(-numVisibleCards); // Show last 1 or 3 cards

  useEffect(() => {
    console.log("WastePile useEffect triggered. New props:", cards);
  }, [cards]);

  return (
    <div className="waste-pile">
      {visibleCards.length > 0 ? (
        visibleCards.map((card, index) => (
          <div
            key={card.id}
            className="waste-card"
            style={{
              position: "absolute",
              left: drawMode === 1 ? 0 : `${index * 30}px`, // Side by side for draw 3, stacked for draw 1
              zIndex: index // Ensure correct layering
            }}
          >
            <Card card={card} />
          </div>
        ))
      ) : (
        <div className="empty-waste">Empty</div>
      )}
    </div>
  );
};

export default WastePile;
