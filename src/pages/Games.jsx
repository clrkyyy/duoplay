// src/pages/Games.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import games from "../data/gamesData";
import GameModal from "../components/GameModal";

const Games = () => {
  const [filter, setFilter] = useState("all");
  const [selectedGame, setSelectedGame] = useState(null);

  // Filter games by genre tags
  const filteredGames = games.filter((game) => {
    if (filter === "all") return true;
    return game.genre.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900/20 to-black py-8 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              🎮 Game Hub
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Browse fun and interactive games. Filter by type or players and click to play instantly.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {["all", "2 players", "co-op", "multiplayer"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === cat
                  ? "bg-cyan-500 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Game Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <motion.div
              key={game.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedGame(game)}
              className="cursor-pointer bg-gray-800/60 backdrop-blur-md rounded-xl overflow-hidden border border-gray-700 shadow-lg"
            >
              <img
                src={game.thumbnail || "/placeholder.jpg"}
                alt={game.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-cyan-400">{game.title}</h3>
                <p className="text-sm text-gray-300 line-clamp-3">{game.description}</p>
                <p className="text-xs text-purple-400 mt-2">{game.genre}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <GameModal
          isOpen={!!selectedGame}
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
        />
      </div>
    </motion.div>
  );
};

export default Games;
