import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Users, MessageCircle, Send } from 'lucide-react';

export default function CommunitySection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-[#1a1f4e] leading-tight">
              Join the Meme Coin <span className="text-red-500">Community!</span>
            </h2>

            <div className="mt-6 p-6 bg-[#1a1f4e] rounded-2xl">
              <h3 className="text-amber-400 font-bold text-xl mb-3">Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                This is YOUR chance to join a community that's all about fighting for what matters.
                The MEME Coin encourages a culture of success & optimism to make the world a better place.
                Go MEME! 👊
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <Button
                size="lg"
                className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-6 py-6 rounded-full"
              >
                <MessageCircle className="mr-2 h-5 w-5" /> Join Discord
              </Button>
              <Button
                size="lg"
                className="bg-[#229ED9] hover:bg-[#1a8cc7] text-white px-6 py-6 rounded-full"
              >
                <Send className="mr-2 h-5 w-5" /> Join Telegram
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#1a1f4e] text-[#1a1f4e] hover:bg-[#1a1f4e] hover:text-white px-6 py-6 rounded-full"
              >
                <Users className="mr-2 h-5 w-5" /> Follow X
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-red-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl" />

            <div className="relative bg-gradient-to-br from-[#1a1f4e] to-[#2a2f6e] rounded-3xl p-8 text-center">
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                JOIN THE SPECIAL COMMUNITY
              </h3>
              <p className="text-5xl md:text-6xl font-black text-red-500 mb-4">
                $MEME
              </p>
              <p className="text-amber-400 text-xl font-medium">
                OWN A PIECE OF HISTORY
              </p>

              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-3xl font-bold text-white">50K+</p>
                  <p className="text-gray-400 text-sm">Holders</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-3xl font-bold text-white">100K+</p>
                  <p className="text-gray-400 text-sm">Community</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-3xl font-bold text-white">$10M+</p>
                  <p className="text-gray-400 text-sm">Volume</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
