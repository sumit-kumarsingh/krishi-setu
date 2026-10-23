import React, { useState } from 'react';
import { X, Sparkles, Scale, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProduceLot } from '../types/agriculture';

interface ProduceLotModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

export const ProduceLotModal: React.FC<ProduceLotModalProps> = ({ isOpen = true, onClose }) => {
  if (!isOpen) return null;

  const { language, addProduceLot, currentUser } = useApp();

  const [cropName, setCropName] = useState('Finger Millet (Ragi)');
  const [variety, setVariety] = useState('GPU-28');
  const [quantityQuintals, setQuantityQuintals] = useState(15);
  const [askingPrice, setAskingPrice] = useState(4200);
  const [listingType, setListingType] = useState<'digital_auction' | 'apmc_mandi' | 'contract_forward'>('digital_auction');
  const [grade, setGrade] = useState<'Grade A' | 'Grade B' | 'Organic Certified'>('Grade A');
  const [moisturePct, setMoisturePct] = useState(11.5);
  const [reservePrice, setReservePrice] = useState(3800);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLot: ProduceLot = {
      id: `lot_${Date.now()}`,
      farmerId: currentUser.id,
      farmerName: currentUser.name,
      cropName,
      cropNameKn: cropName,
      variety,
      grade: 'Grade A (Export / Premium)',
      quantityQuintals,
      bagCount: Math.ceil(quantityQuintals * 2),
      harvestDate: new Date().toISOString().split('T')[0],
      taluk: currentUser.taluk || 'Mandya',
      district: currentUser.district || 'Mandya',
      organicCertified: grade === 'Organic Certified',
      apedaEligible: true,
      moisturePct,
      listingType,
      askingPricePerQuintalInr: askingPrice,
      reservePricePerQuintalInr: listingType === 'digital_auction' ? reservePrice : undefined,
      auctionEndTime: listingType === 'digital_auction' ? new Date(Date.now() + 48 * 3600 * 1000).toISOString() : undefined,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
    };

    addProduceLot(newLot);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl border border-stone-200 text-xs">
        {/* Header (Clean White / Slate) */}
        <div className="bg-stone-900 text-white px-5 py-4 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-white">
              {language === 'kn' ? 'ಬೆಳೆ ಮಾರಾಟ ಲಾಟ್ ಪ್ರಕಟಿಸಿ' : language === 'hi' ? 'फसल बिक्री लॉट दर्ज करें' : 'List Produce for Sale / Auction'}
            </h2>
            <p className="text-[11px] text-stone-300 mt-0.5">
              Direct APMC e-NAM or Digital Auction with transparent bidding
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-300 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Sale Type */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">Sale Channel:</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'digital_auction', label: 'e-Auction' },
                { id: 'apmc_mandi', label: 'APMC Yard' },
                { id: 'contract_forward', label: 'Contract' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setListingType(t.id as any)}
                  className={`py-2 px-3 rounded-xl text-center cursor-pointer border text-xs font-bold transition-colors ${
                    listingType === t.id
                      ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Crop Name</label>
              <input
                type="text"
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl bg-white text-stone-950 focus:outline-none focus:border-stone-400 font-medium"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Variety</label>
              <input
                type="text"
                value={variety}
                onChange={(e) => setVariety(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl bg-white text-stone-950 focus:outline-none focus:border-stone-400 font-medium"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Quintals</label>
              <input
                type="number"
                value={quantityQuintals}
                onChange={(e) => setQuantityQuintals(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl bg-white font-mono text-stone-950"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Moisture %</label>
              <input
                type="number"
                step="0.1"
                value={moisturePct}
                onChange={(e) => setMoisturePct(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl bg-white font-mono text-stone-950"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Ask Price (₹/Qtl)</label>
              <input
                type="number"
                value={askingPrice}
                onChange={(e) => setAskingPrice(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl bg-white font-mono font-bold text-stone-950"
                required
              />
            </div>
          </div>

          {listingType === 'digital_auction' && (
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Reserve Floor Price (₹/Qtl)</label>
              <input
                type="number"
                value={reservePrice}
                onChange={(e) => setReservePrice(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl bg-white font-mono text-stone-950"
              />
            </div>
          )}

          <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-stone-600 hover:text-stone-900 rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-xl cursor-pointer shadow-xs transition-colors"
            >
              Publish Produce Lot
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
