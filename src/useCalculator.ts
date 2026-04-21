import { useState, useCallback } from 'react';

export type HistoryItem = {
  id: number;
  operation: string;
  result: string;
};

export const useCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [shouldReset, setShouldReset] = useState(false);
  const [isError, setIsError] = useState(false);
  const [equalsCount, setEqualsCount] = useState(0);

  const calculate = (expr: string): string => {
    try {
      const sanitized = expr.replace(/[^-()\d/*+.%]/g, '');
      if (!sanitized) return 'Error';
      // eslint-disable-next-line no-eval
      const res = (0, eval)(sanitized);
      if (!isFinite(res) || isNaN(res)) return 'Error';
      return Number(res.toFixed(10)).toString();
    } catch {
      return 'Error';
    }
  };

  const handleInput = useCallback((value: string) => {
    if (value !== '=') setIsError(false);

    switch (value) {
      case 'AC':
        setDisplay('0');
        setEquation('');
        setShouldReset(false);
        setIsError(false);
        return;
      case 'DEL':
        setDisplay(prev => {
          if (prev === 'Error' || prev.length === 1) return '0';
          return prev.slice(0, -1);
        });
        return;
      case '+/-':
        setDisplay(prev => {
          if (prev === '0' || prev === 'Error') return '0';
          return prev.startsWith('-') ? prev.slice(1) : '-' + prev;
        });
        return;
      case '%':
        setDisplay(prev => {
          if (prev === 'Error') return '0';
          return (parseFloat(prev) / 100).toString();
        });
        return;
    }

    if (['+', '-', '*', '/'].includes(value)) {
      setEquation(display + ' ' + value + ' ');
      setShouldReset(true);
      return;
    }

    if (value === '=') {
      if (!equation) return;
      const fullExpr = equation + display;
      const res = calculate(fullExpr);
      if (res === 'Error') {
        setIsError(true);
        setDisplay('Error');
      } else {
        setEqualsCount(c => c + 1);
        setHistory(prev => [
          { id: Date.now(), operation: fullExpr, result: res },
          ...prev,
        ].slice(0, 10));
        setDisplay(res);
      }
      setEquation('');
      setShouldReset(true);
      return;
    }

    // Numbers and decimal
    const shouldStart = shouldReset || display === '0' || display === 'Error';
    if (shouldStart) {
      setShouldReset(false);
      if (value === '.') { setDisplay('0.'); return; }
      if (value === '0') { setDisplay('0'); return; }
      setDisplay(value);
      return;
    }
    if (value === '.' && display.includes('.')) return;
    if (display.replace(/[-.]/, '').length >= 12) return;
    setDisplay(display + value);
  }, [display, equation, shouldReset]);

  return { display, equation, history, handleInput, isError, equalsCount };
};
