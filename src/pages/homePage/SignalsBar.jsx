import React from 'react';
import SignalItem from './Signaltem';
import './css/SignalsBar.css'; // e.g. overflow-x, flex, spacing

export default function SignalsBar({ items }) {
  return (
    <div className="signals-bar">
      {items.map(item => (
        <SignalItem key={item.id} {...item} />
      ))}
    </div>
  );
}
