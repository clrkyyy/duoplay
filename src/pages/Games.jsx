import React, { useState } from "react";
import { motion } from "framer-motion";

const Games = () => {
  const [isGameLoading, setIsGameLoading] = useState(true);

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
              🎮 Gaming Hub
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Immerse yourself in premium gaming experiences, 
            optimized for instant play and maximum fun.
          </p>
        </motion.div>

        {/* Game Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative"
        >
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-600/30 shadow-2xl">
            {/* Game Stats */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">1.2K</div>
                  <div className="text-sm text-gray-400">Players Online</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">4.8★</div>
                  <div className="text-sm text-gray-400">Rating</div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-medium"
              >
                🔄 New Game
              </motion.button>
            </div>

            {/* Game Frame */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              {isGameLoading && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10"
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"
                    />
                    <p className="text-cyan-400 font-medium">Loading Game...</p>
                  </div>
                </motion.div>
              )}
              <iframe
                src="https://html5.gamedistribution.com/c23f50871019481f99d1ce3d56571dfd/?gd_sdk_referrer_url=https://gamedistribution.com/games/italian-brainrot-bike-rush/"
                width="100%"
                height="600"
                scrolling="no"
                frameBorder="0"
                allowFullScreen
                className="rounded-2xl bg-black"
                title="Italian Brainrot Bike Rush"
                onLoad={() => setIsGameLoading(false)}
              />
            </motion.div>

            {/* Game Info */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6 flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-bold text-white">Italian Brainrot Bike Rush</h3>
                <p className="text-gray-400">Racing • Action • Adventure</p>
              </div>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  ❤️
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  📤
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Powered by */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8 text-gray-500"
        >
          Powered by{" "}
          <span className="text-cyan-400 font-medium">GameDistribution</span>
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Games;