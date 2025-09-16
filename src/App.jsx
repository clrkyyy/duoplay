import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Games from "./pages/Games";
import About from "./pages/About";
import CouplesWall from "./pages/CouplesWall";

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  const setCurrentPath = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      <Navbar currentPath={location.pathname} setCurrentPath={setCurrentPath} />
      <AnimatePresence mode="wait">
        <motion.main key={location.pathname} className="relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/about" element={<About />} />
            <Route path="/couples-wall" element={<CouplesWall />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;