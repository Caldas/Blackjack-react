// Player.jsx
import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./Player.css"; // Create this CSS file for styling

function Player({
  isDealer,
  hand,
  onPlacedBet,
  disableBetting,
}) {
  const [betAmount, setBetAmount] = useState(1);
  const [chips, setChips] = useState(10);

  // Handle bet input changes
  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value)) {
      setBetAmount(1);
    } else {
      setBetAmount(value);
    }
  };

  // Handle bet submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Betting:' + betAmount);
    if (betAmount > 0 && betAmount <= chips) {
        onPlacedBet(betAmount);
    } else {
      alert("Invalid bet amount");
    }
  };

  return (
    <div className={isDealer ? "dealer" : "player"}>
      <h2>{isDealer ? "Dealer" : "Player"}</h2>
      {!isDealer && (
        <>
            <p>Chips: {chips}</p>
            
            {!disableBetting && (
                <div className="betting-section">
                    <p>Current Bet: {betAmount}</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="number"
                            min="1"
                            max={chips}
                            value={betAmount}
                            onChange={handleChange}
                            disabled={disableBetting}
                        />
                        <button type="submit">
                            Place Bet
                        </button>
                    </form>
                </div>
            )}
            {disableBetting && betAmount > 0 && <p>Bet placed: {betAmount}</p>}
        </>
      )}
      <div className="hand">
        {hand.map((card, index) => (
          <Card key={index} value={card.value} suit={card.suit} />
        ))}
      </div>
    </div>
  );
}

export default Player;
