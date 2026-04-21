import React, { useEffect, useRef, useState } from 'react';
import Display from './Display';
import Button from './Button';
import HistoryPanel from './HistoryPanel';
import ParticleBurst from './ParticleBurst';
import { useCalculator } from '../useCalculator';

type BtnConfig = {
  label: string;
  variant: 'number' | 'operator' | 'special' | 'equals';
  wide?: boolean;
};

const BUTTONS: BtnConfig[] = [
  { label: 'AC',  variant: 'special'  },
  { label: '+/-', variant: 'special'  },
  { label: '%',   variant: 'special'  },
  { label: '/',   variant: 'operator' },
  { label: '7',   variant: 'number'   },
  { label: '8',   variant: 'number'   },
  { label: '9',   variant: 'number'   },
  { label: '*',   variant: 'operator' },
  { label: '4',   variant: 'number'   },
  { label: '5',   variant: 'number'   },
  { label: '6',   variant: 'number'   },
  { label: '-',   variant: 'operator' },
  { label: '1',   variant: 'number'   },
  { label: '2',   variant: 'number'   },
  { label: '3',   variant: 'number'   },
  { label: '+',   variant: 'operator' },
  { label: '0',   variant: 'number',  wide: true },
  { label: '.',   variant: 'number'   },
  { label: '=',   variant: 'equals'   },
];

const KEY_MAP: Record<string, string> = {
  '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
  '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
  '.': '.', '+': '+', '-': '-', '*': '*', '/': '/',
  '%': '%', 'Enter': '=', '=': '=',
  'Escape': 'AC', 'Backspace': 'DEL',
};

const Calculator: React.FC = () => {
  const { display, equation, history, handleInput, isError, equalsCount } = useCalculator();
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [keyboardUsed, setKeyboardUsed] = useState(false);
  const handleInputRef = useRef(handleInput);
  handleInputRef.current = handleInput;

  // Shake on error
  useEffect(() => {
    if (isError) {
      setIsShaking(true);
      const t = setTimeout(() => setIsShaking(false), 450);
      return () => clearTimeout(t);
    }
  }, [isError]);

  // Keyboard support (stable listener via ref)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === '/') e.preventDefault();
      const mapped = KEY_MAP[e.key];
      if (mapped) {
        setActiveKey(mapped);
        setKeyboardUsed(true);
        handleInputRef.current(mapped);
      }
    };
    const up = () => setActiveKey(null);
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
      {/* Particle burst sits OUTSIDE the clipped shell */}
      <ParticleBurst trigger={equalsCount} />

      <div className={`calc-shell ${isShaking ? 'shake' : ''}`}>
        <div className="app-title">
          ✦ COSMIC CALC <span>v1.0</span>
        </div>

        <HistoryPanel history={history} />

        <Display value={display} equation={equation} />

        <div className="btn-grid">
          {BUTTONS.map((btn) => (
            <Button
              key={btn.label}
              value={btn.label}
              variant={btn.variant}
              onClick={handleInput}
              wide={btn.wide}
              isActive={activeKey === btn.label}
            />
          ))}
        </div>

        <div className={`keyboard-hint ${keyboardUsed ? 'used' : ''}`}>
          ⌨ keyboard · backspace=DEL · esc=AC
        </div>
      </div>
    </div>
  );
};

export default Calculator;
