import React from "react";

const GameModal = ({ game, onClose }) => {
  if (!game) return null; // no game selected = no modal

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-4 relative max-w-5xl w-full">
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-pink-400 hover:text-cyan-400"
          onClick={onClose}
        >
          ✖
        </button>

        {/* Game title */}
        <h2 className="text-2xl text-cyan-400 mb-4">{game.title}</h2>

        {/* Embedded iframe game */}
        <iframe
          src={game.url}
          width="900"
          height="560"
          frameBorder="0"
          scrolling="no"
          className="mx-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default GameModal;
