import React from "react";
import { useDrag } from "react-dnd";
import "../styles/Card.css";

const Card = ({ card, columnIndex }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "CARD",
    item: { id: card?.id, card, fromColumn: columnIndex },
    canDrag: !!card?.faceUp, // Prevents dragging facedown cards
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [card]);

  console.log(`Dragging ${card?.value} of ${card?.suit} from column ${columnIndex}`);

  return (
    <div
      ref={dragRef}
      className={`card ${card?.faceUp ? "face-up" : "face-down"}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {card?.faceUp ? `${card.value} of ${card.suit}` : "🂠"}
    </div>
  );
};

export default Card;
