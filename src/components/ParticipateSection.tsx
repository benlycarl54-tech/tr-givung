import React, { useState, useEffect } from 'react';
import { Copy, Check, Clock, Users } from 'lucide-react';
import { toast } from "sonner";
import { getSiteSettings } from '@/lib/storage';
import { createPageUrl } from '@/utils';

const BTC_LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png";
const ETH_LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/628px-Ethereum_logo_2014.svg.png";
const SOL_LOGO = "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png";
const TRUMP_LOGO = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8eb41a50eea87ead000ff/3b869c91c_images16.jpeg";

const defaultWallets = [
  { index: 0, name: "Bitcoin", symbol: "BTC", address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", min: "0.1 BTC", max: "20 BTC", logo: BTC_LOGO },
  { index: 1, name: "Ethereum", symbol: "ETH", address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", min: "1 ETH", max: "500 ETH", logo: ETH_LOGO },
  { index: 2, name: "Solana", symbol: "SOL", address: "6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN", min: "10 SOL", max: "10,000 SOL", logo: SOL_LOGO },
  { index: 3, name: "TRUMP Token", symbol: "TRUMP", address: "TXZQuyCasxN42bjAcYpP2xwYVMCF6gHBnv", min: "100 TRUMP", max: "100,000 TRUMP", logo: TRUMP_LOGO },
];

function CryptoCard({ wallet }: { wallet: any }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(wallet.address);
    setCopied(true);
    toast.success(`${wallet.symbol} address copied!`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            {wallet.logo ? (
              <><img src={wallet.logo} alt={wallet.symbol} className="w-10 h-10 rounded-full object-contain bg-gray-50 border border-gray-100 p-1 relative z-10" /><span className="absolute inset-0 rounded-full animate-ping opacity-30 bg-green-400" /></>
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500">{wallet.symbol?.slice(0, 2)}</div>
            )}
          </div>
          <div>
            <p className="font-bold text-gray-900">{wallet.name}</p>
            <p className="text-xs text-gray-500">{wallet.symbol}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">
          <span className="relative flex w-1.5 h-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" /><span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-green-500" /></span>
          <span className="text-green-700 text-xs font-bold">LIVE</span>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-1">Send address</p>
        <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between gap-2">
          <code className="text-xs text-gray-700 break-all flex-1">{wallet.address}</code>
          <button onClick={handleCopy} className="shrink-0 text-gray-400 hover:text-red-600 transition-colors">
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
      <div className="flex justify-between text-sm">
        <div><span className="text-gray-500">Min: </span><span className="font-semibold text-gray-800">{wallet.min}</span></div>
        <div><span className="text-gray-500">Max: </span><span className="font-semibold text-gray-800">{wallet.max}</span></div>
      </div>
      <div className="mt-4 bg-red-50 rounded-lg p-3 text-center cursor-pointer hover:bg-red-100 transition-colors"
        onClick={() => window.location.href = createPageUrl(`Participate?wallet=${wallet.index}`)}>
        <div className="flex items-center justify-center gap-2">
          <span className="relative flex w-2 h-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" /><span className="relative inline-flex rounded-full w-2 h-2 bg-red-500" /></span>
          <p className="text-red-600 font-bold text-sm animate-pulse">Send → Receive 2x Back! →</p>
          <span className="relative flex w-2 h-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" /><span className="relative inline-flex rounded-full w-2 h-2 bg-red-500" /></span>
        </div>
      </div>
    </div>
  );
}

export default function ParticipateSection() {
  const [timeLeft] = useState({ hours: 11, minutes: 42, seconds: 33 });
  const [wallets, setWallets] = useState(defaultWallets);

  useEffect(() => {
    const s = getSiteSettings();
    if (s) {
      const count = parseInt(s.wallet_count) || defaultWallets.length;
      const loaded = Array.from({ length: count }, (_, i) => ({
        index: i, name: s[`wallet_${i+1}_name`] || defaultWallets[i]?.name || '', symbol: s[`wallet_${i+1}_symbol`] || defaultWallets[i]?.symbol || '',
        address: s[`wallet_${i+1}_address`] || defaultWallets[i]?.address || '', min: s[`wallet_${i+1}_min`] || defaultWallets[i]?.min || '',
        max: s[`wallet_${i+1}_max`] || defaultWallets[i]?.max || '', logo: s[`wallet_${i+1}_logo`] || defaultWallets[i]?.logo || '',
      }));
      setWallets(loaded);
    }
  }, []);

  return (
    <section id="participate" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900"><span className="text-red-600">Participate</span> Now</h2>
          <p className="text-gray-600 mt-4 text-lg">Send crypto to the address below and receive double back!</p>
          <div className="inline-flex items-center gap-6 mt-6 bg-white rounded-2xl px-8 py-4 shadow-md border border-gray-100">
            <div className="flex items-center gap-2 text-red-600"><Clock className="w-5 h-5" /><span className="font-bold text-sm">Event ends in:</span></div>
            <div className="flex items-center gap-2">
              {[{ value: timeLeft.hours, label: "HRS" }, { value: timeLeft.minutes, label: "MIN" }, { value: timeLeft.seconds, label: "SEC" }].map((t, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span className="text-red-600 font-bold text-xl">:</span>}
                  <div className="text-center"><div className="text-2xl font-black text-gray-900 w-12">{String(t.value).padStart(2, '0')}</div><div className="text-xs text-gray-400">{t.label}</div></div>
                </React.Fragment>
              ))}
            </div>
            <div className="flex items-center gap-2 text-gray-600"><Users className="w-4 h-4" /><span className="text-sm font-medium">12,847 participants</span></div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wallets.map((wallet, index) => <CryptoCard key={index} wallet={wallet} />)}
        </div>
        <div className="mt-8 bg-red-600 text-white rounded-2xl p-6 text-center">
          <p className="font-bold text-lg">⚠️ Important Notice</p>
          <p className="mt-2 text-red-100">You can only participate once per wallet address. Make sure to send from a wallet you control. Transactions are processed automatically by the smart contract.</p>
        </div>
      </div>
    </section>
  );
}
