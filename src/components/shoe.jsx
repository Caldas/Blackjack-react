// Shoe.jsx
import React, { useState, useEffect, useRef } from "react";
import "./Shoe.css";

// Utility function to create a standard 52-card deck
const createDeck = () => {
  const suits = ["hearts", "diamonds", "clubs", "spades"];
  const values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];

  const deck = [];
  suits.forEach((suit) => {
    values.forEach((value) => {
      deck.push({
        value,
        suit,
        image: `${value}_of_${suit}.png`, // Assuming you have images named accordingly
      });
    });
  });
  return deck;
};

// Fisher-Yates Shuffle Algorithm
const shuffleDeck = (deck) => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

function Shoe({ isShuffling, onShuffleFinish }) {
  const [cards, setCards] = useState([]);

  // Ref to track if shuffling has been initiated
  const hasShuffled = useRef(false);

  useEffect(() => {
    if (isShuffling  && !hasShuffled.current) {
      startShuffling();
      hasShuffled.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShuffling]);

  const startShuffling = () => {
    const deck = createDeck();
    const shuffledDeck = shuffleDeck(deck);
    const shuffleDuration = Math.random() * 1000; // 1 second

    console.log("Shuffling deck over " + shuffleDuration + "ms");

    setTimeout(() => {
      setCards(shuffledDeck);
      console.log("Shuffling complete.");
      onShuffleFinish(shuffledDeck); // Pass the shuffled deck back to Table
      hasShuffled.current = false;
    }, shuffleDuration);
  };

  return (
    <div className="shoe-container">
      <div className={`shoe ${isShuffling ? "shuffling" : "ready"}`}>
        {isShuffling ? "Shuffling..." : "Ready"}
      </div>
    </div>
  );
}

export default Shoe;
