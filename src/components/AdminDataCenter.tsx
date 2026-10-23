import React, { useState } from 'react';
import {
  Shield,
  Database,
  Users,
  Layers,
  ShoppingBag,
  Landmark,
  FileText,
  Search,
  Download,
  Filter,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Building2,
  Sparkles,
  RefreshCw,
  Eye,
  Crown,
  ArrowLeft,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminDataCenter: React.FC = () => {
  const {
    plots,
    produceLots,
    offers,
    applications,
    auditLogs,
    governmentSchemes,
    governmentMSP,
    farmerExtendedProfile,
    switchPortal,
    updateApplicationStatus,
    autoFetchGovtSchemes,
    isGovtFetching,
    lastGovtSyncTime,
  } = useApp();

  const [activeDataTab, setActiveDataTab] = useState<
    'farmers' | 'plots' | 'produce' | 'finance' | 'schemes' | 'audit'
  >('farmers');

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDistrict, setFilterDistrict] = useState<string>('all');
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Filtered queries
  const filteredSchemes = governmentSchemes.filter(
    (s) =>
      s.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.ministry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLots = produceLots.filter(
    (l) =>
      l.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredApplications = applications.filter(
    (a) =>
      a.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.productTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAuditLogs = auditLogs.filter(
    (log) =>
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.performedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportAllData = () => {
    const fullDataset = {
      exportTimestamp: new Date().toISOString(),
      platform: 'KrishiSetu Karnataka',
      scope: 'Admin Complete Master Database View',
      farmerProfile: farmerExtendedProfile,
      plotsCount: plots.length,
      plots,
      produceLotsCount: produceLots.length,
      produceLots,
      offersCount: offers.length,
      offers,
      applicationsCount: applications.length,
      applications,
      governmentSchemesCount: governmentSchemes.length,
      governmentSchemes,
      governmentMSPCount: governmentMSP.length,
      governmentMSP,
      auditLogsCount: auditLogs.length,
      auditLogs,
    };

    const blob = new Blob([JSON.stringify(fullDataset, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `KrishiSetu_Admin_All_Data_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setExportNotice('Complete platform database exported as JSON!');
    setTimeout(() => setExportNotice(null), 4000);
  };

  return (
    <div className="space-y-3 pb-16 max-w-7xl mx-auto text-stone-900">
      {/* 1. Header Banner (Clean White + Orange Accent) */}
      <div className="bg-white text-stone-900 rounded-xl p-3 sm:p-4 border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-stone-900 text-white text-[10px] font-mono font-extrabold uppercase tracking-wider">
              ADMIN SITE · ALL DATA VISIBILITY
            </span>
            <span className="text-[11px] text-stone-500 font-mono">
              Live Database Inspector
            </span>
          </div>
          <h1 className="text-base sm:text-lg font-black tracking-tight text-stone-900 flex items-center gap-2">
            <Database className="w-5 h-5 text-stone-700" />
            <span>Central Agricultural Data Center</span>
          </h1>
          <p className="text-xs text-stone-500">
            Real-time inspection of all farmer registries, land holdings, mandi lots, loan claims, and schemes.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleExportAllData}
            className="h-8 px-3 rounded-lg bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-900 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-stone-700" />
            <span>Export All Data</span>
          </button>

          <button
            type="button"
            onClick={() => switchPortal('owner')}
            className="h-8 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Crown className="w-3.5 h-3.5" />
            <span>Switch to Owner</span>
          </button>

          <button
            type="button"
            onClick={() => switchPortal('user')}
            className="h-8 px-2.5 rounded-lg bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-700 text-xs font-medium flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-stone-600" />
            <span className="hidden sm:inline">User Site</span>
          </button>
        </div>
      </div>

      {exportNotice && (
        <div className="p-2.5 bg-emerald-50 text-emerald-950 border border-emerald-300 rounded-lg text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* 2. Platform Summary Metrics Strip (Crisp Black/White cards + Orange Numbers) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        <div className="bg-white p-2.5 rounded-lg border border-stone-200">
          <div className="text-[10px] font-bold text-stone-500 uppercase">Registered Farmers</div>
          <div className="text-lg font-black text-black">1 <span className="text-[11px] font-normal text-stone-400">(7,842 total)</span></div>
          <div className="text-[10px] text-stone-500">Aadhaar e-KYC Verified</div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-stone-200">
          <div className="text-[10px] font-bold text-stone-500 uppercase">Farm Plots (RTC)</div>
          <div className="text-lg font-black text-black">{plots.length} <span className="text-[11px] font-bold text-stone-700">Active</span></div>
          <div className="text-[10px] text-stone-500">7.3 Acres Cadastral</div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-stone-200">
          <div className="text-[10px] font-bold text-stone-500 uppercase">Mandi Lots For Sale</div>
          <div className="text-lg font-black text-black">{produceLots.length} <span className="text-[11px] font-normal text-stone-400">lots</span></div>
          <div className="text-[10px] text-stone-500">APMC Mandya Live Yard</div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-stone-200">
          <div className="text-[10px] font-bold text-stone-500 uppercase">Credit / Subsidy Apps</div>
          <div className="text-lg font-black text-stone-700">{applications.length} <span className="text-[11px] font-normal text-stone-500">filed</span></div>
          <div className="text-[10px] text-stone-500">₹4,20,000 Pipeline</div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-stone-200">
          <div className="text-[10px] font-bold text-stone-500 uppercase">Govt Schemes</div>
          <div className="text-lg font-black text-black">{governmentSchemes.length} <span className="text-[11px] font-bold text-stone-700">Synced</span></div>
          <div className="text-[10px] text-stone-500">GoI & GoK Official</div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-stone-200">
          <div className="text-[10px] font-bold text-stone-500 uppercase">Audit Records</div>
          <div className="text-lg font-black text-black">{auditLogs.length}</div>
          <div className="text-[10px] text-stone-500">Immutable Log Chain</div>
        </div>
      </div>

      {/* 3. Search and Filter Bar */}
      <div className="bg-white p-2.5 rounded-lg border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-stone-400" />
          <input
            type="text"
            placeholder="Search all records (Farmer, Crop, Scheme, Lot, ID)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-md border border-stone-300 bg-stone-50 text-xs focus:outline-none focus:border-black"
          />
        </div>

        {/* 6 Tabs for Data Visibility */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full sm:w-auto p-1 bg-stone-100 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveDataTab('farmers')}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs whitespace-nowrap cursor-pointer transition-colors ${
              activeDataTab === 'farmers'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-950 hover:bg-white'
            }`}
          >
            1. Farmers ({1})
          </button>

          <button
            type="button"
            onClick={() => setActiveDataTab('plots')}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs whitespace-nowrap cursor-pointer transition-colors ${
              activeDataTab === 'plots'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-950 hover:bg-white'
            }`}
          >
            2. Land & Plots ({plots.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveDataTab('produce')}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs whitespace-nowrap cursor-pointer transition-colors ${
              activeDataTab === 'produce'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-950 hover:bg-white'
            }`}
          >
            3. Mandi Produce ({produceLots.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveDataTab('finance')}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs whitespace-nowrap cursor-pointer transition-colors ${
              activeDataTab === 'finance'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-950 hover:bg-white'
            }`}
          >
            4. Applications ({applications.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveDataTab('schemes')}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs whitespace-nowrap cursor-pointer transition-colors ${
              activeDataTab === 'schemes'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-950 hover:bg-white'
            }`}
          >
            5. Govt Schemes ({governmentSchemes.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveDataTab('audit')}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs whitespace-nowrap cursor-pointer transition-colors ${
              activeDataTab === 'audit'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-950 hover:bg-white'
            }`}
          >
            6. Audit Log ({auditLogs.length})
          </button>
        </div>
      </div>

      {/* 4. Tab 1: Farmers & Citizens Directory */}
      {activeDataTab === 'farmers' && (
        <div className="bg-white rounded-lg border border-stone-200 overflow-hidden shadow-xs">
          <div className="p-3 border-b border-stone-200 flex items-center justify-between">
            <div>
              <h2 className="text-xs font-bold text-stone-900">
                Registered Farmers & Landholder Directory
              </h2>
              <p className="text-[11px] text-stone-500">
                Connected with FRUITS Karnataka (FID: KA-FRUITS-2024-8199) and Aadhaar NPCI
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 font-bold">
              1 Active Record
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-700">
              <thead className="bg-stone-50 border-b border-stone-200 text-[10px] uppercase font-bold text-stone-500">
                <tr>
                  <th className="py-2 px-3">Farmer Name</th>
                  <th className="py-2 px-3">Contact</th>
                  <th className="py-2 px-3">Location</th>
                  <th className="py-2 px-3">Acreage & Type</th>
                  <th className="py-2 px-3">Banking (Aadhaar NPCI)</th>
                  <th className="py-2 px-3">KYC Tier</th>
                  <th className="py-2 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr className="hover:bg-stone-50">
                  <td className="py-2.5 px-3">
                    <div className="font-bold text-stone-900 flex items-center gap-1.5">
                      <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold">
                        {farmerExtendedProfile.avatarInitials}
                      </span>
                      <span>{farmerExtendedProfile.name}</span>
                    </div>
                    <div className="text-[10px] text-stone-400 font-mono">
                      ID: {farmerExtendedProfile.id}
                    </div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px]">
                    <div>{farmerExtendedProfile.phone}</div>
                    <div className="text-[10px] text-stone-400">Alt: {farmerExtendedProfile.altPhone}</div>
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="font-semibold text-stone-900">
                      {farmerExtendedProfile.village}, {farmerExtendedProfile.taluk}
                    </div>
                    <div className="text-[10px] text-stone-500 font-mono">
                      {farmerExtendedProfile.district} · {farmerExtendedProfile.pincode}
                    </div>
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="font-mono font-bold text-stone-900">
                      {farmerExtendedProfile.totalAreaAcres} Acres
                    </div>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-stone-100 text-stone-700">
                      {farmerExtendedProfile.farmingType?.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px]">
                    <div className="text-stone-900 font-semibold">{farmerExtendedProfile.bankName}</div>
                    <div className="text-[10px] text-stone-400">
                      A/C: {farmerExtendedProfile.maskedAccountNumber} · {farmerExtendedProfile.ifscCode}
                    </div>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-900">
                      {farmerExtendedProfile.kycTier}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => switchPortal('user')}
                      className="px-2 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold text-[10px] cursor-pointer"
                    >
                      Inspect Profile
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. Tab 2: Farm Plots & Cadastral Records */}
      {activeDataTab === 'plots' && (
        <div className="bg-white rounded-lg border border-stone-200 overflow-hidden shadow-xs">
          <div className="p-3 border-b border-stone-200 flex items-center justify-between">
            <h2 className="text-xs font-bold text-stone-900">
              Farm Plots & RTC Bhoomi Records Registry
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 font-bold">
              {plots.length} Plots
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-700">
              <thead className="bg-stone-50 border-b border-stone-200 text-[10px] uppercase font-bold text-stone-500">
                <tr>
                  <th className="py-2 px-3">Plot Identifier</th>
                  <th className="py-2 px-3">Survey #</th>
                  <th className="py-2 px-3">Area (Acres)</th>
                  <th className="py-2 px-3">Soil Type</th>
                  <th className="py-2 px-3">Irrigation Source</th>
                  <th className="py-2 px-3">Bhoomi RTC Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {plots.map((plot) => (
                  <tr key={plot.id} className="hover:bg-stone-50">
                    <td className="py-2.5 px-3 font-bold text-stone-900">
                      <div>{plot.name}</div>
                      <div className="text-[10px] text-stone-400 font-mono">ID: {plot.id}</div>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[11px] font-semibold">
                      {plot.surveyNumberMasked}
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-black">
                      {plot.areaAcre} Acres
                    </td>
                    <td className="py-2.5 px-3 capitalize">
                      {plot.soilType.replace('_', ' ')}
                    </td>
                    <td className="py-2.5 px-3 capitalize">
                      {plot.irrigation}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        RTC Verified (Pahani Linked)
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. Tab 3: Mandi Produce Lots */}
      {activeDataTab === 'produce' && (
        <div className="bg-white rounded-lg border border-stone-200 overflow-hidden shadow-xs">
          <div className="p-3 border-b border-stone-200 flex items-center justify-between">
            <h2 className="text-xs font-bold text-stone-900">
              APMC Mandi Produce Lots & Live Bidding Pipeline
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 font-bold">
              {filteredLots.length} Active Lots
            </span>
          </div>

          <div className="divide-y divide-stone-100">
            {filteredLots.map((lot) => (
              <div key={lot.id} className="p-3 hover:bg-stone-50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900 text-sm">{lot.cropName}</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] bg-stone-100 font-mono font-bold text-stone-700">
                      Lot #{lot.id}
                    </span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-stone-100 text-stone-900">
                      {lot.grade}
                    </span>
                  </div>
                  <div className="text-stone-500 text-[11px] mt-0.5">
                    Farmer: <strong className="text-stone-900">{lot.farmerName}</strong> · Quantity: {lot.quantityQuintals} Quintals · Moisture: {lot.moisturePct}%
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-[10px] text-stone-400 uppercase">Asking Price</div>
                    <div className="font-mono font-bold text-stone-700 text-sm">
                      ₹{lot.askingPricePerQuintalInr}/Qtl
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded bg-stone-100 text-stone-700 font-mono text-[10px] font-bold">
                    Status: {lot.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. Tab 4: Applications (Credit & DBT) */}
      {activeDataTab === 'finance' && (
        <div className="bg-white rounded-lg border border-stone-200 overflow-hidden shadow-xs">
          <div className="p-3 border-b border-stone-200 flex items-center justify-between">
            <h2 className="text-xs font-bold text-stone-900">
              Loan, Credit & DBT Subsidy Applications
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 font-bold">
              {filteredApplications.length} Applications
            </span>
          </div>

          <div className="divide-y divide-stone-100">
            {filteredApplications.map((app) => (
              <div key={app.id} className="p-3 hover:bg-stone-50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900">{app.productTitle}</span>
                    <span className="font-mono text-[10px] text-stone-400">#{app.id}</span>
                  </div>
                  <div className="text-stone-500 text-[11px]">
                    Applicant: <strong className="text-stone-800">{app.farmerName}</strong> · Date: {app.appliedDate}
                  </div>
                  <div className="text-[10px] text-stone-400 font-mono mt-0.5">
                    Consented Data: {app.consentedDataItems.join(', ')}
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="text-right">
                    <div className="text-[10px] text-stone-400">Requested Amount</div>
                    <div className="font-mono font-bold text-black text-sm">
                      ₹{app.requestedAmountInr.toLocaleString()}
                    </div>
                  </div>

                  <span
                    className={`px-2 py-1 rounded text-[10px] font-bold ${
                      app.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-900'
                        : app.status === 'rejected'
                        ? 'bg-rose-100 text-rose-900'
                        : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {app.status.toUpperCase()}
                  </span>

                  {app.status !== 'approved' && (
                    <button
                      type="button"
                      onClick={() => updateApplicationStatus(app.id, 'approved')}
                      className="px-2.5 py-1 rounded-md bg-stone-900 hover:bg-stone-800 text-white font-bold text-[10px] cursor-pointer shadow-xs"
                    >
                      Sanction
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. Tab 5: Government Schemes Master Feed */}
      {activeDataTab === 'schemes' && (
        <div className="bg-white rounded-lg border border-stone-200 overflow-hidden shadow-xs">
          <div className="p-3 border-b border-stone-200 flex items-center justify-between">
            <div>
              <h2 className="text-xs font-bold text-stone-900">
                Official Indian Central & Karnataka State Government Schemes
              </h2>
              <div className="text-[10px] text-stone-500 font-mono flex items-center gap-1.5">
                <span>{lastGovtSyncTime}</span>
                {isGovtFetching && <span className="text-stone-700 font-bold">Syncing live...</span>}
              </div>
            </div>

            <button
              type="button"
              disabled={isGovtFetching}
              onClick={() => autoFetchGovtSchemes(true)}
              className="h-7 px-3 rounded-md bg-stone-900 text-white hover:bg-stone-800 text-xs font-bold flex items-center gap-1 cursor-pointer shadow-xs disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 text-white ${isGovtFetching ? 'animate-spin' : ''}`} />
              <span>Fetch Live Updates</span>
            </button>
          </div>

          <div className="divide-y divide-stone-100">
            {filteredSchemes.map((scheme) => (
              <div key={scheme.id} className="p-3 hover:bg-stone-50 flex flex-col sm:flex-row sm:items-start justify-between gap-2 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold uppercase ${
                        scheme.level === 'central'
                          ? 'bg-blue-100 text-blue-900'
                          : 'bg-stone-100 text-stone-950 border border-stone-200'
                      }`}
                    >
                      {scheme.level === 'central' ? 'Govt of India' : 'Karnataka State'}
                    </span>
                    <span className="font-bold text-stone-900">{scheme.titleEn}</span>
                  </div>
                  <div className="text-[11px] text-stone-600 font-medium">{scheme.titleKn}</div>
                  <div className="text-[10px] text-stone-400 font-mono">
                    Ministry: {scheme.ministry}
                  </div>
                  <div className="text-[11px] text-stone-700">
                    Eligibility: {scheme.eligibilityCriteria.slice(0, 2).join(' · ')}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className="font-mono font-extrabold text-stone-700 text-xs">
                    {scheme.benefitAmount}
                  </span>
                  <a
                    href={scheme.officialPortalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] font-bold text-stone-700 hover:text-black flex items-center gap-1 underline"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 9. Tab 6: Audit Log Stream */}
      {activeDataTab === 'audit' && (
        <div className="bg-white rounded-lg border border-stone-200 overflow-hidden shadow-xs">
          <div className="p-3 border-b border-stone-200 flex items-center justify-between">
            <h2 className="text-xs font-bold text-stone-900">
              Immutable Platform Governance & Audit Log Stream
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 font-bold">
              {filteredAuditLogs.length} Records
            </span>
          </div>

          <div className="divide-y divide-stone-100 font-mono text-[11px]">
            {filteredAuditLogs.map((log) => (
              <div key={log.id} className="p-2.5 hover:bg-stone-50 flex items-start justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.2 rounded bg-stone-100 text-stone-900 font-bold text-[9px]">
                      {log.action}
                    </span>
                    <span className="text-stone-500 text-[10px]">by {log.performedBy} ({log.role})</span>
                  </div>
                  <div className="text-stone-800 font-sans text-xs">{log.details}</div>
                </div>
                <span className="text-[10px] text-stone-400 shrink-0">{log.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
