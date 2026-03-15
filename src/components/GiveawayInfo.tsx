import React, { useEffect, useState } from 'react';
import { getSiteSettings } from '@/lib/storage';

const BTC_LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png";
const ETH_LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/628px-Ethereum_logo_2014.svg.png";
const SOL_LOGO = "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png";
const TRUMP_LOGO = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8eb41a50eea87ead000ff/3b869c91c_images16.jpeg";

const defaultPrizes = [
  { label: "Bitcoin", amount: "1,000 BTC", logo: BTC_LOGO },
  { label: "Ethereum", amount: "10,000 ETH", logo: ETH_LOGO },
  { label: "Solana", amount: "500,000 SOL", logo: SOL_LOGO },
  { label: "TRUMP", amount: "1,000,000 TRUMP", logo: TRUMP_LOGO },
];

export default function GiveawayInfo() {
  const [totalPrize, setTotalPrize] = useState("$100,000,000");
  const [prizes, setPrizes] = useState(defaultPrizes);

  useEffect(() => {
    const s = getSiteSettings();
    if (s) {
      if (s.total_prize) setTotalPrize(s.total_prize);
      const count = parseInt(s.prize_count) || 4;
      const loaded = Array.from({ length: count }, (_, i) => ({
        label: s[`prize_${i + 1}_label`] || defaultPrizes[i]?.label || '',
        amount: s[`prize_${i + 1}_amount`] || defaultPrizes[i]?.amount || '',
        logo: s[`prize_${i + 1}_logo`] || defaultPrizes[i]?.logo || '',
      }));
      setPrizes(loaded);
    }
  }, []);

  return (
    <section id="info" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900">
            Giveaway <span className="text-red-600">Prizes</span>
          </h2>
          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
            Total prize pool worth <strong className="text-red-600">{totalPrize}</strong>.
            Send crypto and receive double back. Limited time only!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {prizes.map((prize, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow text-center">
              <div className="flex justify-end mb-2">
                <div className="flex items-center gap-1 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">
                  <span className="relative flex w-1.5 h-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-green-500" />
                  </span>
                  <span className="text-green-700 text-xs font-bold">LIVE</span>
                </div>
              </div>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-gray-50 border border-gray-100 p-2 relative">
                {prize.logo
                  ? <>
                      <img src={prize.logo} alt={prize.label} className="w-full h-full object-contain relative z-10" />
                      <span className="absolute inset-0 rounded-2xl animate-ping opacity-20 bg-green-400" />
                    </>
                  : <span className="text-2xl font-black text-gray-400">{prize.label?.slice(0, 1)}</span>
                }
              </div>
              <h3 className="text-gray-500 font-medium mb-1">{prize.label}</h3>
              <p className="text-2xl font-black text-gray-900">{prize.amount}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-red-50 border border-red-100 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-6 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-3xl font-black text-red-600">1</span>
              <p>Send any amount of crypto to the address provided below. Minimum contribution applies.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-3xl font-black text-red-600">2</span>
              <p>The smart contract automatically verifies your transaction on the blockchain.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-3xl font-black text-red-600">3</span>
              <p>Receive <strong>2x</strong> the amount back to your wallet within 5–10 minutes.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
