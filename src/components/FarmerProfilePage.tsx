import React, { useState } from 'react';
import {
  User,
  MapPin,
  Landmark,
  Sprout,
  ShieldCheck,
  Save,
  Download,
  CheckCircle2,
  AlertCircle,
  Volume2,
  Mic,
  KeyRound,
  Printer,
  FileText,
  BadgeCheck,
  Award,
  Calendar,
  Phone,
  Milk,
  Droplets,
  CreditCard,
  Edit3,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FarmerExtendedProfile } from '../types/agriculture';
import { AuthSection } from './AuthSection';

export const FarmerProfilePage: React.FC = () => {
  const {
    farmerExtendedProfile,
    saveFarmerProfileToBackend,
    language,
    speakText,
    plots,
    addPlot,
    authAccount,
  } = useApp();

  const [activeProfileTab, setActiveProfileTab] = useState<
    'farm_report' | 'contact_land' | 'crops_dairy' | 'banking' | 'auth_portal'
  >('farm_report');

  const [formData, setFormData] = useState<FarmerExtendedProfile>(farmerExtendedProfile);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{
    type: 'success' | 'error';
    message: string;
    timestamp?: string;
  } | null>(null);

  const [showAddPlot, setShowAddPlot] = useState(false);
  const [newPlotName, setNewPlotName] = useState('');
  const [newPlotArea, setNewPlotArea] = useState(1.0);
  const [isListening, setIsListening] = useState(false);

  const handleSaveToBackend = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveStatus(null);

    try {
      const result = await saveFarmerProfileToBackend(formData);
      setSaveStatus({
        type: 'success',
        message:
          language === 'kn'
            ? 'ಮಾಹಿತಿಯನ್ನು ಸರ್ವರ್‌ನಲ್ಲಿ ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ!'
            : language === 'hi'
            ? 'किसान प्रोफाइल सफलतापूर्वक सर्वर पर सहेज ली गई है!'
            : 'Farmer profile saved successfully to live backend server!',
        timestamp: result.timestamp || new Date().toISOString(),
      });
    } catch (err: any) {
      console.warn('Backend sync failed:', err);
      setSaveStatus({
        type: 'error',
        message:
          language === 'kn'
            ? 'ಮಾಹಿತಿ ಉಳಿಸಲು ವಿಫಲವಾಗಿದೆ.'
            : language === 'hi'
            ? 'प्रोफाइल सहेजने में त्रुटि हुई।'
            : 'Failed to save profile. Please try again.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePrintReport = () => {
    window.print();
  };

  const handleReadProfileAloud = () => {
    const summary =
      language === 'kn'
        ? `ರೈತ ಅಧಿಕೃತ ವರದಿ: ${formData.name}. ಗ್ರಾಮ: ${formData.village}, ${formData.taluk}, ${formData.district}. ಒಟ್ಟು ಜಮೀನು: ${formData.totalAreaAcres} ಎಕರೆ. ಪ್ರಮುಖ ಬೆಳೆ: ರಾಗಿ ಮತ್ತು ಭತ್ತ. ಮಣ್ಣಿನ ಆರೋಗ್ಯ: ಪರೀಕ್ಷಿಸಲಾಗಿದೆ. ಹಾಲಿನ ಇಳುವರಿ ದಿನಕ್ಕೆ ${formData.dailyMilkLitres} ಲೀಟರ್. ಒಟ್ಟು ಸಹಾಯಧನ ಮೌಲ್ಯ: ₹1,92,800.`
        : language === 'hi'
        ? `किसान आधिकारिक रिपोर्ट: ${formData.name}. गाँव: ${formData.village}, ${formData.taluk}, ${formData.district}. कुल भूमि: ${formData.totalAreaAcres} एकड़. मुख्य फसल: रागी और धान. दूध उत्पादन: प्रतिदिन ${formData.dailyMilkLitres} लीटर. कुल सरकारी सब्सिडी: ₹1,92,800.`
        : `Official Farmer Report for ${formData.name}. Village: ${formData.village}, ${formData.taluk}, ${formData.district}. Total land: ${formData.totalAreaAcres} acres. Major crops: Mandya Ragi and Paddy. Daily milk yield: ${formData.dailyMilkLitres} litres. Approved annual government benefits: ₹1,92,800.`;
    speakText(summary);
  };

  const handleExportData = () => {
    const exportData = {
      reportTitle: 'KrishiSetu Official Farmer Digital Record & Report',
      exportDate: new Date().toISOString(),
      reportId: `KS-REPORT-${Date.now().toString().slice(-6)}`,
      farmerProfile: formData,
      plots: plots,
      soilHealthSummary: {
        nitrogen: '240 kg/ha (Medium)',
        phosphorus: '18 kg/ha (Medium)',
        potassium: '320 kg/ha (High)',
        ph: '6.8 (Optimal Neutral)',
        organicCarbon: '0.75%',
      },
      benefitsApproved: '₹1,92,800/yr',
      authStatus: authAccount,
      platform: 'KrishiSetu India',
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `KrishiSetu_FarmerReport_${formData.name.replace(/\s+/g, '_')}_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleVoiceInputVillage = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = language === 'kn' ? 'kn-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setFormData((prev) => ({ ...prev, village: transcript }));
      setIsListening(false);
    };

    recognition.start();
  };

  const handleCreatePlot = () => {
    if (!newPlotName.trim()) return;
    addPlot({
      name: newPlotName,
      areaAcre: Number(newPlotArea),
      soilType: 'red_loamy',
      irrigation: 'drip',
      village: formData.village || 'Kowdle',
      taluk: formData.taluk || 'Maddur',
      district: formData.district || 'Mandya',
      hasSoilReport: true,
      surveyNumberMasked: `Sy-${Math.floor(Math.random() * 200) + 1}/P2`,
      farmerId: formData.id || 'farmer_1',
    });

    setFormData((prev) => ({
      ...prev,
      totalAreaAcres: Number((Number(prev.totalAreaAcres || 0) + Number(newPlotArea)).toFixed(1)),
    }));

    setNewPlotName('');
    setShowAddPlot(false);
  };

  return (
    <div className="space-y-4 pb-20 md:pb-8 max-w-5xl mx-auto text-stone-900">
      {/* 1. Profile Header Card with Real Agricultural Photo & Farmer Identity */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
        {/* Cover Photo */}
        <div className="relative h-36 sm:h-48 w-full bg-stone-100 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=80"
            alt="Lush green farmland"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
            <span className="text-xs sm:text-sm font-bold flex items-center gap-1.5">
              <BadgeCheck className="w-4 h-4 text-emerald-400" />
              <span>
                {language === 'kn'
                  ? 'ದೃಢೀಕೃತ ರೈತ ಖಾತೆ (Bhoomi RTC Verified)'
                  : language === 'hi'
                  ? 'प्रमाणित किसान खाता (भूमि व FRUITS सत्यापित)'
                  : 'Verified Farmer Digital Identity (FRUITS & Bhoomi)'}
              </span>
            </span>
            <span className="text-[11px] font-mono bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-white border border-white/30">
              FID: KA-FRUITS-2024-8199
            </span>
          </div>
        </div>

        {/* Identity Details Row */}
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="relative shrink-0">
              <img
                src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=200&h=200&q=80"
                alt={formData.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-600 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px]">
                ✓
              </span>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-black text-lg sm:text-xl text-stone-950 truncate">
                  {formData.name}
                </h1>
                <span className="text-[11px] bg-stone-100 text-stone-900 border border-stone-200 font-bold px-2 py-0.5 rounded-md">
                  {(formData.ownershipTenure || 'owner').toUpperCase()}
                </span>
                <span className="text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold px-2 py-0.5 rounded-md">
                  {language === 'kn' ? 'ಸಕ್ರಿಯ ರೈತ' : language === 'hi' ? 'सक्रिय किसान' : 'Active Farmer'}
                </span>
              </div>
              <p className="text-xs text-stone-600 truncate mt-1 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-stone-500" />
                <span>
                  {formData.village}, {formData.taluk}, {formData.district} · {formData.totalAreaAcres} Acres
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleReadProfileAloud}
              className="h-9 px-3.5 rounded-xl bg-white border border-stone-200 hover:bg-stone-50 text-stone-900 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition-colors"
              title="Read report aloud"
            >
              <Volume2 className="w-4 h-4 text-emerald-700" />
              <span>{language === 'kn' ? 'ವರದಿ ಕೇಳಿ' : language === 'hi' ? 'रिपोर्ट सुनें' : 'Listen'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrintReport}
              className="h-9 px-3.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-900 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition-colors"
              title="Print official report"
            >
              <Printer className="w-4 h-4 text-stone-700" />
              <span>{language === 'kn' ? 'ಪ್ರಿಂಟ್' : language === 'hi' ? 'प्रिंट' : 'Print'}</span>
            </button>

            <button
              type="button"
              onClick={handleExportData}
              className="h-9 px-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
              title="Download JSON Report"
            >
              <Download className="w-4 h-4 text-white" />
              <span>{language === 'kn' ? 'ಡೌನ್‌ಲೋಡ್' : language === 'hi' ? 'डाउनलोड' : 'Download'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live Server Sync Feedback */}
      {saveStatus && (
        <div
          className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
            saveStatus.type === 'success'
              ? 'bg-emerald-50 text-emerald-950 border border-emerald-300'
              : 'bg-rose-50 text-rose-950 border border-rose-300'
          }`}
        >
          {saveStatus.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <div className="flex-1 text-xs">
            <span>{saveStatus.message}</span>
            {saveStatus.timestamp && (
              <span className="block text-[10px] text-stone-500 font-mono mt-0.5">
                Synced: {new Date(saveStatus.timestamp).toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
      )}

      {/* 2. Navigation Tabs (Clean White Aesthetic - NO Orange) */}
      <div className="flex items-center gap-1.5 p-1.5 bg-stone-100 rounded-2xl text-xs font-semibold border border-stone-200 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveProfileTab('farm_report')}
          className={`flex-1 min-w-[150px] h-9 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap transition-colors ${
            activeProfileTab === 'farm_report'
              ? 'bg-white text-stone-950 font-black shadow-xs border border-stone-200'
              : 'text-stone-700 hover:text-stone-950 hover:bg-white/60'
          }`}
        >
          <FileText className={`w-4 h-4 ${activeProfileTab === 'farm_report' ? 'text-emerald-700' : 'text-stone-500'}`} />
          <span>{language === 'kn' ? 'ಅಧಿಕೃತ ಕೃಷಿ ವರದಿ' : language === 'hi' ? 'आधिकारिक किसान रिपोर्ट' : 'Official Farm Report'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveProfileTab('contact_land')}
          className={`flex-1 min-w-[130px] h-9 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap transition-colors ${
            activeProfileTab === 'contact_land'
              ? 'bg-white text-stone-950 font-black shadow-xs border border-stone-200'
              : 'text-stone-700 hover:text-stone-950 hover:bg-white/60'
          }`}
        >
          <MapPin className={`w-4 h-4 ${activeProfileTab === 'contact_land' ? 'text-emerald-700' : 'text-stone-500'}`} />
          <span>{language === 'kn' ? 'ಸಂಪರ್ಕ & ಜಮೀನು' : language === 'hi' ? 'भूमि व संपर्क' : 'Land & Contact'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveProfileTab('crops_dairy')}
          className={`flex-1 min-w-[130px] h-9 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap transition-colors ${
            activeProfileTab === 'crops_dairy'
              ? 'bg-white text-stone-950 font-black shadow-xs border border-stone-200'
              : 'text-stone-700 hover:text-stone-950 hover:bg-white/60'
          }`}
        >
          <Sprout className={`w-4 h-4 ${activeProfileTab === 'crops_dairy' ? 'text-emerald-700' : 'text-stone-500'}`} />
          <span>{language === 'kn' ? 'ಬೆಳೆ & ಹೈನುಗಾರಿಕೆ' : language === 'hi' ? 'फसल व पशुपालन' : 'Crops & Dairy'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveProfileTab('banking')}
          className={`flex-1 min-w-[130px] h-9 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap transition-colors ${
            activeProfileTab === 'banking'
              ? 'bg-white text-stone-950 font-black shadow-xs border border-stone-200'
              : 'text-stone-700 hover:text-stone-950 hover:bg-white/60'
          }`}
        >
          <Landmark className={`w-4 h-4 ${activeProfileTab === 'banking' ? 'text-emerald-700' : 'text-stone-500'}`} />
          <span>{language === 'kn' ? 'ಬ್ಯಾಂಕ್ & ID' : language === 'hi' ? 'बैंक व किसान ID' : 'Bank & KYC'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveProfileTab('auth_portal')}
          className={`flex-1 min-w-[110px] h-9 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap transition-colors ${
            activeProfileTab === 'auth_portal'
              ? 'bg-white text-stone-950 font-black shadow-xs border border-stone-200'
              : 'text-stone-700 hover:text-stone-950 hover:bg-white/60'
          }`}
        >
          <KeyRound className={`w-4 h-4 ${activeProfileTab === 'auth_portal' ? 'text-emerald-700' : 'text-stone-500'}`} />
          <span>{language === 'kn' ? 'ಲಾಗಿನ್' : language === 'hi' ? 'लॉगिन' : 'Login'}</span>
        </button>
      </div>

      {/* TAB 0: OFFICIAL FARM REPORT CARD (Primary Farmer Requirement) */}
      {activeProfileTab === 'farm_report' && (
        <div className="space-y-4">
          {/* Certificate Style Card */}
          <div className="bg-white rounded-2xl border-2 border-stone-200 p-5 sm:p-7 shadow-xs space-y-6">
            {/* Certificate Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                  <Award className="w-6 h-6 text-emerald-700" />
                </div>
                <div>
                  <div className="text-[10px] font-bold tracking-widest text-emerald-800 uppercase">
                    KrishiSetu Agriculture Network · Government of India & Karnataka
                  </div>
                  <h2 className="text-base sm:text-lg font-black text-stone-950">
                    {language === 'kn'
                      ? 'ರೈತರ ಅಧಿಕೃತ ಡಿಜಿಟಲ್ ಕೃಷಿ ವರದಿ ಕಾರ್ಡ್'
                      : language === 'hi'
                      ? 'किसान आधिकारिक डिजिटल कृषि रिपोर्ट कार्ड'
                      : 'Farmer Official Digital Agriculture Report Card'}
                  </h2>
                  <p className="text-xs text-stone-500">
                    UID: KS-REP-2026-99120 · Generated on {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>100% Verified Profile</span>
                </div>
              </div>
            </div>

            {/* Farmer Key Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[11px] font-medium text-stone-500 block">
                  {language === 'kn' ? 'ಒಟ್ಟು ಜಮೀನು' : language === 'hi' ? 'कुल भूमि' : 'Total Farm Area'}
                </span>
                <span className="text-lg font-black text-stone-950 mt-0.5 block">
                  {formData.totalAreaAcres} Acres
                </span>
                <span className="text-[10px] text-stone-600 font-mono">Bhoomi Sy-44/1A</span>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[11px] font-medium text-stone-500 block">
                  {language === 'kn' ? 'ಕೃಷಿ ವಿಧಾನ' : language === 'hi' ? 'खेती का प्रकार' : 'Farming Type'}
                </span>
                <span className="text-sm font-black text-emerald-700 mt-1 block capitalize">
                  {formData.farmingType?.replace('_', ' ') || 'Certified Organic'}
                </span>
                <span className="text-[10px] text-stone-600 font-mono">KA-ORG-2024-819</span>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[11px] font-medium text-stone-500 block">
                  {language === 'kn' ? 'ಹಾಲಿನ ಉತ್ಪಾದನೆ' : language === 'hi' ? 'दैनिक दूध' : 'Dairy Milk Yield'}
                </span>
                <span className="text-lg font-black text-stone-950 mt-0.5 block">
                  {formData.dailyMilkLitres || 32} L/day
                </span>
                <span className="text-[10px] text-stone-600">Nandini KMF Dairy</span>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[11px] font-medium text-stone-500 block">
                  {language === 'kn' ? 'ಸರ್ಕಾರಿ ಸವಲತ್ತು' : language === 'hi' ? 'वार्षिक सब्सिडी' : 'Annual Subsidy'}
                </span>
                <span className="text-lg font-black text-stone-950 mt-0.5 block">
                  ₹1,92,800
                </span>
                <span className="text-[10px] text-emerald-700 font-bold">8 Schemes Active</span>
              </div>
            </div>

            {/* Section 1: Land & Soil Health Card */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-stone-950 flex items-center gap-2">
                  <Sprout className="w-4 h-4 text-emerald-700" />
                  <span>
                    {language === 'kn'
                      ? 'ಮಣ್ಣಿನ ಆರೋಗ್ಯ & ಜಮೀನು ವಿವರಗಳು'
                      : language === 'hi'
                      ? 'मृदा स्वास्थ्य कार्ड एवं भूमि विवरण'
                      : 'Soil Health Card & Land Holding Details'}
                  </span>
                </h3>
                <span className="text-[11px] font-mono text-stone-500">ICAR / Mandya KVK Lab</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-center">
                  <span className="text-[10px] font-bold text-stone-500 block">NITROGEN (N)</span>
                  <span className="text-base font-black text-stone-900 block mt-0.5">240 kg/ha</span>
                  <span className="text-[10px] font-bold text-emerald-700">Medium / Normal</span>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-center">
                  <span className="text-[10px] font-bold text-stone-500 block">PHOSPHORUS (P)</span>
                  <span className="text-base font-black text-stone-900 block mt-0.5">18 kg/ha</span>
                  <span className="text-[10px] font-bold text-emerald-700">Optimal</span>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-center">
                  <span className="text-[10px] font-bold text-stone-500 block">POTASSIUM (K)</span>
                  <span className="text-base font-black text-stone-900 block mt-0.5">320 kg/ha</span>
                  <span className="text-[10px] font-bold text-emerald-700">High / Rich</span>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-center">
                  <span className="text-[10px] font-bold text-stone-500 block">SOIL pH</span>
                  <span className="text-base font-black text-stone-900 block mt-0.5">6.8 pH</span>
                  <span className="text-[10px] font-bold text-emerald-700">Neutral (Best)</span>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-center col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-bold text-stone-500 block">ORGANIC CARBON</span>
                  <span className="text-base font-black text-stone-900 block mt-0.5">0.75%</span>
                  <span className="text-[10px] font-bold text-emerald-700">Very Good</span>
                </div>
              </div>
            </div>

            {/* Section 2: Active Crops & Plots Registered */}
            <div className="space-y-3">
              <h3 className="font-bold text-sm text-stone-950 flex items-center gap-2">
                <Sprout className="w-4 h-4 text-emerald-700" />
                <span>
                  {language === 'kn' ? 'ನೋಂದಾಯಿತ ಬೆಳೆಗಳು' : language === 'hi' ? 'दर्ज की गई फसलें' : 'Registered Crops & Plots'}
                </span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl border border-stone-200 bg-white flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-stone-950 block">Mandya Ragi (GPU-28)</span>
                    <span className="text-[11px] text-stone-500">2.5 Acres · Drip Irrigation · Flowering Stage</span>
                  </div>
                  <span className="text-xs font-black text-emerald-700 font-mono">18-22 Qtl Est.</span>
                </div>

                <div className="p-3.5 rounded-xl border border-stone-200 bg-white flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-stone-950 block">Gangavathi Sona Paddy</span>
                    <span className="text-[11px] text-stone-500">2.0 Acres · Canal Irrigated · Tillering Stage</span>
                  </div>
                  <span className="text-xs font-black text-emerald-700 font-mono">24-28 Qtl Est.</span>
                </div>
              </div>
            </div>

            {/* Section 3: Bank KYC, Kisan Credit Card & PM-Kisan */}
            <div className="space-y-3">
              <h3 className="font-bold text-sm text-stone-950 flex items-center gap-2">
                <Landmark className="w-4 h-4 text-emerald-700" />
                <span>
                  {language === 'kn' ? 'ಬ್ಯಾಂಕಿಂಗ್ & ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್' : language === 'hi' ? 'बैंक खाता व केसीसी विवरण' : 'Banking & Kisan Credit Card (KCC)'}
                </span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-[11px] text-stone-500 block">Bank & Branch</span>
                  <span className="text-xs font-bold text-stone-950 mt-0.5 block">{formData.bankName || 'State Bank of India - Mandya Main'}</span>
                  <span className="text-[10px] font-mono text-stone-500 mt-0.5 block">{formData.ifscCode || 'SBIN0001234'}</span>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-[11px] text-stone-500 block">Kisan Credit Card (KCC) Limit</span>
                  <span className="text-sm font-black text-stone-950 mt-0.5 block">₹3,00,000 (Active)</span>
                  <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">Interest Subvention 4% p.a.</span>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-[11px] text-stone-500 block">PM-Kisan DBT Status</span>
                  <span className="text-xs font-bold text-emerald-700 mt-0.5 block">Aadhaar Linked & Verified</span>
                  <span className="text-[10px] font-mono text-stone-500 mt-0.5 block">{formData.pmKisanId || 'PMK-KA-MDY-99120'}</span>
                </div>
              </div>
            </div>

            {/* Official Report Actions */}
            <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-stone-500">
                This document is certified by KrishiSetu Karnataka Digital Agri Stack.
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setActiveProfileTab('contact_land')}
                  className="flex-1 sm:flex-none h-10 px-4 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-900 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Edit3 className="w-4 h-4 text-stone-600" />
                  <span>{language === 'kn' ? 'ವಿವರ ಬದಲಾಯಿಸಿ' : language === 'hi' ? 'विवरण बदलें' : 'Edit Details'}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrintReport}
                  className="flex-1 sm:flex-none h-10 px-5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Printer className="w-4 h-4 text-white" />
                  <span>{language === 'kn' ? 'ಪ್ರಿಂಟ್ ವರದಿ' : language === 'hi' ? 'प्रिंट रिपोर्ट' : 'Print Official Report'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Login / Portal Switcher */}
      {activeProfileTab === 'auth_portal' && <AuthSection />}

      {/* TAB 1, 2, 3: Edit Profile Forms */}
      {activeProfileTab !== 'farm_report' && activeProfileTab !== 'auth_portal' && (
        <form onSubmit={handleSaveToBackend} className="space-y-4">
          {/* Tab 1: Contact & Land */}
          {activeProfileTab === 'contact_land' && (
            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-4 text-xs">
              <h3 className="font-bold text-sm text-stone-950 pb-2 border-b border-stone-100">
                {language === 'kn' ? 'ರೈತನ ಹೆಸರು & ಜಮೀನಿನ ವಿವರಗಳು' : language === 'hi' ? 'किसान का नाम व भूमि विवरण' : 'Farmer Name & Land Details'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {language === 'kn' ? 'ಪೂರ್ಣ ಹೆಸರು *' : language === 'hi' ? 'पूरा नाम *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl bg-white font-bold text-stone-950 focus:outline-none focus:border-stone-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {language === 'kn' ? 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ *' : language === 'hi' ? 'मोबाइल नंबर *' : 'Primary Phone *'}
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl bg-white font-mono text-stone-950 focus:outline-none focus:border-stone-400"
                    required
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-stone-700">
                      {language === 'kn' ? 'ಗ್ರಾಮ (Village)' : language === 'hi' ? 'गाँव' : 'Village'}
                    </label>
                    <button
                      type="button"
                      onClick={handleVoiceInputVillage}
                      className="text-xs text-stone-800 hover:text-stone-950 flex items-center gap-1 font-bold cursor-pointer"
                    >
                      <Mic className="w-3.5 h-3.5" />
                      <span>{isListening ? 'Listening...' : 'Voice'}</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl bg-white text-stone-950 focus:outline-none focus:border-stone-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {language === 'kn' ? 'ತಾಲೂಕು & ಜಿಲ್ಲೆ' : language === 'hi' ? 'तालुका व जिला' : 'Taluk & District'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={formData.taluk}
                      onChange={(e) => setFormData({ ...formData, taluk: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl bg-white text-stone-950 focus:outline-none focus:border-stone-400"
                    />
                    <input
                      type="text"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl bg-white text-stone-950 focus:outline-none focus:border-stone-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {language === 'kn' ? 'ಒಟ್ಟು ವಿಸ್ತೀರ್ಣ (ಎಕರೆ)' : language === 'hi' ? 'कुल एकड़' : 'Total Acreage'}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.totalAreaAcres}
                    onChange={(e) => setFormData({ ...formData, totalAreaAcres: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl bg-white font-mono font-bold text-stone-950 focus:outline-none focus:border-stone-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {language === 'kn' ? 'ಕೃಷಿ ವಿಧಾನ' : language === 'hi' ? 'खेती का प्रकार' : 'Farming Type'}
                  </label>
                  <select
                    value={formData.farmingType}
                    onChange={(e) => setFormData({ ...formData, farmingType: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl bg-white text-stone-950 focus:outline-none focus:border-stone-400"
                  >
                    <option value="certified_organic">Certified Organic (ಜೈವಿಕ)</option>
                    <option value="natural_farming">ZBNF Natural (ನೈಸರ್ಗಿಕ)</option>
                    <option value="conventional">Conventional (ಸಾಂಪ್ರದಾಯಿಕ)</option>
                    <option value="mixed">Integrated Mixed</option>
                  </select>
                </div>
              </div>

              {/* Farm Plots List */}
              <div className="pt-3 border-t border-stone-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-stone-900">
                    {language === 'kn' ? 'ಜಮೀನಿನ ಭಾಗಗಳು (Registered Plots)' : 'Registered Farm Plots'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowAddPlot(!showAddPlot)}
                    className="text-xs font-bold text-stone-800 hover:text-stone-950 cursor-pointer"
                  >
                    + {language === 'kn' ? 'ಭಾಗ ಸೇರಿಸಿ' : 'Add Plot'}
                  </button>
                </div>

                {showAddPlot && (
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2 text-xs">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Plot Name (e.g. North Acre)"
                        value={newPlotName}
                        onChange={(e) => setNewPlotName(e.target.value)}
                        className="px-3 py-1.5 text-xs bg-white border border-stone-200 rounded-lg text-stone-950"
                      />
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Area (Acres)"
                        value={newPlotArea}
                        onChange={(e) => setNewPlotArea(Number(e.target.value))}
                        className="px-3 py-1.5 text-xs bg-white border border-stone-200 rounded-lg font-mono text-stone-950"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleCreatePlot}
                      className="w-full py-2 bg-stone-900 text-white rounded-lg font-bold text-xs hover:bg-stone-800 cursor-pointer"
                    >
                      Confirm Add Plot
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {plots.map((p) => (
                    <div key={p.id} className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-stone-950">{p.name}</span>
                        <span className="text-stone-500 ml-1.5">({p.areaAcre} Ac · {p.soilType})</span>
                      </div>
                      <span className="text-xs text-stone-700 font-bold">{p.irrigation}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Crops & Dairy */}
          {activeProfileTab === 'crops_dairy' && (
            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-4 text-xs">
              <h3 className="font-bold text-sm text-stone-950 pb-2 border-b border-stone-100">
                {language === 'kn' ? 'ಬೆಳೆಗಳು & ಹೈನುಗಾರಿಕೆ ಮಾಹಿತಿ' : language === 'hi' ? 'फसलें एवं डेयरी पशुपालन' : 'Crops & Dairy Livestock'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Organic Certificate ID
                  </label>
                  <input
                    type="text"
                    value={formData.organicCertificateNumber || ''}
                    onChange={(e) => setFormData({ ...formData, organicCertificateNumber: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl bg-white font-mono text-stone-950"
                    placeholder="KA-ORG-2024-..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Dairy Livestock (Cattle Count)
                  </label>
                  <input
                    type="number"
                    value={formData.cattleCount || 0}
                    onChange={(e) => setFormData({ ...formData, cattleCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl bg-white font-mono text-stone-950"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Cattle Breeds
                  </label>
                  <input
                    type="text"
                    value={formData.cattleBreeds || ''}
                    onChange={(e) => setFormData({ ...formData, cattleBreeds: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl bg-white text-stone-950"
                    placeholder="Hallikar / HF Cross"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Daily Milk Yield (Litres)
                  </label>
                  <input
                    type="number"
                    value={formData.dailyMilkLitres || 0}
                    onChange={(e) => setFormData({ ...formData, dailyMilkLitres: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl bg-white font-mono text-stone-950"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Banking & KYC */}
          {activeProfileTab === 'banking' && (
            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-4 text-xs">
              <h3 className="font-bold text-sm text-stone-950 pb-2 border-b border-stone-100">
                {language === 'kn' ? 'ಬ್ಯಾಂಕ್ ಖಾತೆ & ಸರ್ಕಾರಿ ID' : language === 'hi' ? 'बैंक खाता व सरकारी पहचान' : 'Banking & Government KYC'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Bank Name & Branch
                  </label>
                  <input
                    type="text"
                    value={formData.bankName || ''}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl bg-white text-stone-950"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Account Number (Masked)
                  </label>
                  <input
                    type="text"
                    value={formData.maskedAccountNumber || ''}
                    onChange={(e) => setFormData({ ...formData, maskedAccountNumber: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl bg-white font-mono text-stone-950"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    value={formData.ifscCode || ''}
                    onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl bg-white font-mono text-stone-950"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    PM-Kisan Registration ID (GoI)
                  </label>
                  <input
                    type="text"
                    value={formData.pmKisanId || ''}
                    onChange={(e) => setFormData({ ...formData, pmKisanId: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl bg-white font-mono text-stone-950"
                    placeholder="PMK-KA-MDY-..."
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Karnataka FRUITS Farmer ID (FID)
                  </label>
                  <input
                    type="text"
                    value={formData.pmKisanId ? `FID-${formData.pmKisanId.replace('PMK-', '')}` : 'FID-KA-MDY-99120'}
                    readOnly
                    className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl bg-stone-100 font-mono text-stone-800"
                  />
                </div>
              </div>

              {/* Scheme Eligibility Tag */}
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span className="font-bold text-stone-950">
                    {language === 'kn' ? '8 ಸರ್ಕಾರಿ ಯೋಜನೆಗಳಿಗೆ ಪರಿಶೀಲಿತವಾಗಿದೆ' : language === 'hi' ? '8 सरकारी योजनाओं के लिए सत्यापित' : 'Verified for 8 Central & Karnataka Govt Schemes'}
                  </span>
                </div>
                <span className="text-xs bg-stone-200 text-stone-900 font-black px-2 py-0.5 rounded-md font-mono">
                  ~₹1,92,800/yr
                </span>
              </div>
            </div>
          )}

          {/* Primary Save Action Button (Pure Crisp Stone-900 / No Orange) */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="w-full h-11 rounded-xl bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white font-black text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-colors"
            >
              <Save className="w-4 h-4 text-white" />
              <span>
                {isSaving
                  ? (language === 'kn' ? 'ಬ್ಯಾಕೆಂಡ್‌ಗೆ ಉಳಿಸಲಾಗುತ್ತಿದೆ...' : language === 'hi' ? 'सहेज रहे हैं...' : 'Saving to Server...')
                  : (language === 'kn' ? 'ವಿವರಗಳನ್ನು ಉಳಿಸಿ (Save to Server)' : language === 'hi' ? 'प्रोफाइल सहेजें' : 'Save Profile Changes to Server')}
              </span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
