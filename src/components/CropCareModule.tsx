import React, { useState } from 'react';
import {
  Sprout,
  Plus,
  Bug,
  Volume2,
  Search,
  Layers,
  Camera,
  Sparkles,
  UploadCloud,
  ShieldCheck,
  Leaf,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UncertaintyBadge } from './UncertaintyBadge';
import { CropStage } from '../types/agriculture';

interface CropCareModuleProps {
  onOpenPlanner: () => void;
  onOpenLogActivity: () => void;
}

export const CropCareModule: React.FC<CropCareModuleProps> = ({
  onOpenPlanner,
  onOpenLogActivity,
}) => {
  const {
    cropPlans,
    updateCropStage,
    activities,
    advisories,
    vendorProducts,
    language,
    speakText,
  } = useApp();

  const [selectedPlanId, setSelectedPlanId] = useState(cropPlans[0]?.id || '');
  const [advisorySearch, setAdvisorySearch] = useState('');
  const [viewTab, setViewTab] = useState<'lifecycle' | 'advisories' | 'seeds' | 'ai_pest_cam'>('lifecycle');
  
  // State for AI Pest Diagnostic Camera simulation
  const [analyzingPest, setAnalyzingPest] = useState(false);
  const [diagnosedPest, setDiagnosedPest] = useState<{
    pestName: string;
    cropAffected: string;
    confidence: number;
    organicDosing: string;
    chemicalDosing: string;
    apedaNotice: string;
  } | null>(null);

  const currentPlan = cropPlans.find((p) => p.id === selectedPlanId) || cropPlans[0];

  const handleReadAdvisory = (title: string, action: string) => {
    speakText(`${title}. ${action}`);
  };

  const seedProducts = vendorProducts.filter((p) => p.category === 'seeds');

  const filteredAdvisories = advisories.filter(
    (adv) =>
      adv.title.toLowerCase().includes(advisorySearch.toLowerCase()) ||
      adv.cropName.toLowerCase().includes(advisorySearch.toLowerCase())
  );

  return (
    <div className="space-y-2 pb-16 md:pb-4 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-sm sm:text-base font-bold text-stone-900 flex items-center gap-1.5">
            <Sprout className="w-4 h-4 text-stone-700" />
            <span>{language === 'kn' ? 'ಬೆಳೆ ಆರೈಕೆ & ನಿರ್ವಹಣೆ' : 'Crop Care & Guidance'}</span>
          </h1>
          <p className="text-[10px] text-stone-500">
            {language === 'kn' ? 'ಹಂತ-ಹಂತದ ಬೆಳವಣಿಗೆ & ರೋಗ ನಿಯಂತ್ರಣ' : 'Lifecycle tracking & disease management'}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onOpenPlanner}
            className="h-7 px-2 rounded-lg text-[11px] font-bold text-white bg-stone-900 hover:bg-stone-800 flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3 h-3" />
            <span>{language === 'kn' ? 'ಹೊಸ ಬೆಳೆ' : 'New Crop'}</span>
          </button>
          <button
            type="button"
            onClick={onOpenLogActivity}
            className="h-7 px-2 rounded-lg text-[11px] font-semibold text-stone-800 bg-white border border-stone-200 hover:bg-stone-100 cursor-pointer"
          >
            <span>{language === 'kn' ? 'ಕೆಲಸ' : 'Log Work'}</span>
          </button>
        </div>
      </div>

      {/* Segment Switcher (In-place view without scrolling) */}
      <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl border border-stone-200 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setViewTab('lifecycle')}
          className={`flex-1 h-7.5 rounded-lg cursor-pointer transition-colors ${
            viewTab === 'lifecycle'
              ? 'bg-stone-900 text-white font-bold shadow-xs'
              : 'text-stone-700 hover:text-stone-950 hover:bg-white'
          }`}
        >
          {language === 'kn' ? 'ಬೆಳೆ ಹಂತ & ವೆಚ್ಚ' : 'Crop Milestones'}
        </button>

        <button
          type="button"
          onClick={() => setViewTab('advisories')}
          className={`flex-1 h-7.5 rounded-lg cursor-pointer transition-colors ${
            viewTab === 'advisories'
              ? 'bg-stone-900 text-white font-bold shadow-xs'
              : 'text-stone-700 hover:text-stone-950 hover:bg-white'
          }`}
        >
          {language === 'kn' ? 'ಆರ್‌ಎಸ್‌ಕೆ ಸಲಹೆ' : 'Pest Advisories'}
        </button>

        <button
          type="button"
          onClick={() => setViewTab('seeds')}
          className={`flex-1 h-7.5 rounded-lg cursor-pointer transition-colors ${
            viewTab === 'seeds'
              ? 'bg-stone-900 text-white font-bold shadow-xs'
              : 'text-stone-700 hover:text-stone-950 hover:bg-white'
          }`}
        >
          {language === 'kn' ? 'ಬಿತ್ತನೆ ಬೀಜ' : 'Certified Seeds'}
        </button>

        <button
          type="button"
          onClick={() => setViewTab('ai_pest_cam')}
          className={`flex-1 h-7.5 rounded-lg cursor-pointer transition-colors flex items-center justify-center gap-1 ${
            viewTab === 'ai_pest_cam'
              ? 'bg-stone-900 text-white font-bold shadow-xs'
              : 'text-stone-700 hover:text-stone-950 hover:bg-white'
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          <span>{language === 'kn' ? 'AI ಕೀಟ ಕ್ಯಾಮೆರಾ' : 'AI Pest Cam'}</span>
        </button>
      </div>

      {/* Active Crop Plan Switcher Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
        {cropPlans.map((plan) => (
          <button
            key={plan.id}
            type="button"
            onClick={() => setSelectedPlanId(plan.id)}
            className={`px-2.5 py-1 rounded-lg text-[11px] whitespace-nowrap text-left border cursor-pointer ${
              selectedPlanId === plan.id
                ? 'bg-stone-900 text-white font-bold border-stone-900'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <span>{language === 'kn' ? plan.cropNameKn : plan.cropName}</span>
            <span className="text-[10px] ml-1 opacity-80 font-mono">({plan.plotName})</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Lifecycle & Expenses */}
      {viewTab === 'lifecycle' && currentPlan && (
        <div className="bg-white rounded-xl p-2.5 border border-stone-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between pb-1.5 border-b border-stone-200">
            <div>
              <div className="font-bold text-xs text-stone-900">
                {language === 'kn' ? currentPlan.cropNameKn : currentPlan.cropName}
              </div>
              <div className="text-[10px] text-stone-500">
                Variety: {currentPlan.variety} · Sown: {currentPlan.sowingDate}
              </div>
            </div>

            <div className="flex items-center gap-1 text-[11px]">
              <span className="text-stone-500">Stage:</span>
              <select
                value={currentPlan.stage}
                onChange={(e) => updateCropStage(currentPlan.id, e.target.value as CropStage)}
                className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-stone-50 border border-stone-200 text-stone-950"
              >
                <option value="land_prep">Land Prep</option>
                <option value="sowing">Sowing</option>
                <option value="vegetative">Vegetative</option>
                <option value="flowering">Flowering</option>
                <option value="grain_formation">Grain Fill</option>
                <option value="harvest_ready">Harvest Ready</option>
                <option value="sold">Sold</option>
              </select>
            </div>
          </div>

          {/* 6 Lifecycle Steps in 1 row */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 text-center text-[9px]">
            {[
              { stage: 'land_prep', label: '1. Prep' },
              { stage: 'sowing', label: '2. Sowing' },
              { stage: 'vegetative', label: '3. Tillering' },
              { stage: 'flowering', label: '4. Heading' },
              { stage: 'grain_formation', label: '5. Grain Fill' },
              { stage: 'harvest_ready', label: '6. Harvest' },
            ].map((m) => {
              const isCurrent = currentPlan.stage === m.stage;
              return (
                <div
                  key={m.stage}
                  className={`p-1 rounded-md border ${
                    isCurrent
                      ? 'border-stone-900 bg-stone-50 text-stone-950 font-bold'
                      : 'border-stone-200 bg-stone-50/50 text-stone-500'
                  }`}
                >
                  <div>{m.label}</div>
                </div>
              );
            })}
          </div>

          {/* Key Metrics Snapshot */}
          <div className="grid grid-cols-3 gap-1 pt-0.5 text-[10px] text-center">
            <div className="p-1.5 bg-stone-50 rounded-lg border border-stone-200">
              <span className="text-stone-500 text-[9px]">Projected Yield:</span>
              <div className="font-bold text-stone-900 font-mono">
                {currentPlan.targetYieldRange.minQuintalPerAcre}-{currentPlan.targetYieldRange.maxQuintalPerAcre} Qtl/Ac
              </div>
            </div>

            <div className="p-1.5 bg-stone-50 rounded-lg border border-stone-200">
              <span className="text-stone-500 text-[9px]">Total Expenses:</span>
              <div className="font-bold text-stone-900 font-mono">
                ₹{currentPlan.actualCostInr.toLocaleString()}
              </div>
            </div>

            <div className="p-1.5 bg-stone-50 rounded-lg border border-stone-200">
              <span className="text-stone-500 text-[9px]">Harvest Date:</span>
              <div className="font-bold text-stone-900 font-mono">
                {currentPlan.estimatedHarvestStart.substring(5)}
              </div>
            </div>
          </div>

          {/* Recent Operations Log for This Crop */}
          <div className="space-y-1 pt-1">
            <div className="flex justify-between text-[11px] font-bold text-stone-900">
              <span>{language === 'kn' ? 'ಇತ್ತೀಚಿನ ಕೃಷಿ ಕೆಲಸಗಳು' : 'Recent Crop Activities'}</span>
              <button
                type="button"
                onClick={onOpenLogActivity}
                className="text-[10px] text-stone-700 font-bold"
              >
                + {language === 'kn' ? 'ದಾಖಲು' : 'Add'}
              </button>
            </div>

            <div className="space-y-1">
              {activities
                .filter((a) => a.cropPlanId === currentPlan.id)
                .slice(0, 3)
                .map((act) => (
                  <div
                    key={act.id}
                    className="p-1.5 bg-stone-50 rounded-lg border border-stone-100 flex items-center justify-between text-[11px]"
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-stone-700 shrink-0" />
                      <span className="truncate">{act.title}</span>
                    </div>
                    <span className="font-mono text-stone-700 shrink-0 text-[10px]">
                      ₹{act.costInr}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: RSK Advisories */}
      {viewTab === 'advisories' && (
        <div className="space-y-2">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={advisorySearch}
              onChange={(e) => setAdvisorySearch(e.target.value)}
              placeholder={language === 'kn' ? 'ಬೆಳೆ ಅಥವಾ ರೋಗ ಹುಡುಕಿ...' : 'Search crop or pest...'}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {filteredAdvisories.map((adv) => (
              <div
                key={adv.id}
                className="bg-white rounded-xl p-2.5 border border-stone-200 shadow-2xs space-y-1.5 text-xs"
              >
                <div className="flex items-start justify-between gap-1.5">
                  <div>
                    <span className="font-bold text-stone-900 text-xs">
                      {language === 'kn' ? adv.titleKn : adv.title}
                    </span>
                    <div className="text-[10px] text-stone-500">
                      Target: {adv.cropName} · Severity: {adv.severity.toUpperCase()}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleReadAdvisory(adv.title, adv.recommendedAction)}
                    className="h-6 w-6 rounded bg-stone-50 text-stone-700 flex items-center justify-center border border-stone-200"
                    title="Read advisory aloud"
                  >
                    <Volume2 className="w-3 h-3" />
                  </button>
                </div>

                <div className="p-1.5 bg-stone-50 rounded-md border border-stone-200 text-[11px] text-stone-950">
                  <strong>Dosage / Action:</strong>{' '}
                  {language === 'kn' ? adv.recommendedActionKn : adv.recommendedAction}
                </div>

                <div className="text-[9px] text-stone-400">Source: {adv.source}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: AI Pest Diagnostic Camera (Proposal Module 1 & 8) */}
      {viewTab === 'ai_pest_cam' && (
        <div className="bg-white rounded-xl border border-stone-200 p-4 space-y-4 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-stone-950 text-sm flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-stone-700" />
                  <span>{language === 'kn' ? 'AI ಕೀಟ & ರೋಗ ಸ್ಕ್ಯಾನರ್' : 'AI Crop Diagnostic Camera & Triage'}</span>
                </h3>
                <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-stone-100 text-stone-950 border border-stone-200">
                  Karnataka Savayava Bhagya & GAP
                </span>
              </div>
              <p className="text-[11px] text-stone-500 mt-0.5">
                {language === 'kn'
                  ? 'ಎಲೆಯ ಫೋಟೋ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ: ರೋಗ ಪತ್ತೆ, ಸಾವಯವ ಮತ್ತು ರಫ್ತು-ಸುರಕ್ಷಿತ ಔಷಧ ಪ್ರಮಾಣ ಪಡೆಯಿರಿ'
                  : 'Instant leaf computer vision triage: Diagnoses pest, calculates organic & APEDA-safe chemical dosing'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setAnalyzingPest(true);
                  setTimeout(() => {
                    setAnalyzingPest(false);
                    setDiagnosedPest({
                      pestName: 'Pod Borer (Helicoverpa armigera)',
                      cropAffected: 'Kalaburagi GI Red Gram (Tur)',
                      confidence: 96.4,
                      organicDosing: 'Neem Seed Kernel Extract (NSKE 5%) @ 50ml/10L water + Trichogramma cards (20,000 eggs/acre). Savayava Bhagya compliant.',
                      chemicalDosing: 'Chlorantraniliprole 18.5% SC @ 3ml per 10 Litre water. Pre-harvest interval (PHI): 29 days for APEDA residue clearance.',
                      apedaNotice: 'Export residue limit: <0.01 mg/kg. Stop spraying 4 weeks prior to harvest.',
                    });
                  }, 1200);
                }}
                disabled={analyzingPest}
                className="h-8 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>{analyzingPest ? 'Scanning Leaf...' : 'Scan Sample Leaf'}</span>
              </button>
            </div>
          </div>

          {/* Diagnostic View Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Visual Viewport */}
            <div className="border border-dashed border-stone-300 rounded-xl p-4 bg-stone-50 flex flex-col items-center justify-center text-center space-y-2 min-h-[180px]">
              {analyzingPest ? (
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-full border-4 border-stone-900 border-t-transparent animate-spin mx-auto" />
                  <p className="text-xs font-bold text-stone-950 animate-pulse">
                    Processing leaf morphology with neural vision...
                  </p>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center shadow-xs">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">
                      Leaf Computer Vision Active
                    </span>
                    <span className="text-[11px] text-stone-500">
                      Trained on ICAR & KVK Kalaburagi pulse pathology dataset
                    </span>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setAnalyzingPest(true);
                        setTimeout(() => {
                          setAnalyzingPest(false);
                          setDiagnosedPest({
                            pestName: 'Blast Fungus (Magnaporthe grisea)',
                            cropAffected: 'Mandya Finger Millet (Ragi GPU-28)',
                            confidence: 94.2,
                            organicDosing: 'Pseudomonas fluorescens 0.5% (50g/10L) + Jeevamrutha spray (100L/acre). Organic certified.',
                            chemicalDosing: 'Tricyclazole 75% WP @ 6g/10L water. Repeat after 12 days if lesion spreading persists.',
                            apedaNotice: 'Zero detectable systemic residues under EU CODEX limits.',
                          });
                        }, 1000);
                      }}
                      className="text-[10px] font-bold px-2 py-1 bg-white border border-stone-200 rounded text-stone-700 hover:bg-stone-100 cursor-pointer"
                    >
                      Test Ragi Leaf
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAnalyzingPest(true);
                        setTimeout(() => {
                          setAnalyzingPest(false);
                          setDiagnosedPest({
                            pestName: 'Pod Borer (Helicoverpa armigera)',
                            cropAffected: 'Kalaburagi GI Red Gram (Tur)',
                            confidence: 96.4,
                            organicDosing: 'Neem Seed Kernel Extract (NSKE 5%) @ 50ml/10L water + Trichogramma cards. Savayava Bhagya compliant.',
                            chemicalDosing: 'Chlorantraniliprole 18.5% SC @ 3ml per 10 Litre water. Pre-harvest interval (PHI): 29 days.',
                            apedaNotice: 'Export residue limit: <0.01 mg/kg. Stop spraying 4 weeks prior to harvest.',
                          });
                        }, 1000);
                      }}
                      className="text-[10px] font-bold px-2 py-1 bg-white border border-stone-200 rounded text-stone-700 hover:bg-stone-100 cursor-pointer"
                    >
                      Test Tur Leaf
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Diagnosis Result Card */}
            <div className="border border-stone-200 rounded-xl p-4 bg-white space-y-3">
              {diagnosedPest ? (
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-400">Pest / Disease Identified</span>
                      <h4 className="text-sm font-extrabold text-stone-950 flex items-center gap-1.5 mt-0.5">
                        <Bug className="w-4 h-4 text-stone-700" />
                        <span>{diagnosedPest.pestName}</span>
                      </h4>
                      <span className="text-[11px] text-stone-500">{diagnosedPest.cropAffected}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                      {diagnosedPest.confidence}% Match
                    </span>
                  </div>

                  {/* Organic Protocol */}
                  <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200 text-xs space-y-1">
                    <span className="font-bold text-emerald-900 flex items-center gap-1 text-[11px]">
                      <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Natural / Savayava Bhagya Protocol (Recommended)</span>
                    </span>
                    <p className="text-[11px] text-stone-700 leading-snug">
                      {diagnosedPest.organicDosing}
                    </p>
                  </div>

                  {/* Chemical & APEDA Limits */}
                  <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-xs space-y-1">
                    <span className="font-bold text-stone-950 flex items-center gap-1 text-[11px]">
                      <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
                      <span>Chemical Protocol & Residue Safeguard</span>
                    </span>
                    <p className="text-[11px] text-stone-700 leading-snug">
                      {diagnosedPest.chemicalDosing}
                    </p>
                    <p className="text-[10px] text-stone-500 font-mono">
                      {diagnosedPest.apedaNotice}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-stone-400 text-center py-6">
                  <Camera className="w-8 h-8 mb-2 opacity-40 text-stone-500" />
                  <p className="text-xs">Click "Scan Sample Leaf" to run computer vision analysis</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
