import React, { useMemo } from 'react';

const STAR_COLORS = [
  'rgba(255,255,255,0.9)',
  'rgba(129,236,255,0.8)',
  'rgba(255,81,250,0.7)',
  'rgba(202,253,0,0.7)',
];

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

const StarField: React.FC = () => {
  const stars = useMemo<Star[]>(() => (
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() < 0.25
        ? Math.random() * 2 + 0.8
        : Math.random() * 0.8 + 0.2,
      delay: Math.random() * 6,
      duration: Math.random() * 4 + 2,
      color: Math.random() < 0.18
        ? STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)]
        : 'rgba(255,255,255,0.75)',
    }))
  ), []);

  return (
    <div className="starfield">
      {stars.map(star => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            boxShadow: star.size > 1.5
              ? `0 0 ${star.size * 3}px ${star.color}`
              : undefined,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default StarField;
