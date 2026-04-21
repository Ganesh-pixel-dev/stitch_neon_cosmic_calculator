import { motion } from 'framer-motion';
import Calculator from './components/Calculator';
import StarField from './components/StarField';

const ORBS = [
  { color: 'rgba(129, 236, 255, 0.13)', size: 380, x: -100, y: -120, dur: 14 },
  { color: 'rgba(255, 81, 250, 0.11)',  size: 480, x: 160,  y: 340,  dur: 18 },
  { color: 'rgba(202, 253, 0, 0.07)',   size: 300, x: 370,  y: 60,   dur: 11 },
  { color: 'rgba(60, 80, 255, 0.13)',   size: 340, x: -60,  y: 420,  dur: 15 },
];

function App() {
  return (
    <div style={{ minHeight: '100dvh', width: '100%', position: 'relative', overflow: 'hidden' }}>

      {/* Aurora layer */}
      <div className="aurora" />

      {/* Twinkling starfield */}
      <StarField />

      {/* Floating colored orbs */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          style={{
            position: 'fixed',
            width: orb.size,
            height: orb.size,
            borderRadius: '50%',
            background: orb.color,
            filter: 'blur(90px)',
            left: orb.x,
            top: orb.y,
            pointerEvents: 'none',
            zIndex: 0,
          }}
          animate={{
            x: [0, 45, -25, 30, 0],
            y: [0, -35, 45, -20, 0],
            scale: [1, 1.1, 0.9, 1.05, 1],
          }}
          transition={{
            duration: orb.dur,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Calculator centered on top */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100dvh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}>
        <Calculator />
      </div>
    </div>
  );
}

export default App;
