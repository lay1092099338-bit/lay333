
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventActivity, EventStatus } from '../types';
import StudioModelSelectionModal from './StudioModelSelectionModal';

interface EventCardProps {
  event: EventActivity;
  showStudioJoin?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, showStudioJoin }) => {
  const navigate = useNavigate();
  const [isStudioModalOpen, setIsStudioModalOpen] = useState(false);
  const [isJoined, setIsJoined] = useState(event.joined);
  const [isJoining, setIsJoining] = useState(false);

  const getStatusColor = (status: EventStatus) => {
    switch (status) {
      case EventStatus.ONGOING: return 'bg-green-500';
      case EventStatus.UPCOMING: return 'bg-blue-500';
      case EventStatus.TESTING: return 'bg-purple-500';
      case EventStatus.COMPLETED: return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const handleStudioJoinTrigger = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsStudioModalOpen(true);
  };

  const handleIndividualJoin = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isJoined || isJoining || event.status === EventStatus.COMPLETED) {
      navigate(`/event/${event.id}`);
      return;
    }
    
    setIsJoining(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setIsJoined(true);
    setIsJoining(false);
    navigate(`/event/${event.id}`);
  };

  const handleCardClick = () => {
    navigate(`/event/${event.id}`);
  };

  return (
    <>
      <div 
        onClick={handleCardClick}
        className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden group relative flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
      >
        {/* Cover Image - Larger (h-56) */}
        <div className="relative h-56 overflow-hidden">
          <img 
            src={event.cover} 
            alt={event.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          <div className="absolute top-4 left-4 flex space-x-2 z-10">
            <span className={`${getStatusColor(event.status)} text-white text-[10px] font-black px-2 py-0.5 rounded uppercase shadow-lg`}>
              {event.status === EventStatus.ONGOING ? 'ONGOING' : 
               event.status === EventStatus.UPCOMING ? 'UPCOMING' : 
               event.status === EventStatus.TESTING ? 'BETA' : 'CLOSED'}
            </span>
            {isJoined && (
              <span className="bg-white/90 backdrop-blur text-pink-600 text-[10px] font-black px-2 py-0.5 rounded uppercase shadow-lg animate-pulse">
                JOINED
              </span>
            )}
          </div>

          {/* Persistent Stats Overlay (No hover needed) */}
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
             <div className="grid grid-cols-2 gap-2 text-white">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 border border-white/10">
                  <p className="text-[9px] uppercase text-gray-300 font-bold mb-0.5">Live Viewers</p>
                  <p className="text-sm font-black">{event.stats.viewers.toLocaleString()}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 border border-white/10">
                  <p className="text-[9px] uppercase text-gray-300 font-bold mb-0.5">Total Earnings</p>
                  <p className="text-sm font-black text-yellow-400">{event.stats.earningsTokens} <span className="text-[8px]">TK</span></p>
                </div>
             </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="mb-4">
            <h3 className="font-black text-gray-800 text-xl tracking-tight line-clamp-1">{event.name}</h3>
          </div>
          
          <div className="space-y-4 flex-1">
            <div>
              <div className="flex justify-between text-[10px] font-black mb-3 uppercase tracking-widest">
                <span className="text-gray-400">Campaign Progress</span>
                <span className="text-pink-500">{event.currentStep} / {event.totalSteps}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                {Array.from({ length: event.totalSteps }).map((_, idx) => (
                  <React.Fragment key={idx}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border-2 transition-all duration-500 ${
                      idx < event.currentStep || (idx === 0 && isJoined && event.currentStep === 0)
                        ? 'bg-pink-500 border-pink-500 text-white shadow-lg shadow-pink-200' 
                        : idx === event.currentStep 
                          ? 'border-pink-500 bg-white'
                          : 'border-gray-100 bg-white'
                    }`}>
                      {(idx < event.currentStep || (idx === 0 && isJoined && event.currentStep === 0)) && <i className="fa-solid fa-check text-[10px]"></i>}
                    </div>
                    {idx < event.totalSteps - 1 && (
                      <div className={`flex-1 h-1 rounded-full transition-all duration-500 ${idx < event.currentStep ? 'bg-pink-500' : 'bg-gray-50'}`}></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              {event.stages.slice(0, 2).map((stage) => (
                <div key={stage.stage} className="flex items-center space-x-3 text-xs">
                  <div className={`w-4 h-4 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${stage.isCompleted ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                    {stage.isCompleted ? <i className="fa-solid fa-check text-[8px]"></i> : <span className="text-[9px] font-bold">{stage.stage}</span>}
                  </div>
                  <span className={`flex-1 truncate font-medium ${stage.isCompleted ? 'text-gray-400 line-through' : 'text-gray-600'}`}>{stage.target}</span>
                  <span className={`font-black shrink-0 ${stage.isCompleted ? 'text-gray-300' : 'text-yellow-600'}`}>+{stage.rewardAmount} LC</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-3">
            {showStudioJoin && !isJoined && (
              <button 
                onClick={handleStudioJoinTrigger}
                className="w-full py-3 rounded-2xl font-black text-xs transition-all flex items-center justify-center space-x-2 border-2 border-indigo-100 text-indigo-500 hover:bg-indigo-50 active:scale-95"
              >
                <i className="fa-solid fa-users-rectangle"></i>
                <span>STUDIO BATCH JOIN</span>
              </button>
            )}
            
            <button 
              onClick={handleIndividualJoin}
              disabled={isJoining}
              className={`w-full py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center space-x-2 tracking-widest uppercase ${
                isJoined 
                  ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                  : 'tech-gradient text-white shadow-xl shadow-pink-200 hover:scale-105 active:scale-95'
              } ${isJoining ? 'opacity-70 cursor-wait' : ''}`}
            >
              {isJoining ? (
                <i className="fa-solid fa-circle-notch fa-spin"></i>
              ) : isJoined ? (
                'VIEW PROGRESS'
              ) : (
                'JOIN NOW'
              )}
            </button>
          </div>
        </div>
      </div>

      {isStudioModalOpen && (
        <StudioModelSelectionModal 
          event={event}
          onClose={() => setIsStudioModalOpen(false)}
          onSuccess={() => setIsJoined(true)}
        />
      )}
    </>
  );
};

export default EventCard;
