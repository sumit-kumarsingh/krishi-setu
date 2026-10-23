import React, { useState } from 'react';
import {
  X,
  Bell,
  CheckCircle2,
  Truck,
  CloudSun,
  Coins,
  TrendingUp,
  Bug,
  Sparkles,
  ChevronRight,
  Trash2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NotificationItem {
  id: string;
  type: 'order' | 'weather' | 'finance' | 'mandi' | 'advisory';
  titleEn: string;
  titleKn: string;
  titleHi: string;
  descEn: string;
  descKn: string;
  descHi: string;
  time: string;
  isRead: boolean;
  actionTab?: 'dashboard' | 'crop_care' | 'services' | 'mandi' | 'finance' | 'profile' | 'orders';
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    type: 'order',
    titleEn: 'Tractor Service Arriving in 40 Mins',
    titleKn: '45HP ಟ್ರ್ಯಾಕ್ಟರ್ 40 ನಿಮಿಷಗಳಲ್ಲಿ ನಿಮ್ಮ ತೋಟಕ್ಕೆ ಬರಲಿದೆ',
    titleHi: 'ट्रैक्टर सेवा 40 मिनट में आपके खेत पहुंच रही है',
    descEn: 'Driver Sharanappa (KA-32-EA-8841) is 2.5 km away from Somanathahalli farm gate.',
    descKn: 'ಚಾಲಕ ಶರಣಪ್ಪ ನಿಮ್ಮ ಜಮೀನಿನಿಂದ 2.5 ಕಿಮೀ ದೂರದಲ್ಲಿದ್ದಾರೆ.',
    descHi: 'ड्राइवर शरणप्पा आपके खेत से 2.5 किमी दूर हैं।',
    time: '10 mins ago',
    isRead: false,
    actionTab: 'orders',
  },
  {
    id: 'notif_2',
    type: 'finance',
    titleEn: 'e-NWR Warehouse Loan Approved: ₹1,85,000',
    titleKn: 'e-NWR ಉಗ್ರಾಣ ಸಾಲ ₹1,85,000 ಖಾತೆಗೆ ಜಮಾ ಆಗಿದೆ',
    titleHi: 'ई-एनडब्ल्यूआर गोदाम ऋण ₹1,85,000 स्वीकृत',
    descEn: 'Disbursed at 7% KCC concessional interest via Canara Bank to prevent harvest distress sale.',
    descKn: 'ಕೆಸಿಸಿ 7% ರಿಯಾಯಿತಿ ಬಡ್ಡಿದರದಲ್ಲಿ ಹಣ ಬಿಡುಗಡೆಯಾಗಿದೆ.',
    descHi: 'केनरा बैंक द्वारा 7% केसीसी ब्याज दर पर ऋण स्वीकृत।',
    time: '1 hour ago',
    isRead: false,
    actionTab: 'finance',
  },
  {
    id: 'notif_3',
    type: 'weather',
    titleEn: 'Agromet Warning: Rainfall Forecast in 36 Hours',
    titleKn: 'ಹವಾಮಾನ ಎಚ್ಚರಿಕೆ: ಮುಂದಿನ 36 ಗಂಟೆಗಳಲ್ಲಿ ಸಾಧಾರಣ ಮಳೆ',
    titleHi: 'मौसम चेतावनी: अगले 36 घंटों में वर्षा का पूर्वानुमान',
    descEn: 'IMD & KSNDMC bulletin predicts 24mm rain in Kalaburagi. Protect sun-drying crops.',
    descKn: 'ಕಲಬುರಗಿಯಲ್ಲಿ 24 ಮಿಮೀ ಮಳೆ ನಿರೀಕ್ಷೆ. ಒಣಗಲು ಇಟ್ಟ ಕಾಳುಗಳನ್ನು ಮುಚ್ಚಿ.',
    descHi: 'कलबुर्गी में 24 मिमी बारिश की संभावना। कटी फसल को सुरक्षित रखें।',
    time: '3 hours ago',
    isRead: false,
    actionTab: 'dashboard',
  },
  {
    id: 'notif_4',
    type: 'mandi',
    titleEn: 'Tur Dal Price Surged to ₹7,850/Qtl at APMC',
    titleKn: 'ಕಲಬುರಗಿ ಎಪಿಎಂಸಿಯಲ್ಲಿ ತೊಗರಿ ಬೆಲೆ ಕ್ವಿಂಟಾಲ್‌ಗೆ ₹7,850 ಕ್ಕೆ ಏರಿಕೆ',
    titleHi: 'कलबुर्गी मंडी में अरहर भाव ₹7,850/क्विंटल पहुंचा',
    descEn: 'Good time to sell! Rate is ₹300 above the MSP threshold.',
    descKn: 'ಮಾರಾಟಕ್ಕೆ ಉತ್ತಮ ಸಮಯ! ಎಂಎಸ್‌ಪಿಗಿಂತ ₹300 ಹೆಚ್ಚು ಬೆಲೆ ದೊರೆಯುತ್ತಿದೆ.',
    descHi: 'बिक्री का अच्छा अवसर! समर्थन मूल्य से ₹300 अधिक।',
    time: 'Yesterday',
    isRead: true,
    actionTab: 'mandi',
  },
  {
    id: 'notif_5',
    type: 'finance',
    titleEn: 'PM-Kisan 18th Installment (₹2,000) Credited',
    titleKn: 'ಪಿಎಂ-ಕಿಸಾನ್ 18ನೇ ಕಂತು ₹2,000 ಖಾತೆಗೆ ಜಮಾ',
    titleHi: 'पीएम-किसान 18वीं किस्त (₹2,000) खाते में जमा',
    descEn: 'Direct DBT transfer completed to your Aadhaar-seeded bank account.',
    descKn: 'ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಡಿಬಿಟಿ ಮೂಲಕ ಹಣ ನೇರವಾಗಿ ಬಂದಿದೆ.',
    descHi: 'आधार से जुड़े बैंक खाते में राशि सीधे ट्रांसफर कर दी गई है।',
    time: '2 days ago',
    isRead: true,
    actionTab: 'finance',
  },
];

