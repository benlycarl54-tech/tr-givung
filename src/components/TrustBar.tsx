import React from 'react';
import { ShieldCheck, Lock, Zap, BadgeCheck } from 'lucide-react';

const badges = [
  { icon: <ShieldCheck className="w-4 h-4 text-green-500" />, text: "Verified Official Event" },
  { icon: <Lock className="w-4 h-4 text-blue-400" />, text: "256-bit SSL Secured" },
  { icon: <Zap className="w-4 h-4 text-yellow-400" />, text: "Smart Contract Powered" },
  { icon: <BadgeCheck className="w-4 h-4 text-red-400" />, text: "10,000+ Paid Out" },
];

export default function TrustBar() {
  return (
    <div className="bg-gray-950 border-b border-gray-800 py-2.5">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-6">
          {badges.map((b, i) => (
            <div key={i} className="flex items-center gap-2">
              {b.icon}
              <span className="text-gray-300 text-xs font-semibold">{b.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
