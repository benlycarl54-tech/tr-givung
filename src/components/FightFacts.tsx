import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Trophy, Rocket } from 'lucide-react';

const facts = [
  {
    icon: Zap,
    title: "FIGHT FACT 1",
    description: "This is the only Official Meme Coin endorsed by the community",
  },
  {
    icon: Trophy,
    title: "FIGHT FACT 2",
    description: "The ultimate digital collector's token for true believers and fans!",
  },
  {
    icon: Shield,
    title: "FIGHT FACT 3",
    description: "Celebrating Courage: A collectible that captures a historical moment.",
  },
  {
    icon: Rocket,
    title: "FIGHT FACT 4",
    description: "Start collecting now. Have Fun! Join thousands of holders worldwide.",
  },
];

export default function FightFacts() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-[#1a1f4e]">
            MEME COIN: <span className="text-red-500">THE CRYPTO REVOLUTION</span>
          </h2>
          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
            A Community Celebrating Courage & Strength
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facts.map((fact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-4">
                <fact.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-[#1a1f4e] font-bold text-lg mb-2">{fact.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{fact.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-[#1a1f4e] rounded-3xl p-8 md:p-12 text-white"
        >
          <p className="text-lg md:text-xl leading-relaxed text-center max-w-4xl mx-auto">
            $MEME tokens are now freely tradeable on the blockchain. Join a community that's
            all about fighting for what matters. The MEME Coin encourages a culture of success
            & optimism to make the world a better place. 🚀
          </p>
        </motion.div>
      </div>
    </section>
  );
}
