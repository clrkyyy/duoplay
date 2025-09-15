import React from "react";
import { motion } from "framer-motion";
import profileImg from "../assets/profile.png";
import gf1 from "../assets/gf1.jpg";
import gf2 from "../assets/gf2.jpg";

// Simple carousel component
const Carousel = ({ images }) => {
  return (
    <div className="relative w-full max-w-xl mx-auto overflow-hidden rounded-2xl shadow-lg border border-gray-700/40">
      <motion.div
        className="flex"
        animate={{ x: ["0%", "-100%", "-200%", "0%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        {images.concat(images).map((img, i) => (
          <img
            key={i}
            src={img}
            alt="Couple"
            className="w-full object-cover h-72 md:h-96"
          />
        ))}
      </motion.div>
    </div>
  );
};

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black py-16 px-6"
    >
      <div className="max-w-5xl mx-auto text-center space-y-16">
        {/* Developer Intro */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <img
            src={profileImg}
            alt="Developer"
            className="w-40 h-40 mx-auto rounded-full border-4 border-cyan-400 object-cover shadow-lg"
          />
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            👋 Meet the Developer
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Hi, I’m <span className="text-cyan-400 font-semibold">Caja</span>, a{" "}
            <span className="text-purple-400 font-semibold">frontend developer</span> passionate about
            creating meaningful, interactive web experiences.  
            I’m currently open to{" "}
            <span className="text-cyan-400">frontend developer opportunities</span> —  
            if you’re hiring or know of a team that needs a creative dev, let’s connect!
          </p>
        </motion.div>

        {/* About DuoPlay */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
            💡 Why DuoPlay?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            DuoPlay was born from a simple moment on a date with my girlfriend.  
            I brought my laptop along, and we wanted to play something together —  
            but to my surprise, I couldn’t find a quick and fun browser game for us.  
            That’s when I decided to take matters into my own hands and build{" "}
            <span className="text-cyan-400 font-semibold">a gaming hub for couples and friends</span>.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-10"
        >
          <Carousel images={[gf1, gf2]} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
