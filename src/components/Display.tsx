import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface DisplayProps {
  value: string;
  equation: string;
}

const Display: React.FC<DisplayProps> = ({ value, equation }) => {
  const isError = value === 'Error';

  const fontSize =
    value.length > 14 ? '22px' :
    value.length > 11 ? '30px' :
    value.length > 8  ? '38px' :
    value.length > 5  ? '48px' : '60px';

  return (
    <div className={`display ${isError ? 'display-error-state' : ''}`}>
      {/* Equation line */}
      <div className="display-equation">{equation}&nbsp;</div>

      {/* Main number with spring bounce */}
      <AnimatePresence>
        <motion.div
          key={value}
          initial={{ opacity: 0, y: 10, scale: 0.95, filter: 'blur(2px)' }}
          animate={{ opacity: 1, y: 0,  scale: 1,    filter: 'blur(0px)' }}
          exit={{    opacity: 0, y: -10, scale: 0.95, filter: 'blur(2px)' }}
          transition={{ type: 'spring', stiffness: 550, damping: 28, mass: 0.5 }}
          className={`display-value ${isError ? 'display-value-error' : ''}`}
          style={{ fontSize }}
        >
          {value}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Display;
