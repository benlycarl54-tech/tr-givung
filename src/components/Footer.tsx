import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-black">
            <span className="text-red-600">TRUMP</span>
            <span className="text-white"> MEME</span>
          </div>
          <div className="flex flex-wrap gap-6 text-sm">
            {["Giveaway", "Info", "Instruction", "Participate", "Transactions"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {["🔒 SSL Secured", "⛓️ Blockchain Verified", "⚡ Smart Contract", "✅ 10,000+ Paid", "🌐 Official Event"].map((t, i) => (
            <span key={i} className="text-gray-500 text-xs font-semibold border border-gray-800 rounded-full px-3 py-1">{t}</span>
          ))}
        </div>
        <div className="border-t border-gray-800 mt-4 pt-8 text-center">
          <p className="text-gray-500 text-sm max-w-3xl mx-auto">
            This is an official Trump Meme community giveaway event. All payouts are processed automatically via smart contract on-chain.
            Participation is voluntary. Crypto assets are volatile — only participate with amounts you can afford.
          </p>
          <p className="text-gray-600 text-sm mt-4">© 2025 Trump Meme Official Giveaway. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
