
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_EVENTS, MOCK_USER_STATS } from '../constants';
import { EventActivity, EventStatus } from '../types';

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventActivity | null>(null);

  useEffect(() => {
    const found = MOCK_EVENTS.find(e => e.id === id);
    if (found) {
      setEvent(found);
    }
  }, [id]);

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <i className="fa-solid fa-circle-exclamation text-5xl mb-4"></i>
        <p>Event details not found.</p>
        <button onClick={() => navigate('/plaza')} className="mt-4 text-pink-500 font-bold">Return to Plaza</button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Back Button */}
      <button 
        onClick={() => navigate('/plaza')}
        className="flex items-center space-x-2 text-gray-500 hover:text-pink-600 transition-colors group"
      >
        <div className="w-8 h-8 rounded-full bg-white border flex items-center justify-center group-hover:border-pink-200 shadow-sm">
          <i className="fa-solid fa-chevron-left text-xs"></i>
        </div>
        <span className="font-bold text-sm">Return to Plaza</span>
      </button>

      {/* Hero Header */}
      <div className="relative h-80 rounded-[40px] overflow-hidden shadow-2xl group">
        <img src={event.cover} alt={event.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        <div className="absolute bottom-10 left-12 right-12 flex flex-col md:flex-row items-end justify-between">
          <div className="text-white max-w-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest ${
                event.status === EventStatus.ONGOING ? 'bg-green-500' : 'bg-blue-500'
              }`}>
                {event.status}
              </span>
              <span className="text-white/60 text-xs font-bold uppercase tracking-widest flex items-center">
                <i className="fa-solid fa-users mr-1.5"></i>
                {event.stats.participantCount || 100}+ Models Active
              </span>
            </div>
            <h1 className="text-5xl font-black mb-4 tracking-tight leading-tight uppercase">{event.name}</h1>
            <p className="text-white/80 text-lg leading-relaxed line-clamp-2">{event.description}</p>
          </div>
          <div className="mt-6 md:mt-0 flex space-x-4">
            {event.joined ? (
               <div className="bg-pink-500/20 backdrop-blur-xl border border-pink-500/30 text-white px-8 py-4 rounded-2xl flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center animate-pulse">
                    <i className="fa-solid fa-play text-xs"></i>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase opacity-60">CAMPAIGN STATUS</p>
                    <p className="text-xl font-black">LIVE & ACTIVE</p>
                  </div>
               </div>
            ) : (
              <button className="bg-white text-gray-900 px-10 py-5 rounded-2xl font-black shadow-2xl hover:scale-105 active:scale-95 transition-all">
                JOIN CAMPAIGN NOW
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Content: Rules & Description */}
        <div className="lg:col-span-8 space-y-8">
          {/* Detailed Description */}
          <section className="bg-white p-10 rounded-[32px] shadow-sm border border-gray-100">
            <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center">
              <i className="fa-solid fa-circle-info text-pink-500 mr-3"></i>
              Campaign Details
            </h2>
            <div className="prose prose-pink max-w-none text-gray-600 leading-relaxed space-y-4">
              <p>{event.description}</p>
              {event.fullRules && (
                <>
                  <h3 className="text-lg font-bold text-gray-800 mt-8 mb-4 underline decoration-pink-500 decoration-4 underline-offset-4 uppercase">Core Rules</h3>
                  <p className="whitespace-pre-line">{event.fullRules}</p>
                </>
              )}
            </div>
          </section>

          {/* Detailed Stages Timeline */}
          <section className="bg-white p-10 rounded-[32px] shadow-sm border border-gray-100">
            <h2 className="text-2xl font-black text-gray-800 mb-10 flex items-center">
              <i className="fa-solid fa-list-check text-indigo-500 mr-3"></i>
              Tiered Missions
            </h2>
            <div className="space-y-12 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-1 before:bg-gray-50 before:rounded-full">
              {event.stages.map((stage, idx) => (
                <div key={idx} className="relative pl-16 group">
                  {/* Timeline Indicator */}
                  <div className={`absolute left-0 w-12 h-12 rounded-2xl border-4 border-white shadow-lg flex items-center justify-center text-xl z-10 transition-all ${
                    stage.isCompleted 
                      ? 'bg-pink-500 text-white' 
                      : 'bg-gray-100 text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-400'
                  }`}>
                    {stage.isCompleted ? <i className="fa-solid fa-check"></i> : <span>{stage.stage}</span>}
                  </div>
                  
                  {/* Stage Content */}
                  <div className={`p-6 rounded-2xl border transition-all ${
                    stage.isCompleted ? 'bg-pink-50/30 border-pink-100' : 'bg-gray-50/30 border-gray-100 group-hover:border-indigo-100'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                       <h4 className={`text-lg font-bold ${stage.isCompleted ? 'text-pink-600' : 'text-gray-800'}`}>{stage.target}</h4>
                       <div className="text-right">
                          <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">REWARD</p>
                          <p className="text-lg font-black text-yellow-600">${stage.rewardAmount} <span className="text-xs">LC</span></p>
                       </div>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{stage.fullDescription || 'Complete streaming tasks to earn Lovense Cash rewards.'}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar: Event Stats & My Progress */}
        <div className="lg:col-span-4 space-y-8">
          {/* User Specific Progress Card */}
          {event.joined && (
            <div className="bg-[#111827] rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl border border-white/10">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-500 opacity-20 blur-[60px]"></div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-8">
                  <img src="https://i.pravatar.cc/150?u=current-user" className="w-12 h-12 rounded-full border-2 border-pink-500 shadow-xl shadow-pink-500/20" alt="me" />
                  <div>
                    <h4 className="font-bold text-lg">My Progress</h4>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Personal Performance</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs font-black mb-2 uppercase tracking-wider">
                      <span className="text-pink-400">Total Progress</span>
                      <span>{Math.round((event.currentStep / event.totalSteps) * 100)}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-pink-500 to-rose-400 transition-all duration-1000 ease-out rounded-full"
                        style={{ width: `${(event.currentStep / event.totalSteps) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                      <p className="text-[10px] text-gray-500 uppercase font-black mb-1">Rewards Earned</p>
                      <p className="text-xl font-black text-yellow-400">
                        ${event.stages.filter(s => s.isCompleted).reduce((acc, curr) => acc + curr.rewardAmount, 0)}
                        <span className="text-xs ml-1">LC</span>
                      </p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                      <p className="text-[10px] text-gray-500 uppercase font-black mb-1">Gifts Received</p>
                      <p className="text-xl font-black text-indigo-400">
                        {event.stats.earningsTokens.toLocaleString()}
                        <span className="text-xs ml-1">Tks</span>
                      </p>
                    </div>
                  </div>

                  <button className="w-full py-4 bg-pink-600 hover:bg-pink-700 text-white font-black rounded-2xl shadow-xl transition-all flex items-center justify-center space-x-2">
                    <i className="fa-solid fa-video"></i>
                    <span>START EVENT STREAM</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Event Social / Participant Stats */}
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
            <h4 className="text-lg font-black text-gray-800 mb-6">Live Overview</h4>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 text-gray-500">
                  <i className="fa-solid fa-users w-5 text-center"></i>
                  <span className="text-sm">Participating Models</span>
                </div>
                <span className="font-bold text-gray-800">{event.stats.participantCount?.toLocaleString() || '1,000+'}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 text-gray-500">
                  <i className="fa-solid fa-eye w-5 text-center"></i>
                  <span className="text-sm">Total Viewers</span>
                </div>
                <span className="font-bold text-gray-800">2.4M+</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 text-gray-500">
                  <i className="fa-solid fa-coins w-5 text-center"></i>
                  <span className="text-sm">Cumulative Rewards</span>
                </div>
                <span className="font-bold text-pink-600">$45,800 LC</span>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-50">
              <p className="text-xs text-gray-400 font-bold uppercase mb-4 tracking-widest">Top 3 Models</p>
              <div className="flex -space-x-3 overflow-hidden">
                {[1, 2, 3].map(i => (
                  <img key={i} className="inline-block h-10 w-10 rounded-full ring-4 ring-white shadow-sm" src={`https://i.pravatar.cc/150?u=top${i}`} alt={`top-${i}`} />
                ))}
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-50 text-[10px] font-black text-gray-400 ring-4 ring-white">
                  +1.2k
                </div>
              </div>
            </div>
          </div>

          {/* FAQ/Help Card */}
          <div className="bg-indigo-50 rounded-[32px] p-8 border border-indigo-100 group cursor-pointer hover:bg-indigo-100 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-circle-question"></i>
              </div>
              <div>
                <h4 className="font-bold text-indigo-900 leading-none mb-1">Any Questions?</h4>
                <p className="text-xs text-indigo-600">Click for FAQ or contact support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
