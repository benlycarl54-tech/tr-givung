import React, { useState, useEffect } from 'react';
import { getSiteSettings, saveSiteSettings } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Save, Upload, Settings, Wallet, Trophy, ImageIcon, Plus, Trash2 } from 'lucide-react';

const BTC_LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png";
const ETH_LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/628px-Ethereum_logo_2014.svg.png";
const SOL_LOGO = "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png";
const TRUMP_LOGO = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8eb41a50eea87ead000ff/3b869c91c_images16.jpeg";

const cryptoPresets = [
  { name: "BTC", url: BTC_LOGO },
  { name: "ETH", url: ETH_LOGO },
  { name: "SOL", url: SOL_LOGO },
  { name: "TRUMP", url: TRUMP_LOGO },
];

const defaultBranding = {
  site_name: "TRUMP MEME",
  logo_url: TRUMP_LOGO,
  hero_image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8eb41a50eea87ead000ff/db53826d5_images15.jpeg",
  total_prize: "$100,000,000",
};

const defaultPrizes = [
  { label: "Bitcoin", amount: "1,000 BTC", logo: BTC_LOGO },
  { label: "Ethereum", amount: "10,000 ETH", logo: ETH_LOGO },
  { label: "Solana", amount: "500,000 SOL", logo: SOL_LOGO },
  { label: "TRUMP", amount: "1,000,000 TRUMP", logo: TRUMP_LOGO },
];

