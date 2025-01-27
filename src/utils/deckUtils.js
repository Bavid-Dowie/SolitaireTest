export const suits = ["hearts", "diamonds", "clubs", "spades"];
export const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

export const generateDeck = () => {
  const suits = ["hearts", "diamonds", "clubs", "spades"];
  const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  let deck = [];

  suits.forEach((suit) => {
    values.forEach((value, index) => {
      deck.push({
        id: `${value}-${suit}`,
        suit,  // ✅ Make sure this is assigned correctly
        value,
        rank: index + 1, // Ace = 1, King = 13
        faceUp: false,
      });
    });
  });

  return deck.sort(() => Math.random() - 0.5); // Shuffle deck
};
