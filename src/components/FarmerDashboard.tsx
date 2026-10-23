import React, { useState } from 'react';
import {
  CloudSun,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  MapPin,
  Plus,
  Volume2,
  Droplets,
  Layers,
  ArrowUpRight,
  Bug,
  LayoutGrid,
  TrendingUp,
  Building2,
  RefreshCw,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Wheat,
  Activity,
  Award,
  QrCode,
  Truck,
  PackageCheck,
  Leaf,
  ShoppingBag,
  Tractor,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VoiceAssistBar } from './VoiceAssistBar';
import { MANDI_REFERENCE_PRICES } from '../data/mockKarnatakaData';

interface FarmerDashboardProps {
  onOpenPlanner: () => void;
  onOpenLogActivity: () => void;
  onOpenProduceModal: () => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  onOpenPlanner,
  onOpenLogActivity,
  onOpenProduceModal,
}) => {
  const {
    currentUser,
    language,
    weather,
    cropPlans,
    activities,
    toggleActivityCompleted,
    advisories,
    setActiveTab,
    speakText,
    farmerExtendedProfile,
    isGovtFetching,
    autoFetchGovtSchemes,
    setIsYieldReadyModalOpen,
    setIsTraceabilityModalOpen,
  } = useApp();

  const [activeSection, setActiveSection] = useState<'overview' | 'mandi_board' | 'crops' | 'tasks' | 'advisory'>('overview');

  const handleReadWeather = () => {
    const text =
      language === 'kn'
        ? `ಹವಾಮಾನ: ${weather.temperatureC} ಡಿಗ್ರಿ ಸೆಲ್ಸಿಯಸ್. ${weather.condition}. ಮುನ್ಸೂಚನೆ: ${weather.advisoryTextKn}`
        : language === 'hi'
        ? `मौसम: ${weather.temperatureC} डिग्री सेल्सियस. ${weather.condition}. सलाह: ${weather.advisoryText}`
        : `Weather: ${weather.temperatureC} degrees Celsius. ${weather.condition}. Advisory: ${weather.advisoryText}`;
    speakText(text);
  };

  const handleReadCropStatus = (cropName: string, stage: string, minYield: number, maxYield: number) => {
    const text =
      language === 'kn'
        ? `${cropName}: ಹಂತ ${stage}. ಅಂದಾಜು ಇಳುವರಿ ಎಕರೆಗೆ ${minYield} ರಿಂದ ${maxYield} ಕ್ವಿಂಟಾಲ್.`
        : language === 'hi'
        ? `${cropName}: अवस्था ${stage}. अनुमानित उपज ${minYield} से ${maxYield} क्विंटल प्रति एकड़.`
        : `${cropName} is in ${stage} stage. Projected yield is ${minYield} to ${maxYield} quintals per acre.`;
    speakText(text);
  };

  const pendingActivities = activities.filter((a) => !a.completed);
  const primaryCrop = cropPlans[0];

  return (
    <div className="space-y-4 pb-20 md:pb-8 max-w-6xl mx-auto text-stone-900">
      {/* 1. Voice Assist Bar */}
      <VoiceAssistBar />

      {/* 2. Super Easy Visual Quick Navigation (If a fool uses this app, they can also use it) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Card 1: My Crops */}
        <button
          type="button"
          onClick={() => setActiveTab('crop_care')}
          className="group relative h-28 rounded-2xl overflow-hidden border border-stone-200 text-left cursor-pointer shadow-xs hover:shadow-md transition-all active:scale-[0.98]"
        >
          <img
            src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=400&q=80"
            alt="Crops"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/40 to-transparent" />
          <div className="absolute bottom-2.5 left-3 right-3 text-white">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
              🌾 {language === 'kn' ? 'ಬೆಳೆಗಳು' : language === 'hi' ? 'फसलें' : 'Crops'}
            </span>
            <span className="text-sm font-black text-white block">
              {language === 'kn' ? 'ನನ್ನ ಬೆಳೆಗಳು' : language === 'hi' ? 'मेरी फसलें' : 'My Crops'}
            </span>
          </div>
        </button>

        {/* Card 2: Flipkart Style Orders */}
        <button
          type="button"
          onClick={() => setActiveTab('orders')}
          className="group relative h-28 rounded-2xl overflow-hidden border border-stone-200 text-left cursor-pointer shadow-xs hover:shadow-md transition-all active:scale-[0.98]"
        >
          <img
            src="https://images.unsplash.com/photo-1599818816942-d6961ea15a97?auto=format&fit=crop&w=400&q=80"
            alt="Orders"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/40 to-transparent" />
          <div className="absolute bottom-2.5 left-3 right-3 text-white">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
              📦 {language === 'kn' ? 'ಆರ್ಡರ್‌ಗಳು' : language === 'hi' ? 'ऑर्डर' : 'Orders'}
            </span>
            <span className="text-sm font-black text-white block">
              {language === 'kn' ? 'ನನ್ನ ಆರ್ಡರ್‌ಗಳು' : language === 'hi' ? 'मेरे ऑर्डर' : 'My Orders'}
            </span>
          </div>
        </button>

        {/* Card 3: Mandi Rates */}
        <button
          type="button"
          onClick={() => setActiveTab('mandi')}
          className="group relative h-28 rounded-2xl overflow-hidden border border-stone-200 text-left cursor-pointer shadow-xs hover:shadow-md transition-all active:scale-[0.98]"
        >
          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=400&q=80"
            alt="Mandi"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/40 to-transparent" />
          <div className="absolute bottom-2.5 left-3 right-3 text-white">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
              💰 {language === 'kn' ? 'ಮಂಡಿ ರೇಟ್' : language === 'hi' ? 'मंडी भाव' : 'Live Prices'}
            </span>
            <span className="text-sm font-black text-white block">
              {language === 'kn' ? 'ಮಂಡಿ ಮಾರಾಟ' : language === 'hi' ? 'मंडी भाव व बिक्री' : 'Mandi Rates'}
            </span>
          </div>
        </button>

        {/* Card 4: Tractor & Equipment */}
        <button
          type="button"
          onClick={() => setActiveTab('services')}
          className="group relative h-28 rounded-2xl overflow-hidden border border-stone-200 text-left cursor-pointer shadow-xs hover:shadow-md transition-all active:scale-[0.98]"
        >
          <img
            src="https://images.unsplash.com/photo-1530267981375-f0de937f5f13?auto=format&fit=crop&w=400&q=80"
            alt="Tractor"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/40 to-transparent" />
          <div className="absolute bottom-2.5 left-3 right-3 text-white">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
              🚜 {language === 'kn' ? 'ಯಂತ್ರ ಬಾಡಿಗೆ' : language === 'hi' ? 'ट्रैक्टर सेवा' : 'Custom Hire'}
            </span>
            <span className="text-sm font-black text-white block">
              {language === 'kn' ? 'ಟ್ರಾಕ್ಟರ್ & ಡ್ರೋನ್' : language === 'hi' ? 'कृषि सेवाएं' : 'Farm Services'}
            </span>
          </div>
        </button>
      </div>

      {/* 3. Executive Hero Cockpit (Pure White + Stone Aesthetics) */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-stone-500 font-medium flex-wrap">
              <span className="flex items-center gap-1 text-stone-700">
                <MapPin className="w-3.5 h-3.5 text-stone-500" />
                <span>{currentUser.village}, {currentUser.taluk}</span>
              </span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="text-stone-600 font-mono">Kharif Season 2026</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Bhoomi RTC Active
              </span>
            </div>

            <h1 className="text-lg sm:text-2xl font-black tracking-tight text-stone-950">
              {language === 'kn'
                ? `ನಮಸ್ಕಾರ, ${currentUser.name}`
                : language === 'hi'
                ? `नमस्ते, ${currentUser.name}`
                : `Welcome, ${currentUser.name}`}
            </h1>

            <p className="text-xs text-stone-600 flex items-center gap-2 flex-wrap">
              <CloudSun className="w-4 h-4 text-stone-700 inline" />
              <span>
                <strong>{weather.temperatureC}°C</strong> · {weather.condition} · Rain {weather.rainfallForecastMm}mm expected
              </span>
              <button
                type="button"
                onClick={handleReadWeather}
                className="text-[11px] text-stone-900 hover:text-black font-bold underline flex items-center gap-0.5 cursor-pointer ml-1"
              >
                <Volume2 className="w-3.5 h-3.5 text-stone-700" />
                <span>{language === 'kn' ? 'ಕೇಳಿ' : language === 'hi' ? 'सुनें' : 'Listen'}</span>
              </button>
            </p>
          </div>

          {/* Action Buttons in Pure Neutral / Black Style */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenPlanner}
              className="h-10 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-extrabold text-xs flex items-center gap-2 shadow-xs cursor-pointer transition-all"
            >
              <Plus className="w-4 h-4 text-white" />
              <span>{language === 'kn' ? '+ ಬೆಳೆ ಯೋಜನೆ' : language === 'hi' ? '+ फसल योजना' : '+ Plan Season'}</span>
            </button>

            <button
              type="button"
              onClick={onOpenLogActivity}
              className="h-10 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-900 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Calendar className="w-4 h-4 text-stone-700" />
              <span>{language === 'kn' ? 'ಕೆಲಸ ದಾಖಲು' : language === 'hi' ? 'कार्य दर्ज करें' : 'Log Work'}</span>
            </button>

            <button
              type="button"
              onClick={onOpenProduceModal}
              className="h-10 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-900 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <ArrowUpRight className="w-4 h-4 text-stone-700" />
              <span>{language === 'kn' ? 'ಮಂಡಿ ಮಾರಾಟ' : language === 'hi' ? 'उपज बेचें' : 'Sell Produce'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Autonomous Value Chain Trigger Banner (White Aesthetic - NO Orange) */}
      <div className="bg-white border-2 border-stone-200 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-stone-900 text-white shadow-2xs">
                KrishiSetu Express
              </span>
              <span className="text-xs font-bold text-stone-900">
                {language === 'kn' ? 'ಸ್ವಾಯತ್ತ ಮೌಲ್ಯ ಸರಪಳಿ ಚಾಲಕ' : language === 'hi' ? 'सीधे खेत से उठाव सेवा' : 'Farm-Gate Harvest Dispatch'}
              </span>
              <span className="hidden sm:inline text-stone-300">·</span>
              <span className="hidden sm:inline text-xs text-stone-500 font-medium">
                Mandya & Kalaburagi Direct Hub
              </span>
            </div>

            <h2 className="text-base sm:text-lg font-black text-stone-950">
              {language === 'kn'
                ? 'ಧ್ವನಿ ಮೂಲಕ ಹೇಳಿ: "ಇಳುವರಿ ಸಿದ್ಧವಾಗಿದೆ"'
                : language === 'hi'
                ? 'बोलें: "फसल तैयार है" - पूरा काम खुद होगा'
                : 'Speak "Yield Ready" — Full Value Chain Dispatches'}
            </h2>

            <p className="text-xs text-stone-600 leading-relaxed max-w-2xl">
              {language === 'kn'
                ? 'ಯಾವುದೇ ಕಾಗದಪತ್ರವಿಲ್ಲ. ನೀವು ಮಾತನಾಡಿದರೆ ಸಾಕು; KrishiSetu ಟ್ರಕ್ ಕಳುಹಿಸಿ ಉಗ್ರಾಣದಲ್ಲಿ ದಾಸ್ತಾನು ಮಾಡುತ್ತದೆ, e-NWR ಸಾಲ ಮಂಜೂರು ಮಾಡುತ್ತದೆ ಮತ್ತು e-NAM ಹರಾಜು ನಡೆಸುತ್ತದೆ.'
                : language === 'hi'
                ? 'बिना कागजी कार्रवाई के सीधे खेत पर ट्रक पिकअप, वेयरहाउस रसीद, तत्काल लोन और बैंक सुरक्षा के साथ सीधा भुगतान।'
                : 'Zero paperwork. KrishiSetu coordinates farm-gate truck pickup, WDRA warehouse intake, unlocks an instant e-NWR pledge loan, and liquidates via e-NAM with bank Escrow.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsYieldReadyModalOpen(true)}
              className="h-10 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-extrabold text-xs flex items-center gap-2 shadow-xs cursor-pointer transition-all"
            >
              <Sparkles className="w-4 h-4 fill-current text-white" />
              <span>
                {language === 'kn'
                  ? 'ಇಳುವರಿ ಸಿದ್ಧ (ಪ್ರಕ್ರಿಯೆ ನಡೆಸಿ)'
                  : language === 'hi'
                  ? 'फसल तैयार है (शुरू करें)'
                  : 'Trigger "Yield Ready"'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsTraceabilityModalOpen(true)}
              className="h-10 px-3.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-900 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all"
            >
              <QrCode className="w-4 h-4 text-stone-700" />
              <span>{language === 'kn' ? 'QR ಪತ್ತೆಹಚ್ಚುವಿಕೆ' : language === 'hi' ? 'क्यूआर कोड' : 'Traceability QR'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5. Real Government Schemes Live Ticker Strip */}
      <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200 text-stone-900 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5 text-stone-800" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-black text-stone-950 text-xs sm:text-sm">
                {language === 'kn'
                  ? 'ಸರ್ಕಾರಿ ಯೋಜನೆ & ಸಬ್ಸಿಡಿ (ಲೈವ್ ಸಿಂಕ್)'
                  : language === 'hi'
                  ? 'सरकारी योजनाएं एवं प्रत्यक्ष लाभ (DBT)'
                  : 'Government Schemes & Direct Subsidies'}
              </span>
              <span className="text-[10px] font-bold text-stone-900 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded-md font-mono">
                8 {language === 'kn' ? 'ಅರ್ಹ ಯೋಜನೆಗಳು' : language === 'hi' ? 'सक्रिय' : 'Eligible'}
              </span>
            </div>
            <div className="text-xs text-stone-600 truncate mt-0.5">
              {language === 'kn'
                ? 'ರೈತ ಸಿರಿ (₹20,000) · ಪಿಎಂ-ಕಿಸಾನ್ (₹6,000) · ಕೃಷಿ ಭಾಗ್ಯ (80% ಸಬ್ಸಿಡಿ) · ಕೆಸಿಸಿ 4% ಸಾಲ'
                : language === 'hi'
                ? 'पीएम-किसान (₹6,000) · किसान क्रेडिट कार्ड 4% ब्याज · 80% ड्रिप सब्सिडी · कुल लाभ: ₹1,92,800/वर्ष'
                : 'PM-KISAN (₹6K) · Raitha Siri (₹20K) · Krishi Bhagya (80% Solar) · KCC 4% Loan · Annual: ~₹1,92,800'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          <button
            type="button"
            disabled={isGovtFetching}
            onClick={() => autoFetchGovtSchemes(true)}
            className="h-8 px-3 rounded-lg text-xs font-bold bg-white hover:bg-stone-50 border border-stone-200 text-stone-900 flex items-center gap-1.5 cursor-pointer shadow-2xs disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-stone-700 ${isGovtFetching ? 'animate-spin' : ''}`} />
            <span>{isGovtFetching ? 'Syncing...' : (language === 'kn' ? 'ಲೈವ್ ಸಿಂಕ್' : language === 'hi' ? 'सिंक करें' : 'Live Sync')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('finance')}
            className="h-8 px-3.5 rounded-lg text-xs font-extrabold bg-stone-900 hover:bg-stone-800 text-white flex items-center gap-1 cursor-pointer shadow-xs transition-colors"
          >
            <span>{language === 'kn' ? 'ಯೋಜನೆಗಳು ನೋಡಿ →' : language === 'hi' ? 'योजनाएं देखें →' : 'View Schemes (12) →'}</span>
          </button>
        </div>
      </div>

      {/* 6. Four Core KPI Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {/* Tile 1: Land Holding */}
        <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center justify-between">
            <span>{language === 'kn' ? 'ಒಟ್ಟು ಜಮೀನು' : language === 'hi' ? 'कुल भूमि' : 'Total Land Area'}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-stone-950">
            {farmerExtendedProfile?.totalAreaAcres || 7.3} <span className="text-xs font-medium text-stone-500">Acres</span>
          </div>
          <div className="text-[11px] text-stone-500 truncate">
            3 Farm Plots · Bhoomi RTC Active
          </div>
        </div>

        {/* Tile 2: Primary Crop Cycle */}
        <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center justify-between">
            <span>{language === 'kn' ? 'ಪ್ರಮುಖ ಬೆಳೆ' : language === 'hi' ? 'मुख्य फसल' : 'Active Crop'}</span>
            <Wheat className="w-3.5 h-3.5 text-stone-700" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-stone-950 truncate">
            {primaryCrop ? primaryCrop.cropName : 'Ragi (GPU-28)'}
          </div>
          <div className="text-[11px] text-stone-500 truncate flex items-center gap-1">
            <span>Stage: {primaryCrop ? primaryCrop.stage : 'Vegetative'}</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-700 font-bold">14-18 Qtl/Ac</span>
          </div>
        </div>

        {/* Tile 3: Mandi Realized Revenue */}
        <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center justify-between">
            <span>{language === 'kn' ? 'ಮಂಡಿ ವಹಿವಾಟು' : language === 'hi' ? 'मंडी लेनदेन' : 'Mandi Pipeline'}</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-stone-950">
            ₹1,84,500
          </div>
          <div className="text-[11px] text-stone-500 truncate">
            4 Active Lots · APMC Mandya
          </div>
        </div>

        {/* Tile 4: Govt Subsidy Eligibility */}
        <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center justify-between">
            <span>{language === 'kn' ? 'ಸರ್ಕಾರಿ ಸಬ್ಸಿಡಿ' : language === 'hi' ? 'सरकारी लाभ' : 'Eligible Subsidies'}</span>
            <Award className="w-3.5 h-3.5 text-stone-700" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-700">
            8 Schemes
          </div>
          <div className="text-[11px] text-stone-500 truncate">
            Direct DBT Disbursal Active
          </div>
        </div>
      </div>

      {/* 7. Clean Segmented Tab Controller */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveSection('overview')}
          className={`h-9 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
            activeSection === 'overview'
              ? 'bg-white text-stone-950 font-extrabold shadow-xs'
              : 'text-stone-600 hover:text-stone-950 hover:bg-white/60'
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5 text-stone-700 shrink-0" />
          <span className="truncate">{language === 'kn' ? 'ಮುಖ್ಯ ನೋಟ' : language === 'hi' ? 'सिंहावलोकन' : 'Overview'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('mandi_board')}
          className={`h-9 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
            activeSection === 'mandi_board'
              ? 'bg-white text-stone-950 font-extrabold shadow-xs'
              : 'text-stone-600 hover:text-stone-950 hover:bg-white/60'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5 text-stone-700 shrink-0" />
          <span className="truncate">{language === 'kn' ? 'ಲೈವ್ ಮಂಡಿ' : language === 'hi' ? 'मंडी भाव' : 'Mandi Board'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('crops')}
          className={`h-9 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
            activeSection === 'crops'
              ? 'bg-white text-stone-950 font-extrabold shadow-xs'
              : 'text-stone-600 hover:text-stone-950 hover:bg-white/60'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-stone-700 shrink-0" />
          <span className="truncate">{language === 'kn' ? 'ಬೆಳೆಗಳು' : language === 'hi' ? 'फसलें' : 'Crops'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('tasks')}
          className={`h-9 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
            activeSection === 'tasks'
              ? 'bg-white text-stone-950 font-extrabold shadow-xs'
              : 'text-stone-600 hover:text-stone-950 hover:bg-white/60'
          }`}
        >
          <Calendar className="w-3.5 h-3.5 text-stone-700 shrink-0" />
          <span className="truncate">{language === 'kn' ? 'ಕೆಲಸಗಳು' : language === 'hi' ? 'कार्य' : 'Tasks'}</span>
          {pendingActivities.length > 0 && (
            <span className="w-4 h-4 rounded-full bg-stone-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
              {pendingActivities.length}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('advisory')}
          className={`col-span-2 sm:col-span-1 h-9 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
            activeSection === 'advisory'
              ? 'bg-white text-stone-950 font-extrabold shadow-xs'
              : 'text-stone-600 hover:text-stone-950 hover:bg-white/60'
          }`}
        >
          <Bug className="w-3.5 h-3.5 text-stone-700 shrink-0" />
          <span className="truncate">{language === 'kn' ? 'ಸಲಹೆ' : language === 'hi' ? 'कृषि सलाह' : 'Advisory'}</span>
        </button>
      </div>

      {/* 8. TAB CONTENTS */}
      {/* Tab A: OVERVIEW */}
      {activeSection === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Column 1 & 2: Active Crops & Work Schedule */}
          <div className="lg:col-span-2 space-y-3">
            {/* Primary Crop Progress Card */}
            <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-stone-950 flex items-center gap-2">
                    <Wheat className="w-4 h-4 text-stone-700" />
                    <span>{primaryCrop ? primaryCrop.cropName : 'Finger Millet (Ragi GPU-28)'}</span>
                  </h3>
                  <div className="text-xs text-stone-500 mt-0.5">
                    Sown: {primaryCrop?.sowingDate || '2026-06-25'} · Projected Harvest: {primaryCrop?.estimatedHarvestStart || '2026-10-30'}
                  </div>
                </div>
                <span className="text-xs font-bold text-stone-800 bg-stone-100 border border-stone-200 px-2.5 py-0.5 rounded-lg">
                  Stage: {primaryCrop?.stage || 'Tillering'}
                </span>
              </div>

              {/* Progress Stage Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-stone-600">
                  <span>Growth Progress</span>
                  <span className="text-emerald-700 font-mono font-bold">65% Complete</span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-stone-900 h-2 rounded-full w-[65%]" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-stone-100 text-xs">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Target Yield</span>
                  <span className="font-extrabold text-stone-900">14 - 18 Qtl/Ac</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Soil Health</span>
                  <span className="font-extrabold text-stone-900">Red Loamy · pH 6.8</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Water Source</span>
                  <span className="font-extrabold text-stone-900">Borewell + Drip</span>
                </div>
              </div>
            </div>

            {/* Farm Tasks Checklist Card */}
            <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-stone-950 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-stone-700" />
                  <span>{language === 'kn' ? 'ಇಂದಿನ ಕೃಷಿ ಕೆಲಸಗಳು' : language === 'hi' ? 'आज के कृषि कार्य' : 'Immediate Farm Tasks'}</span>
                </h3>
                <span className="text-xs text-stone-500 font-mono">
                  {pendingActivities.length} Pending
                </span>
              </div>

              <div className="divide-y divide-stone-100">
                {activities.slice(0, 3).map((act) => (
                  <div key={act.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => toggleActivityCompleted(act.id)}
                        className={`w-5 h-5 rounded-md flex items-center justify-center cursor-pointer transition-colors ${
                          act.completed
                            ? 'bg-emerald-600 text-white'
                            : 'border border-stone-300 hover:border-stone-500'
                        }`}
                      >
                        {act.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </button>
                      <div>
                        <div className={`font-bold ${act.completed ? 'line-through text-stone-400' : 'text-stone-900'}`}>
                          {act.title}
                        </div>
                        <div className="text-[11px] text-stone-500">{act.date} · Plot: {(act as any).plotName || 'Plot 1'}</div>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-100 text-stone-700">
                      {act.category.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Live Mandi Quick Widget */}
          <div className="space-y-3">
            <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-stone-950 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'kn' ? 'ಇಂದಿನ ಮಂಡಿ ದರಗಳು' : language === 'hi' ? 'आज के मंडी भाव' : 'Today Mandi Rates'}</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveSection('mandi_board')}
                  className="text-xs text-stone-900 font-bold hover:underline"
                >
                  View All →
                </button>
              </div>

              <div className="space-y-2">
                {MANDI_REFERENCE_PRICES.slice(0, 4).map((p) => (
                  <div key={p.crop} className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-stone-950 block">{p.crop}</span>
                      <span className="text-[10px] text-stone-500">{p.market}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-black text-stone-950 block">₹{p.modalPrice}/Qtl</span>
                      <span className="text-[10px] text-emerald-700 font-bold">MSP ₹{p.minPrice}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab B: MANDI BOARD */}
      {activeSection === 'mandi_board' && (
        <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-extrabold text-stone-950">
                {language === 'kn' ? 'ಕರ್ನಾಟಕ APMC ಲೈವ್ ಮಾರುಕಟ್ಟೆ ದರಗಳು' : language === 'hi' ? 'कर्नाटक एपीएमसी लाइव मंडी भाव' : 'Karnataka APMC Daily Price Mandates'}
              </h3>
              <p className="text-xs text-stone-500">
                Direct procurement rates at Mandya, Mysuru, Ramanagara, and Bengaluru APMC Yards.
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenProduceModal}
              className="h-9 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shadow-xs"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>List Your Lot For Sale</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-700">
              <thead className="bg-stone-50 border-b border-stone-200 text-[10px] uppercase font-bold text-stone-500">
                <tr>
                  <th className="py-2.5 px-4">Commodity</th>
                  <th className="py-2.5 px-4">APMC Market</th>
                  <th className="py-2.5 px-4">Current Traded Price</th>
                  <th className="py-2.5 px-4">Govt MSP Mandate</th>
                  <th className="py-2.5 px-4">Arrivals</th>
                  <th className="py-2.5 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {MANDI_REFERENCE_PRICES.map((item) => (
                  <tr key={item.crop} className="hover:bg-stone-50/80">
                    <td className="py-3 px-4 font-bold text-stone-950">
                      <div>{item.crop}</div>
                      <div className="text-[10px] text-stone-400 font-normal">{item.variety}</div>
                    </td>
                    <td className="py-3 px-4 font-medium text-stone-800">
                      {item.market}
                    </td>
                    <td className="py-3 px-4 font-mono font-black text-stone-950 text-sm">
                      ₹{item.modalPrice}/Qtl
                    </td>
                    <td className="py-3 px-4 font-mono text-stone-600 font-bold">
                      ₹{item.minPrice} - ₹{item.maxPrice}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-xs text-stone-600">
                      {item.arrivalsQuintals} Qtl
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800">
                        {item.date}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab C: CROPS */}
      {activeSection === 'crops' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {cropPlans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-xl p-4 border border-stone-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-stone-950 text-sm">{plan.cropName} ({plan.variety})</h4>
                  <div className="text-xs text-stone-500">Season: {plan.season} · Plot: {plan.plotName}</div>
                </div>
                <span className="text-xs font-bold text-stone-800 bg-stone-100 border border-stone-200 px-2.5 py-0.5 rounded-lg">
                  {plan.stage}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                <div>
                  <span className="text-[10px] text-stone-400 font-bold uppercase block">Target Yield</span>
                  <span className="font-extrabold text-stone-900">
                    {plan.targetYieldRange.minQuintalPerAcre} - {plan.targetYieldRange.maxQuintalPerAcre} Qtl/Acre
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 font-bold uppercase block">Estimated Harvest</span>
                  <span className="font-extrabold text-stone-900">{plan.estimatedHarvestStart}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-1 text-xs">
                <button
                  type="button"
                  onClick={() =>
                    handleReadCropStatus(
                      plan.cropName,
                      plan.stage,
                      plan.targetYieldRange.minQuintalPerAcre,
                      plan.targetYieldRange.maxQuintalPerAcre
                    )
                  }
                  className="text-stone-700 hover:text-stone-950 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5 text-stone-700" />
                  <span>Read Details</span>
                </button>
                <button
                  type="button"
                  onClick={onOpenLogActivity}
                  className="px-3 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold text-xs cursor-pointer"
                >
                  Log Operation
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab D: TASKS */}
      {activeSection === 'tasks' && (
        <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-stone-950">Farm Operations & Agronomic Tasks</h3>
            <button
              type="button"
              onClick={onOpenLogActivity}
              className="h-8 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center gap-1 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Activity</span>
            </button>
          </div>

          <div className="divide-y divide-stone-100">
            {activities.map((act) => (
              <div key={act.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => toggleActivityCompleted(act.id)}
                    className={`w-5 h-5 rounded-md flex items-center justify-center cursor-pointer transition-colors ${
                      act.completed
                        ? 'bg-emerald-600 text-white'
                        : 'border border-stone-300 hover:border-stone-500'
                    }`}
                  >
                    {act.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>
                  <div>
                    <div className={`font-bold ${act.completed ? 'line-through text-stone-400' : 'text-stone-900'}`}>
                      {act.title}
                    </div>
                    <div className="text-[11px] text-stone-500">{act.notes || `Category: ${act.category}`}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-stone-500">Date: {act.date}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-100 text-stone-700">
                    {act.category.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab E: ADVISORY */}
      {activeSection === 'advisory' && (
        <div className="space-y-3">
          {advisories.map((adv) => (
            <div key={adv.id} className="bg-white rounded-xl p-4 border border-stone-200 shadow-xs space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    adv.severity === 'high' ? 'bg-rose-100 text-rose-950' : 'bg-amber-100 text-amber-950'
                  }`}>
                    {adv.severity} Severity
                  </span>
                  <h4 className="font-extrabold text-stone-950 text-sm">{adv.title}</h4>
                </div>
                <span className="text-[11px] text-stone-400 font-mono">{adv.publishedDate}</span>
              </div>

              <p className="text-stone-700 leading-relaxed">{adv.summary}</p>

              <div className="p-3 bg-stone-50 rounded-lg border border-stone-100 space-y-1">
                <span className="text-[10px] font-bold text-stone-500 uppercase block">Recommended Agronomic Action</span>
                <p className="font-medium text-stone-900">{adv.recommendedAction}</p>
                {adv.organicAlternative && (
                  <div className="pt-1 text-[11px] text-emerald-800 font-semibold">
                    🌱 Organic Remedy: {adv.organicAlternative}
                  </div>
                )}
              </div>

              <div className="text-[10px] text-stone-400 font-mono pt-1">
                Verified Authority Source: {adv.source}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
