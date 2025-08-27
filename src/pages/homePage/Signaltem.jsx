// src/homePage/SignalItem.jsx
import React from 'react';
import { Globe } from 'feather-icons-react';

export default function SignalItem({ name, status, iconUrl }) {
  // Determine status color
  const statusColor = status.toLowerCase().includes('bullish') ? 'green' : 'red';

  return (
    <div className="signal-item">
      {/* Render backend-provided icon or fallback to a generic icon */}
      {iconUrl ? (
        <img src={iconUrl} alt={name} className="signal-item__icon" />
      ) : (
        <Globe size={20} />
      )}
      <div className="signal-item__text">
        <span className="signal-item__name">{name}</span>
        <span className="signal-item__status" style={{ color: statusColor }}>
          {status}
        </span>
      </div>
    </div>
  );
}
