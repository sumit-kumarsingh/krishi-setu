import React, { useState } from 'react';
import {
  Package,
  Search,
  Truck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Download,
  RotateCcw,
  HelpCircle,
  MapPin,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_FARMER_ORDERS, FarmerOrder } from '../data/mockOrdersData';

export const OrdersModule: React.FC = () => {
  const { language, setActiveTab } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'delivered' | 'in_progress'>('all');
  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState<FarmerOrder | null>(null);

  const filteredOrders = MOCK_FARMER_ORDERS.filter((ord) => {
    const matchesSearch =
      ord.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.vendorName.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedFilter === 'delivered') return ord.status === 'delivered';
    if (selectedFilter === 'in_progress') return ord.status === 'out_for_delivery' || ord.status === 'shipped';
    return true;
  });

  return (
    <div className="space-y-4 pb-20 md:pb-6 max-w-5xl mx-auto">
      {/* Top Banner with Agricultural Photography (Pure White Theme) */}
      <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-xs">
        <div className="h-28 sm:h-36 w-full relative">
          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1400&q=80"
            alt="Farm logistics and harvest"
            className="w-full h-full object-cover object-center filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/40 to-transparent" />
          <div className="absolute bottom-3 left-4 sm:left-6 text-white space-y-0.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
              Flipkart-Style Farm Commerce
            </span>
            <h1 className="text-lg sm:text-2xl font-black tracking-tight">
              {language === 'kn' ? 'ನನ್ನ ಆರ್ಡರ್‌ಗಳು & ಬುಕಿಂಗ್‌ಗಳು' : language === 'hi' ? 'मेरे ऑर्डर्स और बुकिंग' : 'My Orders & Farm Deliveries'}
            </h1>
            <p className="text-xs text-stone-200">
              {language === 'kn'
                ? 'ಬೀಜ, ಗೊಬ್ಬರ, ಟ್ರ್ಯಾಕ್ಟರ್ ಬಾಡಿಗೆ ಮತ್ತು ವಾಹನ ಸಾರಿಗೆಯ ನೇರ ಮಾಹಿತಿ'
                : language === 'hi'
                ? 'बीज, खाद, ट्रैक्टर किराए और उपज परिवहन की लाइव ट्रैकिंग'
                : 'Real-time tracking for seed deliveries, machinery rentals, and farm logistics'}
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar & Status Filters */}
      <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              language === 'kn'
                ? 'ಆರ್ಡರ್ ಅಥವಾ ವಸ್ತು ಹುಡುಕಿ (ಬೀಜ, ಟ್ರ್ಯಾಕ್ಟರ್, ಗೊಬ್ಬರ)...'
                : language === 'hi'
                ? 'ऑर्डर या सामग्री खोजें (बीज, ट्रैक्टर, खाद)...'
                : 'Search your orders (Seeds, Tractor, Fertilizers, Logistics)...'
            }
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border border-stone-200 bg-stone-50 hover:bg-white focus:bg-white focus:border-stone-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 text-xs font-semibold overflow-x-auto shrink-0">
          {[
            { id: 'all', labelEn: 'All Orders', labelKn: 'ಎಲ್ಲಾ ಆರ್ಡರ್', labelHi: 'सभी ऑर्डर्स' },
            { id: 'in_progress', labelEn: 'On The Way', labelKn: 'ದಾರಿಯಲ್ಲಿದೆ', labelHi: 'रास्ते में है' },
            { id: 'delivered', labelEn: 'Delivered', labelKn: 'ತಲುಪಿಸಲಾಗಿದೆ', labelHi: 'पहुंचा दिया गया' },
          ].map((flt) => (
            <button
              key={flt.id}
              type="button"
              onClick={() => setSelectedFilter(flt.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedFilter === flt.id
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-950'
              }`}
            >
              {language === 'kn' ? flt.labelKn : language === 'hi' ? flt.labelHi : flt.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List (Flipkart Style Cards) */}
      <div className="space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-stone-200 space-y-3">
            <Package className="w-12 h-12 mx-auto text-stone-300" />
            <h3 className="font-extrabold text-stone-800 text-sm">
              {language === 'kn' ? 'ಯಾವುದೇ ಆರ್ಡರ್ ಕಂಡುಬಂದಿಲ್ಲ' : language === 'hi' ? 'कोई ऑर्डर नहीं मिला' : 'No orders found matching your search'}
            </h3>
            <button
              type="button"
              onClick={() => setActiveTab('services')}
              className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 cursor-pointer shadow-xs"
            >
              {language === 'kn' ? 'ಹೊಸ ಸೇವೆಗಳನ್ನು ಬುಕ್ ಮಾಡಿ' : language === 'hi' ? 'सेवाएं या बीज बुक करें' : 'Explore Agri Services & Seeds'}
            </button>
          </div>
        ) : (
          filteredOrders.map((ord) => {
            const isDelivered = ord.status === 'delivered';
            const isOutForDelivery = ord.status === 'out_for_delivery';
            const statusLabel =
              language === 'kn' ? ord.statusLabelKn : language === 'hi' ? ord.statusLabelHi : ord.statusLabelEn;
            const title =
              language === 'kn' ? ord.titleKn : language === 'hi' ? ord.titleHi : ord.title;

            return (
              <div
                key={ord.id}
                className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-4 hover:border-stone-300 transition-all"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-stone-500">
                      {ord.orderNumber}
                    </span>
                    <span className="text-stone-300">·</span>
                    <span className="text-xs text-stone-600 font-medium">
                      Ordered on {ord.orderDate}
                    </span>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                        isDelivered
                          ? 'bg-emerald-100 text-emerald-800'
                          : isOutForDelivery
                          ? 'bg-blue-100 text-blue-800 animate-pulse'
                          : 'bg-stone-100 text-stone-800'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isDelivered ? 'bg-emerald-600' : isOutForDelivery ? 'bg-blue-600' : 'bg-stone-500'
                        }`}
                      />
                      <span>{statusLabel}</span>
                    </span>
                  </div>
                </div>

                {/* Main Order Body (Product Image & Info) */}
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                    <img
                      src={ord.imageUrl}
                      alt={ord.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <h3 className="font-black text-stone-950 text-sm sm:text-base leading-snug">
                      {title}
                    </h3>
                    <p className="text-xs text-stone-600 font-medium">
                      Quantity: <span className="font-bold text-stone-900">{ord.quantity}</span>
                    </p>
                    <p className="text-xs text-stone-500 truncate">
                      Provider: <span className="font-semibold text-stone-700">{ord.vendorName}</span>
                    </p>
                    <div className="flex items-center gap-1 text-xs text-stone-500 pt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="truncate">{ord.deliveryAddress}</span>
                    </div>
                  </div>

                  {/* Price Block */}
                  <div className="sm:text-right shrink-0 pt-1 sm:pt-0">
                    <div className="text-lg sm:text-xl font-black font-mono text-stone-950">
                      ₹{ord.priceInr.toLocaleString()}
                    </div>
                    <span className="text-[11px] text-stone-500 font-medium">
                      {isDelivered ? 'Paid via UPI / KCC' : 'Pay on Delivery / Escrow'}
                    </span>
                  </div>
                </div>

                {/* Tracking Stepper (Flipkart Style Progress Line) */}
                <div className="pt-2 border-t border-stone-100">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {ord.trackingSteps.map((step, sIdx) => (
                      <div key={sIdx} className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                              step.completed
                                ? 'bg-emerald-600 text-white'
                                : 'bg-stone-200 text-stone-500'
                            }`}
                          >
                            {step.completed ? '✓' : sIdx + 1}
                          </div>
                          <span
                            className={`text-[11px] font-bold truncate ${
                              step.completed ? 'text-stone-900' : 'text-stone-400'
                            }`}
                          >
                            {step.title}
                          </span>
                        </div>
                        <div className="text-[10px] font-mono text-stone-400 pl-5">
                          {step.date}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => alert(`Official GST Invoice for ${ord.orderNumber} downloaded.`)}
                      className="h-8 px-3 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 text-xs font-bold text-stone-800 flex items-center gap-1.5 cursor-pointer shadow-2xs transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-stone-600" />
                      <span>{language === 'kn' ? 'ಇನ್‌ವಾಯ್ಸ್ ರಸೀದಿ' : language === 'hi' ? 'रसीद डाउनलोड' : 'Download Invoice'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => alert(`Support helpline connected for ${ord.orderNumber}. Driver / RSK Officer alerted.`)}
                      className="h-8 px-3 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-xs font-bold text-stone-600 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>{language === 'kn' ? 'ಸಹಾಯ' : language === 'hi' ? 'सहायता' : 'Need Help?'}</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('services');
                    }}
                    className="h-8 px-3.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{language === 'kn' ? 'ಮತ್ತೆ ಆರ್ಡರ್ ಮಾಡಿ' : language === 'hi' ? 'पुनः ऑर्डर करें' : 'Buy / Book Again'}</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