export const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose }) => {
  const { language, setActiveTab } = useApp();
  const [items, setItems] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'order' | 'finance'>('all');

  if (!isOpen) return null;

  const filteredItems = items.filter((item) => {
    if (activeFilter === 'unread') return !item.isRead;
    if (activeFilter === 'order') return item.type === 'order';
    if (activeFilter === 'finance') return item.type === 'finance';
    return true;
  });

  const unreadCount = items.filter((i) => !i.isRead).length;

  const handleMarkAllRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, isRead: true })));
  };

  const handleItemClick = (item: NotificationItem) => {
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, isRead: true } : i))
    );
    if (item.actionTab) {
      setActiveTab(item.actionTab);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-stone-200 text-stone-900 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-stone-900 text-white flex items-center justify-center shadow-xs">
              <Bell className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-stone-950">
                  {language === 'kn' ? 'ಸೂಚನೆಗಳು' : language === 'hi' ? 'सूचनाएं' : 'Notifications'}
                </h2>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {unreadCount} {language === 'kn' ? 'ಹೊಸದು' : language === 'hi' ? 'नया' : 'new'}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-500">
                {language === 'kn'
                  ? 'ನಿಮ್ಮ ಆರ್ಡರ್, ಸಾಲ ಮತ್ತು ಹವಾಮಾನ ಎಚ್ಚರಿಕೆಗಳು'
                  : language === 'hi'
                  ? 'आपके ऑर्डर्स, ऋण और मौसम संबंधी अपडेट'
                  : 'Live updates on your orders, loans, and farm weather'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="text-[11px] font-bold text-stone-600 hover:text-stone-950 underline cursor-pointer"
              >
                {language === 'kn' ? 'ಎಲ್ಲವನ್ನೂ ಓದಲಾಗಿದೆ' : language === 'hi' ? 'सभी पढ़ें' : 'Mark all read'}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="px-5 pt-3 pb-2 flex items-center gap-1.5 border-b border-stone-100 bg-stone-50/50 text-xs font-semibold overflow-x-auto">
          {[
            { id: 'all', labelEn: 'All', labelKn: 'ಎಲ್ಲವೂ', labelHi: 'सभी' },
            { id: 'unread', labelEn: 'Unread', labelKn: 'ಓದದಿರುವುದು', labelHi: 'अपठित' },
            { id: 'order', labelEn: 'Orders', labelKn: 'ಆರ್ಡರ್‌ಗಳು', labelHi: 'ऑर्डर्स' },
            { id: 'finance', labelEn: 'Schemes & Loans', labelKn: 'ಸಾಲ & ಸಬ್ಸಿಡಿ', labelHi: 'ऋण व योजनाएं' },
          ].map((flt) => (
            <button
              key={flt.id}
              type="button"
              onClick={() => setActiveFilter(flt.id as any)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeFilter === flt.id
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-950 hover:bg-stone-100'
              }`}
            >
              {language === 'kn' ? flt.labelKn : language === 'hi' ? flt.labelHi : flt.labelEn}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="p-3 divide-y divide-stone-100 overflow-y-auto flex-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-stone-400 space-y-2">
              <CheckCircle2 className="w-10 h-10 mx-auto opacity-40 text-stone-500" />
              <p className="text-xs font-medium">
                {language === 'kn' ? 'ಯಾವುದೇ ಹೊಸ ಸೂಚನೆಗಳಿಲ್ಲ' : language === 'hi' ? 'कोई नई सूचना नहीं है' : 'No notifications in this category'}
              </p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const title = language === 'kn' ? item.titleKn : language === 'hi' ? item.titleHi : item.titleEn;
              const desc = language === 'kn' ? item.descKn : language === 'hi' ? item.descHi : item.descEn;

              return (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`p-3 rounded-xl transition-all cursor-pointer flex items-start gap-3 hover:bg-stone-50 ${
                    !item.isRead ? 'bg-stone-50/80 font-medium' : 'opacity-85'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl shrink-0 flex items-center justify-center text-xs shadow-2xs ${
                      item.type === 'order'
                        ? 'bg-blue-100 text-blue-700'
                        : item.type === 'finance'
                        ? 'bg-emerald-100 text-emerald-700'
                        : item.type === 'weather'
                        ? 'bg-amber-100 text-amber-700'
                        : item.type === 'mandi'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    {item.type === 'order' && <Truck className="w-4 h-4" />}
                    {item.type === 'finance' && <Coins className="w-4 h-4" />}
                    {item.type === 'weather' && <CloudSun className="w-4 h-4" />}
                    {item.type === 'mandi' && <TrendingUp className="w-4 h-4" />}
                    {item.type === 'advisory' && <Bug className="w-4 h-4" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-xs font-extrabold text-stone-950 flex items-center gap-1.5">
                        <span>{title}</span>
                        {!item.isRead && (
                          <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                        )}
                      </div>
                      <span className="text-[10px] text-stone-400 shrink-0 font-mono">
                        {item.time}
                      </span>
                    </div>

                    <p className="text-[11px] text-stone-600 mt-0.5 leading-snug">
                      {desc}
                    </p>

                    {item.actionTab && (
                      <div className="mt-1.5 flex items-center gap-1 text-[11px] font-bold text-stone-900 hover:underline">
                        <span>
                          {language === 'kn' ? 'ವಿವರ ನೋಡಿ' : language === 'hi' ? 'विवरण देखें' : 'View Details'}
                        </span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs text-stone-500">
          <span>KrishiSetu Live Notifications</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded-lg border border-stone-300 font-bold text-stone-800 hover:bg-white cursor-pointer"
          >
            {language === 'kn' ? 'ಮುಚ್ಚಿ' : language === 'hi' ? 'बंद करें' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
