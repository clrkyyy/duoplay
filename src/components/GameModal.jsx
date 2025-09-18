// src/components/GameModal.jsx
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GameModal = ({ isOpen, game, onClose }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (isOpen && iframeRef.current) {
      const iframeContainer = iframeRef.current.parentElement;

      // Request fullscreen when modal opens
      if (iframeContainer.requestFullscreen) {
        iframeContainer.requestFullscreen();
      } else if (iframeContainer.webkitRequestFullscreen) {
        iframeContainer.webkitRequestFullscreen();
      } else if (iframeContainer.msRequestFullscreen) {
        iframeContainer.msRequestFullscreen();
      }

      // Disable scrolling
      document.body.style.overflow = "hidden";

      // Disable arrow keys & spacebar scrolling
      const preventKeys = (e) => {
        const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "];
        if (keys.includes(e.key)) {
          e.preventDefault();
        }
      };
      window.addEventListener("keydown", preventKeys);

      return () => {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
        document.body.style.overflow = "auto";
        window.removeEventListener("keydown", preventKeys);
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && game && (
        <motion.div
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div ref={iframeRef} className="relative w-full h-full flex flex-col">
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
              className="w-full h-full absolute inset-0"
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
