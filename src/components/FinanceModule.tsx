import React, { useState } from 'react';
import {
  Landmark,
  ShieldCheck,
  Lock,
  Eye,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  XCircle,
  RefreshCw,
  ExternalLink,
  Search,
  Building2,
  Award,
  Sparkles,
  HelpCircle,
  Copy,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GovernmentScheme } from '../data/realGovernmentSchemes';

export const FinanceModule: React.FC = () => {
  const {
    financeProducts,
    applications,
    applyForFinance,
    consents,
    revokeConsent,
    language,
    farmerExtendedProfile,
    governmentSchemes,
    governmentMSP,
    govtAnnouncements,
    isGovtFetching,
    lastGovtSyncTime,
    autoFetchGovtSchemes,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'schemes' | 'msp' | 'products' | 'tracker' | 'consent_ledger'>('schemes');
  const [schemeFilter, setSchemeFilter] = useState<'all' | 'karnataka' | 'central' | 'eligible'>('eligible');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScheme, setSelectedScheme] = useState<GovernmentScheme | null>(null);
  const [isDossierModalOpen, setIsDossierModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [loanAmount, setLoanAmount] = useState(100000);
  const [consentedFields, setConsentedFields] = useState<string[]>([
    `Farm Plot Acreage (${farmerExtendedProfile?.totalAreaAcres || 7.3} Acres)`,
    'Declared Crop: Ragi GPU-28 & Paddy BPT-5204',
    `Taluk Code: ${farmerExtendedProfile?.taluk || 'Maddur'} (${farmerExtendedProfile?.district || 'Mandya'})`,
    `FRUITS FID: ${farmerExtendedProfile?.pmKisanId || 'FID-KA-MDY-99120'}`,
  ]);
  const [hasConfirmedTerms, setHasConfirmedTerms] = useState(false);
  const [applySuccessMsg, setApplySuccessMsg] = useState('');
  const [copiedText, setCopiedText] = useState(false);

  const currentProduct = financeProducts.find((p) => p.id === selectedProductId);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct || !hasConfirmedTerms) return;

    applyForFinance(currentProduct.id, Number(loanAmount), consentedFields);
    setApplySuccessMsg(
      language === 'kn'
        ? `${currentProduct.title} ಅರ್ಜಿ ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಕೆಯಾಗಿದೆ!`
        : `Application submitted for ${currentProduct.title}!`
    );
    setSelectedProductId(null);
    setHasConfirmedTerms(false);
    setTimeout(() => setApplySuccessMsg(''), 5000);
  };

  // Filter schemes
  const filteredSchemes = governmentSchemes.filter((scheme) => {
    // 1. Level filter
    if (schemeFilter === 'karnataka' && scheme.level !== 'karnataka_state') return false;
    if (schemeFilter === 'central' && scheme.level !== 'central') return false;
    if (schemeFilter === 'eligible') {
      const el = scheme.checkEligibility(farmerExtendedProfile);
      if (!el.isEligible) return false;
    }

    // 2. Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const inTitleEn = scheme.titleEn.toLowerCase().includes(q);
      const inTitleKn = scheme.titleKn.toLowerCase().includes(q);
      const inBenefit = scheme.benefitAmount.toLowerCase().includes(q);
      const inTags = scheme.tags.some((t) => t.toLowerCase().includes(q));
      if (!inTitleEn && !inTitleKn && !inBenefit && !inTags) return false;
    }

    return true;
  });

  // Calculate total estimated annual entitlement for this farmer
  const totalEligibleEntitlement = governmentSchemes.reduce((sum, scheme) => {
    const el = scheme.checkEligibility(farmerExtendedProfile);
    return sum + (el.estimatedAmountInr || 0);
  }, 0);

  const copyFarmerDossier = (scheme: GovernmentScheme) => {
    const text = `KRISHISETU DOSSIER FOR ${scheme.titleEn.toUpperCase()}
Farmer: ${farmerExtendedProfile.name}
Phone: ${farmerExtendedProfile.phone}
Village: ${farmerExtendedProfile.village}, ${farmerExtendedProfile.taluk}, ${farmerExtendedProfile.district}
Acreage: ${farmerExtendedProfile.totalAreaAcres} Acres
FRUITS FID: ${farmerExtendedProfile.pmKisanId}
Crops: Ragi GPU-28 & Paddy BPT-5204 (Certified Organic)
Livestock: 4 Indigenous Cattle (${farmerExtendedProfile.dailyMilkLitres} L/day)
Bank: ${farmerExtendedProfile.bankName} (IFSC: ${farmerExtendedProfile.ifscCode})
Official Portal: ${scheme.officialPortalUrl}`;

    navigator.clipboard?.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 3000);
  };

  return (
    <div className="space-y-2 pb-16 md:pb-4 max-w-5xl mx-auto">
      {/* 1. Header Bar with Auto-Fetch live sync indicator */}
      <div className="bg-white rounded-xl p-2.5 border border-stone-200 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="p-1 rounded-md bg-stone-100 text-stone-800">
                <Building2 className="w-4 h-4" />
              </span>
              <h1 className="text-sm sm:text-base font-bold text-stone-900 leading-tight">
                {language === 'kn' ? 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು & ಕೃಷಿ ಸಾಲ' : 'Real Govt Schemes & Subsidized Credit'}
              </h1>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-stone-500 mt-0.5">
              <span className="inline-flex items-center gap-1 text-stone-800 font-semibold bg-stone-50 px-1.5 py-0.2 rounded border border-stone-200">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-900 animate-none"></span>
                {language === 'kn' ? 'ಲೈವ್ ಅಪ್‌ಡೇಟ್: ಭಾರತ & ಕರ್ನಾಟಕ ಸರ್ಕಾರ' : 'Real Data: GoI & Karnataka Portals'}
              </span>
              <span className="truncate hidden sm:inline">· {lastGovtSyncTime}</span>
            </div>
          </div>

          {/* Auto-Fetch Action Button */}
          <button
            type="button"
            disabled={isGovtFetching}
            onClick={() => autoFetchGovtSchemes(true)}
            className="self-start sm:self-auto h-7 px-2.5 rounded-lg text-[10px] font-bold bg-stone-900 text-white hover:bg-stone-800 disabled:opacity-50 flex items-center gap-1.5 cursor-pointer shadow-2xs"
            title="Automatically query and fetch real updates from Indian & Karnataka Govt Portals"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGovtFetching ? 'animate-spin' : ''}`} />
            <span>
              {isGovtFetching
                ? language === 'kn' ? 'ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...' : 'Auto-Fetching...'
                : language === 'kn' ? 'ಸರ್ಕಾರಿ ಯೋಜನೆ ಅಪ್‌ಡೇಟ್' : 'Auto-Fetch Live Govt Data'}
            </span>
          </button>
        </div>

        {/* Live official notices ribbon */}
        {govtAnnouncements && govtAnnouncements.length > 0 && (
          <div className="mt-2 pt-2 border-t border-stone-200 flex items-center gap-2 overflow-x-auto text-[10px]">
            <span className="shrink-0 font-bold text-stone-900 bg-stone-100/90 px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider">
              {language === 'kn' ? 'ತಾಜಾ ಮಾಹಿತಿ' : 'Govt Circular'}
            </span>
            <div className="flex items-center gap-2 whitespace-nowrap text-stone-700">
              {govtAnnouncements.slice(0, 3).map((ann, idx) => (
                <a
                  key={ann.id || idx}
                  href={ann.portalUrl || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-stone-800 hover:underline flex items-center gap-1 border-r border-stone-200 pr-2 last:border-0"
                >
                  <span className="font-semibold">{language === 'kn' && ann.titleKn ? ann.titleKn : ann.title}</span>
                  <ExternalLink className="w-2.5 h-2.5 text-stone-700 shrink-0" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {applySuccessMsg && (
        <div className="p-2 bg-stone-100/90 border border-stone-300 text-stone-950 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-stone-700 shrink-0" />
          <span>{applySuccessMsg}</span>
        </div>
      )}

      {/* 2. Top Sub-Tabs Navigation */}
      <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl border border-stone-200 text-xs font-semibold overflow-x-auto">
        {[
          {
            id: 'schemes',
            labelEn: `Govt Schemes (${governmentSchemes.length})`,
            labelKn: `ಸರ್ಕಾರಿ ಯೋಜನೆ (${governmentSchemes.length})`,
          },
          {
            id: 'msp',
            labelEn: `Real MSP Rates (${governmentMSP.length})`,
            labelKn: `ಬೆಂಬಲ ಬೆಲೆ (${governmentMSP.length})`,
          },
          {
            id: 'products',
            labelEn: 'KCC & Bank Loans',
            labelKn: 'ಕೆಸಿಸಿ & ಸಾಲ',
          },
          {
            id: 'tracker',
            labelEn: `My Applications (${applications.length})`,
            labelKn: `ನನ್ನ ಅರ್ಜಿ (${applications.length})`,
          },
          {
            id: 'consent_ledger',
            labelEn: 'Data Permissions',
            labelKn: 'ಮಾಹಿತಿ ಸಮ್ಮತಿ',
          },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 h-7.5 rounded-lg whitespace-nowrap px-3 text-center cursor-pointer transition-colors ${
              activeTab === tab.id
                ? 'bg-stone-900 text-white font-bold shadow-xs'
                : 'text-stone-700 hover:text-stone-950 hover:bg-white'
            }`}
          >
            {language === 'kn' ? tab.labelKn : tab.labelEn}
          </button>
        ))}
      </div>

      {/* =========================================================================
          TAB 1: REAL GOVERNMENT SCHEMES & SUBSIDIES
      ========================================================================= */}
      {activeTab === 'schemes' && (
        <div className="space-y-2">
          {/* Personalized Eligibility Summary Card */}
          <div className="bg-stone-50 rounded-xl p-2.5 border border-stone-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-stone-950">
                  {farmerExtendedProfile?.name || 'Ningappa Gowda'}
                </span>
                <span className="text-[9px] bg-stone-200 text-stone-900 font-bold px-1.5 py-0.2 rounded">
                  {farmerExtendedProfile?.totalAreaAcres || 7.3} {language === 'kn' ? 'ಎಕರೆ' : 'Acres'} · {farmerExtendedProfile?.district || 'Mandya'}
                </span>
                <span className="text-[9px] bg-white text-stone-800 font-semibold px-1 py-0.2 rounded border border-stone-200">
                  {farmerExtendedProfile?.farmingType === 'certified_organic' ? (language === 'kn' ? 'ಸಾವಯವ ಪ್ರಮಾಣಿತ' : 'Organic Certified') : 'Verified'}
                </span>
              </div>
              <p className="text-[10px] text-stone-600 mt-0.5">
                {language === 'kn'
                  ? 'ನಿಮ್ಮ ಜಮೀನು ಮತ್ತು ಬೆಳೆ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ 8 ಸರ್ಕಾರಿ ಯೋಜನೆಗಳಿಗೆ ನೇರ ಸಬ್ಸಿಡಿ ಗುರುತಿಸಲಾಗಿದೆ.'
                  : 'Based on your verified land holding and crops, you qualify for 8 direct government schemes.'}
              </p>
            </div>
            <div className="text-left sm:text-right shrink-0 bg-white/80 px-2.5 py-1.5 rounded-lg border border-stone-200">
              <span className="text-[9px] uppercase tracking-wider text-stone-500 font-bold block">
                {language === 'kn' ? 'ವಾರ್ಷಿಕ ಒಟ್ಟು ಸಬ್ಸಿಡಿ ಅಂದಾಜು' : 'Est. Annual Subsidies'}
              </span>
              <span className="text-base font-extrabold text-stone-800 font-mono">
                ₹{totalEligibleEntitlement.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Filter Chips & Search Bar */}
          <div className="flex flex-col sm:flex-row gap-1.5 items-stretch sm:items-center justify-between">
            {/* Filter pills */}
            <div className="flex items-center gap-1 overflow-x-auto text-[10px] font-bold">
              {[
                { id: 'eligible', labelEn: 'Eligible for My Land', labelKn: 'ನನ್ನ ಜಮೀನಿಗೆ ಅರ್ಹ' },
                { id: 'all', labelEn: `All Schemes (${governmentSchemes.length})`, labelKn: `ಎಲ್ಲಾ (${governmentSchemes.length})` },
                { id: 'karnataka', labelEn: 'Karnataka State (6)', labelKn: 'ಕರ್ನಾಟಕ ಸರ್ಕಾರ (6)' },
                { id: 'central', labelEn: 'Central GoI (6)', labelKn: 'ಕೇಂದ್ರ ಸರ್ಕಾರ (6)' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setSchemeFilter(f.id as any)}
                  className={`h-6.5 px-2.5 rounded-md whitespace-nowrap cursor-pointer ${
                    schemeFilter === f.id
                      ? 'bg-stone-900 text-white shadow-2xs font-bold'
                      : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {language === 'kn' ? f.labelKn : f.labelEn}
                </button>
              ))}
            </div>

            {/* Quick Search */}
            <div className="relative shrink-0 sm:w-48">
              <Search className="w-3 h-3 absolute left-2 top-2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'kn' ? 'ಬೆಳೆ ಅಥವಾ ಯೋಜನೆಯ ಹೆಸರು...' : 'Search schemes / crops...'}
                className="w-full h-6.5 pl-6 pr-2 text-[10px] bg-white border border-stone-200 rounded-md focus:outline-none focus:border-stone-900"
              />
            </div>
          </div>

          {/* Scheme Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {filteredSchemes.map((scheme) => {
              const eligibility = scheme.checkEligibility(farmerExtendedProfile);
              return (
                <div
                  key={scheme.id}
                  className="bg-white rounded-xl p-2.5 border border-stone-200 shadow-2xs space-y-1.5 flex flex-col justify-between hover:border-stone-400"
                >
                  <div className="space-y-1">
                    {/* Level Badge & Ministry */}
                    <div className="flex items-start justify-between gap-1">
                      <div className="flex items-center gap-1 flex-wrap">
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${
                            scheme.level === 'karnataka_state'
                              ? 'bg-amber-50 text-amber-900 border-amber-300'
                              : 'bg-stone-50 text-stone-950 border-stone-300'
                          }`}
                        >
                          {scheme.level === 'karnataka_state'
                            ? language === 'kn' ? '🏛️ ಕರ್ನಾಟಕ ಸರ್ಕಾರ' : '🏛️ Govt of Karnataka'
                            : language === 'kn' ? '🇮🇳 ಭಾರತ ಸರ್ಕಾರ' : '🇮🇳 Govt of India'}
                        </span>
                        <span className="text-[9px] text-stone-400 font-mono">
                          {scheme.notificationNumber}
                        </span>
                      </div>

                      {/* Eligibility tag */}
                      {eligibility.isEligible ? (
                        <span className="text-[9px] font-extrabold text-stone-900 bg-stone-100 px-1.5 py-0.2 rounded shrink-0">
                          {language === 'kn' ? 'ಅರ್ಹರು ✓' : 'Eligible ✓'}
                        </span>
                      ) : (
                        <span className="text-[9px] text-stone-400 font-medium px-1 py-0.2 rounded bg-stone-100 shrink-0">
                          {language === 'kn' ? 'ಮಾನದಂಡ ಪರಿಶೀಲಿಸಿ' : 'Check Criteria'}
                        </span>
                      )}
                    </div>

                    {/* Scheme Title */}
                    <div>
                      <h3 className="font-bold text-xs text-stone-900 leading-snug">
                        {language === 'kn' ? scheme.titleKn : scheme.titleEn}
                      </h3>
                      <div className="text-[9px] text-stone-500 truncate">
                        {language === 'kn' ? scheme.ministryKn : scheme.ministry}
                      </div>
                    </div>

                    {/* Benefit Highlight Box */}
                    <div className="p-1.5 bg-stone-50/70 rounded-lg border border-stone-200 text-[10px] space-y-0.5">
                      <span className="text-[8px] font-bold uppercase tracking-wider text-stone-900 block">
                        {language === 'kn' ? 'ಸಹಾಯಧನ ಮೊತ್ತ & ಸೌಲಭ್ಯ' : 'Subsidy & Direct Benefit'}
                      </span>
                      <p className="font-extrabold text-stone-900 text-[11px] leading-tight">
                        {language === 'kn' ? scheme.benefitAmountKn : scheme.benefitAmount}
                      </p>
                    </div>

                    {/* Eligibility reason badge */}
                    <div className="text-[10px] text-stone-600 flex items-start gap-1">
                      <CheckCircle2 className="w-3 h-3 text-stone-700 shrink-0 mt-0.5" />
                      <span className="text-[10px]">
                        {language === 'kn' ? eligibility.reasonKn : eligibility.reasonEn}
                      </span>
                    </div>

                    {/* Documents required chips */}
                    <div className="flex items-center gap-1 flex-wrap pt-0.5">
                      <span className="text-[8px] text-stone-400 font-bold uppercase">
                        {language === 'kn' ? 'ದಾಖಲೆಗಳು:' : 'Docs:'}
                      </span>
                      {(language === 'kn' ? scheme.documentsRequiredKn : scheme.documentsRequired).slice(0, 3).map((doc, i) => (
                        <span
                          key={i}
                          className="text-[9px] bg-stone-50 text-stone-600 px-1 py-0.2 rounded border border-stone-200"
                        >
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center justify-between gap-1.5 pt-1.5 border-t border-stone-200 text-[10px]">
                    <a
                      href={scheme.officialPortalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-stone-800 hover:text-stone-950 underline underline-offset-2"
                      title={scheme.officialPortalName}
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>{scheme.officialPortalName}</span>
                    </a>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedScheme(scheme);
                          setIsDossierModalOpen(true);
                        }}
                        className="h-6 px-2 rounded-md font-bold bg-stone-900 text-white hover:bg-stone-800 cursor-pointer shadow-2xs"
                      >
                        {language === 'kn' ? 'ಅರ್ಜಿ ಡಾಸಿಯರ್' : 'Apply via Dossier'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredSchemes.length === 0 && (
            <div className="bg-white rounded-xl p-4 text-center border border-stone-200 text-stone-500 text-xs">
              {language === 'kn' ? 'ಯಾವುದೇ ಯೋಜನೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ.' : 'No schemes match your filter or search query.'}
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 2: REAL MANDATED MINIMUM SUPPORT PRICES (MSP)
      ========================================================================= */}
      {activeTab === 'msp' && (
        <div className="bg-white rounded-xl p-2.5 border border-stone-200 shadow-2xs space-y-2">
          <div className="flex items-start justify-between gap-2 border-b border-stone-200 pb-2">
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-stone-700" />
                <span>
                  {language === 'kn' ? 'ಅಧಿಕೃತ ಕನಿಷ್ಠ ಬೆಂಬಲ ಬೆಲೆ (MSP ದರಗಳು)' : 'Official Real MSP Rates (CACP & Karnataka)'}
                </span>
              </h2>
              <p className="text-[10px] text-stone-500">
                {language === 'kn'
                  ? 'ಭಾರತ ಸರ್ಕಾರದ ಕೃಷಿ ವೆಚ್ಚ ಮತ್ತು ಬೆಲೆಗಳ ಆಯೋಗ (CACP) ನಿಗದಿಪಡಿಸಿದ ಕನಿಷ್ಠ ಬೆಂಬಲ ಬೆಲೆ ಹಾಗೂ ರಾಜ್ಯ ಬೋನಸ್.'
                  : 'Commission for Agricultural Costs & Prices (CACP) notified Kharif & Rabi floor prices with Karnataka State bonus.'}
              </p>
            </div>
            <span className="text-[9px] bg-stone-100 text-stone-950 font-bold px-2 py-0.5 rounded">
              2024-2025 Mandated
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50 text-[10px] text-stone-600 font-bold uppercase">
                  <th className="py-1 px-2">{language === 'kn' ? 'ಬೆಳೆ' : 'Crop'}</th>
                  <th className="py-1 px-2">{language === 'kn' ? 'ತಳಿ' : 'Variety'}</th>
                  <th className="py-1 px-2 text-right">{language === 'kn' ? 'MSP ಬೆಲೆ (ಕ್ವಿಂಟಾಲ್)' : 'MSP (₹/Qtl)'}</th>
                  <th className="py-1 px-2 text-right">{language === 'kn' ? 'ಕರ್ನಾಟಕ ಬೋನಸ್' : 'State Bonus'}</th>
                  <th className="py-1 px-2">{language === 'kn' ? 'ಖರೀದಿ ಸಂಸ್ಥೆ' : 'Nodal Agency'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-[11px]">
                {governmentMSP.map((item, idx) => (
                  <tr key={idx} className="hover:bg-stone-100/30">
                    <td className="py-1.5 px-2 font-bold text-stone-900">
                      {language === 'kn' ? item.commodityKn : item.commodity}
                    </td>
                    <td className="py-1.5 px-2 text-[10px] text-stone-500">{item.variety}</td>
                    <td className="py-1.5 px-2 text-right font-mono font-extrabold text-stone-800">
                      ₹{item.mspPriceInrPerQuintal.toLocaleString()}
                    </td>
                    <td className="py-1.5 px-2 text-right font-mono text-[10px] text-stone-600">
                      {item.karnatakaBonusInr ? (
                        <span className="text-stone-900 font-bold bg-stone-100/80 px-1 py-0.2 rounded">
                          +₹{item.karnatakaBonusInr}
                        </span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="py-1.5 px-2 text-[10px] text-stone-600">
                      {language === 'kn' ? item.procurementAgencyKn : item.procurementAgency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: KCC & BANK LOAN PRODUCTS
      ========================================================================= */}
      {activeTab === 'products' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {financeProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl p-2.5 border border-stone-200 shadow-2xs space-y-1.5 hover:border-stone-400"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-xs text-stone-900">
                    {language === 'kn' ? p.titleKn : p.title}
                  </h3>
                  <div className="text-[10px] text-stone-500 font-medium">
                    {p.institutionName} · {p.productType.replace('_', ' ').toUpperCase()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-extrabold text-xs text-stone-800">
                    {p.interestRateAnnualPct}% p.a.
                  </div>
                  <span className="text-[9px] text-stone-500">
                    {p.subsidizedRatePct ? `${p.subsidizedRatePct}% Subsidized` : 'Standard'}
                  </span>
                </div>
              </div>

              <p className="text-[10px] text-stone-600">{p.processingFeeText}</p>

              <div className="flex items-center justify-between text-[10px] pt-1 border-t border-stone-200">
                <span className="text-stone-500 font-medium">Max Limit: ₹{p.maxAmountInr.toLocaleString()}</span>
                <button
                  type="button"
                  onClick={() => setSelectedProductId(p.id)}
                  className="h-6.5 px-2.5 rounded-md text-[10px] font-bold bg-stone-900 text-white hover:bg-stone-800 cursor-pointer shadow-2xs"
                >
                  {language === 'kn' ? 'ಅರ್ಜಿ ಸಲ್ಲಿಸಿ' : 'Apply'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =========================================================================
          TAB 4: APPLICATIONS TRACKER
      ========================================================================= */}
      {activeTab === 'tracker' && (
        <div className="space-y-1.5">
          {applications.map((app) => (
            <div key={app.id} className="bg-white rounded-xl p-2.5 border border-stone-200 shadow-2xs space-y-1 text-xs">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-stone-900">{app.productTitle}</div>
                  <div className="text-[10px] text-stone-500">
                    Applied: {app.appliedDate} · Tracking ID: {app.applicationNumber || app.id}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-xs text-stone-800">
                    ₹{app.requestedAmountInr.toLocaleString()}
                  </div>
                  <span className="text-[9px] bg-stone-100 text-stone-950 px-1.5 py-0.2 rounded font-bold uppercase">
                    {app.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =========================================================================
          TAB 5: DATA CONSENT LEDGER
      ========================================================================= */}
      {activeTab === 'consent_ledger' && (
        <div className="bg-white rounded-xl p-3 border border-stone-200 shadow-2xs space-y-2 text-xs">
          <div className="flex items-center justify-between pb-1 border-b border-stone-200">
            <span className="font-bold text-stone-900">Your Explicit Data Permissions</span>
            <span className="text-[10px] text-stone-800 font-semibold">DPDP Act Compliant</span>
          </div>

          <div className="space-y-1.5">
            {consents.map((c) => (
              <div key={c.id} className="p-2 bg-stone-50 rounded-lg border border-stone-200 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-stone-900 text-[11px]">{c.recipientName}</div>
                  <div className="text-[10px] text-stone-500">Shared: {c.dataCategoriesShared.join(', ')}</div>
                </div>
                {c.isActive ? (
                  <button
                    type="button"
                    onClick={() => revokeConsent(c.id)}
                    className="px-2 py-0.5 rounded bg-white border border-red-300 text-red-600 font-bold text-[10px] hover:bg-red-50 cursor-pointer"
                  >
                    Revoke
                  </button>
                ) : (
                  <span className="text-[10px] text-stone-400 font-bold">REVOKED</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 1: PRE-FILLED GOVERNMENT SCHEME DOSSIER MODAL
      ========================================================================= */}
      {isDossierModalOpen && selectedScheme && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white rounded-2xl max-w-md w-full p-3.5 border border-stone-200 shadow-xl space-y-2.5 text-xs">
            <div className="flex items-center justify-between border-b border-stone-200 pb-1.5">
              <div>
                <span className="text-[9px] font-bold text-stone-900 uppercase">
                  {selectedScheme.level === 'karnataka_state' ? 'Govt of Karnataka' : 'Govt of India'}
                </span>
                <h3 className="font-bold text-stone-900 text-xs sm:text-sm">
                  {language === 'kn' ? selectedScheme.titleKn : selectedScheme.titleEn}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsDossierModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-2 bg-stone-50/80 rounded-lg border border-stone-200 text-[10px] space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-bold text-stone-950">
                  {language === 'kn' ? 'ರೈತರ ಪರಿಶೀಲಿತ ಅರ್ಜಿ ಡಾಸಿಯರ್' : 'Pre-Filled Farmer Dossier'}
                </span>
                <span className="font-mono text-[9px] text-stone-500">
                  FRUITS FID: {farmerExtendedProfile?.pmKisanId}
                </span>
              </div>
              <p className="text-stone-700">
                <strong>{farmerExtendedProfile?.name}</strong> · {farmerExtendedProfile?.totalAreaAcres} Acres ({farmerExtendedProfile?.ownershipTenure || 'Owner'}) · {farmerExtendedProfile?.village}, {farmerExtendedProfile?.taluk}, {farmerExtendedProfile?.district}
              </p>
              <p className="text-stone-600">
                {language === 'kn'
                  ? 'ಈ ಡಾಸಿಯರ್ ಅನ್ನು ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್ ಅಥವಾ ಗ್ರಾಮ ಒನ್ / ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರದಲ್ಲಿ ಸಲ್ಲಿಸಲು ಬಳಸಬಹುದು.'
                  : 'This verified dossier contains land coordinates, crop survey confirmation, and IFSC details ready for 1-click submission.'}
              </p>
            </div>

            <div className="space-y-1 text-[10px]">
              <div className="font-bold text-stone-800">
                {language === 'kn' ? 'ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಅಗತ್ಯ ದಾಖಲೆಗಳು:' : 'Documents Checklist:'}
              </div>
              <ul className="list-disc pl-4 text-stone-600 space-y-0.5">
                {(language === 'kn' ? selectedScheme.documentsRequiredKn : selectedScheme.documentsRequired).map((doc, idx) => (
                  <li key={idx}>{doc}</li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between gap-1.5 pt-1 border-t border-stone-200">
              <button
                type="button"
                onClick={() => copyFarmerDossier(selectedScheme)}
                className="h-7 px-2.5 rounded-md text-[10px] font-bold bg-white border border-stone-300 text-stone-900 hover:bg-stone-100 flex items-center gap-1 cursor-pointer"
              >
                <Copy className="w-3 h-3 text-stone-700" />
                <span>{copiedText ? (language === 'kn' ? 'ಕಾಪಿ ಮಾಡಲಾಗಿದೆ!' : 'Copied!') : (language === 'kn' ? 'ಡಾಸಿಯರ್ ಕಾಪಿ ಮಾಡಿ' : 'Copy Dossier')}</span>
              </button>

              <a
                href={selectedScheme.officialPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-7 px-3 rounded-md text-[10px] font-bold bg-stone-900 text-white hover:bg-stone-800 flex items-center gap-1 cursor-pointer shadow-2xs"
              >
                <span>{language === 'kn' ? 'ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ಗೆ ಹೋಗಿ' : 'Open Portal to Apply'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: APPLICATION DIALOG FOR LOANS
      ========================================================================= */}
      {selectedProductId && currentProduct && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white rounded-2xl max-w-sm w-full p-3.5 border border-stone-200 shadow-xl space-y-2.5 text-xs">
            <div className="flex items-center justify-between border-b border-stone-200 pb-1.5">
              <h3 className="font-bold text-stone-900">Apply: {currentProduct.title}</h3>
              <button
                type="button"
                onClick={() => setSelectedProductId(null)}
                className="text-stone-400 hover:text-stone-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-2">
              <div>
                <label className="block text-[10px] font-bold text-stone-700 mb-0.5">Loan Amount (₹):</label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full px-2 py-1 text-xs border border-stone-300 rounded font-mono"
                />
              </div>

              <div className="p-2 bg-stone-50/70 rounded border border-stone-200 text-[10px] space-y-1">
                <strong>Data you agree to share:</strong>
                <ul className="list-disc pl-4 text-stone-600">
                  {consentedFields.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>

              <label className="flex items-center gap-1.5 text-[10px] text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasConfirmedTerms}
                  onChange={(e) => setHasConfirmedTerms(e.target.checked)}
                  className="rounded text-stone-700"
                />
                <span>I consent to share the selected agricultural data for credit evaluation.</span>
              </label>

              <div className="flex justify-end gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedProductId(null)}
                  className="px-2.5 py-1 text-xs rounded border border-stone-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!hasConfirmedTerms}
                  className="px-3 py-1 text-xs font-bold bg-stone-900 text-white rounded disabled:opacity-40"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
