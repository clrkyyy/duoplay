import React from "react";

const GameModal = ({ game, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-gray-900 rounded-lg shadow-lg w-[90%] h-[80%] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded"
        >
          ✖ Close
        </button>
        <iframe
          src={game.embedUrl}
          width="100%"
          height="100%"
          scrolling="no"
          frameBorder="0"
          allowFullScreen
          title={game.title}
        />
      </div>
    </div>
  );
};

export default GameModal;