const defaultWallets = [
  { name: "Bitcoin", symbol: "BTC", address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", min: "0.1 BTC", max: "20 BTC", logo: BTC_LOGO },
  { name: "Ethereum", symbol: "ETH", address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", min: "1 ETH", max: "500 ETH", logo: ETH_LOGO },
  { name: "Solana", symbol: "SOL", address: "6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN", min: "10 SOL", max: "10,000 SOL", logo: SOL_LOGO },
  { name: "TRUMP Token", symbol: "TRUMP", address: "TXZQuyCasxN42bjAcYpP2xwYVMCF6gHBnv", min: "100 TRUMP", max: "100,000 TRUMP", logo: TRUMP_LOGO },
];

function serialize(branding: any, prizes: any[], wallets: any[]) {
  const data: Record<string, string> = { ...branding };
  prizes.forEach((p, i) => {
    data[`prize_${i + 1}_label`] = p.label || '';
    data[`prize_${i + 1}_amount`] = p.amount || '';
    data[`prize_${i + 1}_logo`] = p.logo || '';
  });
  data['prize_count'] = String(prizes.length);
  wallets.forEach((w, i) => {
    data[`wallet_${i + 1}_name`] = w.name || '';
    data[`wallet_${i + 1}_symbol`] = w.symbol || '';
    data[`wallet_${i + 1}_address`] = w.address || '';
    data[`wallet_${i + 1}_min`] = w.min || '';
    data[`wallet_${i + 1}_max`] = w.max || '';
    data[`wallet_${i + 1}_logo`] = w.logo || '';
  });
  data['wallet_count'] = String(wallets.length);
  return data;
}

function deserialize(s: Record<string, string>) {
  const branding = {
    site_name: s.site_name || defaultBranding.site_name,
    logo_url: s.logo_url || defaultBranding.logo_url,
    hero_image_url: s.hero_image_url || defaultBranding.hero_image_url,
    total_prize: s.total_prize || defaultBranding.total_prize,
  };
  const prizeCount = parseInt(s.prize_count) || 4;
  const prizes = Array.from({ length: prizeCount }, (_, i) => ({
    label: s[`prize_${i + 1}_label`] || '',
    amount: s[`prize_${i + 1}_amount`] || '',
    logo: s[`prize_${i + 1}_logo`] || '',
  }));
  const walletCount = parseInt(s.wallet_count) || 4;
  const wallets = Array.from({ length: walletCount }, (_, i) => ({
    name: s[`wallet_${i + 1}_name`] || '',
    symbol: s[`wallet_${i + 1}_symbol`] || '',
    address: s[`wallet_${i + 1}_address`] || '',
    min: s[`wallet_${i + 1}_min`] || '',
    max: s[`wallet_${i + 1}_max`] || '',
    logo: s[`wallet_${i + 1}_logo`] || '',
  }));
  return { branding, prizes, wallets };
}

export default function Admin() {
  const [branding, setBranding] = useState(defaultBranding);
  const [prizes, setPrizes] = useState(defaultPrizes);
  const [wallets, setWallets] = useState(defaultWallets);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const stored = getSiteSettings();
    if (stored) {
      const { branding: b, prizes: p, wallets: w } = deserialize(stored);
      setBranding(b);
      setPrizes(p);
      setWallets(w);
    }
  }, []);

  const handleSave = () => {
    setSaving(true);
    try {
      const data = serialize(branding, prizes, wallets);
      saveSiteSettings(data);
      toast.success("Settings saved!");
    } catch (e: any) {
      toast.error("Failed: " + e.message);
    }
    setSaving(false);
  };

  const handleUpload = (onDone: (url: string) => void, key: string, file: File | undefined) => {
    if (!file) return;
    setUploading(prev => ({ ...prev, [key]: true }));
    // Convert file to data URL for local storage
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      onDone(url);
      toast.success("Image uploaded!");
      setUploading(prev => ({ ...prev, [key]: false }));
    };
    reader.onerror = () => {
      toast.error("Upload failed");
      setUploading(prev => ({ ...prev, [key]: false }));
    };
    reader.readAsDataURL(file);
  };

  const updatePrize = (i: number, field: string, value: string) => setPrizes(prev => prev.map((p, idx) => idx === i ? { ...p, [field]: value } : p));
  const updateWallet = (i: number, field: string, value: string) => setWallets(prev => prev.map((w, idx) => idx === i ? { ...w, [field]: value } : w));
  const removePrize = (i: number) => setPrizes(prev => prev.filter((_, idx) => idx !== i));
  const removeWallet = (i: number) => setWallets(prev => prev.filter((_, idx) => idx !== i));
  const addPrize = () => setPrizes(prev => [...prev, { label: '', amount: '', logo: '' }]);
  const addWallet = () => setWallets(prev => [...prev, { name: '', symbol: '', address: '', min: '', max: '', logo: '' }]);

  const LogoSelector = ({ logo, onSelect, uploadKey }: { logo: string; onSelect: (url: string) => void; uploadKey: string }) => (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">Logo</label>
      <div className="flex gap-2 items-center flex-wrap">
        {logo && <img src={logo} alt="logo" className="w-10 h-10 rounded-lg object-contain border border-gray-200 bg-white p-1" />}
        {cryptoPresets.map((p, i) => (
          <button key={i} type="button" onClick={() => onSelect(p.url)} title={p.name}
            className={`w-10 h-10 rounded-lg border-2 p-1 bg-white hover:border-red-400 transition-colors ${logo === p.url ? 'border-red-500' : 'border-gray-200'}`}>
            <img src={p.url} alt={p.name} className="w-full h-full object-contain" />
          </button>
        ))}
        <label className="cursor-pointer flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-medium border border-red-200 rounded-lg px-2 py-2">
          <Upload className="w-3 h-3" />
          {uploading[uploadKey] ? "..." : "Upload"}
          <input type="file" accept="image/*" className="hidden"
            onChange={e => handleUpload(onSelect, uploadKey, e.target.files?.[0])} disabled={uploading[uploadKey]} />
        </label>
        <Input value={logo || ''} onChange={e => onSelect(e.target.value)}
          placeholder="or paste URL" className="flex-1 min-w-[120px] text-xs" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900">Admin Panel</h1>
            <p className="text-gray-500 text-sm">Manage your giveaway website</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Branding */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-5">
              <ImageIcon className="w-5 h-5 text-red-600" />
              <h2 className="text-lg font-bold text-gray-900">Branding</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Site Name</label>
                <Input value={branding.site_name} onChange={e => setBranding(p => ({ ...p, site_name: e.target.value }))} placeholder="TRUMP MEME" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Total Prize Pool</label>
                <Input value={branding.total_prize} onChange={e => setBranding(p => ({ ...p, total_prize: e.target.value }))} placeholder="$100,000,000" />
              </div>
              {[{ key: 'logo_url', label: 'Navbar Logo' }, { key: 'hero_image_url', label: 'Hero Image' }].map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
                  <div className="flex gap-3 items-center">
                    {(branding as any)[key] && <img src={(branding as any)[key]} alt={label} className="w-12 h-12 rounded-xl object-cover border-2 border-red-200" />}
                    <div className="flex-1 space-y-2">
                      <Input value={(branding as any)[key] || ''} onChange={e => setBranding(p => ({ ...p, [key]: e.target.value }))} placeholder="Image URL" />
                      <label className="cursor-pointer inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium">
                        <Upload className="w-4 h-4" />
                        {uploading[key] ? "Uploading..." : "Upload image"}
                        <input type="file" accept="image/*" className="hidden"
                          onChange={e => handleUpload(url => setBranding(p => ({ ...p, [key]: url })), key, e.target.files?.[0])}
                          disabled={uploading[key]} />
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prizes */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-red-600" />
                <h2 className="text-lg font-bold text-gray-900">Giveaway Prizes</h2>
              </div>
              <Button type="button" onClick={addPrize} variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 text-sm gap-1">
                <Plus className="w-4 h-4" /> Add Prize
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prizes.map((prize, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-4 space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-gray-400 uppercase">Prize #{i + 1}</p>
                    <button type="button" onClick={() => removePrize(i)} className="text-gray-300 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Name</label>
                    <Input value={prize.label} onChange={e => updatePrize(i, 'label', e.target.value)} placeholder="Bitcoin" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Amount</label>
                    <Input value={prize.amount} onChange={e => updatePrize(i, 'amount', e.target.value)} placeholder="1,000 BTC" />
                  </div>
                  <LogoSelector logo={prize.logo} onSelect={url => updatePrize(i, 'logo', url)} uploadKey={`prize_logo_${i}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Wallets */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-red-600" />
                <h2 className="text-lg font-bold text-gray-900">Wallet Addresses</h2>
              </div>
              <Button type="button" onClick={addWallet} variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 text-sm gap-1">
                <Plus className="w-4 h-4" /> Add Wallet
              </Button>
            </div>
            <div className="space-y-4">
              {wallets.map((wallet, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-gray-400 uppercase">Wallet #{i + 1}</p>
                    <button type="button" onClick={() => removeWallet(i)} className="text-gray-300 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name</label>
                      <Input value={wallet.name} onChange={e => updateWallet(i, 'name', e.target.value)} placeholder="Bitcoin" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Symbol</label>
                      <Input value={wallet.symbol} onChange={e => updateWallet(i, 'symbol', e.target.value)} placeholder="BTC" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Wallet Address</label>
                    <Input value={wallet.address} onChange={e => updateWallet(i, 'address', e.target.value)} placeholder="Enter wallet address..." />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Min Amount</label>
                      <Input value={wallet.min} onChange={e => updateWallet(i, 'min', e.target.value)} placeholder="0.1 BTC" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Max Amount</label>
                      <Input value={wallet.max} onChange={e => updateWallet(i, 'max', e.target.value)} placeholder="20 BTC" />
                    </div>
                  </div>
                  <LogoSelector logo={wallet.logo} onSelect={url => updateWallet(i, 'logo', url)} uploadKey={`wallet_logo_${i}`} />
                </div>
              ))}
            </div>
          </div>

          <Button onClick={handleSave} disabled={saving}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg font-bold rounded-xl">
            <Save className="w-5 h-5 mr-2" />
            {saving ? "Saving..." : "Save All Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
