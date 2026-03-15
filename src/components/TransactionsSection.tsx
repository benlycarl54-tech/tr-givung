import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const allTransactions = [
  { address: "bc1q...x4f2", amount: "0.5 BTC", received: "1.0 BTC", status: "confirmed" },
  { address: "0x74...a3e1", amount: "2 ETH", received: "4 ETH", status: "confirmed" },
  { address: "6p6x...GiPN", amount: "50 SOL", received: "100 SOL", status: "confirmed" },
  { address: "bc1q...m9k2", amount: "1.2 BTC", received: "2.4 BTC", status: "confirmed" },
  { address: "0x21...b9f4", amount: "5 ETH", received: "10 ETH", status: "confirmed" },
  { address: "TXZQ...GHBn", amount: "500 TRUMP", received: "1000 TRUMP", status: "confirmed" },
  { address: "bc1q...p2w8", amount: "0.3 BTC", received: "0.6 BTC", status: "confirmed" },
  { address: "0x99...c7d1", amount: "10 ETH", received: "20 ETH", status: "confirmed" },
  { address: "7xKL...mR9p", amount: "200 SOL", received: "400 SOL", status: "confirmed" },
  { address: "bc1q...z7r3", amount: "2.0 BTC", received: "4.0 BTC", status: "confirmed" },
];

function getTimeAgo() { return `${Math.floor(Math.random() * 3) + 1} min ago`; }
function shuffleAndSlice(arr: any[]) {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, 8).map(tx => ({ ...tx, time: getTimeAgo(), id: Math.random() }));
}

export default function TransactionsSection() {
  const [visible, setVisible] = useState(() => shuffleAndSlice(allTransactions));

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(prev => {
        const next = [...prev];
        const replaceIdx = Math.floor(Math.random() * next.length);
        const newTx = allTransactions[Math.floor(Math.random() * allTransactions.length)];
        next[replaceIdx] = { ...newTx, time: getTimeAgo(), id: Math.random() };
        return next;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="transactions" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900">Recent <span className="text-red-600">Transactions</span></h2>
          <p className="text-gray-600 mt-4 text-lg">Live feed of verified giveaway transactions</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-4 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100 text-sm font-bold text-gray-500 uppercase tracking-wide">
            <span>Address</span><span>Sent</span><span>Received</span><span>Status</span>
          </div>
          <AnimatePresence initial={false}>
            {visible.map((tx) => (
              <motion.div key={tx.id} initial={{ opacity: 0, backgroundColor: "#dcfce7" }} animate={{ opacity: 1, backgroundColor: "#ffffff" }} transition={{ duration: 0.8 }}
                className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-gray-50 text-sm">
                <span className="font-mono text-gray-600">{tx.address}</span>
                <span className="font-semibold text-gray-800">{tx.amount}</span>
                <span className="font-bold text-green-600">{tx.received}</span>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 fill-green-500" />
                  <span className="text-green-600 font-medium capitalize">{tx.status}</span>
                  <span className="text-gray-400 text-xs ml-auto">{tx.time}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
