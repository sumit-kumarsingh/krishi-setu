import React, { useState } from 'react';
import { X, Mic, Camera, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface LogActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogActivityModal: React.FC<LogActivityModalProps> = ({ isOpen, onClose }) => {
  const { cropPlans, addActivity, language, startVoiceListening, isListening } = useApp();

  const [selectedPlanId, setSelectedPlanId] = useState(cropPlans[0]?.id || '');
  const [title, setTitle] = useState('');
  const [titleKn, setTitleKn] = useState('');
  const [category, setCategory] = useState<'irrigation' | 'fertilizer' | 'pest_control' | 'weeding' | 'harvest' | 'scouting'>('fertilizer');
  const [costInr, setCostInr] = useState(1500);
  const [notes, setNotes] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);

  if (!isOpen) return null;

  const handleVoiceNote = () => {
    startVoiceListening((transcript) => {
      setNotes((prev) => (prev ? prev + ' ' + transcript : transcript));
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title && !titleKn) return;

    addActivity({
      cropPlanId: selectedPlanId,
      date: new Date().toISOString().substring(0, 10),
      title: title || 'Field Activity',
      titleKn: titleKn || 'ಜಮೀನಿನ ಕೆಲಸ',
      category,
      notes,
      costInr: Number(costInr),
      completed: true,
      hasPhoto,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-xl border border-stone-200 text-xs overflow-hidden">
        {/* Header */}
        <div className="bg-stone-900 text-white px-4 py-3 flex items-center justify-between">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-white">
              {language === 'kn' ? 'ಜಮೀನಿನ ಕೆಲಸ ದಾಖಲಿಸಿ' : 'Log Field Activity'}
            </h2>
            <p className="text-[10px] text-stone-200">
              Track farm operations, labor, and expenses
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-stone-200 hover:text-white rounded min-h-[32px] min-w-[32px] flex items-center justify-center cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-3.5 space-y-2.5">
          <div>
            <label className="block text-[10px] font-bold text-stone-700 mb-0.5">Associated Crop</label>
            <select
              value={selectedPlanId}
              onChange={(e) => setSelectedPlanId(e.target.value)}
              className="w-full px-2 py-1 text-xs border border-stone-200 rounded-lg bg-stone-50"
            >
              {cropPlans.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.cropName} ({p.plotName})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] font-bold text-stone-700 mb-0.5">Task Title (English)</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Weeding & Bio-spray"
                className="w-full px-2 py-1 text-xs border border-stone-200 rounded-lg bg-stone-50"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-stone-700 mb-0.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-2 py-1 text-xs border border-stone-200 rounded-lg bg-stone-50"
              >
                <option value="fertilizer">Fertilizer / Nutrition</option>
                <option value="pest_control">Pest & Disease Control</option>
                <option value="irrigation">Irrigation</option>
                <option value="weeding">Weeding</option>
                <option value="harvest">Harvest</option>
                <option value="scouting">Scouting</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-stone-700 mb-0.5">Cost Incurred (₹)</label>
            <input
              type="number"
              value={costInr}
              onChange={(e) => setCostInr(Number(e.target.value))}
              className="w-full px-2 py-1 text-xs border border-stone-200 rounded-lg bg-stone-50 font-mono font-bold"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-0.5">
              <label className="text-[10px] font-bold text-stone-700">Notes / Observation</label>
              <button
                type="button"
                onClick={handleVoiceNote}
                className="text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 text-stone-700 bg-stone-50 border border-stone-200 cursor-pointer"
              >
                <Mic className="w-3 h-3" />
                <span>{isListening ? 'Listening...' : 'Voice Dictate'}</span>
              </button>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="e.g. Applied in early morning; good moisture in furrow."
              className="w-full px-2 py-1 text-xs border border-stone-200 rounded-lg bg-stone-50"
            />
          </div>

          <div className="pt-1 flex items-center justify-end gap-2 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 text-xs text-stone-600 hover:text-stone-900 rounded-lg cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-lg cursor-pointer shadow-2xs"
            >
              Save Activity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
