import React from "react";
import { useDrop } from "react-dnd";
import Card from "./Card";
import "../styles/Tableau.css";

const TableauColumn = ({ column, columnIndex, moveCardToTableau }) => {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "CARD",
    drop: (item) => {
      console.log(`🛑 Drop event triggered for ${item.card.value} of ${item.card.suit}`);

      if (item && item.fromColumn !== undefined) {
        console.log(
          `✅ Dropping ${item.card.value} of ${item.card.suit} from column ${item.fromColumn} to column ${columnIndex}`
        );
        moveCardToTableau(item.card, item.fromColumn, columnIndex);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={dropRef} className={`tableau-column ${isOver ? "hover" : ""}`}>
      {column.map((card, index) => (
        <Card key={index} card={card} columnIndex={columnIndex} />
      ))}
    </div>
  );
};

const Tableau = ({ tableau, moveCardToTableau }) => {
  return (
    <div className="tableau-container">
      {tableau.map((column, index) => (
        <TableauColumn
          key={index}
          column={column}
          columnIndex={index}
          moveCardToTableau={moveCardToTableau}
        />
      ))}
    </div>
  );
};

export default Tableau;
