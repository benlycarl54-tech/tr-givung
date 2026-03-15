import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const claims = [
  { name: "James O.", country: "🇺🇸 United States", amount: "2.5 BTC", value: "$127,500" },
  { name: "Sophie M.", country: "🇬🇧 United Kingdom", amount: "5,000 USDT", value: "$5,000" },
  { name: "Carlos R.", country: "🇲🇽 Mexico", amount: "8 ETH", value: "$24,000" },
  { name: "Yuki T.", country: "🇯🇵 Japan", amount: "500 SOL", value: "$75,000" },
  { name: "Ahmed K.", country: "🇳🇬 Nigeria", amount: "1,000 TRUMP", value: "$12,000" },
  { name: "Emma W.", country: "🇨🇦 Canada", amount: "1.2 BTC", value: "$61,200" },
  { name: "Lucas B.", country: "🇧🇷 Brazil", amount: "3 ETH", value: "$9,000" },
  { name: "Fatima A.", country: "🇦🇪 UAE", amount: "10,000 USDT", value: "$10,000" },
  { name: "Wang L.", country: "🇸🇬 Singapore", amount: "200 SOL", value: "$30,000" },
  { name: "Pierre D.", country: "🇫🇷 France", amount: "4 ETH", value: "$12,000" },
];

const cryptoColors: Record<string, string> = {
  BTC: "bg-orange-100 text-orange-700",
  ETH: "bg-blue-100 text-blue-700",
  SOL: "bg-purple-100 text-purple-700",
  USDT: "bg-green-100 text-green-700",
  TRUMP: "bg-red-100 text-red-700",
};

function getCryptoTag(amount: string) {
  const sym = amount.split(' ')[1];
  return cryptoColors[sym] || "bg-gray-100 text-gray-700";
}

export default function LiveClaimsPopup() {
  const [visible, setVisible] = useState<any>(null);
  const [queue, setQueue] = useState<any[]>([]);

  useEffect(() => {
    const shuffled = [...claims].sort(() => Math.random() - 0.5);
    setQueue(shuffled);
  }, []);

  useEffect(() => {
    if (queue.length === 0) return;
    let index = 0;
    let hideTimer: any;
    let nextTimer: any;

    const show = () => {
      setVisible(queue[index % queue.length]);
      index++;
      hideTimer = setTimeout(() => setVisible(null), 4000);
      const nextDelay = 6000 + Math.random() * 4000;
      nextTimer = setTimeout(show, nextDelay);
    };

    const startTimer = setTimeout(show, 2000);
    return () => { clearTimeout(startTimer); clearTimeout(hideTimer); clearTimeout(nextTimer); };
  }, [queue]);

  return (
    <div className="fixed top-24 left-6 z-50 max-w-xs w-full pointer-events-none">
      <AnimatePresence>
        {visible && (
          <motion.div
            key={visible.name + visible.amount}
            initial={{ opacity: 0, y: -60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 pointer-events-auto"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-gray-900 text-sm">{visible.name}</span>
                  <span className="text-xs text-gray-500">{visible.country}</span>
                </div>
                <p className="text-xs text-gray-600 mt-0.5">
                  Just claimed{' '}
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${getCryptoTag(visible.amount)}`}>
                    {visible.amount}
                  </span>
                </p>
                <p className="text-green-600 font-bold text-sm mt-1">≈ {visible.value} received ✓</p>
              </div>
            </div>
            <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div className="h-full bg-green-500 rounded-full" initial={{ width: "100%" }} animate={{ width: "0%" }} transition={{ duration: 4, ease: "linear" }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
