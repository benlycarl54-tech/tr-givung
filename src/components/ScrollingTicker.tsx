import React from 'react';
import { motion } from 'framer-motion';

export default function ScrollingTicker() {
  const items = [
    "🔥 FIGHT FIGHT FIGHT",
    "💰 $MEME",
    "🚀 JOIN THE COMMUNITY",
    "⭐ $MEME",
    "🔥 FIGHT FIGHT FIGHT",
    "💰 $MEME",
    "🚀 JOIN THE COMMUNITY",
    "⭐ $MEME",
  ];

  return (
    <div className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 py-3 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1920] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <span key={index} className="text-white font-bold text-lg mx-8 flex items-center gap-2">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
