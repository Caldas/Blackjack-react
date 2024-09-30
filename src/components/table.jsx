// Table.jsx
import React, { useState, useEffect, useRef } from "react";
import Player from "./Player";
import Shoe from "./Shoe";

function Table() {
  const [gamePhase, setGamePhase] = useState("shuffling"); // 'shuffling', 'betting', 'dealing', 'playing'
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [timeLeft, setTimeLeft] = useState(15); // For countdown display
  const countdownRef = useRef(null); // Ref to store the timeout ID and interval ID
  const [deck, setDeck] = useState([]); // Manage deck state here

  const handleShuffleFinish = (shuffledDeck) => {
    console.log("Starting bet phase");
    setDeck(shuffledDeck); // Set the shuffled deck
    setGamePhase("betting");
  };

  const startBettingCountdown = () => {
    console.log("Starting betting countdown");

    // Clear any existing timeout and interval to prevent multiple timers
    if (countdownRef.current) {
      clearTimeout(countdownRef.current.timeoutId);
      clearInterval(countdownRef.current.intervalId);
    }

    setTimeLeft(15); // Reset timer

    // Start interval to update timeLeft every second
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Set timeout to transition to dealing phase after 15 seconds
    const timeoutId = setTimeout(() => {
      if (gamePhase === "betting") {
        console.log("Starting dealing phase after countdown");
        setGamePhase("dealing");
      }
      countdownRef.current = null; // Reset the ref
      clearInterval(intervalId); // Clear the interval when timeout completes
    }, 15000);

    countdownRef.current = { timeoutId, intervalId };
  };

  useEffect(() => {
    if (gamePhase === "betting") {
      startBettingCountdown();
    }

    // Cleanup function to clear the timeout and interval if the component unmounts or gamePhase changes
    return () => {
      if (countdownRef.current) {
        clearTimeout(countdownRef.current.timeoutId);
        clearInterval(countdownRef.current.intervalId);
        countdownRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gamePhase]);

  const handleDealCard = () => {
    if (deck.length === 0) {
      console.log("Deck is empty. Reshuffling...");
      // Optionally, trigger a reshuffle or handle the empty deck scenario
      return null;
    }
    const card = deck[0];
    setDeck(deck.slice(1));
    return card;
  };

  const dealInitialCards = () => {
    // Deal two cards to player and dealer
    const playerCard1 = handleDealCard();
    const dealerCard1 = handleDealCard();
    const playerCard2 = handleDealCard();
    const dealerCard2 = handleDealCard();

    if (playerCard1 && playerCard2 && dealerCard1 && dealerCard2) {
      setPlayerHand([playerCard1, playerCard2]);
      setDealerHand([dealerCard1, dealerCard2]);
      setGamePhase("playing");
    } else {
      console.log("Not enough cards to deal initial hands.");
      // Handle this scenario appropriately
    }
  };

  useEffect(() => {
    if (gamePhase === "dealing") {
      console.log("Dealing initial cards...");
      dealInitialCards();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gamePhase]);

  const handleDealCardAction = () => {
    console.log("Dealing card action triggered.");
    const card = handleDealCard();
    if (card) {
      // Determine who to deal the card to (player or dealer) based on game logic
      // For example:
      setPlayerHand((prevHand) => [...prevHand, card]);
    }
  };

  const handlePlacedBet = () => {
    console.log("Starting dealing phase after bet");
    setGamePhase("dealing");
  };

  return (
    <div>
      <h1>Blackjack</h1>
      <Player isDealer={true} hand={dealerHand} />
      <Player
        isDealer={false}
        hand={playerHand}
        disableBetting={gamePhase !== "betting"}
        onPlacedBet={handlePlacedBet}
        timeLeft={gamePhase === "betting" ? timeLeft : null}
      />
      <Shoe
        isShuffling={gamePhase === "shuffling"}
        onShuffleFinish={handleShuffleFinish}
      />
      <p>Game is at: {gamePhase} state</p>
    </div>
  );
}

export default Table;
