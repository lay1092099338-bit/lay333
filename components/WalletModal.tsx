
import React from 'react';
import { CashTransaction } from '../types';

interface WalletModalProps {
  onClose: () => void;
  balance: number;
  transactions: CashTransaction[];
  onBuyTraffic: () => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ onClose, balance, transactions, onBuyTraffic }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="tech-gradient p-8 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
          <div className="flex items-center space-x-2 mb-1">
             <p className="text-white/80 font-medium text-sm uppercase tracking-widest">Lovense Cash Wallet</p>
             <div className="group relative">
                <i className="fa-solid fa-circle-question text-xs cursor-help"></i>
                <div className="absolute left-0 top-6 w-64 bg-black/80 p-3 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 backdrop-blur">
                  Lovense Cash is campaign reward currency, pegged 1:1 with USD. It cannot be withdrawn but can be used to buy hardware or redeem traffic packs.
                </div>
             </div>
          </div>
          <div className="flex items-end space-x-2">
            <span className="text-sm font-bold opacity-60 mb-2">$</span>
            <span className="text-4xl font-bold">{balance.toFixed(2)}</span>
            <span className="text-lg opacity-80 mb-1">LC</span>
          </div>
          
          <div className="mt-8 grid grid-cols-2 gap-4">
            <button 
              onClick={onBuyTraffic}
              className="bg-white text-pink-600 font-bold py-3 rounded-xl hover:bg-opacity-90 transition-all flex items-center justify-center space-x-2 shadow-lg"
            >
              <i className="fa-solid fa-bolt"></i>
              <span>BUY TRAFFIC</span>
            </button>
            <a 
              href="https://www.lovense.com/store" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/20 text-white border border-white/30 font-bold py-3 rounded-xl hover:bg-white/30 transition-all flex items-center justify-center space-x-2"
            >
              <i className="fa-solid fa-bag-shopping"></i>
              <span>SHOP TOYS</span>
            </a>
          </div>
        </div>

        {/* Transactions List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
          <div className="flex justify-between items-center border-b pb-2">
            <h4 className="text-gray-800 font-bold text-sm uppercase tracking-wide">Transaction History</h4>
            <span className="text-[10px] text-gray-400">LAST 30 DAYS ONLY</span>
          </div>
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-none">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  tx.type === 'income' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'
                }`}>
                  <i className={`fa-solid ${tx.type === 'income' ? 'fa-plus' : 'fa-minus'}`}></i>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{tx.source}</p>
                  <p className="text-[10px] text-gray-400">{tx.date}</p>
                </div>
              </div>
              <div className={`font-bold ${tx.type === 'income' ? 'text-green-600' : 'text-gray-800'}`}>
                {tx.type === 'income' ? '+' : '-'}{Math.abs(tx.amount).toFixed(2)}
              </div>
            </div>
          ))}
          {transactions.length === 0 && (
            <div className="text-center py-12 text-gray-300">
              <i className="fa-solid fa-receipt text-3xl mb-2"></i>
              <p>No transactions found</p>
            </div>
          )}
        </div>

        <div className="p-4 bg-gray-50 text-center border-t">
          <p className="text-[10px] text-gray-400 flex items-center justify-center space-x-1">
            <i className="fa-solid fa-shield-halved"></i>
            <span>Lovense Cash Protection Program Active</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;
