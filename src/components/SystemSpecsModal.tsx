import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Database,
  Layers,
  Network,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Users,
  IndianRupee,
  Sparkles,
  MapPin,
  Building2,
  FileText,
  BadgeCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { REGISTERED_INTEGRATIONS } from '../services/integrationConnectors';

interface SystemSpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemSpecsModal: React.FC<SystemSpecsModalProps> = ({ isOpen, onClose }) => {
  const { auditLogs } = useApp();
  const [activeTab, setActiveTab] = useState<'proposal' | 'matrix' | 'schema' | 'integrations' | 'audit'>('proposal');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 text-xs text-stone-900">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 bg-stone-50/70 sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black tracking-tight text-stone-950 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-stone-900 text-white flex items-center justify-center text-xs font-black">
                  ರೈ
                </span>
                <span>Raita Setu Karnataka — Executive Blueprint</span>
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-900 border border-stone-200">
                Official Proposal
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Theme: <span className="font-semibold text-stone-700">"Samriddh Annadata, Samriddh Bharat"</span> · Pilot Budget: ₹2.75 Crore
            </p>
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

        {/* Tab Controls */}
        <div className="flex items-center gap-1 px-4 pt-2 border-b border-stone-200 bg-stone-50/40 overflow-x-auto text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('proposal')}
            className={`px-3.5 py-2 border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'proposal'
                ? 'border-stone-900 text-stone-950 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            Proposal & ₹2.75 Cr Budget
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('matrix')}
            className={`px-3.5 py-2 border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'matrix'
                ? 'border-stone-900 text-stone-950 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            3-Portal Role Matrix
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('schema')}
            className={`px-3.5 py-2 border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'schema'
                ? 'border-stone-900 text-stone-950 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            Data Schema & State Machines
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('integrations')}
            className={`px-3.5 py-2 border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'integrations'
                ? 'border-stone-900 text-stone-950 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            DPI Interoperability
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('audit')}
            className={`px-3.5 py-2 border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'audit'
                ? 'border-stone-900 text-stone-950 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            Security Audit ({auditLogs.length})
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 text-xs text-stone-700 space-y-5">
          {/* TAB 1: PROPOSAL BLUEPRINT & BUDGET */}
          {activeTab === 'proposal' && (
            <div className="space-y-5">
              {/* Submission Identity Card */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-2.5">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-700">Team Identity</span>
                    <h3 className="text-base font-black text-stone-950">TEAM RAITA SETU</h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-stone-600">
                    <MapPin className="w-3.5 h-3.5 text-stone-700" />
                    <span className="font-semibold">Pilot Hub: Kalaburagi District (Farhatabad / Somanathahalli Cluster)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  <div className="p-3 bg-white rounded-lg border border-stone-200">
                    <span className="text-[10px] font-bold text-stone-400 block uppercase">1. Legal & Compliance</span>
                    <span className="font-bold text-stone-900 text-xs block mt-0.5">Laxmi M Margol</span>
                    <span className="text-[11px] text-stone-500">Advocate · Regulatory & FPO Framework</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-stone-200">
                    <span className="text-[10px] font-bold text-stone-400 block uppercase">2. Technology & Architecture</span>
                    <span className="font-bold text-stone-900 text-xs block mt-0.5">Sumit</span>
                    <span className="text-[11px] text-stone-500">Tech / MCA · Kannada NLP & DPI Integrations</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-stone-200">
                    <span className="text-[10px] font-bold text-stone-400 block uppercase">3. Finance & Market Operations</span>
                    <span className="font-bold text-stone-900 text-xs block mt-0.5">Rahul</span>
                    <span className="text-[11px] text-stone-500">Finance & Commerce · e-NWR & Escrow Rails</span>
                  </div>
                </div>
              </div>

              {/* 8 Core Modules Grid */}
              <div className="space-y-2.5">
                <h4 className="font-black text-stone-950 text-sm flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-stone-700" />
                  <span>The 8 Core Modules of the Raita Setu Platform</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  <div className="p-3 rounded-lg border border-stone-200 bg-white">
                    <div className="font-bold text-stone-950 text-xs">1. Input Management</div>
                    <p className="text-[11px] text-stone-500 mt-1 leading-snug">
                      Soil testing, plot-specific Integrated Farming Models, bulk procurement bypassing middlemen, automated irrigation.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border border-stone-200 bg-white">
                    <div className="font-bold text-stone-950 text-xs">2. Market Management</div>
                    <p className="text-[11px] text-stone-500 mt-1 leading-snug">
                      Market price discovery, buyer portfolio, digital produce listings, e-NAM auction bidding, and direct buyer linkages.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border border-stone-200 bg-white">
                    <div className="font-bold text-stone-950 text-xs">3. Post-Production</div>
                    <p className="text-[11px] text-stone-500 mt-1 leading-snug">
                      Harvest planning, WDRA storage, automated grading, assaying, custom packaging, and farm-gate logistics dispatch.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border border-stone-200 bg-white">
                    <div className="font-bold text-stone-950 text-xs">4. Export Management</div>
                    <p className="text-[11px] text-stone-500 mt-1 leading-snug">
                      Export crop planning, APEDA standards, residue testing, phytosanitary clearance, and unique QR traceability passports.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border border-stone-200 bg-white">
                    <div className="font-bold text-stone-950 text-xs">5. Financial Assistance</div>
                    <p className="text-[11px] text-stone-500 mt-1 leading-snug">
                      AI project report to loan file in 1 flow, e-NWR pledge loans (e-Kisan Upaj Nidhi) eliminating harvest distress selling.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border border-stone-200 bg-white">
                    <div className="font-bold text-stone-950 text-xs">6. Government Schemes</div>
                    <p className="text-[11px] text-stone-500 mt-1 leading-snug">
                      Direct DBT subsidies (PM-Kisan, Raitha Siri, Krishi Bhagya), eligibility screening, and automatic application filings.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border border-stone-200 bg-white">
                    <div className="font-bold text-stone-950 text-xs">7. Safeguards & Escrow</div>
                    <p className="text-[11px] text-stone-500 mt-1 leading-snug">
                      Environmental monitoring, pest alerts, licensed bank Escrow accounts, and third-party delivery guarantees.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border border-stone-200 bg-white">
                    <div className="font-bold text-stone-950 text-xs">8. Agri Modernization</div>
                    <p className="text-[11px] text-stone-500 mt-1 leading-snug">
                      Kannada NLP voice-first execution ("Yield Ready"), IoT sensor integration, and polyhouse/precision farming scaling.
                    </p>
                  </div>
                </div>
              </div>

              {/* 5-Pillar ₹2.75 Crore Budget Matrix Table */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-stone-950 text-sm flex items-center gap-1.5">
                    <IndianRupee className="w-4 h-4 text-stone-700" />
                    <span>Kalaburagi Pilot Investment Budget Matrix (Total: ₹2.75 Crore)</span>
                  </h4>
                  <span className="text-stone-500 font-mono text-[11px]">10,000+ Farmers · 12-Month Pilot</span>
                </div>

                <div className="border border-stone-200 rounded-xl overflow-hidden bg-white shadow-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold text-[11px]">
                        <th className="py-2.5 px-3">Cost Component</th>
                        <th className="py-2.5 px-3">Allocation (INR)</th>
                        <th className="py-2.5 px-3">Primary Operational Objective</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 text-[11px]">
                      <tr>
                        <td className="py-2.5 px-3 font-bold text-stone-950">1. Core Technology Development</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-stone-700">₹1,00,00,000 (₹1.00 Cr)</td>
                        <td className="py-2.5 px-3 text-stone-600">AI Engine, Kannada Voice API, Computer Vision, and Central/State DPI API Integrations</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-bold text-stone-950">2. Ground Operations & Human-in-the-Loop</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-stone-700">₹70,00,000 (₹70 Lakhs)</td>
                        <td className="py-2.5 px-3 text-stone-600">20 Village Coordinators (Krishi Setus), RSK officer validation honorariums, and handheld QR kits</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-bold text-stone-950">3. Logistics, Assaying & Storage Infrastructure</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-stone-700">₹45,00,000 (₹45 Lakhs)</td>
                        <td className="py-2.5 px-3 text-stone-600">Farm-gate truck dispatch fleet, automated digital assaying kits, and reserved WDRA warehouse bays</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-bold text-stone-950">4. Working Capital & Escrow Safety Pool</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-stone-700">₹40,00,000 (₹40 Lakhs)</td>
                        <td className="py-2.5 px-3 text-stone-600">Revolving bridge pool for instant e-NWR advances to prevent distress sales, plus escrow guarantees</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-bold text-stone-950">5. Admin, Compliance & Farmer Training</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-stone-700">₹20,00,000 (₹20 Lakhs)</td>
                        <td className="py-2.5 px-3 text-stone-600">FPO aggregation, APEDA export legal paperwork, and village-level voice app training camps</td>
                      </tr>
                      <tr className="bg-stone-50 font-bold text-stone-950 border-t border-stone-200">
                        <td className="py-3 px-3">Total Estimated Pilot Cost</td>
                        <td className="py-3 px-3 font-mono text-stone-950 text-xs">₹2,75,00,000 (₹2.75 Crore)</td>
                        <td className="py-3 px-3 text-stone-800">Complete 12-Month Self-Sustaining Pilot for Kalaburagi District</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ROLE & PERMISSION MATRIX */}
          {activeTab === 'matrix' && (
            <div className="space-y-4">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-700">
                <span className="font-bold text-stone-950">Principle of Farmer Sovereignty (Least Privilege): </span>
                The Farmer is the primary decision-maker. Supporting participants (Banks, RSK Officers, Vendors, Buyers)
                can never unilaterally read, modify, or liquidate farmer records without affirmative consent.
              </div>

              <div className="border border-stone-200 rounded-xl overflow-hidden bg-white">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold text-[11px]">
                      <th className="py-2.5 px-3">Portal Site</th>
                      <th className="py-2.5 px-3">Target Audience</th>
                      <th className="py-2.5 px-3">Read Capabilities</th>
                      <th className="py-2.5 px-3">Write / Execution Clearance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-[11px]">
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-stone-950">1. User Site</td>
                      <td className="py-2.5 px-3">Farmers, FPOs, Village Coordinators</td>
                      <td className="py-2.5 px-3">Own plot, soil health, crop advisory, mandi rates</td>
                      <td className="py-2.5 px-3 text-stone-700 font-semibold">Voice "Yield Ready", book services, apply loans</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-stone-950">2. Admin Side</td>
                      <td className="py-2.5 px-3">RSK Officers, KVKs, Data Custodians</td>
                      <td className="py-2.5 px-3">All cluster records, crop surveys, mandi transactions</td>
                      <td className="py-2.5 px-3 text-stone-700">Audit logs, issue GAP advisory, approve KYC tiers</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-stone-950">3. Owner Console</td>
                      <td className="py-2.5 px-3">Platform Governance & Supreme Admin</td>
                      <td className="py-2.5 px-3">All records, financial escrow pools, DB health</td>
                      <td className="py-2.5 px-3 text-red-700 font-bold">Master killswitches, fee overrides, role revocation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: SCHEMA & STATE MACHINES */}
          {activeTab === 'schema' && (
            <div className="space-y-4">
              <div className="border border-stone-200 rounded-xl p-4 bg-white space-y-2">
                <h4 className="font-bold text-stone-950 text-xs">The 3 Continuous Architecture Layers</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                    <span className="font-bold text-stone-950 block">Layer 1: Farmer Voice Layer</span>
                    <p className="text-[11px] text-stone-600 mt-1">
                      Kannada speech-to-text NLP questionnaire & GPS farm-drop. The farmer speaks; the app executes.
                    </p>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                    <span className="font-bold text-stone-950 block">Layer 2: Intelligence Layer</span>
                    <p className="text-[11px] text-stone-600 mt-1">
                      Digital Farming Portfolio engine, plot-specific agronomy blueprint, and CV pest triage.
                    </p>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                    <span className="font-bold text-stone-950 block">Layer 3: Connector Layer</span>
                    <p className="text-[11px] text-stone-600 mt-1">
                      Zero-friction adapters to AgriStack, Bhoomi, Kaveri, DCS, e-NAM, WDRA, and Jan Samarth.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: EXTERNAL INTEGRATIONS */}
          {activeTab === 'integrations' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.values(REGISTERED_INTEGRATIONS).map((integ) => (
                  <div key={integ.id} className="p-3.5 rounded-xl border border-stone-200 bg-white space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-950 text-xs">{integ.systemName}</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {integ.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-600">{integ.providerAgency}</p>
                    <div className="text-[10px] font-mono text-stone-400 pt-1">
                      Rate Limit: {integ.rateLimit} · Sync: {integ.updateFrequency}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: AUDIT LOGS */}
          {activeTab === 'audit' && (
            <div className="space-y-3">
              <div className="border border-stone-200 rounded-xl overflow-hidden bg-white">
                <div className="divide-y divide-stone-100 max-h-80 overflow-y-auto">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="p-3 text-xs flex items-start justify-between gap-3">
                      <div>
                        <div className="font-bold text-stone-950 flex items-center gap-1.5">
                          <span>{log.action}</span>
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-stone-100 text-stone-600">
                            {log.resourceType}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-600 mt-0.5">{log.details}</p>
                        <div className="text-[10px] text-stone-400 font-mono mt-1">
                          By: {log.performedBy} ({log.role})
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-stone-400 shrink-0">
                        {log.timestamp}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-medium">Raita Setu Karnataka · Verified Prototype Specification</span>
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
