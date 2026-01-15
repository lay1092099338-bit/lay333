
import React, { useState } from 'react';

interface TrafficModalProps {
  onClose: () => void;
  balance: number;
}

const TrafficModal: React.FC<TrafficModalProps> = ({ onClose, balance }) => {
  const [selectedPack, setSelectedPack] = useState(1);
  const packs = [
    { id: 1, name: 'Starter Exposure Pack', price: 10, views: '2,000', icon: 'fa-paper-plane', color: 'bg-blue-500' },
    { id: 2, name: 'Hot Featured Pack', price: 50, views: '12,000', icon: 'fa-fire', color: 'bg-orange-500', badge: 'MOST POPULAR' },
    { id: 3, name: 'Super Growth Pack', price: 200, views: '50,000', icon: 'fa-rocket', color: 'bg-purple-600' },
  ];

  const handlePurchase = () => {
    const pack = packs.find(p => p.id === selectedPack);
    if (pack && balance < pack.price) {
      alert('Insufficient Lovense Cash balance! Join more campaigns to earn rewards.');
      return;
    }
    alert(`Purchase Successful! Your ${pack?.name} is ready for activation in your inventory.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-xl font-black flex items-center uppercase tracking-tight">
            <i className="fa-solid fa-bolt text-yellow-500 mr-2"></i>
            Stream Exposure Packs
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><i className="fa-solid fa-xmark"></i></button>
        </div>
        
        <div className="p-8">
          <div className="mb-6 bg-pink-50 p-4 rounded-xl flex justify-between items-center">
            <span className="text-pink-600 font-bold uppercase text-xs tracking-widest">Current Lovense Cash Balance</span>
            <span className="text-pink-700 font-black text-xl">${balance.toFixed(2)}</span>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-8">
            {packs.map(pack => (
              <div 
                key={pack.id}
                onClick={() => setSelectedPack(pack.id)}
                className={`relative p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                  selectedPack === pack.id ? 'border-pink-500 bg-pink-50/30' : 'border-gray-100 hover:border-pink-200'
                }`}
              >
                {pack.badge && (
                  <span className="absolute -top-3 left-4 bg-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">
                    {pack.badge}
                  </span>
                )}
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl ${pack.color} flex items-center justify-center text-white text-xl shadow-lg`}>
                    <i className={`fa-solid ${pack.icon}`}></i>
                  </div>
                  <div>
                    <h4 className="font-black text-gray-800 uppercase text-sm tracking-tight">{pack.name}</h4>
                    <p className="text-xs text-gray-500">Est. boost <span className="text-pink-600 font-black">{pack.views}</span> views</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-gray-900">${pack.price}</p>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Lovense Cash</p>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={handlePurchase}
            className="w-full tech-gradient text-white font-black py-4 rounded-2xl shadow-xl shadow-pink-200 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest"
          >
            Redeem Pack Now
          </button>
          
          <p className="text-center text-[10px] text-gray-400 mt-4 px-8">
            Purchased packs are stored in your "Traffic Card Vault" and can be manually activated at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrafficModal;
