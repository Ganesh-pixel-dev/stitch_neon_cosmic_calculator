import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { HistoryItem } from '../useCalculator';
import { Clock } from 'lucide-react';

interface HistoryPanelProps {
  history: HistoryItem[];
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history }) => {
  return (
    <div>
      <div className="history-label">
        <Clock size={11} />
        <span>Recent History</span>
      </div>
      <div className="history-scroll">
        <AnimatePresence mode="popLayout">
          {history.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="history-empty"
            >
              No calculations yet
            </motion.div>
          ) : (
            history.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -28, scale: 0.88 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                className="history-chip"
              >
                <div className="history-op">{item.operation}</div>
                <div className="history-result">= {item.result}</div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HistoryPanel;
