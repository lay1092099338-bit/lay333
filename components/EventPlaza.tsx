
import React, { useState } from 'react';
import { MOCK_USER_STATS, MOCK_EVENTS, MOCK_TRANSACTIONS, MOCK_LEADERBOARD } from '../constants';
import { EventStatus, EventActivity } from '../types';
import EventCard from './EventCard';
import ComparisonChart from './ComparisonChart';
import WalletModal from './WalletModal';
import TrafficModal from './TrafficModal';
import StrategyModal from './StrategyModal';
import BetaTestModal from './BetaTestModal';
import LeaderboardModal from './LeaderboardModal';

const EventPlaza: React.FC = () => {
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isTrafficOpen, setIsTrafficOpen] = useState(false);
  const [isStrategyOpen, setIsStrategyOpen] = useState(false);
  const [isBetaOpen, setIsBetaOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [filter, setFilter] = useState('All');

  const filteredEvents = MOCK_EVENTS.filter(e => {
    if (filter === 'All') return e.status !== EventStatus.TESTING;
    if (filter === 'Live') return e.status === EventStatus.ONGOING;
    if (filter === 'Upcoming') return e.status === EventStatus.UPCOMING;
    return true;
  });

  const grayTestEvents = MOCK_EVENTS.filter(e => e.status === EventStatus.TESTING);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Welcome Banner */}
      <div className="relative h-48 rounded-[32px] overflow-hidden tech-gradient shadow-xl flex items-center px-12 transition-all duration-500 hover:shadow-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <i className="fa-solid fa-bullhorn text-[200px] -rotate-12 absolute -right-10 -bottom-10"></i>
        </div>
        <div className="relative z-10 text-white max-w-xl">
          <h1 className="text-4xl font-black mb-2 tracking-tight">Event Plaza <span className="text-xl font-normal opacity-80 ml-2 italic">Official Campaigns</span></h1>
          <p className="text-lg opacity-90 mb-6">Join platform events to boost traffic and earnings. Win exclusive Lovense Cash rewards.</p>
          <div className="flex space-x-4">
            <button 
              onClick={() => setIsStrategyOpen(true)}
              className="bg-white text-pink-600 px-8 py-2.5 rounded-full font-black shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center space-x-2"
            >
              <i className="fa-solid fa-scroll"></i>
              <span>Rules & Strategy</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Achievements */}
        <div className="md:col-span-1 bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 flex flex-col relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-pink-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-pink-500 flex items-center justify-center text-white text-sm">
                  <i className="fa-solid fa-trophy"></i>
                </div>
                <p className="text-gray-800 font-black uppercase tracking-wider text-xs">Campaign Stats</p>
              </div>
              <button 
                onClick={() => setIsLeaderboardOpen(true)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-yellow-500 transition-colors"
                title="View Leaderboard"
              >
                <i className="fa-solid fa-ranking-star"></i>
              </button>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Participated</p>
                  <p className="text-3xl font-black text-gray-900">{MOCK_USER_STATS.totalEvents}<span className="text-xs font-normal ml-1 italic">Events</span></p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Top %</p>
                  <p className="text-sm font-black text-green-500">85.4%</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-50">
                <div className="bg-gray-50 p-2 rounded-xl">
                  <p className="text-[9px] text-gray-400 font-black uppercase mb-0.5">Total Views</p>
                  <p className="text-sm font-black">{(MOCK_USER_STATS.cumulativeViewers / 1000).toFixed(1)}k</p>
                </div>
                <div className="bg-gray-50 p-2 rounded-xl">
                  <p className="text-[9px] text-gray-400 font-black uppercase mb-0.5">Stream Time</p>
                  <p className="text-sm font-black">248h</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wallet */}
        <div className="md:col-span-1 bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 flex flex-col justify-between group cursor-pointer hover:border-pink-200 transition-colors"
             onClick={() => setIsWalletOpen(true)}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">LOVENSE CASH (USD 1:1)</p>
              <div className="flex items-center space-x-2">
                <i className="fa-solid fa-dollar-sign text-green-600 text-xl"></i>
                <span className="text-3xl font-black text-gray-900">{MOCK_USER_STATS.totalCash.toFixed(2)}</span>
              </div>
            </div>
            <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center text-pink-500 group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-wallet text-lg"></i>
            </div>
          </div>
          <button className="w-full mt-4 py-2 text-pink-500 font-black text-[10px] border-2 border-pink-100 rounded-xl group-hover:bg-pink-500 group-hover:text-white transition-all uppercase tracking-widest">
            REWARDS & EXCHANGE
          </button>
        </div>

        {/* Chart */}
        <div className="md:col-span-2 bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 overflow-hidden relative">
          <div className="absolute top-4 right-4 text-[10px] font-black text-gray-300 uppercase tracking-widest">Performance Insights</div>
          <h3 className="text-lg font-black text-gray-800 mb-4 flex items-center">
             <i className="fa-solid fa-chart-line text-indigo-500 mr-2"></i>
             Average Earnings Comparison <span className="text-xs font-normal text-gray-400 ml-2">(Tokens)</span>
          </h3>
          <ComparisonChart />
        </div>
      </div>

      {/* Main Exploration */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div className="flex items-center space-x-8">
             <h2 className="text-2xl font-black text-gray-800">Explore Events</h2>
             <div className="flex space-x-6">
                {['All', 'Live', 'Upcoming'].map(f => (
                  <button 
                    key={f} 
                    onClick={() => setFilter(f)}
                    className={`text-sm font-black transition-all relative py-1 uppercase tracking-widest ${filter === f ? 'text-pink-500' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    {f}
                    {filter === f && <div className="absolute bottom-0 left-0 w-full h-1 bg-pink-500 rounded-full"></div>}
                  </button>
                ))}
             </div>
          </div>
          <div className="hidden sm:flex items-center space-x-2 bg-white px-4 py-2 rounded-xl border text-xs">
            <span className="text-gray-400 font-bold uppercase">Sort by:</span>
            <button className="text-gray-800 font-black flex items-center">
              LATEST <i className="fa-solid fa-chevron-down ml-2 text-[10px]"></i>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} showStudioJoin={true} />
          ))}
        </div>
      </div>

      {/* Experimental Access Section */}
      <div className="bg-gray-900 rounded-[40px] p-12 text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px] group-hover:bg-pink-500/20 transition-all duration-700"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0 max-w-2xl">
             <div className="flex items-center space-x-3 mb-4">
                <span className="bg-pink-500 text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest">Experimental Access</span>
                <h3 className="text-3xl font-black">Pioneer Testing Program</h3>
             </div>
             <p className="text-gray-400 text-lg leading-relaxed">Exclusive for Studios and Key Partners. Early access to new interaction modules. Help us shape the platform and earn extra Lovense Cash via our Bug Bounty program.</p>
          </div>
          <button 
            onClick={() => setIsBetaOpen(true)}
            className="bg-white text-gray-900 px-10 py-5 rounded-[24px] font-black shadow-2xl hover:bg-pink-50 hover:scale-105 active:scale-95 transition-all shrink-0 flex items-center space-x-3"
          >
            <i className="fa-solid fa-flask"></i>
            <span className="uppercase tracking-widest">View Beta Projects ({grayTestEvents.length})</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      {isWalletOpen && (
        <WalletModal 
          onClose={() => setIsWalletOpen(false)} 
          balance={MOCK_USER_STATS.totalCash}
          transactions={MOCK_TRANSACTIONS}
          onBuyTraffic={() => {
            setIsWalletOpen(false);
            setIsTrafficOpen(true);
          }}
        />
      )}
      {isTrafficOpen && (
        <TrafficModal onClose={() => setIsTrafficOpen(false)} balance={MOCK_USER_STATS.totalCash} />
      )}
      {isStrategyOpen && (
        <StrategyModal onClose={() => setIsStrategyOpen(false)} />
      )}
      {isBetaOpen && (
        <BetaTestModal onClose={() => setIsBetaOpen(false)} events={grayTestEvents} />
      )}
      {isLeaderboardOpen && (
        <LeaderboardModal data={MOCK_LEADERBOARD} onClose={() => setIsLeaderboardOpen(false)} />
      )}
    </div>
  );
};

export default EventPlaza;
