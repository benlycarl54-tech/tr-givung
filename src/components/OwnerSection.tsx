import React from 'react';
import { CheckCircle, Twitter } from 'lucide-react';

export default function OwnerSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900">
            Straight from the <span className="text-red-600">President</span>
          </h2>
          <p className="text-gray-600 mt-4 text-lg">Official announcements from Donald J. Trump himself</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8eb41a50eea87ead000ff/2a982a3ff_images16.jpeg" alt="Donald Trump" className="w-12 h-12 rounded-full object-cover border-2 border-red-500" />
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-gray-900">Donald J. Trump</span>
                  <CheckCircle className="w-4 h-4 text-blue-500 fill-blue-500" />
                </div>
                <span className="text-gray-500 text-sm">@realDonaldTrump</span>
              </div>
              <Twitter className="w-5 h-5 text-blue-400 ml-auto" />
            </div>
            <p className="text-gray-800 leading-relaxed mb-4">
              My NEW Official Trump Meme is HERE! It's time to celebrate everything we stand for: WINNING!
              Join my very special Trump Community. GET YOUR $TRUMP NOW. Go to gettrumpmemes.com/ — Have Fun!
            </p>
            <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8eb41a50eea87ead000ff/2f7818ab1_images18.jpeg" alt="Trump Fight Fight Fight" className="w-full rounded-xl object-cover" />
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center border-2 border-blue-600">
                <span className="text-white text-xs font-bold text-center leading-tight">WHITE HOUSE</span>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-gray-900">The White House</span>
                  <CheckCircle className="w-4 h-4 text-blue-500 fill-blue-500" />
                </div>
                <span className="text-gray-500 text-sm">@WhiteHouse</span>
              </div>
              <Twitter className="w-5 h-5 text-blue-400 ml-auto" />
            </div>
            <p className="text-gray-800 leading-relaxed mb-4">
              ATTENTION: TRUMP DIDN'T COME TO PLAY.<br /><br />
              Six months in. All gas. No brakes. The winning will continue. The deportations will continue. The memes will continue.<br /><br />
              THE GOLDEN AGE WILL CONTINUE! 🇺🇸🦅💰
            </p>
            <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8eb41a50eea87ead000ff/f30430209_images17.jpeg" alt="Trump 6 Months" className="w-full rounded-xl object-cover" />
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8eb41a50eea87ead000ff/0eb19e826_images15.jpeg" alt="Trump Meme Coin Creator" className="w-full h-72 object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="text-white font-black text-xl">The Creator of $TRUMP</p>
              <p className="text-red-400 text-sm">President Donald J. Trump</p>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8eb41a50eea87ead000ff/2a982a3ff_images16.jpeg" alt="Trump Crypto President" className="w-full h-72 object-cover object-top" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="text-white font-black text-xl">The Crypto President</p>
              <p className="text-amber-400 text-sm">Holding $TRUMP — The Future of Crypto</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
