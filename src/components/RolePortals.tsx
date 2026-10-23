import React, { useState } from 'react';
import {
  ShieldCheck,
  Building2,
  Truck,
  Store,
  Globe2,
  Landmark,
  UserCheck,
  Plus,
  CheckCircle2,
  XCircle,
  FileText,
  AlertTriangle,
  Upload,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const RolePortals: React.FC = () => {
  const {
    role,
    currentUser,
    language,
    services,
    vendorProducts,
    bookings,
    updateBookingStatus,
    produceLots,
    offers,
    acceptOffer,
    applications,
    updateApplicationStatus,
    auditLogs,
    advisories,
  } = useApp();

  const [newAdvisoryTitle, setNewAdvisoryTitle] = useState('');
  const [newAdvisoryText, setNewAdvisoryText] = useState('');
  const [advisoryBroadcastMsg, setAdvisoryBroadcastMsg] = useState('');

  const handleBroadcastAdvisory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdvisoryTitle) return;
    setAdvisoryBroadcastMsg(`Official RSK Advisory broadcasted across Mandya district!`);
    setNewAdvisoryTitle('');
    setNewAdvisoryText('');
    setTimeout(() => setAdvisoryBroadcastMsg(''), 5000);
  };

  return (
    <div className="space-y-2 pb-16 md:pb-4 max-w-5xl mx-auto">
      {/* Role Header Banner (Clean White + Orange Role Pill) */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-xs flex items-center justify-between gap-3 text-stone-900">
        <div className="min-w-0">
          <div className="text-[10px] text-stone-500 font-extrabold uppercase tracking-wider mb-0.5">
            Supporting Participant Portal
          </div>
          <h1 className="text-sm sm:text-base font-black text-stone-950 truncate">
            {currentUser.name}
          </h1>
          <p className="text-xs text-stone-500 truncate">
            {currentUser.designation} · {currentUser.organization || currentUser.district}
          </p>
        </div>

        <div className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-950 border border-stone-200 text-xs font-mono font-bold shrink-0">
          Role: {role.toUpperCase().replace('_', ' ')}
        </div>
      </div>

      {/* 1. RSK KARNATAKA OFFICER PORTAL */}
      {role === 'rsk_officer' && (
        <div className="space-y-2">
          <div className="bg-white rounded-xl p-3 border border-stone-200 shadow-2xs space-y-2 text-xs">
            <h2 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-stone-700" />
              <span>Broadcast Official RSK Agricultural Advisory</span>
            </h2>

            {advisoryBroadcastMsg && (
              <div className="p-2 bg-stone-100 text-stone-950 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-stone-700" />
                <span>{advisoryBroadcastMsg}</span>
              </div>
            )}

            <form onSubmit={handleBroadcastAdvisory} className="space-y-2 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-stone-700 mb-0.5">Advisory Headline</label>
                <input
                  type="text"
                  placeholder="e.g. Warning: Stem Borer threshold reached in Maddur"
                  value={newAdvisoryTitle}
                  onChange={(e) => setNewAdvisoryTitle(e.target.value)}
                  className="w-full px-2.5 py-1 text-xs border border-stone-200 rounded-lg bg-stone-50"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-stone-700 mb-0.5">Recommended Agronomic Action</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Release Trichogramma egg parasitoids @ 40,000/acre."
                  value={newAdvisoryText}
                  onChange={(e) => setNewAdvisoryText(e.target.value)}
                  className="w-full px-2.5 py-1 text-xs border border-stone-200 rounded-lg bg-stone-50"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-3.5 py-1.5 font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-lg text-xs cursor-pointer"
              >
                Broadcast to Farmers
              </button>
            </form>
          </div>

          <div className="bg-white rounded-xl p-3 border border-stone-200 shadow-2xs space-y-1.5 text-xs">
            <h3 className="text-xs font-bold text-stone-900">Current District Advisories</h3>
            <div className="space-y-1 text-xs">
              {advisories.map((a) => (
                <div key={a.id} className="p-2 bg-stone-50 rounded-lg border border-stone-200">
                  <div className="font-bold text-stone-900">{a.title}</div>
                  <div className="text-stone-500 text-[10px] mt-0.5">{a.source} · {a.publishedDate}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. AGRI VENDOR PORTAL */}
      {role === 'vendor' && (
        <div className="bg-white rounded-xl p-3 border border-stone-200 shadow-2xs space-y-2 text-xs">
          <div>
            <h2 className="text-xs font-bold text-stone-900">Your Agricultural Catalog & Inventory</h2>
            <p className="text-[10px] text-stone-500">Manage certified seeds, bio-fertilizers, and farm tools</p>
          </div>

          <div className="overflow-x-auto border border-stone-200 rounded-lg text-[11px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 text-stone-600 font-bold border-b border-stone-200">
                  <th className="p-2">Product Name</th>
                  <th className="p-2">Category</th>
                  <th className="p-2">Price & Unit</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-800">
                {vendorProducts.map((p) => (
                  <tr key={p.id}>
                    <td className="p-2 font-semibold text-stone-900">{p.name}</td>
                    <td className="p-2 capitalize">{p.category.replace('_', ' ')}</td>
                    <td className="p-2 font-mono font-bold">₹{p.priceInr}/{p.unit}</td>
                    <td className="p-2 text-stone-700 font-bold">In Stock</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. SERVICE PROVIDER PORTAL */}
      {role === 'service_provider' && (
        <div className="bg-white rounded-xl p-3 border border-stone-200 shadow-2xs space-y-2 text-xs">
          <h2 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-stone-700" />
            <span>Incoming Farmer Machinery & Fleet Bookings</span>
          </h2>

          <div className="space-y-1.5">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="p-2 rounded-lg border border-stone-200 bg-stone-50 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-stone-900">{b.serviceTitle}</div>
                  <div className="text-stone-500 text-[10px]">
                    Farmer: <strong>{b.farmerName}</strong> · Plot: {b.plotName}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-stone-800 bg-stone-100 px-1.5 py-0.5 rounded text-[9px] uppercase">
                    {b.status}
                  </span>
                  {b.status === 'confirmed' && (
                    <button
                      type="button"
                      onClick={() => updateBookingStatus(b.id, 'completed')}
                      className="px-2 py-0.5 font-bold text-white bg-stone-900 rounded text-[10px] cursor-pointer"
                    >
                      Complete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. APMC MARKET SECRETARY PORTAL */}
      {role === 'market_manager' && (
        <div className="bg-white rounded-xl p-3 border border-stone-200 shadow-2xs space-y-2 text-xs">
          <h2 className="text-xs font-bold text-stone-900">APMC Mandya Market Administration</h2>
          <div className="space-y-1.5">
            {produceLots.map((lot) => (
              <div key={lot.id} className="p-2 bg-stone-50 rounded-lg border border-stone-200 text-xs flex justify-between items-center">
                <div>
                  <div className="font-bold text-stone-900">{lot.cropName} - Lot #{lot.id}</div>
                  <div className="text-stone-500 text-[10px]">Farmer: {lot.farmerName} · {lot.quantityQuintals} Qtl</div>
                </div>
                <div className="font-mono font-bold text-stone-800 text-xs">
                  ₹{lot.askingPricePerQuintalInr}/Qtl
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. BUYER & EXPORTER PORTAL */}
      {role === 'buyer_exporter' && (
        <div className="bg-white rounded-xl p-3 border border-stone-200 shadow-2xs space-y-2 text-xs">
          <h2 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
            <Globe2 className="w-4 h-4 text-stone-700" />
            <span>Direct Sourcing & APEDA Export Pipeline</span>
          </h2>

          <div className="space-y-1.5">
            {produceLots.map((lot) => (
              <div key={lot.id} className="p-2 bg-stone-50 rounded-lg border border-stone-200 text-xs flex justify-between items-center">
                <div>
                  <div className="font-bold text-stone-900">{lot.cropName} ({lot.variety})</div>
                  <div className="text-stone-500 text-[10px]">{lot.quantityQuintals} Quintals · Moisture: {lot.moisturePct}%</div>
                </div>
                <div className="font-mono font-bold text-stone-800 text-xs">
                  ₹{lot.askingPricePerQuintalInr}/Qtl
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. FINANCIAL INSTITUTION PORTAL */}
      {role === 'financial_institution' && (
        <div className="bg-white rounded-xl p-3 border border-stone-200 shadow-2xs space-y-2 text-xs">
          <h2 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
            <Landmark className="w-4 h-4 text-stone-700" />
            <span>Canara Bank Krishi Division - Loan Underwriting</span>
          </h2>

          <div className="space-y-1.5">
            {applications.map((app) => (
              <div key={app.id} className="p-2 bg-stone-50 rounded-lg border border-stone-200 text-xs flex justify-between items-center">
                <div>
                  <div className="font-bold text-stone-900">{app.productTitle}</div>
                  <div className="text-stone-500 text-[10px]">Applicant: {app.farmerName} · {app.consentedDataItems.join(', ')}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-stone-800">₹{app.requestedAmountInr.toLocaleString()}</span>
                  {app.status !== 'approved' && (
                    <button
                      type="button"
                      onClick={() => updateApplicationStatus(app.id, 'approved')}
                      className="px-2 py-0.5 rounded bg-stone-900 text-white font-bold text-[10px] cursor-pointer"
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

      {/* 7. PLATFORM ADMIN PORTAL */}
      {role === 'platform_admin' && (
        <div className="bg-white rounded-xl p-3 border border-stone-200 shadow-2xs space-y-2 text-xs">
          <h2 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-stone-700" />
            <span>Platform Governance & Consent Audit Console</span>
          </h2>

          <div className="divide-y divide-stone-100 border border-stone-200 rounded-lg overflow-hidden text-[11px]">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-2 bg-white flex justify-between items-start gap-2">
                <div>
                  <span className="font-mono bg-stone-50 text-stone-900 px-1 py-0.2 rounded font-bold text-[9px] mr-1">
                    {log.action}
                  </span>
                  <span className="text-stone-700">{log.details}</span>
                </div>
                <span className="text-[9px] text-stone-400 font-mono whitespace-nowrap">{log.timestamp.substring(11, 16)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
