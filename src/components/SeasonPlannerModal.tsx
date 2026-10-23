import React, { useState } from 'react';
import { X, Calendar, Droplets, Wallet, Check, AlertTriangle, Sparkles, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CropSeason, CropStage } from '../types/agriculture';

interface SeasonPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const KARNATAKA_CROP_CATALOG = [
  {
    name: 'Finger Millet (Ragi)',
    nameKn: 'ರಾಗಿ (ಫಿಂಗರ್ ಮಿಲೆಟ್)',
    variety: 'GPU-28 (Recommended for South Dry Zone)',
    durationDays: 105,
    minWater: 'Low - Drought tolerant',
    estYieldMin: 14,
    estYieldMax: 18,
    costPerAcre: 12500,
    mandiAvgPrice: 3600,
    agroClimateZone: 'Southern Dry Zone (Mandya, Ramanagara, Tumakuru)',
    source: 'UAS Bengaluru & KVK Mandya trials',
  },
  {
    name: 'Paddy (Sona Masoori)',
    nameKn: 'ಭತ್ತ (ಸೋನಾ ಮಸೂರಿ - BPT 5204)',
    variety: 'BPT-5204 (Fine Grain / Canal irrigated)',
    durationDays: 135,
    minWater: 'High - Assured canal or borewell',
    estYieldMin: 24,
    estYieldMax: 28,
    costPerAcre: 22000,
    mandiAvgPrice: 2600,
    agroClimateZone: 'Cauvery & Tungabhadra Command Areas',
    source: 'AICRP on Rice, Mandya Station',
  },
  {
    name: 'Red Gram (Tur)',
    nameKn: 'ತೊಗರಿ (ರೆಡ್ ಗ್ರಾಂ - BRG 2)',
    variety: 'BRG-2 (Wilt resistant / Intercrop friendly)',
    durationDays: 140,
    minWater: 'Low-Medium - Rainfed suitable',
    estYieldMin: 7,
    estYieldMax: 9,
    costPerAcre: 11000,
    mandiAvgPrice: 7800,
    agroClimateZone: 'North Eastern Dry Zone & Central Dry Zone',
    source: 'UAS Dharwad & Raitha Samparka Kendra',
  },
  {
    name: 'Sugarcane',
    nameKn: 'ಕಬ್ಬು (ಕೋ-86032)',
    variety: 'Co-86032 (High Sugar Recovery / 12-14 Months)',
    durationDays: 360,
    minWater: 'High - Drip or furrow irrigation',
    estYieldMin: 40,
    estYieldMax: 50,
    costPerAcre: 38000,
    mandiAvgPrice: 3400,
    agroClimateZone: 'Mandya & Belagavi Sugar Belts',
    source: 'Mandya ZARS Sugarcane Package of Practices',
  },
];

