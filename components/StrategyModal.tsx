
import React from 'react';

interface StrategyModalProps {
  onClose: () => void;
}

const StrategyModal: React.FC<StrategyModalProps> = ({ onClose }) => {
  const rules = [
    {
      title: 'How to Earn?',
      desc: 'Enroll in any campaign in the Event Plaza and complete tiered missions. Tasks include stream duration, earnings targets, and follower growth.',
      icon: 'fa-gift'
    },
    {
      title: 'Reward Units',
      desc: 'Campaign progress is tracked in Tokens; rewards are paid in Lovense Cash (LC). LC is pegged 1:1 with USD.',
      icon: 'fa-coins'
    },
    {
      title: 'Using Lovense Cash',
      desc: 'LC cannot be withdrawn directly but can be used like USD at the Lovense Official Store or exchanged for stream exposure packs.',
      icon: 'fa-store'
    },
    {
      title: 'Studio Privileges',
      desc: 'Studio admins can use the "Batch Join" feature to enroll multiple models in a campaign simultaneously for maximum impact.',
      icon: 'fa-users-gear'
    }
  ];

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-3xl rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-10 border-b relative">
          <button onClick={onClose} className="absolute top-8 right-8 text-gray-400 hover:text-gray-600 transition-colors">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
          <div className="flex items-center space-x-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-pink-500 flex items-center justify-center text-white text-2xl shadow-lg">
              <i className="fa-solid fa-scroll"></i>
            </div>
            <h3 className="text-3xl font-black text-gray-800 tracking-tight">Campaign Guide</h3>
          </div>
          <p className="text-gray-400">Learn how to maximize your earnings and influence through official events.</p>
        </div>

        <div className="p-10 overflow-y-auto bg-gray-50/50 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rules.map((rule, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start space-x-4 transition-transform hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-pink-500 shrink-0">
                  <i className={`fa-solid ${rule.icon} text-lg`}></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2 uppercase text-sm tracking-tight">{rule.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{rule.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-indigo-900 rounded-2xl p-8 text-white">
            <h4 className="font-bold text-lg mb-4 flex items-center uppercase tracking-widest">
              <i className="fa-solid fa-circle-exclamation text-yellow-400 mr-2"></i>
              Important Notes
            </h4>
            <ul className="space-y-3 text-sm text-indigo-100">
              <li className="flex items-start">
                <span className="mr-2 opacity-50">•</span>
                <span>Each event has a deadline. Missions must be completed before the campaign ends to receive rewards.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 opacity-50">•</span>
                <span>LC rewards are typically credited to your wallet within 24 hours of mission completion.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 opacity-50">•</span>
                <span>Any form of cheating is strictly prohibited and will result in disqualification and forfeiture of rewards.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="p-8 bg-white border-t flex justify-center">
          <button 
            onClick={onClose}
            className="bg-gray-900 text-white px-12 py-3 rounded-xl font-black hover:bg-gray-800 transition-all shadow-lg active:scale-95 uppercase tracking-widest"
          >
            I Understand the Rules
          </button>
        </div>
      </div>
    </div>
  );
};

export default StrategyModal;