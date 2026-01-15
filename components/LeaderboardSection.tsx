
import React from 'react';
import { LeaderboardEntry } from '../types';

interface LeaderboardSectionProps {
  data: LeaderboardEntry[];
}

const LeaderboardSection: React.FC<LeaderboardSectionProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-gray-50 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-600 shadow-sm">
            <i className="fa-solid fa-ranking-star text-lg"></i>
          </div>
          <div>
            <h3 className="text-lg font-black text-gray-800 leading-none uppercase tracking-tight">Event Power Ranking</h3>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Global Earnings Ranking</p>
          </div>
        </div>
        <button className="text-[10px] font-bold text-indigo-500 hover:underline uppercase tracking-widest">
          View All
        </button>
      </div>

      <div className="p-4 flex-1 space-y-2">
        {data.map((item, idx) => (
          <div 
            key={item.id} 
            className={`flex items-center p-3 rounded-xl transition-all duration-300 hover:bg-gray-50 group cursor-pointer ${idx === 0 ? 'bg-yellow-50/30' : ''}`}
          >
            {/* Rank Number / Icon */}
            <div className="w-8 flex items-center justify-center shrink-0">
              {item.rank === 1 ? (
                <i className="fa-solid fa-crown text-yellow-500 text-lg"></i>
              ) : item.rank === 2 ? (
                <i className="fa-solid fa-medal text-gray-400 text-lg"></i>
              ) : item.rank === 3 ? (
                <i className="fa-solid fa-medal text-orange-400 text-lg"></i>
              ) : (
                <span className="text-sm font-black text-gray-300 group-hover:text-gray-500">{item.rank}</span>
              )}
            </div>

            {/* Avatar & Name */}
            <div className="ml-3 flex items-center space-x-3 flex-1 min-w-0">
              <div className="relative shrink-0">
                <img src={item.avatar} alt={item.name} className="w-9 h-9 rounded-full border-2 border-white shadow-sm" />
                {item.trend === 'up' && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center text-white text-[8px]">
                    <i className="fa-solid fa-arrow-up"></i>
                  </div>
                )}
              </div>
              <div className="truncate">
                <p className="text-sm font-bold text-gray-800 truncate">{item.name}</p>
                <div className="flex items-center space-x-1">
                  <span className="text-[10px] text-gray-400 uppercase font-black">Tokens</span>
                  <span className="text-[10px] font-bold text-pink-500">{(item.earningsTokens / 1000).toFixed(1)}k+</span>
                </div>
              </div>
            </div>

            {/* Earnings with Highlight */}
            <div className="text-right ml-2 shrink-0">
              <p className="text-xs font-black text-gray-900">
                {item.earningsTokens.toLocaleString()}
              </p>
              <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Weekly</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-100 mt-auto">
        <div className="flex items-center justify-between text-[11px] text-gray-500">
          <span className="flex items-center">
            <i className="fa-solid fa-clock-rotate-left mr-1 opacity-50"></i>
            Updated every 15m
          </span>
          <span className="font-bold text-indigo-500 cursor-pointer hover:text-indigo-600 uppercase text-[10px] tracking-widest">
            My Rank: 1,402+
          </span>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardSection;
