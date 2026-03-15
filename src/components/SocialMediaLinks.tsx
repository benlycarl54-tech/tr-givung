import React from 'react';
import { CheckCircle, ExternalLink } from 'lucide-react';

const TRUMP_AVATAR = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8eb41a50eea87ead000ff/2a982a3ff_images16.jpeg";
const TRUMP_MEME_LOGO = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8eb41a50eea87ead000ff/3b869c91c_images16.jpeg";

const trumpAccounts = [
  { name: "Donald J. Trump", handle: "@realDonaldTrump", platform: "X (Twitter)", url: "https://twitter.com/realDonaldTrump", avatar: TRUMP_AVATAR, verified: true, bg: "bg-black", icon: (<svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.737-8.835L1.254 2.25H8.08l4.258 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>), desc: "45th & 47th President of the United States.", followers: "98.2M followers" },
  { name: "Donald J. Trump", handle: "Donald J. Trump", platform: "Truth Social", url: "https://truthsocial.com/@realDonaldTrump", avatar: TRUMP_AVATAR, verified: true, bg: "bg-[#5448ee]", icon: (<svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z"/></svg>), desc: "Official Truth Social profile.", followers: "9.4M followers" },
  { name: "Trump Meme ($TRUMP)", handle: "@GetTrumpMemes", platform: "X (Twitter)", url: "https://twitter.com/GetTrumpMemes", avatar: TRUMP_MEME_LOGO, verified: true, bg: "bg-black", icon: (<svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.737-8.835L1.254 2.25H8.08l4.258 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>), desc: "Official $TRUMP meme coin account.", followers: "1.2M followers" },
];

export default function SocialMediaLinks() {
  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-white">Official <span className="text-red-500">Social Media</span></h2>
          <p className="text-gray-400 mt-3 text-lg">Follow Trump & $TRUMP meme on all official channels</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {trumpAccounts.map((acc, i) => (
            <a key={i} href={acc.url} target="_blank" rel="noopener noreferrer" className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-red-500 hover:shadow-lg hover:shadow-red-900/20 transition-all group">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <img src={acc.avatar} alt={acc.name} className="w-12 h-12 rounded-full object-cover border-2 border-gray-700" />
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${acc.bg} flex items-center justify-center border border-gray-900`}>{acc.icon}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-white text-sm truncate">{acc.name}</span>
                    {acc.verified && <CheckCircle className="w-3.5 h-3.5 text-blue-400 fill-blue-400 shrink-0" />}
                  </div>
                  <span className="text-gray-500 text-xs">{acc.platform}</span>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-red-400 transition-colors shrink-0" />
              </div>
              <p className="text-gray-400 text-sm mb-3 leading-relaxed">{acc.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-xs">{acc.handle}</span>
                <span className="text-green-400 text-xs font-semibold">{acc.followers}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
