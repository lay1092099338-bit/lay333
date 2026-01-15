
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import EventPlaza from './components/EventPlaza';
import EventDetail from './components/EventDetail';
import ContactModal from './components/ContactModal';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('event-plaza');
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F0F2F5] text-gray-800">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 shrink-0 z-20 shadow-sm">
          <div className="flex items-center space-x-4">
             <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search events or features" 
                  className="pl-10 pr-4 py-1.5 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 w-64 transition-all"
                />
                <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
             </div>
          </div>
          <div className="flex items-center space-x-6 text-gray-500">
            <div 
              onClick={() => setIsContactOpen(true)}
              className="flex items-center space-x-2 text-indigo-500 cursor-pointer hover:text-indigo-600 transition-colors font-bold text-sm"
              title="Contact Us"
            >
              <i className="fa-solid fa-headset text-lg"></i>
              <span className="hidden sm:inline">Support</span>
            </div>
            <i className="fa-solid fa-book cursor-pointer hover:text-gray-800 transition-colors"></i>
            <i className="fa-solid fa-comment cursor-pointer hover:text-gray-800 transition-colors"></i>
            <div className="relative">
              <i className="fa-solid fa-bell cursor-pointer hover:text-gray-800 transition-colors"></i>
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white font-bold">53</span>
            </div>
            <div className="flex items-center space-x-2 border-l pl-6 cursor-pointer">
              <img src="https://i.pravatar.cc/150?u=current-user" className="w-8 h-8 rounded-full border border-gray-200" alt="profile" />
              <span className="text-sm font-bold text-gray-700">Studio Admin</span>
              <i className="fa-solid fa-chevron-down text-[10px]"></i>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <Routes>
            <Route path="/" element={<Navigate to="/plaza" replace />} />
            <Route path="/plaza" element={<EventPlaza />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="*" element={
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <i className="fa-solid fa-hammer text-5xl mb-4"></i>
                <p>Page Under Construction...</p>
                <button 
                  onClick={() => window.location.hash = '#/plaza'}
                  className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-all font-bold"
                >
                  Return to Plaza
                </button>
              </div>
            } />
          </Routes>
        </div>
      </main>

      {isContactOpen && <ContactModal onClose={() => setIsContactOpen(false)} />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
