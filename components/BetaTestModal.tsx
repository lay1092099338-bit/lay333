
import React from 'react';
import { EventActivity } from '../types';
import { MOCK_USER_STATS } from '../constants';
import EventCard from './EventCard';

interface BetaTestModalProps {
  onClose: () => void;
  events: EventActivity[];
}

const BetaTestModal: React.FC<BetaTestModalProps> = ({ onClose, events }) => {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-xl" onClick={onClose}></div>
      <div className="relative bg-[#111827] w-full max-w-6xl rounded-[40px] shadow-3xl overflow-hidden flex flex-col max-h-[90vh] border border-white/10">
        {/* Header */}
        <div className="p-10 border-b border-white/5 relative bg-gradient-to-r from-gray-900 to-indigo-950 flex flex-col md:flex-row items-center justify-between">
          <button onClick={onClose} className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
          
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-indigo-500 flex items-center justify-center text-white text-2xl shadow-2xl">
              <i className="fa-solid fa-flask"></i>
            </div>
            <div>
              <h3 className="text-4xl font-black text-white">Testing Center</h3>
              <p className="text-gray-400 mt-1">Join internal tests, shape the platform's future. Exclusive studio rewards.</p>
            </div>
          </div>

          {/* Testing Points Balance (The new entry point for TP) */}
          <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl flex items-center space-x-4 shadow-inner">
             <div className="text-right">
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Your Balance</p>
                <p className="text-2xl font-black text-indigo-400">{MOCK_USER_STATS.testingPoints.toLocaleString()} <span className="text-xs font-bold uppercase opacity-60">TP</span></p>
             </div>
             <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                <i className="fa-solid fa-star"></i>
             </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-10 overflow-y-auto flex-1 bg-gray-900/50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event.id} className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-[28px] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                {/* Override rewards text display in EventCard logic or just let it use event data */}
                <EventCard event={event} showStudioJoin={true} />
              </div>
            ))}
            {events.length === 0 && (
              <div className="col-span-full py-24 text-center">
                 <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                   <i className="fa-solid fa-hourglass-half text-gray-500 text-3xl"></i>
                 </div>
                 <h4 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">No Active Projects</h4>
                 <p className="text-gray-500">New features are under development. Stay tuned for updates.</p>
              </div>
            )}
          </div>

          <div className="mt-16 bg-white/5 rounded-3xl p-10 border border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-10">
               <div className="flex-1">
                 <h4 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight">About Testing Points (TP)</h4>
                 <p className="text-gray-400 leading-relaxed text-sm">
                   Testing Points (TP) are special rewards for active testers. Earn <b>100 - 1,000 TP</b> by providing valid bugs, experience suggestions, or security flaws discovered during center testing. TP can be redeemed for exclusive Pioneer Badges and platform priority access.
                 </p>
               </div>
               <div className="grid grid-cols-2 gap-4 shrink-0">
                  <div className="bg-gray-800 p-4 rounded-2xl text-center min-w-[140px]">
                    <p className="text-gray-500 text-[10px] font-black uppercase mb-1 tracking-widest">TP Paid (Month)</p>
                    <p className="text-xl font-black text-pink-500">12,450</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-2xl text-center min-w-[140px]">
                    <p className="text-gray-500 text-[10px] font-black uppercase mb-1 tracking-widest">Active Testers</p>
                    <p className="text-xl font-black text-indigo-400">128</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-gray-900 border-t border-white/5 text-center">
           <p className="text-gray-600 text-xs">
             Participation in center tests implies agreement to the "Lovense NDA". Leaking unreleased features is strictly prohibited.
           </p>
        </div>
      </div>
    </div>
  );
};

export default BetaTestModal;
