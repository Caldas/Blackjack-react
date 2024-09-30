// Card.jsx
import React from 'react';
import './Card.css'; // Create this CSS file for styling

function Card({ value, suit }) {
  // Optionally, map suits to symbols
  const suitSymbols = {
    hearts: '♥️',
    diamonds: '♦️',
    clubs: '♣️',
    spades: '♠️',
  };

  return (
    <div className="card">
      <div className="card-value">{value}</div>
      <div className="card-suit">{suitSymbols[suit]}</div>
    </div>
  );
}

export default Card;
