import React, { useState, useEffect, useRef } from 'react';
import { ThumbsUp, ThumbsDown, ChevronDown, ChevronUp } from 'lucide-react';

const BASE_COMMENTS = [
  { id: 1, name: "Mike Johnson", avatar: "MJ", color: "bg-blue-600", time: "2 days ago", text: "Just received 2.4 BTC back!! I sent 1.2 BTC and they doubled it in 8 minutes. This is REAL. God bless Trump! 🇺🇸", likes: 4821, pinned: true },
  { id: 2, name: "Sarah Williams", avatar: "SW", color: "bg-pink-500", time: "1 day ago", text: "Sent 3 ETH and got 6 ETH back within 10 mins. No way this is real but IT IS!!", likes: 3244 },
  { id: 3, name: "Carlos Mendez", avatar: "CM", color: "bg-green-600", time: "3 days ago", text: "From Mexico. I sent 500 SOL and received 1000 SOL back. This giveaway is for ALL countries!!", likes: 2918 },
  { id: 4, name: "David Chen", avatar: "DC", color: "bg-purple-600", time: "2 days ago", text: "I was skeptical at first but my colleague convinced me. Sent 0.5 BTC, got 1 BTC back.", likes: 2611 },
  { id: 5, name: "Amara Osei", avatar: "AO", color: "bg-yellow-500", time: "1 day ago", text: "From Ghana 🇬🇭 Sent 50,000 TRUMP tokens, received 100,000 back!", likes: 2403 },
  { id: 6, name: "James Wilson", avatar: "JW", color: "bg-red-600", time: "4 hours ago", text: "My wife didn't believe me. Showed her the blockchain confirmation of 4 ETH arriving in my wallet. 😭❤️", likes: 2187 },
  { id: 7, name: "Priya Sharma", avatar: "PS", color: "bg-orange-500", time: "6 hours ago", text: "India 🇮🇳 here. Sent 20 SOL got 40 SOL. 100% legit. Thank you Trump!", likes: 1983 },
  { id: 8, name: "Robert Taylor", avatar: "RT", color: "bg-cyan-600", time: "8 hours ago", text: "Third time participating. Every single time it works.", likes: 1874 },
  { id: 9, name: "Emma Thompson", avatar: "ET", color: "bg-indigo-500", time: "12 hours ago", text: "Sent 2 BTC at 3am. Woke up to 4 BTC in my wallet 😱😱😱", likes: 1756 },
  { id: 10, name: "Ahmed Al-Rashid", avatar: "AA", color: "bg-teal-600", time: "1 day ago", text: "UAE 🇦🇪 – Sent 10,000 TRUMP tokens. Double came back in 7 minutes.", likes: 1644 },
];

const LIVE_COMMENT_POOL = [
  { name: "Emeka Obi", avatar: "EO", color: "bg-green-600", text: "Just sent 1 BTC and waiting... 🙏🙏", likes: 12 },
  { name: "Tola Fashola", avatar: "TF", color: "bg-blue-600", text: "IT WORKED!! I sent 2 ETH and received 4 ETH back in 9 minutes 🔥🔥🔥", likes: 87 },
  { name: "John Wick_Real", avatar: "JW", color: "bg-gray-600", text: "Confirmed! 3 BTC → 6 BTC. This is 100% real.", likes: 204 },
  { name: "CryptoKing_NG", avatar: "CK", color: "bg-yellow-600", text: "Second time today. First: 1 ETH → 2 ETH. Now just sent 5 ETH. LETS GOOO 🚀🚀", likes: 56 },
  { name: "BTC_Lover99", avatar: "BL", color: "bg-orange-700", text: "Just verified on blockchain explorer. The contract is REAL.", likes: 178 },
  { name: "Anonymous_Crypto", avatar: "AC", color: "bg-gray-700", text: "Sent 2 BTC and got 4 BTC back. Just happened 3 mins ago.", likes: 91 },
];

