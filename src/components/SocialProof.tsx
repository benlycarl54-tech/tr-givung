import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  { name: "Michael R.", country: "🇺🇸 USA", text: "Sent 0.5 BTC and received 1 BTC back in 7 minutes. Absolutely insane. This is REAL.", crypto: "1.0 BTC received" },
  { name: "Sofia K.", country: "🇩🇪 Germany", text: "I was skeptical but decided to try with a small amount. Got double back in under 10 mins!", crypto: "4 ETH received" },
  { name: "James T.", country: "🇬🇧 UK", text: "Trump's giveaway is 100% legit. Already participated twice from different wallets.", crypto: "200 SOL received" },
  { name: "Anya M.", country: "🇷🇺 Russia", text: "Unbelievable. Transaction confirmed on-chain within minutes. Thank you Trump Meme!", crypto: "20,000 TRUMP received" },
  { name: "Carlos P.", country: "🇧🇷 Brazil", text: "Sent 2 ETH and got 4 back. Showed my friends and they all joined too!", crypto: "4 ETH received" },
];

const stats = [
  { value: "$47.2M", label: "Total Paid Out" },
  { value: "10,842", label: "Participants" },
  { value: "99.8%", label: "Success Rate" },
  { value: "~6 min", label: "Avg. Payout Time" },
];

export default function SocialProof() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % testimonials.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-16 bg-gray-950">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {stats.map((s, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 text-center">
              <p className="text-3xl font-black text-red-500">{s.value}</p>
              <p className="text-gray-400 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-white">What <span className="text-red-500">Participants</span> Are Saying</h2>
          <p className="text-gray-500 mt-2 text-sm">Real people. Real payouts. Verified on-chain.</p>
        </div>
        <div className="max-w-2xl mx-auto relative h-44">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-black text-lg shrink-0">{testimonials[active].name[0]}</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-bold">{testimonials[active].name}</span>
                    <span className="text-gray-500 text-sm">{testimonials[active].country}</span>
                    <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full font-semibold">{testimonials[active].crypto}</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">"{testimonials[active].text}"</p>
                  <div className="flex mt-2 gap-0.5">{[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-sm">★</span>)}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (<button key={i} onClick={() => setActive(i)} className={`w-2 h-2 rounded-full transition-colors ${i === active ? 'bg-red-500' : 'bg-gray-700'}`} />))}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          {[
            { img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png", label: "Bitcoin Network" },
            { img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/628px-Ethereum_logo_2014.svg.png", label: "Ethereum Network" },
            { img: "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png", label: "Solana Network" },
          ].map((n, i) => (
            <div key={i} className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-xl px-4 py-2">
              <div className="relative"><img src={n.img} alt={n.label} className="w-6 h-6 object-contain relative z-10" /><span className="absolute inset-0 rounded-full animate-ping opacity-40 bg-green-400 scale-125" /></div>
              <span className="text-gray-400 text-sm font-medium">{n.label}</span>
              <div className="flex items-center gap-1"><span className="relative flex w-2 h-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" /><span className="relative inline-flex rounded-full w-2 h-2 bg-green-500" /></span><span className="text-green-400 text-xs font-bold">Live</span></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
