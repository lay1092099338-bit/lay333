
import React, { useState, useMemo } from 'react';
import { EventActivity, StudioModel } from '../types';
import { MOCK_STUDIO_MODELS } from '../constants';

interface StudioModelSelectionModalProps {
  event: EventActivity;
  onClose: () => void;
  onSuccess?: () => void;
}

const StudioModelSelectionModal: React.FC<StudioModelSelectionModalProps> = ({ event, onClose, onSuccess }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableModels = useMemo(() => {
    return MOCK_STUDIO_MODELS.filter(m => 
      m.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const toggleModelSelection = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const toggleSelectAll = () => {
    const joinableModels = availableModels.filter(m => m.isAvailable);
    if (selectedIds.size === joinableModels.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(joinableModels.map(m => m.id)));
    }
  };

  const handleBatchJoin = async () => {
    if (selectedIds.size === 0) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert(`Success! Successfully enrolled ${selectedIds.size} models in: ${event.name}`);
    setIsSubmitting(false);
    onSuccess?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/70 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-8 border-b bg-gray-50/50">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center text-white text-2xl shadow-lg">
                <i className="fa-solid fa-users-rectangle"></i>
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-800 uppercase tracking-tight">Studio Batch Enrollment</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Campaign: <span className="font-bold text-indigo-600 uppercase">{event.name}</span>
                </p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>

          {/* Search & Select All */}
          <div className="mt-8 flex items-center space-x-4">
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="Search model name..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
            <button 
              onClick={toggleSelectAll}
              className="text-xs font-black text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap uppercase tracking-widest"
            >
              {selectedIds.size === availableModels.filter(m => m.isAvailable).length ? 'Deselect All' : 'Select Available'}
            </button>
          </div>
        </div>

        {/* Model List */}
        <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableModels.map((model) => (
            <div 
              key={model.id}
              onClick={() => model.isAvailable && toggleModelSelection(model.id)}
              className={`flex items-center space-x-3 p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                !model.isAvailable 
                  ? 'opacity-50 cursor-not-allowed border-gray-50 bg-gray-50' 
                  : selectedIds.has(model.id)
                    ? 'border-indigo-500 bg-indigo-50/50'
                    : 'border-gray-100 hover:border-indigo-200'
              }`}
            >
              <div className="relative">
                <img src={model.avatar} alt={model.name} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                {selectedIds.has(model.id) && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-indigo-500 rounded-full border-2 border-white flex items-center justify-center text-[8px] text-white">
                    <i className="fa-solid fa-check"></i>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-800 truncate">{model.name}</p>
                <p className={`text-[10px] uppercase font-black ${model.isAvailable ? 'text-green-500' : 'text-gray-400'}`}>
                  {model.isAvailable ? 'Available' : 'Already Active'}
                </p>
              </div>
              {model.isAvailable && (
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  selectedIds.has(model.id) ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-gray-200'
                }`}>
                  {selectedIds.has(model.id) && <i className="fa-solid fa-check text-[10px]"></i>}
                </div>
              )}
            </div>
          ))}
          {availableModels.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-400">
              <i className="fa-solid fa-user-slash text-3xl mb-2"></i>
              <p>No matching models found</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-8 border-t bg-gray-50/50 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-500 font-medium">Selected <span className="text-indigo-600 font-black text-lg">{selectedIds.size}</span> Models</p>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5 font-black">Est. total exposure boost +15%</p>
          </div>
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <button 
              onClick={onClose}
              className="flex-1 md:flex-none px-8 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-200 transition-all uppercase text-sm"
            >
              Cancel
            </button>
            <button 
              onClick={handleBatchJoin}
              disabled={selectedIds.size === 0 || isSubmitting}
              className={`flex-1 md:flex-none px-12 py-3 rounded-xl font-black shadow-xl transition-all flex items-center justify-center space-x-2 uppercase text-sm ${
                selectedIds.size === 0 || isSubmitting
                  ? 'bg-gray-300 text-white cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 active:scale-95 shadow-indigo-200'
              }`}
            >
              {isSubmitting ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin"></i>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-bolt"></i>
                  <span>Confirm Batch Join</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudioModelSelectionModal;
