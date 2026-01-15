
import React from 'react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: 'fa-house' },
    { id: 'cam-site', label: 'Cam Site', icon: 'fa-video', extra: 'plus' },
    { id: 'vibemate', label: 'VibeMate', icon: 'fa-heart', badge: 'New' },
    { id: 'studios', label: 'Studios', icon: 'fa-people-group' },
    { id: 'event-plaza', label: 'Event Plaza', icon: 'fa-bullhorn', highlight: true },
    { id: 'chatbox', label: 'Chatbox', icon: 'fa-comments' },
    { id: 'app-gallery', label: 'App Gallery', icon: 'fa-table-cells' },
    { id: 'visuals', label: 'Visuals', icon: 'fa-wand-magic-sparkles', hasChevron: true },
    { id: 'insights', label: 'Insights', icon: 'fa-chart-line', hasChevron: true },
  ];

  return (
    <aside className="w-64 bg-[#1E293B] text-gray-300 flex flex-col h-full shrink-0">
      <div className="p-6 flex items-center space-x-3">
        <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center">
          <i className="fa-solid fa-bolt text-white text-xl"></i>
        </div>
        <div className="leading-tight">
          <p className="font-bold text-white tracking-tight">Lovense Cam</p>
          <p className="text-[10px] text-gray-400 uppercase">Extension V31.6.0</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
        {navItems.map((item) => (
          <div key={item.id}>
            <button
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                activeTab === item.id 
                  ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-lg' 
                  : 'hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <i className={`fa-solid ${item.icon} w-5 text-center ${activeTab === item.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}></i>
                <span className="text-sm font-medium">{item.label}</span>
                {item.badge && (
                  <span className="bg-pink-500 text-[10px] px-1.5 py-0.5 rounded-md font-bold text-white uppercase">{item.badge}</span>
                )}
              </div>
              <div className="flex items-center">
                {item.extra === 'plus' && <i className="fa-solid fa-plus text-[10px] bg-pink-500/20 text-pink-500 p-1 rounded"></i>}
                {item.hasChevron && <i className={`fa-solid fa-chevron-down text-[10px] transition-transform ${activeTab === item.id ? 'rotate-180' : ''}`}></i>}
              </div>
            </button>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-gray-500">VirtualToys</span>
          <div className="w-10 h-5 bg-gray-700 rounded-full relative p-1 cursor-pointer">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-xs text-gray-500">token:</span>
          <input type="text" value="10" readOnly className="w-full bg-gray-800 rounded border border-gray-700 px-2 py-1 text-xs text-white" />
        </div>
        <div className="flex items-center justify-around text-gray-500 pt-2">
          <i className="fa-solid fa-heart hover:text-pink-500 cursor-pointer"></i>
          <i className="fa-solid fa-list hover:text-white cursor-pointer"></i>
          <i className="fa-solid fa-hashtag hover:text-white cursor-pointer"></i>
          <i className="fa-solid fa-lightbulb hover:text-yellow-400 cursor-pointer"></i>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
