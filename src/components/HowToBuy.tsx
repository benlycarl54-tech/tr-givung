import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Wallet, Coins, ArrowLeftRight, Repeat, ExternalLink } from 'lucide-react';

const steps = [
  {
    icon: Wallet,
    title: "Step 1: Create a Wallet",
    description: "Download Phantom or your wallet of choice from the App Store or Google Play for free. Desktop users: Install the Google Chrome extension.",
    cta: "Get Phantom",
    link: "#",
  },
  {
    icon: Coins,
    title: "Step 2: Get Some SOL",
    description: "Fund your wallet with SOL to swap for $MEME. Buy SOL directly on Phantom, transfer from another wallet, or purchase on an exchange.",
    cta: "Buy SOL",
    link: "#",
  },
  {
    icon: ArrowLeftRight,
    title: "Step 3: Go to Raydium",
    description: "Connect your wallet to Raydium. Paste the $MEME address, select trade, and confirm. Sign the wallet signature prompt.",
    cta: "Connect Raydium",
    link: "#",
  },
  {
    icon: Repeat,
    title: "Step 4: Swap for $MEME",
    description: "Use your SOL to trade for $MEME. Welcome to the community! You're now a holder.",
    cta: "Swap Now",
    link: "#",
  },
];

const paymentIcons = [
  { name: "Apple Pay", icon: "🍎" },
  { name: "Visa", icon: "💳" },
  { name: "MasterCard", icon: "💳" },
  { name: "Venmo", icon: "📱" },
  { name: "USDC", icon: "💵" },
  { name: "Solana", icon: "◎" },
];

export default function HowToBuy() {
  return (
    <section id="how-to-buy" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-[#1a1f4e]">
            Buy Now with <span className="text-red-500">Debit Card or Crypto!</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {paymentIcons.map((payment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white px-6 py-3 rounded-full shadow-md border border-gray-100 flex items-center gap-2"
              >
                <span className="text-2xl">{payment.icon}</span>
                <span className="text-gray-700 font-medium">{payment.name}</span>
              </motion.div>
            ))}
          </div>

          <Button
            size="lg"
            className="mt-8 bg-red-600 hover:bg-red-700 text-white px-12 py-6 text-lg font-bold rounded-full"
          >
            BUY NOW <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#1a1f4e] rounded-xl flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-bold text-red-500">STEP {index + 1}</span>
              </div>
              <h3 className="text-[#1a1f4e] font-bold text-lg mb-3">{step.title.split(': ')[1]}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{step.description}</p>
              <Button
                variant="outline"
                className="w-full border-[#1a1f4e] text-[#1a1f4e] hover:bg-[#1a1f4e] hover:text-white"
              >
                {step.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
