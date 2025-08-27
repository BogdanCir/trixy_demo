import React from 'react';
import { Card, CardContent } from 'framework7-react';
import { Play, Headphones, ChevronRight } from 'feather-icons-react';
import './css/PulseCard.css'; // rounded corners, background, positioning

export default function PulseCard({ data }) {
  const { title, status, elapsed, coverUrl } = data;

  return (
    <Card className="pulse-card">
      <div
        className="pulse-card__cover"
        style={{ backgroundImage: `url(${coverUrl})` }}
      >
        <Play size={32} className="pulse-card__play-btn" />
      </div>
      <CardContent>
        <div className="pulse-card__header">
          <Headphones size={18} />
          <span className="pulse-card__title">{title}</span>
        </div>
        <div className="pulse-card__status-row">
          <span className="pulse-card__status">{status}</span>
          <span className="pulse-card__elapsed">{elapsed}</span>
          <ChevronRight size={16} />
        </div>
      </CardContent>
    </Card>
  );
}
