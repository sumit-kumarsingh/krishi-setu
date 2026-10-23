import React, { useState } from 'react';
import {
  Wrench,
  Truck,
  ThermometerSnowflake,
  TestTube,
  CheckCircle2,
  Calendar,
  Phone,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MarketplaceModule: React.FC = () => {
  const {
    services,
    vendorProducts,
    bookings,
    addBooking,
    plots,
    language,
    currentUser,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'machinery' | 'logistics' | 'storage' | 'soil_testing' | 'inputs'>('machinery');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [targetDate, setTargetDate] = useState('2026-11-05');
  const [selectedPlotId, setSelectedPlotId] = useState(plots[0]?.id || '');
  const [bookingNotes, setBookingNotes] = useState('');
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState('');

  const currentService = services.find((s) => s.id === selectedServiceId);
  const chosenPlot = plots.find((p) => p.id === selectedPlotId) || plots[0];

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentService || !chosenPlot) return;

    addBooking({
      serviceId: currentService.id,
      serviceTitle: currentService.title,
      providerName: currentService.providerName,
      farmerId: currentUser.id,
      farmerName: currentUser.name,
      plotName: `${chosenPlot.name} (${chosenPlot.areaAcre} Acres)`,
      bookedDate: new Date().toISOString().substring(0, 10),
      targetDate,
      status: 'confirmed',
      agreedPriceInr: currentService.rateInr * 2,
      notes: bookingNotes || 'Booked directly via KrishiSetu service dispatch.',
    });

    setBookingSuccessMsg(
      language === 'kn'
        ? `${currentService.title} ಬುಕಿಂಗ್ ಯಶಸ್ವಿಯಾಗಿದೆ!`
        : `Booking confirmed for ${currentService.title}!`
    );

    setSelectedServiceId(null);
    setBookingNotes('');
    setTimeout(() => setBookingSuccessMsg(''), 5000);
  };

  const filteredServices = services.filter((s) => {
    if (activeTab === 'machinery') return s.category === 'machinery_rental';
    if (activeTab === 'logistics') return s.category === 'logistics_transport';
    if (activeTab === 'storage') return s.category === 'cold_storage' || s.category === 'warehouse';
    if (activeTab === 'soil_testing') return s.category === 'soil_testing';
    return true;
  });

  return (
    <div className="space-y-2 pb-16 md:pb-4 max-w-5xl mx-auto">
      {/* Module Title */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-sm sm:text-base font-bold text-stone-900 flex items-center gap-1.5">
            <Wrench className="w-4 h-4 text-stone-700" />
            <span>{language === 'kn' ? 'ಸೇವೆಗಳು & ಯಂತ್ರೋಪಕರಣ ಬಾಡಿಗೆ' : 'Services & Machinery'}</span>
          </h1>
          <p className="text-[10px] text-stone-500">
            {language === 'kn'
              ? 'ದೃಢೀಕೃತ ಟ್ರ್ಯಾಕ್ಟರ್, ಸಾರಿಗೆ ವಾಹನ ಮತ್ತು ಶೈತ್ಯಾಗಾರ ಸೇವೆಗಳು'
              : 'Verified local machinery, farm transport & cold storage'}
          </p>
        </div>
      </div>

      {bookingSuccessMsg && (
        <div className="p-2 bg-stone-100/80 border border-stone-300 text-stone-950 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-stone-700 shrink-0" />
          <span>{bookingSuccessMsg}</span>
        </div>
      )}

      {/* Category Tabs (Horizontal pills, no-scroll friendly) */}
      <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl border border-stone-200 overflow-x-auto text-xs font-semibold">
        {[
          { id: 'machinery', labelEn: 'Machinery', labelKn: 'ಯಂತ್ರೋಪಕರಣ' },
          { id: 'logistics', labelEn: 'Transport', labelKn: 'ಸಾರಿಗೆ ವಾಹನ' },
          { id: 'storage', labelEn: 'Cold Storage', labelKn: 'ಕೋಲ್ಡ್ ಸ್ಟೋರೇಜ್' },
          { id: 'soil_testing', labelEn: 'Soil Lab', labelKn: 'ಮಣ್ಣು ಲ್ಯಾಬ್' },
          { id: 'inputs', labelEn: 'Tools & Feeds', labelKn: 'ಪಶು ಆಹಾರ & ಟೂಲ್ಸ್' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`h-7.5 px-3 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === tab.id
                ? 'bg-stone-900 text-white font-bold shadow-xs'
                : 'text-stone-700 hover:text-stone-950 hover:bg-white'
            }`}
          >
            {language === 'kn' ? tab.labelKn : tab.labelEn}
          </button>
        ))}
      </div>

      {/* Service Listings or Products Grid */}
      {activeTab !== 'inputs' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {filteredServices.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-xl p-2.5 border border-stone-200 shadow-2xs space-y-2 hover:border-stone-400"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-xs text-stone-900">
                    {language === 'kn' ? srv.titleKn : srv.title}
                  </h3>
                  <div className="text-[10px] text-stone-500 font-medium">
                    {srv.providerName} · {srv.district}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-extrabold text-stone-700 font-mono">
                    ₹{srv.rateInr}
                  </div>
                  <span className="text-[9px] text-stone-500">{srv.rateBasis}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] pt-1 border-t border-stone-200">
                <span className="text-stone-900 flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-3 h-3 text-stone-700" />
                  Verified Operator
                </span>

                <button
                  type="button"
                  onClick={() => setSelectedServiceId(srv.id)}
                  className="h-7 px-2.5 rounded-lg text-[11px] font-bold bg-stone-900 text-white hover:bg-stone-800 cursor-pointer"
                >
                  {language === 'kn' ? 'ಬುಕ್ ಮಾಡಿ' : 'Book Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {vendorProducts
            .filter((p) => p.category !== 'seeds')
            .map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-2.5 border border-stone-200 shadow-2xs space-y-1 text-xs"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-xs text-stone-900">{item.name}</h4>
                    <span className="text-[10px] text-stone-500">{item.vendorName} · {item.serviceTaluks.join(', ')}</span>
                  </div>
                  <span className="font-mono font-extrabold text-xs text-stone-700">
                    ₹{item.priceInr}/{item.unit}
                  </span>
                </div>
                <p className="text-[10px] text-stone-600">{item.varietyOrModel || item.packSize}</p>
              </div>
            ))}
        </div>
      )}

      {/* Booking Modal / Dialog */}
      {selectedServiceId && currentService && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white rounded-2xl max-w-sm w-full p-3.5 border border-stone-200 shadow-xl space-y-2.5">
            <div className="flex items-center justify-between border-b border-stone-200 pb-1.5">
              <h3 className="font-bold text-xs text-stone-900">
                {language === 'kn' ? 'ಸೇವೆ ಕಾಯ್ದಿರಿಸಿ' : 'Confirm Service Booking'}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedServiceId(null)}
                className="text-stone-400 hover:text-stone-600 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="text-xs space-y-1">
              <div className="font-semibold text-stone-900">{currentService.title}</div>
              <div className="text-[10px] text-stone-500">Provider: {currentService.providerName}</div>
              <div className="font-mono font-bold text-stone-700 text-xs">Rate: {currentService.rateBasis}</div>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-2 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-stone-700 mb-0.5">Select Farm Plot:</label>
                <select
                  value={selectedPlotId}
                  onChange={(e) => setSelectedPlotId(e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-stone-200 rounded-lg bg-stone-50"
                >
                  {plots.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.areaAcre} Acres)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-700 mb-0.5">Target Work Date:</label>
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-stone-200 rounded-lg bg-stone-50"
                />
              </div>

              <div className="flex items-center justify-end gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedServiceId(null)}
                  className="px-2.5 py-1 text-xs rounded-lg border border-stone-300 text-stone-600 hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 text-xs font-bold rounded-lg bg-stone-900 text-white hover:bg-stone-800 cursor-pointer"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
