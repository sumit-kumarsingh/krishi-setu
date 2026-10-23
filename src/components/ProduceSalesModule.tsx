import React, { useState } from 'react';
import {
  Store,
  Plus,
  Scale,
  TrendingUp,
  Clock,
  ArrowRight,
  CheckCircle2,
  XCircle,
  MessageSquare,
  AlertCircle,
  Building2,
  Globe2,
  Sparkles,
  QrCode,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MANDI_REFERENCE_PRICES } from '../data/mockKarnatakaData';

interface ProduceSalesModuleProps {
  onOpenProduceModal: () => void;
}

export const ProduceSalesModule: React.FC<ProduceSalesModuleProps> = ({ onOpenProduceModal }) => {
  const {
    produceLots,
    offers,
    acceptOffer,
    declineOffer,
    counterOffer,
    auctionBids,
    placeBid,
    transactions,
    language,
    currentUser,
    setIsYieldReadyModalOpen,
    setIsTraceabilityModalOpen,
  } = useApp();

  const [counterModalOfferId, setCounterModalOfferId] = useState<string | null>(null);
  const [counterPrice, setCounterPrice] = useState(3800);
  const [customBidAmount, setCustomBidAmount] = useState(3750);
  const [activeSubTab, setActiveSubTab] = useState<'lots_and_offers' | 'live_auction' | 'mandi_rates' | 'settlement_history'>('mandi_rates');

  const activeAuctionLot = produceLots.find((l) => l.listingType === 'digital_auction') || produceLots[0];

  const handlePlaceTestBid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAuctionLot) return;
    placeBid(
      activeAuctionLot.id,
      currentUser.role === 'buyer_exporter' ? currentUser.name : 'Venkateshwara Grain Traders',
      'APMC Registered Trader',
      Number(customBidAmount)
    );
  };

  const handleCounterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (counterModalOfferId) {
      counterOffer(counterModalOfferId, Number(counterPrice));
      setCounterModalOfferId(null);
    }
  };

  return (
    <div className="space-y-2 pb-16 md:pb-4 max-w-5xl mx-auto">
      {/* Title & Top Action */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-sm sm:text-base font-bold text-stone-900 flex items-center gap-1.5">
            <Store className="w-4 h-4 text-stone-700" />
            <span>{language === 'kn' ? 'ಮಂಡಿ, ಇ-ಹರಾಜು & ಮಾರಾಟ' : 'APMC Mandi & Crop Sales'}</span>
          </h1>
          <p className="text-[10px] text-stone-500">
            {language === 'kn'
              ? 'ದೈನಂದಿನ ಎಪಿಎಂಸಿ ದರಗಳು & ನೇರ ಖರೀದಿದಾರರ ಆಫರ್‌ಗಳು'
              : 'Daily Mandi rates & direct buyer bids'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsYieldReadyModalOpen(true)}
            className="h-7 px-2.5 rounded-lg text-[11px] font-bold text-white bg-stone-900 hover:bg-stone-800 flex items-center gap-1 cursor-pointer shadow-xs transition-colors"
          >
            <Sparkles className="w-3 h-3 fill-current" />
            <span>{language === 'kn' ? 'ಇಳುವರಿ ಸಿದ್ಧ' : 'Yield Ready'}</span>
          </button>

          <button
            type="button"
            onClick={onOpenProduceModal}
            className="h-7 px-2.5 rounded-lg text-[11px] font-bold text-stone-800 bg-white hover:bg-stone-50 border border-stone-200 flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3 h-3 text-stone-700" />
            <span>{language === 'kn' ? 'ಮಾರಾಟ ಲಾಟ್' : 'Create Lot'}</span>
          </button>
        </div>
      </div>

      {/* Distress Sale Prevention: e-NWR Pledge Loans & Escrow Card */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
        <div className="flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-stone-700 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-stone-950 flex items-center gap-2">
              <span>{language === 'kn' ? 'ತುರ್ತು ಮಾರಾಟ ತಡೆ: e-NWR ಉಗ್ರಾಣ ಸಾಲ' : 'Stop Distress Selling: e-NWR Warehouse Pledge Loans'}</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-stone-100 text-stone-950 border border-stone-200">
                7% KCC Interest
              </span>
            </div>
            <p className="text-[11px] text-stone-600 leading-snug mt-0.5">
              {language === 'kn'
                ? 'ಕೊಯ್ಲಿನ ಸಮಯದಲ್ಲಿ ಬೆಲೆ ಕುಸಿದಾಗ ತಕ್ಷಣ ಮಾರಾಟ ಮಾಡಬೇಡಿ. WDRA ಉಗ್ರಾಣದಲ್ಲಿ ದಾಸ್ತಾನು ಮಾಡಿ 75% ಮುಂಗಡ ಹಣ ಪಡೆಯಿರಿ.'
                : 'Deposit harvested Tur / Ragi into WDRA warehouses, receive up to 75% instant bank advance via Jan Samarth, and sell when prices surge.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsTraceabilityModalOpen(true)}
          className="h-7 px-2.5 rounded-lg text-[11px] font-bold text-stone-900 bg-white hover:bg-stone-100 border border-stone-300 flex items-center justify-center gap-1 cursor-pointer shrink-0"
        >
          <QrCode className="w-3 h-3 text-stone-700" />
          <span>{language === 'kn' ? 'ಕ್ಯೂಆರ್ ಪಾಸ್‌ಪೋರ್ಟ್' : 'Traceability QR'}</span>
        </button>
      </div>

      {/* Sub Tabs: In-place without scrolling */}
      <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl border border-stone-200 overflow-x-auto text-xs font-semibold">
        {[
          { id: 'mandi_rates', labelEn: 'Mandi Rates', labelKn: 'ಮಂಡಿ ದರ' },
          { id: 'lots_and_offers', labelEn: 'My Lots & Offers', labelKn: 'ಲಾಟ್ & ಆಫರ್' },
          { id: 'live_auction', labelEn: 'e-Auction Yard', labelKn: 'ಇ-ಹರಾಜು' },
          { id: 'settlement_history', labelEn: 'Settlements', labelKn: 'ಹಣಪಾವತಿ' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`flex-1 h-7.5 rounded-lg whitespace-nowrap px-2.5 text-center cursor-pointer transition-colors ${
              activeSubTab === tab.id
                ? 'bg-stone-900 text-white font-bold shadow-xs'
                : 'text-stone-700 hover:text-stone-950 hover:bg-white'
            }`}
          >
            {language === 'kn' ? tab.labelKn : tab.labelEn}
          </button>
        ))}
      </div>

      {/* 1. Mandi Rates View (Compact Grid) */}
      {activeSubTab === 'mandi_rates' && (
        <div className="space-y-1.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {MANDI_REFERENCE_PRICES.map((m, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-2.5 border border-stone-200 shadow-2xs space-y-1.5 hover:border-stone-400"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-xs text-stone-900">{m.crop}</h3>
                    <div className="text-[10px] text-stone-500">
                      {m.market} · Grade: {m.variety}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-extrabold text-sm text-stone-900">
                      ₹{m.modalPrice}/Qtl
                    </div>
                    <span className="text-[9px] text-stone-700 font-bold">▲ ₹70 vs yesterday</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1 text-[10px] pt-1 border-t border-stone-200">
                  <div className="text-stone-500">Min: <strong className="text-stone-800 font-mono">₹{m.minPrice}</strong></div>
                  <div className="text-stone-500">Max: <strong className="text-stone-800 font-mono">₹{m.maxPrice}</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Lots and Offers View */}
      {activeSubTab === 'lots_and_offers' && (
        <div className="space-y-2">
          {produceLots.map((lot) => (
            <div key={lot.id} className="bg-white rounded-xl p-2.5 border border-stone-200 shadow-2xs space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-xs text-stone-900">{lot.cropName} ({lot.variety})</h3>
                  <div className="text-[10px] text-stone-500">
                    {lot.quantityQuintals} Quintals · Grade {lot.grade} · Moisture: {lot.moisturePct}%
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] bg-stone-100 text-stone-900 px-1.5 py-0.5 rounded font-bold uppercase">
                    {lot.status}
                  </span>
                  <div className="font-mono font-bold text-xs text-stone-700 mt-0.5">
                    Ask: ₹{lot.askingPricePerQuintalInr}/Qtl
                  </div>
                </div>
              </div>

              {/* Offers on this lot */}
              <div className="pt-1 space-y-1">
                <span className="text-[10px] font-bold text-stone-700 uppercase">Received Buyer Offers:</span>
                {offers
                  .filter((o) => o.produceLotId === lot.id)
                  .map((off) => (
                    <div
                      key={off.id}
                      className="p-2 bg-stone-50 rounded-lg border border-stone-200 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-bold text-stone-900 text-xs">{off.buyerName}</div>
                        <div className="text-[10px] text-stone-500">
                          Offered: <strong className="text-stone-800 font-mono">₹{off.offeredPricePerQuintalInr}/Qtl</strong> · Net Payable: ₹{off.netPayableToFarmerInr.toLocaleString()}
                        </div>
                      </div>

                      {off.status === 'pending' ? (
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => acceptOffer(off.id)}
                            className="px-2 py-1 rounded bg-stone-900 text-white font-bold text-[10px] hover:bg-stone-800 cursor-pointer"
                          >
                            Accept
                          </button>
                          <button
                            type="button"
                            onClick={() => setCounterModalOfferId(off.id)}
                            className="px-2 py-1 rounded bg-white border border-stone-300 text-stone-900 font-bold text-[10px] hover:bg-stone-100 cursor-pointer"
                          >
                            Counter
                          </button>
                          <button
                            type="button"
                            onClick={() => declineOffer(off.id)}
                            className="px-1.5 py-1 rounded text-stone-500 hover:text-red-700 text-[10px] cursor-pointer"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] font-bold uppercase text-stone-800 bg-stone-100 px-1.5 py-0.5 rounded">
                          {off.status}
                        </span>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. Live Auction Yard */}
      {activeSubTab === 'live_auction' && activeAuctionLot && (
        <div className="bg-white rounded-xl p-3 border border-stone-200 shadow-2xs space-y-2 text-xs">
          <div className="flex items-center justify-between pb-1.5 border-b border-stone-200">
            <div>
              <span className="font-bold text-stone-900 text-xs">
                Live e-Auction: {activeAuctionLot.cropName} ({activeAuctionLot.quantityQuintals} Qtl)
              </span>
              <div className="text-[10px] text-stone-500">Reserve Price: ₹{activeAuctionLot.reservePricePerQuintalInr}/Qtl</div>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-stone-700 font-bold bg-stone-50 px-2 py-0.5 rounded">
              <Clock className="w-3 h-3" />
              <span>Ends in 02h:14m</span>
            </div>
          </div>

          {/* Current Highest Bid */}
          <div className="p-2 bg-stone-50 rounded-lg border border-stone-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-stone-500">Current Highest Bid:</span>
              <div className="font-extrabold text-stone-900 text-base font-mono">
                ₹{auctionBids[0]?.bidPricePerQuintalInr || 3700}/Qtl
              </div>
              <span className="text-[10px] text-stone-600">By: {auctionBids[0]?.bidderName || 'APMC Buyer'}</span>
            </div>

            <form onSubmit={handlePlaceTestBid} className="flex items-center gap-1">
              <input
                type="number"
                value={customBidAmount}
                onChange={(e) => setCustomBidAmount(Number(e.target.value))}
                className="w-20 px-2 py-1 text-xs border border-stone-300 rounded bg-white font-mono"
              />
              <button
                type="submit"
                className="px-2.5 py-1 bg-stone-900 text-white font-bold text-xs rounded hover:bg-stone-800 cursor-pointer"
              >
                Place Bid
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 4. Settlement History */}
      {activeSubTab === 'settlement_history' && (
        <div className="space-y-1.5">
          {transactions.map((tx) => (
            <div key={tx.id} className="bg-white rounded-xl p-2.5 border border-stone-200 shadow-2xs space-y-1 text-xs">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-stone-900">{tx.buyerName}</div>
                  <div className="text-[10px] text-stone-500">{tx.cropName} · {tx.finalWeightQuintals} Qtl</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-xs text-stone-700">₹{tx.netAmountPaidInr.toLocaleString()}</div>
                  <span className="text-[9px] bg-stone-100 text-stone-900 px-1 py-0.2 rounded font-bold uppercase">
                    {tx.paymentStatus}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Counter Offer Modal */}
      {counterModalOfferId && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white rounded-2xl max-w-xs w-full p-3.5 border border-stone-200 shadow-xl space-y-2 text-xs">
            <h3 className="font-bold text-stone-900">Submit Counter Offer</h3>
            <p className="text-[10px] text-stone-500">Propose your desired price per quintal:</p>
            <form onSubmit={handleCounterSubmit} className="space-y-2">
              <input
                type="number"
                value={counterPrice}
                onChange={(e) => setCounterPrice(Number(e.target.value))}
                className="w-full px-2 py-1.5 text-xs border border-stone-300 rounded-lg font-mono"
              />
              <div className="flex justify-end gap-1.5">
                <button
                  type="button"
                  onClick={() => setCounterModalOfferId(null)}
                  className="px-2 py-1 text-xs rounded border border-stone-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 text-xs font-bold bg-stone-900 text-white rounded"
                >
                  Send Counter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