export const SeasonPlannerModal: React.FC<SeasonPlannerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { plots, addCropPlan, language } = useApp();

  const [selectedPlotId, setSelectedPlotId] = useState(plots[0]?.id || '');
  const [season, setSeason] = useState<CropSeason>('Kharif');
  const [sowingDate, setSowingDate] = useState('2026-06-25');
  const [selectedCropIndex, setSelectedCropIndex] = useState(0);
  const [budgetInr, setBudgetInr] = useState(25000);

  if (!isOpen) return null;

  const currentPlot = plots.find((p) => p.id === selectedPlotId) || plots[0];
  const chosenCrop = KARNATAKA_CROP_CATALOG[selectedCropIndex];

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPlot || !chosenCrop) return;

    addCropPlan({
      plotId: currentPlot.id,
      plotName: currentPlot.name,
      cropName: chosenCrop.name,
      cropNameKn: chosenCrop.nameKn,
      variety: chosenCrop.variety,
      season,
      sowingDate,
      estimatedHarvestStart: '2026-10-15',
      estimatedHarvestEnd: '2026-10-30',
      stage: 'land_prep' as CropStage,
      targetYieldRange: {
        minQuintalPerAcre: chosenCrop.estYieldMin,
        maxQuintalPerAcre: chosenCrop.estYieldMax,
        confidencePct: 88,
        basis: chosenCrop.source,
      },
      budgetEstimatedInr: chosenCrop.costPerAcre * currentPlot.areaAcre,
      actualCostInr: 2800,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-stone-200 shadow-xl overflow-hidden my-auto text-xs">
        {/* Header */}
        <div className="bg-stone-900 text-white px-4 py-3 flex items-center justify-between">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-white">
              {language === 'kn' ? 'ಹೊಸ ಋತು ಯೋಜನೆ ರಚಿಸಿ' : 'Plan New Crop Season'}
            </h2>
            <p className="text-[10px] text-stone-200">
              {language === 'kn'
                ? 'ಜಮೀನು, ನೀರು ಲಭ್ಯತೆ ಮತ್ತು ಬಜೆಟ್ ಆಧಾರದ ಮೇಲೆ ಸೂಕ್ತ ಬೆಳೆ ಆರಿಸಿ'
                : 'Select recommended crop variety with local RSK data'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-stone-200 hover:text-white rounded min-h-[32px] min-w-[32px] flex items-center justify-center cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleCreatePlan} className="p-3.5 space-y-3">
          {/* 1. Plot Selection */}
          <div>
            <label className="block text-[11px] font-bold text-stone-700 mb-1">
              {language === 'kn' ? '1. ಜಮೀನು / ಪ್ಲಾಟ್ ಆಯ್ಕೆ' : '1. Select Farm Plot'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {plots.map((plot) => (
                <button
                  key={plot.id}
                  type="button"
                  onClick={() => setSelectedPlotId(plot.id)}
                  className={`p-2 text-left rounded-lg border cursor-pointer ${
                    selectedPlotId === plot.id
                      ? 'border-stone-900 bg-stone-50/80 ring-1 ring-stone-900'
                      : 'border-stone-200/70 hover:bg-stone-100/30'
                  }`}
                >
                  <div className="font-bold text-xs text-stone-900 truncate">
                    {plot.name}
                  </div>
                  <div className="text-[10px] text-stone-500">
                    {plot.areaAcre} Acres · {plot.soilType.replace('_', ' ')} · {plot.irrigation}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Season & Sowing Date */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] font-bold text-stone-700 mb-0.5">
                {language === 'kn' ? 'ಋತು (Season)' : 'Season'}
              </label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value as CropSeason)}
                className="w-full px-2 py-1 text-xs border border-stone-200 rounded-lg bg-stone-50"
              >
                <option value="Kharif">Kharif (ಮುಂಗಾರು)</option>
                <option value="Rabi">Rabi (ಹಿಂಗಾರು)</option>
                <option value="Summer">Summer (ಬೇಸಿಗೆ)</option>
                <option value="Annual">Annual (ವಾರ್ಷಿಕ)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-stone-700 mb-0.5">
                {language === 'kn' ? 'ಬಿತ್ತನೆ ದಿನಾಂಕ' : 'Planned Sowing Date'}
              </label>
              <input
                type="date"
                value={sowingDate}
                onChange={(e) => setSowingDate(e.target.value)}
                className="w-full px-2 py-1 text-xs border border-stone-200 rounded-lg bg-stone-50 font-mono"
              />
            </div>
          </div>

          {/* 3. Crop Selection */}
          <div>
            <label className="block text-[11px] font-bold text-stone-700 mb-1">
              {language === 'kn' ? '2. ಶಿಫಾರಸು ಮಾಡಲಾದ ಬೆಳೆ ಆರಿಸಿ' : '2. Choose Recommended Karnataka Crop'}
            </label>
            <div className="space-y-1">
              {KARNATAKA_CROP_CATALOG.map((crop, idx) => (
                <div
                  key={crop.name}
                  onClick={() => setSelectedCropIndex(idx)}
                  className={`p-2 rounded-lg border cursor-pointer ${
                    selectedCropIndex === idx
                      ? 'border-stone-900 bg-stone-50/70 ring-1 ring-stone-900'
                      : 'border-stone-200/70 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1.5">
                    <div>
                      <div className="font-bold text-xs text-stone-900">
                        {language === 'kn' ? crop.nameKn : crop.name}
                      </div>
                      <div className="text-[10px] text-stone-500">
                        {crop.variety}
                      </div>
                    </div>
                    <div className="text-right text-[10px] text-stone-700 shrink-0">
                      <span className="font-bold text-stone-800">{crop.estYieldMin}-{crop.estYieldMax} Qtl/Ac</span>
                      <div className="text-stone-400">{crop.durationDays} days</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-1 flex items-center justify-end gap-2 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 rounded-lg cursor-pointer"
            >
              {language === 'kn' ? 'ರದ್ದು' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-lg cursor-pointer shadow-2xs"
            >
              {language === 'kn' ? 'ಯೋಜನೆ ಉಳಿಸಿ' : 'Save Crop Plan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
