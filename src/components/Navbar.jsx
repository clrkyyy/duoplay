import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ✅ import

const Navbar = ({ currentPath, setCurrentPath }) => {
  const navigate = useNavigate(); // ✅ create navigator

  const navItems = [
    { path: "/", label: "Home", icon: "🏠" },
    { path: "/games", label: "Games", icon: "🎮" },
    { path: "/about", label: "About", icon: "ℹ️" },
    { path: "/couples-wall", label: "Couples Wall", icon: "💖" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => {
              setCurrentPath("/");
              navigate("/");
            }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DP</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              DuoPlay
            </span>
          </motion.div>

          {/* Navigation Links */}
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.path}
                onClick={() => {
                  setCurrentPath(item.path);
                  navigate(item.path); // ✅ navigate
                }}
                className={`relative flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  currentPath === item.path
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{item.icon}</span>
                <span className="font-medium">{item.label}</span>
                {currentPath === item.path && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute inset-0 bg-cyan-400/20 rounded-lg -z-10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
