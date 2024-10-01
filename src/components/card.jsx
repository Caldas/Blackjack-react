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

  let isRedSuit = suit === 'hearts' || suit === 'diamonds';

  return (
    <div className="card">
      <div className={isRedSuit ? 'card-value card-value-red' : 'card-value'}>{value}</div>
      <div className={isRedSuit ? 'card-suit-red' : 'card-suit'}>{suitSymbols[suit]}</div>
    </div>
  );
}

export default Card;
