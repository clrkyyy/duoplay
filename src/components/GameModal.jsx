// src/components/GameModal.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const GameModal = ({ isOpen, game, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && game && (
        <motion.div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative w-full h-full flex flex-col">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 px-4 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition"
            >
              ✖ Close
            </button>

            {/* Game Iframe */}
            <iframe
              src={game.url}
              title={game.title}
              className="flex-1 w-full h-full rounded-lg"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameModal;
