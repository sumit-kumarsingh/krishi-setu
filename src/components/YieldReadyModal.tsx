import React, { useState, useEffect } from 'react';
import {
  X,
  Truck,
  Building2,
  FileCheck,
  CheckCircle2,
  Mic,
  MapPin,
  Clock,
  QrCode,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  PackageCheck,
  Play,
  RotateCcw,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface YieldReadyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTraceability?: () => void;
}

export const YieldReadyModal: React.FC<YieldReadyModalProps> = ({
  isOpen,
  onClose,
  onOpenTraceability,
}) => {
  const { language, speakText, currentUser, addAuditLog, setActiveTab } = useApp();

  const [isListeningVoice, setIsListeningVoice] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<'tur' | 'ragi' | 'paddy'>('tur');
  const [lotQuantity, setLotQuantity] = useState(45);
  const [pickupSlot, setPickupSlot] = useState('Today (Within 2 Hours)');
  const [gpsLocation, setGpsLocation] = useState('17.1895° N, 76.8421° E (Somanathahalli, Kalaburagi)');
  const [isLocating, setIsLocating] = useState(false);

  // Workflow progress states
  const [executionPhase, setExecutionPhase] = useState<'idle' | 'running' | 'completed'>('idle');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = [
    {
      title: language === 'kn' ? 'ತೋಟದ ಮನೆಗೆ ವಾಹನ ನಿಯೋಜನೆ' : 'Farm-Gate Transport Dispatched',
      subtext: language === 'kn'
        ? 'ಕಲ್ಯಾಣ ಕರ್ನಾಟಕ ಅಗ್ರಿ ಫ್ಲೀಟ್ ಟ್ರಕ್ (KA-32-EA-8841) ಸಿದ್ಧವಾಗಿದೆ. ಚಾಲಕ: ಶರಣಪ್ಪ'
        : 'Kalyana Karnataka Agri Fleet Truck (KA-32-EA-8841) en route. Driver: Sharanappa',
      statusDetail: 'ETA: 32 mins · Farm-gate pickup',
      icon: Truck,
    },
    {
      title: language === 'kn' ? 'WDRA ಉಗ್ರಾಣ ಕಾಯ್ದಿರಿಸುವಿಕೆ' : 'WDRA Warehouse Slot Secured',
      subtext: language === 'kn'
        ? 'ಕರ್ನಾಟಕ ರಾಜ್ಯ ಉಗ್ರಾಣ ನಿಗಮ - ಫರ್ಹತಾಬಾದ್ ಹಬ್, ಬೇ #04 ನಲ್ಲಿ ಸ್ಥಳ ಮೀಸಲಿಡಲಾಗಿದೆ'
        : 'Karnataka State Warehousing Corp - Farhatabad Hub, Bay #04 slot reserved',
      statusDetail: 'WDRA Reg #KA-KLB-WH-104 · Climate Controlled',
      icon: Building2,
    },
    {
      title: language === 'kn' ? 'ಡಿಜಿಟಲ್ ಗುಣಮಟ್ಟ ಹಾಗೂ ಕೀಟನಾಶಕ ತಪಾಸಣೆ' : 'Assaying & Chemical Residue Lab Clearance',
      subtext: language === 'kn'
        ? 'ತೇವಾಂಶ 11.2%, ಪ್ರೋಟೀನ್ 22.4%, ಕೀಟನಾಶಕ ಶೂನ್ಯ (APEDA ಹಾಗೂ ಸಾವಯವ ಮಾನದಂಡ)'
        : 'Moisture 11.2%, Protein 22.4%, Zero chemical residues (APEDA export & GAP compliant)',
      statusDetail: 'Grade-A GI Certified Kalaburagi Red Gram',
      icon: FileCheck,
    },
    {
      title: language === 'kn' ? 'e-NWR ರಸೀದಿ & ತಕ್ಷಣದ ಒತ್ತೆ ಸಾಲ' : 'e-NWR Receipt & Distress-Sale Prevention Loan',
      subtext: language === 'kn'
        ? 'e-ಕಿಸಾನ್ ಉಪಜ್ ನಿಧಿ ಮೂಲಕ ₹1,85,000 ಸಾಲ ತಕ್ಷಣ ಮಂಜೂರಾಗಿದೆ (7% ಬಡ್ಡಿ ದರ)'
        : 'Instant e-NWR bridge loan of ₹1,85,000 sanctioned via Jan Samarth @ 7% KCC rate',
      statusDetail: 'e-NWR #KA-KLB-2026-9921 · Jan Samarth Linked',
      icon: ShieldCheck,
    },
    {
      title: language === 'kn' ? 'ಮೌಲ್ಯವರ್ಧನೆ: ಸಂಸ್ಕರಣೆ ಮತ್ತು ಬ್ರಾಂಡಿಂಗ್' : 'Value-Addition: Processing & Branded Packaging',
      subtext: language === 'kn'
        ? 'ಕಲಬುರಗಿ ತೊಗರಿ ಸಂಸ್ಕರಣಾ ಘಟಕ: ವಿಂಗಡಣೆ, 1kg & 5kg ಪ್ಯಾಕಿಂಗ್ + ವಿಶಿಷ್ಟ QR ಕೋಡ್'
        : 'Kalaburagi Tur Processing Unit: Sortex grading, vacuum retail pouches with Unique QR',
      statusDetail: 'Branded: "Kalaburagi Gold Tur Dal" · Ready for Retail/Export',
      icon: PackageCheck,
    },
    {
      title: language === 'kn' ? 'e-NAM ಹರಾಜು ಹಾಗೂ ಎಸ್ಕ್ರೋ ಭದ್ರತೆ' : 'e-NAM Digital Auction & Escrow Protection',
      subtext: language === 'kn'
        ? 'e-NAM ನಲ್ಲಿ ಕ್ವಿಂಟಾಲ್‌ಗೆ ₹7,850 ಬೆಲೆಗೆ ಪಟ್ಟಿ ಮಾಡಲಾಗಿದೆ. ಬ್ಯಾಂಕ್ ಎಸ್ಕ್ರೋದಲ್ಲಿ ಹಣ ರಕ್ಷಿತವಾಗಿದೆ'
        : 'Listed on e-NAM at ₹7,850/Qtl (Above MSP ₹7,550). Payment locked in licensed Escrow',
      statusDetail: 'Escrow #ESC-SBI-KLB-8832 · Payout upon delivery',
      icon: CheckCircle2,
    },
  ];

  const handleSimulateVoice = () => {
    setIsListeningVoice(true);
    const phrase = language === 'kn' ? 'ಇಳುವರಿ ಸಿದ್ಧವಾಗಿದೆ, ವಾಹನ ಕಳುಹಿಸಿ' : 'Yield is ready, schedule farmgate collection';
    speakText(language === 'kn' ? 'ಧ್ವನಿ ಸ್ವೀಕರಿಸಲಾಗಿದೆ: ಇಳುವರಿ ಸಿದ್ಧವಾಗಿದೆ. ತೋಟದ ಸ್ಥಳ ಮತ್ತು ಉಗ್ರಾಣ ಪ್ರಕ್ರಿಯೆ ಆರಂಭವಾಗುತ್ತಿದೆ.' : 'Voice command detected: Yield is ready. Dispatching autonomous logistics pipeline.');
    
    setTimeout(() => {
      setIsListeningVoice(false);
      startAutonomousPipeline();
    }, 1800);
  };

  const startAutonomousPipeline = () => {
    setExecutionPhase('running');
    setCurrentStepIndex(0);

    addAuditLog({
      performedBy: currentUser.name,
      role: 'farmer',
      action: 'TRIGGER_YIELD_READY_CHAIN',
      resourceType: 'ValueChainOrchestration',
      resourceId: `LOT-KLB-${Date.now().toString().slice(-4)}`,
      details: `Triggered autonomous post-harvest pipeline for ${lotQuantity} Qtl ${selectedCrop.toUpperCase()} at ${gpsLocation}`,
    });

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current < steps.length) {
        setCurrentStepIndex(current);
      } else {
        clearInterval(interval);
        setExecutionPhase('completed');
        speakText(
          language === 'kn'
            ? 'ಅಭಿನಂದನೆಗಳು! ನಿಮ್ಮ ಬೆಳೆಯು ಯಶಸ್ವಿಯಾಗಿ ಉಗ್ರಾಣಕ್ಕೆ ನೋಂದಾಯಿಸಲ್ಪಟ್ಟಿದೆ ಮತ್ತು e-NWR ಸಾಲ ಮಂಜೂರಾಗಿದೆ.'
            : 'Congratulations! Your yield has been routed to the WDRA warehouse, and your e-NWR pledge loan is unlocked.'
        );
      }
    }, 1200);
  };

  const handleFetchGps = () => {
    setIsLocating(true);
    setTimeout(() => {
      setGpsLocation('17.1895° N, 76.8421° E (Somanathahalli Cluster, Kalaburagi)');
      setIsLocating(false);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 text-stone-900">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 bg-stone-50/60 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black tracking-tight text-stone-950">
                  {language === 'kn' ? '‘ಇಳುವರಿ ಸಿದ್ಧ’ ಸ್ವಾಯತ್ತ ಮೌಲ್ಯ ಸರಪಳಿ' : '‘Yield Ready’ Autonomous Value Chain'}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-800 border border-stone-200">
                  KrishiSetu Express
                </span>
              </div>
              <p className="text-xs text-stone-500">
                {language === 'kn'
                  ? 'ಒಂದೇ ಧ್ವನಿ ಆಜ್ಞೆ ಮೂಲಕ ತೋಟದಿಂದ ಮಾರುಕಟ್ಟೆ, ಉಗ್ರಾಣ ಸಾಲ ಮತ್ತು ಮೌಲ್ಯವರ್ಧನೆ'
                  : 'One voice/touch trigger: Farmgate pickup → WDRA storage → e-NWR loan → Processing & Escrow sale'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Section 1: The One-Voice / One-Touch Trigger Box */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 sm:p-5 text-stone-900">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold tracking-wider uppercase text-stone-700 flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5" />
                  {language === 'kn' ? 'ಧ್ವನಿ ಆಧಾರಿತ ನಿಯಂತ್ರಣ' : 'Voice-First Execution Engine'}
                </span>
                <h3 className="text-base font-bold text-stone-950">
                  {language === 'kn' ? 'ಕನ್ನಡದಲ್ಲಿ "ಇಳುವರಿ ಸಿದ್ಧವಾಗಿದೆ" ಎಂದು ಹೇಳಿ' : 'Speak "Yield Ready" in Kannada or English'}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed max-w-xl">
                  {language === 'kn'
                    ? 'ರೈತರು ಕೇವಲ ಧ್ವನಿ ಆಜ್ಞೆ ನೀಡಿದರೆ ಸಾಕು, ಸಂಪೂರ್ಣ ಸರಬರಾಜು ಸರಪಳಿಯು ತಾನಾಗಿಯೇ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ.'
                    : 'Zero paperwork. Simply speak or tap. Logistics routes to your farm gate, grades produce, issues an instant warehouse loan, and lists your lot on e-NAM with Escrow security.'}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSimulateVoice}
                  disabled={isListeningVoice || executionPhase === 'running'}
                  className={`px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-xs cursor-pointer transition-all ${
                    isListeningVoice
                      ? 'bg-red-600 text-white animate-pulse'
                      : 'bg-stone-900 text-white hover:bg-stone-800 active:scale-95'
                  }`}
                >
                  <Mic className="w-4 h-4" />
                  <span>
                    {isListeningVoice
                      ? (language === 'kn' ? 'ಕೇಳಿಸಿಕೊಳ್ಳಲಾಗುತ್ತಿದೆ...' : 'Listening...')
                      : (language === 'kn' ? 'ಧ್ವನಿ ಆಜ್ಞೆ ನೀಡಿ' : 'Speak "Yield Ready"')}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Section 2: Lot Parameters & Geotag */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Crop Selection */}
            <div className="p-3.5 rounded-xl border border-stone-200 bg-white">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                {language === 'kn' ? 'ಕೊಯ್ಲು ಬೆಳೆ' : 'Harvested Crop'}
              </label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value as any)}
                disabled={executionPhase === 'running'}
                className="w-full text-xs font-semibold p-2 rounded-lg border border-stone-300 bg-stone-50 focus:border-stone-500 focus:bg-white outline-none cursor-pointer"
              >
                <option value="tur">Kalaburagi GI Red Gram (Tur - Maruti/BRG-2)</option>
                <option value="ragi">Mandya Finger Millet (Ragi - GPU-28)</option>
                <option value="paddy">Karnataka Basmati / Sona Masoori Paddy</option>
              </select>
            </div>

            {/* Quantity in Quintals */}
            <div className="p-3.5 rounded-xl border border-stone-200 bg-white">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                {language === 'kn' ? 'ಅಂದಾಜು ಪ್ರಮಾಣ (ಕ್ವಿಂಟಾಲ್)' : 'Estimated Yield (Quintals)'}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="5"
                  max="500"
                  value={lotQuantity}
                  onChange={(e) => setLotQuantity(Number(e.target.value))}
                  disabled={executionPhase === 'running'}
                  className="w-full text-xs font-bold p-2 rounded-lg border border-stone-300 bg-stone-50 focus:border-stone-500 focus:bg-white outline-none"
                />
                <span className="text-xs font-bold text-stone-600">Qtl</span>
              </div>
            </div>

            {/* Farmgate GPS Location */}
            <div className="p-3.5 rounded-xl border border-stone-200 bg-white">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                  {language === 'kn' ? 'ತೋಟದ ಜಿಪಿಎಸ್ ಸ್ಥಳ' : 'Farmgate GPS'}
                </label>
                <button
                  type="button"
                  onClick={handleFetchGps}
                  disabled={isLocating || executionPhase === 'running'}
                  className="text-[10px] font-bold text-stone-800 hover:text-stone-950 flex items-center gap-0.5 cursor-pointer"
                >
                  <MapPin className="w-2.5 h-2.5" />
                  {isLocating ? 'Locating...' : 'Refresh GPS'}
                </button>
              </div>
              <div className="text-[11px] font-mono text-stone-800 truncate bg-stone-50 p-2 rounded-lg border border-stone-200">
                {gpsLocation}
              </div>
            </div>
          </div>

          {/* Section 3: Interactive Multi-Stage Autonomous Pipeline Tracker */}
          <div className="border border-stone-200 rounded-2xl p-4 sm:p-5 bg-white space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
              <div>
                <h4 className="text-sm font-bold text-stone-950 flex items-center gap-2">
                  <span>6-Stage Autonomous Orchestration Pipeline</span>
                  {executionPhase === 'running' && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-stone-100 text-stone-800 animate-pulse">
                      Processing Step {currentStepIndex + 1}/6
                    </span>
                  )}
                  {executionPhase === 'completed' && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Pipeline Executed Successfully
                    </span>
                  )}
                </h4>
                <p className="text-xs text-stone-500">
                  Real-time synchronization with DPI, logistics partners, WDRA warehouses, and e-NAM
                </p>
              </div>

              {executionPhase === 'idle' ? (
                <button
                  type="button"
                  onClick={startAutonomousPipeline}
                  className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start Autonomous Chain</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setExecutionPhase('idle');
                    setCurrentStepIndex(0);
                  }}
                  className="px-3 py-1.5 bg-stone-100 text-stone-700 hover:text-stone-900 rounded-lg text-xs font-bold border border-stone-200 hover:bg-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Pipeline</span>
                </button>
              )}
            </div>

            {/* Stepper list */}
            <div className="space-y-3">
              {steps.map((st, idx) => {
                const IconComponent = st.icon;
                const isPassed = executionPhase === 'completed' || (executionPhase === 'running' && idx < currentStepIndex);
                const isCurrent = executionPhase === 'running' && idx === currentStepIndex;
                const isPending = executionPhase === 'idle' || (executionPhase === 'running' && idx > currentStepIndex);

                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                      isCurrent
                        ? 'border-stone-900 bg-stone-50 shadow-xs ring-1 ring-stone-900'
                        : isPassed
                        ? 'border-emerald-200 bg-emerald-50/30 text-stone-900'
                        : 'border-stone-200 bg-stone-50/40 text-stone-500'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center font-bold text-xs ${
                        isCurrent
                          ? 'bg-stone-900 text-white animate-pulse'
                          : isPassed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-200 text-stone-500'
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="w-4 h-4" /> : <IconComponent className="w-4 h-4" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                          <span>{st.title}</span>
                          {isCurrent && (
                            <span className="text-[10px] font-semibold text-stone-700">
                              (In progress...)
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-stone-500 shrink-0">
                          {st.statusDetail}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600 mt-0.5 leading-relaxed">
                        {st.subtext}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 4: Post-Execution Results & Direct Actions */}
          {executionPhase === 'completed' && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Distress Sale Prevented · Immediate Cash Sanctioned</span>
                  </div>
                  <p className="text-xs text-stone-700">
                    e-NWR Advance ₹1,85,000 is ready for withdrawal in your Canara Bank KCC account.
                    Your Tur lot is securely graded and listed at ₹7,850/Qtl.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {onOpenTraceability && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenTraceability();
                      }}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold bg-stone-950 text-white hover:bg-stone-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                      <span>View Traceability QR</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      setActiveTab('finance');
                    }}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-stone-900 text-white hover:bg-stone-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>View e-NWR Loan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-medium">Kalaburagi Pilot Cluster (Farhatabad / Somanathahalli) Active</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-stone-300 font-bold text-stone-700 hover:bg-white cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