let liveIdCounter = 1000;

function CommentItem({ c, likedIds, toggleLike, isNew }: any) {
  return (
    <div className="flex gap-3 transition-all duration-700" style={{ animation: isNew ? 'slideInComment 0.6s ease-out' : 'none' }}>
      <div className={`w-9 h-9 rounded-full ${c.color} flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5`}>{c.avatar?.slice(0, 2)}</div>
      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-white text-sm font-semibold">{c.name}</span>
          {c.pinned && <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">📌 Pinned</span>}
          {isNew && <span className="text-xs bg-green-700/60 text-green-300 px-2 py-0.5 rounded-full animate-pulse">🔴 Just now</span>}
          <span className="text-gray-500 text-xs">{c.time || 'just now'}</span>
        </div>
        <p className="text-gray-300 text-sm mt-1 leading-relaxed">{c.text}</p>
        <div className="flex items-center gap-4 mt-2">
          <button onClick={() => toggleLike(c.id)} className="flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors">
            <ThumbsUp className={`w-3.5 h-3.5 ${likedIds[c.id] ? 'text-blue-400 fill-blue-400' : ''}`} />
            <span className="text-xs">{(c.likes + (likedIds[c.id] ? 1 : 0)).toLocaleString()}</span>
          </button>
          <button className="flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors"><ThumbsDown className="w-3.5 h-3.5" /></button>
          <button className="text-xs text-gray-500 hover:text-white transition-colors font-medium">Reply</button>
        </div>
      </div>
    </div>
  );
}

export default function VideoComments({ initialCount = 23567 }: { initialCount?: number }) {
  const [comments, setComments] = useState(BASE_COMMENTS);
  const [totalCount, setTotalCount] = useState(initialCount);
  const [showAll, setShowAll] = useState(false);
  const [likedIds, setLikedIds] = useState<Record<number, boolean>>({});
  const [newIds, setNewIds] = useState<Set<number>>(new Set());
  const livePoolRef = useRef(0);

  useEffect(() => {
    const timerRef = { current: null as any };
    const schedule = () => {
      const delay = 1500 + Math.random() * 2000;
      timerRef.current = setTimeout(() => {
        const template = LIVE_COMMENT_POOL[livePoolRef.current % LIVE_COMMENT_POOL.length];
        livePoolRef.current += 1;
        liveIdCounter += 1;
        const newComment = { ...template, id: liveIdCounter, time: 'just now' };
        setComments(prev => [newComment, ...prev]);
        setTotalCount(prev => prev + 1);
        setNewIds(prev => new Set([...prev, liveIdCounter]));
        setTimeout(() => { setNewIds(prev => { const n = new Set(prev); n.delete(newComment.id); return n; }); }, 8000);
        timerRef.current = schedule();
      }, delay);
      return timerRef.current;
    };
    schedule();
    return () => clearTimeout(timerRef.current);
  }, []);

  const displayList = showAll ? comments : comments.slice(0, 10);
  const toggleLike = (id: number) => setLikedIds(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="bg-gray-950 border-t border-gray-800 pt-6 pb-2">
      <style>{`@keyframes slideInComment { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-white font-bold text-xl">{totalCount.toLocaleString()} Comments</span>
        <span className="flex items-center gap-1 text-xs text-green-400 animate-pulse"><span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" /> Live</span>
      </div>
      <div className="space-y-5">
        {displayList.map((c) => <CommentItem key={c.id} c={c} likedIds={likedIds} toggleLike={toggleLike} isNew={newIds.has(c.id)} />)}
      </div>
      <button onClick={() => setShowAll(!showAll)} className="mt-6 flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
        {showAll ? <><ChevronUp className="w-4 h-4" /> Show less</> : <><ChevronDown className="w-4 h-4" /> Show {comments.length - 10} more comments</>}
      </button>
    </div>
  );
}
