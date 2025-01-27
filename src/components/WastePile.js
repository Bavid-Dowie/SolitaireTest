import React, { useEffect } from "react";
import Card from "./Card";
import "../styles/WastePile.css";

const WastePile = ({ cards = [] }) => {
  console.log("WastePile received cards:", cards); // ✅ Log to confirm received cards
  if (!cards || cards.length === 0) {
    console.log("WastePile is empty.");
  }

  const visibleCards = cards.slice(-3); // Get the last 3 cards

  console.log("WastePile rendering cards:", cards);
  console.log("WastePile re-rendering...");

  // ✅ Check if React detects prop updates
  useEffect(() => {
    console.log("WastePile useEffect triggered. New props:", cards);
  }, [cards]);

  return (
    <div className="waste-pile">
      {visibleCards.length > 0 ? (
        visibleCards.map((card, index) => (
          <div key={card.id} className="waste-card" style={{ position: "absolute", left: `${index * 20}px` }}>
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
