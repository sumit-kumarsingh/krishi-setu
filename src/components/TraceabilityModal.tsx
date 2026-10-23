import React, { useState } from 'react';
import {
  X,
  QrCode,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  Calendar,
  Share2,
  Copy,
  Download,
  Building2,
  Wheat,
  Leaf,
  FlaskConical,
  Award,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface TraceabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  lotId?: string;
}

export const TraceabilityModal: React.FC<TraceabilityModalProps> = ({
  isOpen,
  onClose,
  lotId = 'RS-LOT-2026-TUR-0441',
}) => {
  const { language, currentUser } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const farmerUniqueId = 'RS-KA-KLB-2026-0814';
  const lotBatchCode = lotId;
  const qrVerificationUrl = `https://raitasetu.karnataka.gov.in/verify/${farmerUniqueId}/${lotBatchCode}`;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(qrVerificationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCertificate = () => {
    // Generate a simple simulated printable window or alert
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 text-stone-900">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 bg-stone-50/60 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center shadow-xs">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black tracking-tight text-stone-950">
                  {language === 'kn' ? 'ತೋಟದಿಂದ-ಮೇಜಿನವರೆಗೆ ಪತ್ತೆಹಚ್ಚುವಿಕೆ ಪ್ರಮಾಣಪತ್ರ' : 'Farm-to-Fork Digital Traceability Passport'}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  APEDA Export Ready
                </span>
              </div>
              <p className="text-xs text-stone-500">
                {language === 'kn'
                  ? 'ರೈತ ಐಡಿ ಮತ್ತು ಕ್ಯೂಆರ್ ಕೋಡ್ ಮೂಲಕ ಮಣ್ಣು, ಕೀಟನಾಶಕ ಶೂನ್ಯತೆ ಹಾಗೂ ಸಂಸ್ಕರಣಾ ವಿವರ'
                  : 'Verified digital footprint: Locality, Soil Health history, GAP fertilizer logs, and residue clearance'}
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
          {/* Section 1: Unique QR & Barcode Card */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              {/* High-res Interactive QR Code Display */}
              <div className="p-3 bg-white rounded-xl border border-stone-300 shadow-xs shrink-0 flex flex-col items-center">
                <svg
                  className="w-28 h-28 text-stone-950"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Outer corner 1 */}
                  <rect x="0" y="0" width="30" height="30" rx="3" fill="#0c0a09" />
                  <rect x="6" y="6" width="18" height="18" rx="2" fill="#ffffff" />
                  <rect x="10" y="10" width="10" height="10" rx="1" fill="#ea580c" />

                  {/* Outer corner 2 */}
                  <rect x="70" y="0" width="30" height="30" rx="3" fill="#0c0a09" />
                  <rect x="76" y="6" width="18" height="18" rx="2" fill="#ffffff" />
                  <rect x="80" y="10" width="10" height="10" rx="1" fill="#ea580c" />

                  {/* Outer corner 3 */}
                  <rect x="0" y="70" width="30" height="30" rx="3" fill="#0c0a09" />
                  <rect x="6" y="76" width="18" height="18" rx="2" fill="#ffffff" />
                  <rect x="10" y="80" width="10" height="10" rx="1" fill="#ea580c" />

                  {/* QR Matrix Grid Details */}
                  <rect x="36" y="6" width="6" height="6" fill="#0c0a09" />
                  <rect x="48" y="6" width="12" height="6" fill="#0c0a09" />
                  <rect x="36" y="18" width="6" height="6" fill="#0c0a09" />
                  <rect x="48" y="24" width="6" height="6" fill="#0c0a09" />
                  <rect x="6" y="36" width="6" height="6" fill="#0c0a09" />
                  <rect x="18" y="42" width="6" height="12" fill="#0c0a09" />
                  <rect x="36" y="36" width="12" height="12" fill="#ea580c" />
                  <rect x="54" y="36" width="6" height="6" fill="#0c0a09" />
                  <rect x="66" y="36" width="6" height="6" fill="#0c0a09" />
                  <rect x="78" y="42" width="12" height="6" fill="#0c0a09" />
                  <rect x="36" y="54" width="6" height="12" fill="#0c0a09" />
                  <rect x="48" y="54" width="12" height="6" fill="#0c0a09" />
                  <rect x="66" y="54" width="6" height="12" fill="#0c0a09" />
                  <rect x="78" y="66" width="6" height="6" fill="#0c0a09" />
                  <rect x="36" y="72" width="6" height="6" fill="#0c0a09" />
                  <rect x="48" y="78" width="12" height="12" fill="#0c0a09" />
                  <rect x="66" y="72" width="12" height="6" fill="#0c0a09" />
                  <rect x="84" y="78" width="6" height="12" fill="#ea580c" />
                </svg>
                <span className="text-[9px] font-mono text-stone-500 mt-1 uppercase font-semibold">
                  Scan for Verification
                </span>
              </div>

              {/* Unique Identifiers */}
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-900 border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>KrishiSetu Tamper-Proof Digital Passport</span>
                </div>
                <div>
                  <div className="text-[11px] uppercase font-bold text-stone-500">
                    Farmer Unique ID
                  </div>
                  <div className="text-sm sm:text-base font-black font-mono text-stone-950">
                    {farmerUniqueId}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] uppercase font-bold text-stone-500">
                    Produce Lot Batch
                  </div>
                  <div className="text-xs sm:text-sm font-bold font-mono text-stone-900">
                    {lotBatchCode}
                  </div>
                </div>
                <div className="text-xs text-stone-600">
                  Farmer: <span className="font-bold text-stone-900">{currentUser.name}</span> · Somanathahalli, Kalaburagi
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-3.5 py-2 rounded-xl text-xs font-bold border border-stone-300 bg-white hover:bg-stone-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Copy className="w-3.5 h-3.5 text-stone-600" />
                <span>{copied ? 'Link Copied!' : 'Copy Verification URL'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadCertificate}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-stone-900 text-white hover:bg-stone-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Official Certificate</span>
              </button>
            </div>
          </div>

          {/* Section 2: 4-Pillar Verifiable Digital Footprint */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {/* Pillar 1: Geographic & Land Registry */}
            <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-2">
              <div className="flex items-center gap-2 text-stone-950 font-bold">
                <MapPin className="w-4 h-4 text-stone-700" />
                <span>1. Geographic & Land Registry (DPI Verified)</span>
              </div>
              <div className="space-y-1.5 text-stone-700 text-[11px]">
                <div className="flex justify-between border-b border-stone-100 pb-1">
                  <span className="text-stone-500">Pilot Village:</span>
                  <span className="font-semibold">Somanathahalli, Farhatabad Hobli</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-1">
                  <span className="text-stone-500">Taluk & District:</span>
                  <span className="font-semibold">Kalaburagi (Gulbarga), Karnataka</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-1">
                  <span className="text-stone-500">Bhoomi RTC Pahani:</span>
                  <span className="font-mono font-semibold">Survey No: 84/2 (4.00 Acres)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">AgriStack Farmer ID:</span>
                  <span className="font-mono font-semibold text-emerald-700">KA-AGRI-KLB-99201</span>
                </div>
              </div>
            </div>

            {/* Pillar 2: Soil Health & Ecological Inputs */}
            <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-2">
              <div className="flex items-center gap-2 text-stone-950 font-bold">
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span>2. Soil Health & GAP Compliance</span>
              </div>
              <div className="space-y-1.5 text-stone-700 text-[11px]">
                <div className="flex justify-between border-b border-stone-100 pb-1">
                  <span className="text-stone-500">Soil Health Card:</span>
                  <span className="font-mono font-semibold">SHC-KA-KLB-2025-410</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-1">
                  <span className="text-stone-500">Soil Type & pH:</span>
                  <span className="font-semibold">Deep Black Cotton (pH 7.8, Organic C 0.62%)</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-1">
                  <span className="text-stone-500">Farming Practice:</span>
                  <span className="font-semibold text-emerald-700">Savayava Bhagya & GAP Protocol</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Bio-Inputs Used:</span>
                  <span className="font-semibold">Jeevamrutha, Neem Cake, Trichoderma</span>
                </div>
              </div>
            </div>

            {/* Pillar 3: Chemical Residue & Phytosanitary Clearance */}
            <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-2">
              <div className="flex items-center gap-2 text-stone-950 font-bold">
                <FlaskConical className="w-4 h-4 text-blue-600" />
                <span>3. Laboratory Residue Clearance (APEDA Certified)</span>
              </div>
              <div className="space-y-1.5 text-stone-700 text-[11px]">
                <div className="flex justify-between border-b border-stone-100 pb-1">
                  <span className="text-stone-500">Testing Laboratory:</span>
                  <span className="font-semibold">NABL Accredited Agri Testing Lab, Kalaburagi</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-1">
                  <span className="text-stone-500">Organophosphates:</span>
                  <span className="font-semibold text-emerald-700 font-mono">Non-Detectable (&lt;0.001 ppm)</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-1">
                  <span className="text-stone-500">Heavy Metals (Pb, Cd, As):</span>
                  <span className="font-semibold text-emerald-700 font-mono">Nil / Below Detection Limit</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Export Standard Status:</span>
                  <span className="font-semibold text-emerald-700">EU & Gulf Codex Compliant</span>
                </div>
              </div>
            </div>

            {/* Pillar 4: Assaying, e-NWR & Escrow Assurance */}
            <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-2">
              <div className="flex items-center gap-2 text-stone-950 font-bold">
                <Building2 className="w-4 h-4 text-purple-600" />
                <span>4. Assaying, WDRA e-NWR & Escrow</span>
              </div>
              <div className="space-y-1.5 text-stone-700 text-[11px]">
                <div className="flex justify-between border-b border-stone-100 pb-1">
                  <span className="text-stone-500">GI Recognition:</span>
                  <span className="font-semibold text-emerald-700">GI-Certified Gulbarga Red Gram</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-1">
                  <span className="text-stone-500">WDRA e-NWR No:</span>
                  <span className="font-mono font-semibold">eNWR-KA-KLB-2026-9921</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-1">
                  <span className="text-stone-500">Warehouse Location:</span>
                  <span className="font-semibold">KSWC Warehouse, Farhatabad Yard (Bay #04)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Escrow Safeguard:</span>
                  <span className="font-mono font-semibold text-emerald-700">ESC-SBI-KLB-8832 (Active)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Consumer / Retail Trust Guarantee Note */}
          <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200 text-stone-600 text-[11px] leading-relaxed flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-stone-900">KrishiSetu Consumer Guarantee: </span>
              Every packet or auction lot with this QR tag directly credits the farmer at equitable value-chain pricing,
              eliminating 5–7 layers of middlemen while certifying chemical purity and geographic authenticity.
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-medium">Digitally Signed & Validated by RSK Farhatabad</span>
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
