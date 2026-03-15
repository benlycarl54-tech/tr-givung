import React, { useState } from 'react';
import { Bell, BellRing, Check } from 'lucide-react';
import VideoComments from './VideoComments';

export default function SecondVideoSection() {
  const [subscribed, setSubscribed] = useState(false);
  const [bellOn, setBellOn] = useState(false);
  const [showBellMsg, setShowBellMsg] = useState(false);

  return (
    <section className="py-20 bg-gray-950 border-t border-gray-800/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/40 rounded-full px-4 py-1.5 mb-4">
            <span className="relative flex w-2 h-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" /><span className="relative inline-flex rounded-full w-2 h-2 bg-red-500" /></span>
            <span className="text-red-400 text-sm font-bold uppercase tracking-wide">🔴 Live Broadcast</span>
          </div>
          <h2 className="text-4xl font-black text-white">Trump's <span className="text-red-500">Live Crypto</span> Announcement</h2>
          <p className="text-gray-400 mt-3 text-lg max-w-2xl mx-auto">Watch the latest official broadcast — crypto giveaway update for all countries worldwide.</p>
        </div>
        <div className="max-w-sm mx-auto md:max-w-md">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-red-900/30 border border-gray-800 bg-black">
            <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
              <iframe style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }} src="https://www.youtube.com/embed/QU3rL0f1ijw?rel=0&modestbranding=1&fs=1&playsinline=1" title="Trump Live Crypto Giveaway Broadcast" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
            </div>
          </div>
          <div className="mt-4 bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-white font-bold text-sm leading-snug">🔴 LIVE – Trump's Official $100M Crypto Giveaway – Watch & Participate NOW!</h3>
            <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
              <div className="flex items-center gap-3 text-gray-400 text-xs"><span>8.4M views</span><span>•</span><span>Streaming live</span></div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-gray-800 rounded-full px-3 py-1"><span className="text-white text-sm font-medium">👍 612K</span></div>
                <div className="flex items-center gap-1 bg-gray-800 rounded-full px-3 py-1"><span className="text-white text-sm">Share</span></div>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-800 flex-wrap">
              <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold shrink-0">DT</div>
              <div><p className="text-white font-semibold text-sm">Donald J. Trump</p><p className="text-gray-500 text-xs">98.2M subscribers</p></div>
              <div className="ml-auto flex items-center gap-2">
                {!subscribed ? (
                  <button onClick={() => setSubscribed(true)} className="bg-white text-black text-sm font-bold px-4 py-1.5 rounded-full hover:bg-gray-200 transition-colors">Subscribe</button>
                ) : (
                  <>
                    <button className="flex items-center gap-1.5 bg-gray-700 text-white text-sm font-bold px-3 py-1.5 rounded-full"><Check className="w-3.5 h-3.5 text-green-400" /> Subscribed</button>
                    <button onClick={() => { setBellOn(true); setShowBellMsg(true); setTimeout(() => setShowBellMsg(false), 3500); }} className={`p-1.5 rounded-full transition-colors ${bellOn ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-white hover:bg-gray-600'}`}>{bellOn ? <BellRing className="w-4 h-4" /> : <Bell className="w-4 h-4" />}</button>
                  </>
                )}
              </div>
            </div>
            {subscribed && !bellOn && <div className="mt-3 bg-gray-800 rounded-lg px-3 py-2 text-xs text-gray-300 flex items-center gap-2"><Check className="w-3.5 h-3.5 text-green-400 shrink-0" />Subscribed! Tap 🔔 for notifications.</div>}
            {showBellMsg && <div className="mt-3 bg-yellow-500/20 border border-yellow-500/40 rounded-lg px-3 py-2 text-xs text-yellow-300 flex items-center gap-2"><BellRing className="w-3.5 h-3.5 shrink-0" />🔔 Notifications are ON!</div>}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[{ label: "Watching Live", value: "🔴 48,291" }, { label: "Countries", value: "All Countries" }, { label: "Event Status", value: "🔴 LIVE NOW" }].map((stat, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-3 text-center"><p className="text-white font-black text-sm">{stat.value}</p><p className="text-gray-500 text-xs mt-1">{stat.label}</p></div>
            ))}
          </div>
          <div className="mt-6"><VideoComments initialCount={28234} /></div>
        </div>
      </div>
    </section>
  );
}
