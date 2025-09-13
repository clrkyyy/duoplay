import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-cyan-400">🎮 DuoPlay</h1>
        <ul className="flex space-x-6">
          <li><Link to="/" className="hover:text-cyan-300">Home</Link></li>
          <li><Link to="/games" className="hover:text-cyan-300">Games</Link></li>
          <li><Link to="/about" className="hover:text-cyan-300">About</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
