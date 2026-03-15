import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle, QrCode } from 'lucide-react';

const BASE_COUNT = 12847;

export default function HeroSection() {
  const [count, setCount] = useState(BASE_COUNT);

  useEffect(() => {
    const t = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="giveaway" className="bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen relative overflow-hidden flex items-center">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-400 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm">
                <CheckCircle className="w-4 h-4 text-red-600 fill-red-600" />
                <span className="text-sm font-semibold text-gray-700">Official Event</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2 shadow-sm">
                <span className="relative flex w-2 h-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full w-2 h-2 bg-green-500" />
                </span>
                <span className="text-sm font-semibold text-green-700">Live — {count.toLocaleString()} Participants</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 shadow-sm">
                <span className="text-sm font-semibold text-blue-700">🔒 SSL Secured</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight">
              BIGGEST CRYPTO
              <br />
              GIVEAWAY OF{' '}
              <span className="text-red-600">$100,000,000</span>
            </h1>

            <p className="mt-6 text-gray-600 text-lg leading-relaxed max-w-lg">
              During this unique event, you have the opportunity to take a share of{' '}
              <span className="text-red-600 font-semibold">1,000 BTC</span> &{' '}
              <span className="text-red-600 font-semibold">10,000 ETH</span> &{' '}
              <span className="text-red-600 font-semibold">500,000 SOL</span> &{' '}
              <span className="text-red-600 font-semibold">1,000,000 TRUMP</span>. Have a look at the rules and don't miss out on this. You can only participate once!
            </p>

            <div className="flex items-center gap-4 mt-10">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg font-bold rounded-md"
                onClick={() => document.getElementById('participate')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Participate →
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-600 px-4 py-6 rounded-md"
              >
                <QrCode className="w-6 h-6" />
              </Button>
            </div>
          </div>

          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-red-600 opacity-20 rounded-3xl transform rotate-3 scale-105 blur-xl" />
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8eb41a50eea87ead000ff/db53826d5_images15.jpeg"
                alt="Trump"
                className="relative z-10 w-96 h-auto object-cover rounded-3xl shadow-2xl border-4 border-red-600"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
