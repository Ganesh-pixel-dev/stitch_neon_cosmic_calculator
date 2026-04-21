import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface ButtonProps {
  value: string;
  onClick: (value: string) => void;
  variant?: 'number' | 'operator' | 'special' | 'equals';
  wide?: boolean;
  isActive?: boolean;
}

const classMap: Record<string, string> = {
  number: 'btn-number',
  operator: 'btn-operator',
  special: 'btn-special',
  equals: 'btn-equals',
};

const Button: React.FC<ButtonProps> = ({
  value,
  onClick,
  variant = 'number',
  wide = false,
  isActive = false,
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.random();
    setRipples(prev => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600);
    onClick(value);
  }, [onClick, value]);

  const btnClass = `calc-btn ${classMap[variant]} ${wide ? 'btn-wide' : ''} ${isActive ? 'btn-kb-active' : ''}`;

  return (
    <motion.button
      className={btnClass}
      onClick={handleClick}
      whileTap={{ scale: 0.90, y: 5 }}
      whileHover={{ scale: 1.04, y: -2 }}
      transition={{ type: 'spring', stiffness: 700, damping: 22, mass: 0.8 }}
    >
      {value}
      {ripples.map(r => (
        <span
          key={r.id}
          className="ripple"
          style={{ left: r.x, top: r.y }}
        />
      ))}
    </motion.button>
  );
};

export default Button;
