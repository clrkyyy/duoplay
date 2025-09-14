import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-black py-16 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              About DuoPlay
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            We're revolutionizing online gaming with seamless experiences, 
            cutting-edge technology, and a passion for bringing people together.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              To create the ultimate gaming platform where accessibility meets quality, 
              where every click opens doors to new adventures, and where gaming 
              communities thrive.
            </p>
            <div className="flex space-x-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">10M+</div>
                <div className="text-gray-400">Games Played</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">500K+</div>
                <div className="text-gray-400">Active Users</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-cyan-400/20 to-purple-600/20 rounded-3xl p-8 backdrop-blur-sm border border-gray-600/30">
              <div className="text-6xl mb-4 text-center">🚀</div>
              <h3 className="text-2xl font-bold text-white text-center mb-4">Innovation First</h3>
              <p className="text-gray-300 text-center">
                Constantly pushing boundaries with the latest web technologies, 
                ensuring smooth gameplay across all devices.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;