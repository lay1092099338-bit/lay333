
import React from 'react';
import { LeaderboardEntry } from '../types';

interface LeaderboardModalProps {
  data: LeaderboardEntry[];
  onClose: () => void;
}

const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ data, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in duration-300">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-yellow-400 flex items-center justify-center text-white shadow-lg">
              <i className="fa-solid fa-ranking-star text-xl"></i>
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-800 leading-none uppercase tracking-tight">Event Power Ranking</h3>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Global Earnings Ranking</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-3">
          {data.map((item, idx) => (
            <div 
              key={item.id} 
              className={`flex items-center p-4 rounded-2xl transition-all duration-300 hover:bg-gray-50 group cursor-pointer border border-transparent hover:border-gray-100 ${idx === 0 ? 'bg-yellow-50/50 border-yellow-100' : ''}`}
            >
              {/* Rank Number / Icon */}
              <div className="w-8 flex items-center justify-center shrink-0">
                {item.rank === 1 ? (
                  <i className="fa-solid fa-crown text-yellow-500 text-xl"></i>
                ) : item.rank === 2 ? (
                  <i className="fa-solid fa-medal text-gray-400 text-xl"></i>
                ) : item.rank === 3 ? (
                  <i className="fa-solid fa-medal text-orange-400 text-xl"></i>
                ) : (
                  <span className="text-sm font-black text-gray-300 group-hover:text-gray-500">{item.rank}</span>
                )}
              </div>

              {/* Avatar & Name */}
              <div className="ml-4 flex items-center space-x-3 flex-1 min-w-0">
                <div className="relative shrink-0">
                  <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                  {item.trend === 'up' && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center text-white text-[8px]">
                      <i className="fa-solid fa-arrow-up"></i>
                    </div>
                  )}
                </div>
                <div className="truncate">
                  <p className="text-sm font-bold text-gray-800 truncate">{item.name}</p>
                  <div className="flex items-center space-x-1">
                    <span className="text-[10px] text-gray-400 uppercase">Tokens</span>
                    <span className="text-[10px] font-bold text-pink-500">{(item.earningsTokens / 1000).toFixed(1)}k+</span>
                  </div>
                </div>
              </div>

              {/* Earnings */}
              <div className="text-right ml-2 shrink-0">
                <p className="text-sm font-black text-gray-900">
                  {item.earningsTokens.toLocaleString()}
                </p>
                <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Active Week</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center">
              <i className="fa-solid fa-clock-rotate-left mr-1.5 opacity-50"></i>
              Real-time update every 15m
            </span>
            <span className="font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase text-[10px] tracking-widest">
              My Rank: 1,402+
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardModal;
