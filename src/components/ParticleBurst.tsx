import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface Particle {
  id: string;
  angle: number;
  distance: number;
  size: number;
  color: string;
  delay: number;
  isSquare: boolean;
}

interface ParticleBurstProps {
  trigger: number;
}

const COLORS = ['#81ecff', '#ff51fa', '#cafd00', '#ffffff', '#00e4ff', '#ff00ef', '#a8ff00', '#ff8cec'];

const createParticles = (): Particle[] => {
  const count = 32;
  return Array.from({ length: count }, (_, i) => ({
    id: `p-${Date.now()}-${i}`,
    angle: (360 / count) * i + (Math.random() * 20 - 10),
    distance: 70 + Math.random() * 130,
    size: 3 + Math.random() * 7,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    delay: Math.random() * 0.1,
    isSquare: Math.random() < 0.4,
  }));
};

const ParticleBurst: React.FC<ParticleBurstProps> = ({ trigger }) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [show, setShow] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (trigger === 0) return;
    setParticles(createParticles());
    setShow(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setParticles([]);
      setShow(false);
    }, 1100);
    return () => clearTimeout(timeoutRef.current);
  }, [trigger]);

  return (
    <div className="particle-burst-anchor">
      {/* Outer expanding ring */}
      <AnimatePresence>
        {show && (
          <motion.div
            key={`ring1-${trigger}`}
            style={{
              position: 'absolute',
              width: 320,
              height: 320,
              borderRadius: '50%',
              border: '2px solid rgba(129, 236, 255, 0.7)',
              pointerEvents: 'none',
              marginLeft: -160,
              marginTop: -160,
            }}
            initial={{ scale: 0.03, opacity: 1 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{}}
            transition={{ duration: 0.65, ease: [0.2, 0.8, 0.4, 1] }}
          />
        )}
      </AnimatePresence>

      {/* Inner expanding ring (magenta, delayed) */}
      <AnimatePresence>
        {show && (
          <motion.div
            key={`ring2-${trigger}`}
            style={{
              position: 'absolute',
              width: 200,
              height: 200,
              borderRadius: '50%',
              border: '1.5px solid rgba(255, 81, 250, 0.6)',
              pointerEvents: 'none',
              marginLeft: -100,
              marginTop: -100,
            }}
            initial={{ scale: 0.05, opacity: 0.9 }}
            animate={{ scale: 1.6, opacity: 0 }}
            exit={{}}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.2, 0.8, 0.4, 1] }}
          />
        )}
      </AnimatePresence>

      {/* Lime flash ring */}
      <AnimatePresence>
        {show && (
          <motion.div
            key={`ring3-${trigger}`}
            style={{
              position: 'absolute',
              width: 120,
              height: 120,
              borderRadius: '50%',
              border: '1px solid rgba(202, 253, 0, 0.5)',
              pointerEvents: 'none',
              marginLeft: -60,
              marginTop: -60,
            }}
            initial={{ scale: 0.1, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{}}
            transition={{ duration: 0.5, delay: 0.04, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>

      {/* Flying particles */}
      <AnimatePresence>
        {particles.map((p) => {
          const rad = (p.angle * Math.PI) / 180;
          const tx = Math.cos(rad) * p.distance;
          const ty = Math.sin(rad) * p.distance;
          return (
            <motion.div
              key={p.id}
              style={{
                position: 'absolute',
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                borderRadius: p.isSquare ? '3px' : '50%',
                boxShadow: `0 0 ${p.size * 2}px ${p.color}, 0 0 ${p.size * 5}px ${p.color}50`,
                marginLeft: -p.size / 2,
                marginTop: -p.size / 2,
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1.2, rotate: 0 }}
              animate={{
                x: tx,
                y: ty,
                opacity: 0,
                scale: 0,
                rotate: p.isSquare ? (Math.random() > 0.5 ? 180 : -180) : 0,
              }}
              exit={{}}
              transition={{
                duration: 0.8 + p.delay,
                ease: [0.0, 0.9, 0.57, 1.0],
                delay: p.delay,
              }}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default ParticleBurst;
