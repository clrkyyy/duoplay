import React, { useEffect, useState } from "react";
import axios from "axios";

const Games = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        // 👇 now calling your Express backend, not FreeToGame directly
        const response = await axios.get("https://duoplay-api.onrender.com/games");
        setGames(response.data.slice(0, 12));
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return <p className="text-center text-cyan-400 mt-10">Loading games...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-center mb-10 text-cyan-400">
        🎮 Browse Free Games
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {games.map((game) => (
          <div
            key={game.id}
            className="bg-gray-900 rounded-lg p-4 border border-cyan-600 shadow-lg hover:scale-105 transition-transform"
          >
            <img
              src={game.thumbnail}
              alt={game.title}
              className="rounded-md mb-4"
            />
            <h3 className="text-xl font-bold text-pink-400 mb-2">{game.title}</h3>
            <p className="text-gray-300 text-sm mb-2">
              {game.short_description}
            </p>
            <p className="text-sm text-cyan-400">Genre: {game.genre}</p>
            <p className="text-sm text-purple-400">Platform: {game.platform}</p>
            <a
              href={game.game_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 px-4 py-2 bg-cyan-600 rounded hover:bg-cyan-700 text-white text-sm"
            >
              Play Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
