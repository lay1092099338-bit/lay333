
import React from 'react';
import { EventActivity } from '../types';
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
        <div className="p-10 border-b border-white/5 relative bg-gradient-to-r from-gray-900 to-indigo-950">
          <button onClick={onClose} className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-indigo-500 flex items-center justify-center text-white text-2xl shadow-2xl">
              <i className="fa-solid fa-flask"></i>
            </div>
            <div>
              <h3 className="text-4xl font-black text-white">Pioneer Testing Center</h3>
              <p className="text-gray-400 mt-1">Join internal tests, shape the platform's future. Exclusive studio rewards.</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-10 overflow-y-auto flex-1 bg-gray-900/50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event.id} className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-[28px] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <EventCard event={event} showStudioJoin={true} />
              </div>
            ))}
            {events.length === 0 && (
              <div className="col-span-full py-24 text-center">
                 <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                   <i className="fa-solid fa-hourglass-half text-gray-500 text-3xl"></i>
                 </div>
                 <h4 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">No Active Beta Projects</h4>
                 <p className="text-gray-500">New features are under development. Stay tuned for updates.</p>
              </div>
            )}
          </div>

          <div className="mt-16 bg-white/5 rounded-3xl p-10 border border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-10">
               <div className="flex-1">
                 <h4 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight">About Bug Bounty Program</h4>
                 <p className="text-gray-400 leading-relaxed text-sm">
                   Report valid bugs, experience suggestions, or security flaws discovered during beta testing to earn <b>10 - 500 Lovense Cash</b>. Submission channels are open within each test campaign page.
                 </p>
               </div>
               <div className="grid grid-cols-2 gap-4 shrink-0">
                  <div className="bg-gray-800 p-4 rounded-2xl text-center min-w-[140px]">
                    <p className="text-gray-500 text-[10px] font-black uppercase mb-1 tracking-widest">Rewards Paid (Month)</p>
                    <p className="text-xl font-black text-pink-500">$2,450</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-2xl text-center min-w-[140px]">
                    <p className="text-gray-500 text-[10px] font-black uppercase mb-1 tracking-widest">Active Pioneers</p>
                    <p className="text-xl font-black text-indigo-400">128</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-gray-900 border-t border-white/5 text-center">
           <p className="text-gray-600 text-xs">
             Participation in beta tests implies agreement to the "Lovense NDA". Leaking unreleased features is strictly prohibited.
           </p>
        </div>
      </div>
    </div>
  );
};

export default BetaTestModal;
