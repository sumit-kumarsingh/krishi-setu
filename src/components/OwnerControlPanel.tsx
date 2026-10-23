import React, { useState } from 'react';
import {
  Crown,
  ShieldAlert,
  Sliders,
  Power,
  RotateCcw,
  Key,
  Users,
  Database,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle2,
  Download,
  Plus,
  Trash2,
  RefreshCw,
  Server,
  Zap,
  ArrowLeft,
  DollarSign,
  Cpu,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const OwnerControlPanel: React.FC = () => {
  const {
    switchPortal,
    governmentSchemes,
    autoFetchGovtSchemes,
    isGovtFetching,
    auditLogs,
  } = useApp();

  // Master Killswitches
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [liveAutoFetchActive, setLiveAutoFetchActive] = useState(true);
  const [dbtGatewayActive, setDbtGatewayActive] = useState(true);
  const [voiceAiActive, setVoiceAiActive] = useState(true);

  // Commercial Commission
  const [mandiCommissionPct, setMandiCommissionPct] = useState(0.5);
  const [rskRentalFeeInr, setRskRentalFeeInr] = useState(50);

  // Admin Access List
  const [adminsList, setAdminsList] = useState<
    Array<{ id: string; email: string; name: string; role: string; addedAt: string }>
  >([
    {
      id: 'adm_1',
      email: 'admin.karnataka@gmail.com',
      name: 'Admin Console Custodian',
      role: 'Chief Data Administrator',
      addedAt: '2024-01-15',
    },
    {
      id: 'adm_2',
      email: 'officer.aao.maddur@krishi.gov.in',
      name: 'Dr. Anasuya Patil',
      role: 'RSK Agricultural Officer',
      addedAt: '2024-02-01',
    },
  ]);

  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminName, setNewAdminName] = useState('');

  // Action status message
  const [actionAlert, setActionAlert] = useState<{
    type: 'success' | 'warn';
    message: string;
  } | null>(null);

  // Wipe confirmation dialog
  const [showWipeDialog, setShowWipeDialog] = useState(false);
  const [wipeConfirmInput, setWipeConfirmInput] = useState('');

  const handleGrantAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail) return;

    setAdminsList((prev) => [
      ...prev,
      {
        id: `adm_${Date.now()}`,
        email: newAdminEmail,
        name: newAdminName || 'Authorized Admin',
        role: 'Platform Operations Admin',
        addedAt: new Date().toISOString().substring(0, 10),
      },
    ]);

    setActionAlert({
      type: 'success',
      message: `Granted Administrator clearance to ${newAdminEmail}!`,
    });
    setNewAdminEmail('');
    setNewAdminName('');
    setTimeout(() => setActionAlert(null), 4000);
  };

  const handleRevokeAdmin = (id: string, email: string) => {
    setAdminsList((prev) => prev.filter((a) => a.id !== id));
    setActionAlert({
      type: 'warn',
      message: `Revoked Admin clearance from ${email}. Tokens invalidated immediately.`,
    });
    setTimeout(() => setActionAlert(null), 4000);
  };

  const handleTriggerEmergencyWipe = () => {
    if (wipeConfirmInput !== 'CONFIRM WIPE') {
      setActionAlert({
        type: 'warn',
        message: 'Security validation failed: You must type "CONFIRM WIPE" exactly.',
      });
      return;
    }

    try {
      localStorage.clear();
    } catch {}

    setShowWipeDialog(false);
    setWipeConfirmInput('');
    setActionAlert({
      type: 'success',
      message: 'Master database and cache sanitized to factory default seed.',
    });
  };

  return (
    <div className="space-y-3 pb-16 max-w-7xl mx-auto text-stone-900">
      {/* 1. Master Header Banner (Clean White & Bright Orange Accents) */}
      <div className="bg-white text-stone-900 rounded-xl p-3.5 sm:p-5 border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded bg-stone-900 text-white text-[10px] font-mono font-extrabold uppercase tracking-wider flex items-center gap-1">
              <Crown className="w-3 h-3 text-white" />
              OWNER SITE · SUPREME CONTROL ONLY
            </span>
            <span className="text-[11px] text-stone-700 font-mono font-bold">
              Root Authority Verified
            </span>
          </div>
          <h1 className="text-base sm:text-xl font-black tracking-tight text-stone-900 flex items-center gap-2">
            <span>Executive Platform Master Console</span>
          </h1>
          <p className="text-xs text-stone-500 max-w-xl">
            Exclusive executive command over database sync engines, emergency killswitches, admin privileges, and platform policies.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => switchPortal('admin')}
            className="h-8 px-3 rounded-lg bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-900 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Database className="w-3.5 h-3.5 text-stone-700" />
            <span>Admin Data View</span>
          </button>

          <button
            type="button"
            onClick={() => switchPortal('user')}
            className="h-8 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to User Site</span>
          </button>
        </div>
      </div>

      {/* Action Notification */}
      {actionAlert && (
        <div
          className={`p-3 rounded-lg text-xs font-bold flex items-center gap-2 ${
            actionAlert.type === 'success'
              ? 'bg-emerald-50 text-emerald-950 border border-emerald-300'
              : 'bg-amber-50 text-amber-950 border border-amber-300'
          }`}
        >
          {actionAlert.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          )}
          <span>{actionAlert.message}</span>
        </div>
      )}

      {/* 2. Master System Killswitches Grid */}
      <div className="bg-white rounded-xl border border-stone-200 p-3.5 shadow-xs">
        <div className="flex items-center justify-between mb-3 border-b border-stone-200 pb-2">
          <div className="flex items-center gap-2">
            <Power className="w-4 h-4 text-stone-700" />
            <h2 className="text-xs font-black uppercase tracking-wider text-stone-900">
              Master System Killswitches & Core Feature Flags
            </h2>
          </div>
          <span className="text-[10px] text-stone-400 font-mono">Owner Override Enabled</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {/* Switch 1: Maintenance Mode */}
          <div className={`p-3 rounded-lg border text-xs ${maintenanceMode ? 'bg-stone-50 border-stone-300' : 'bg-stone-50 border-stone-200'}`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-stone-900">Maintenance Mode</span>
              <button
                type="button"
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className={`w-10 h-5 flex items-center rounded-full p-0.5 cursor-pointer ${
                  maintenanceMode ? 'bg-stone-900 justify-end' : 'bg-stone-300 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>
            <p className="text-[11px] text-stone-500">
              {maintenanceMode ? '⚠️ Public sites locked to maintenance page.' : 'Normal operations running.'}
            </p>
          </div>

          {/* Switch 2: Live AI Grounding & Scheme Fetch */}
          <div className="p-3 rounded-lg border border-stone-200 bg-stone-50 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-stone-900">Govt Schemes Auto-Fetch</span>
              <button
                type="button"
                onClick={() => setLiveAutoFetchActive(!liveAutoFetchActive)}
                className={`w-10 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${
                  liveAutoFetchActive ? 'bg-stone-900 justify-end' : 'bg-stone-300 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>
            <p className="text-[11px] text-stone-500">
              {liveAutoFetchActive ? 'Live GoI & Karnataka scraping enabled.' : 'Offline frozen state.'}
            </p>
          </div>

          {/* Switch 3: Direct DBT Gateway */}
          <div className="p-3 rounded-lg border border-stone-200 bg-stone-50 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-stone-900">Direct DBT Application Gateway</span>
              <button
                type="button"
                onClick={() => setDbtGatewayActive(!dbtGatewayActive)}
                className={`w-10 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${
                  dbtGatewayActive ? 'bg-stone-900 justify-end' : 'bg-stone-300 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>
            <p className="text-[11px] text-stone-500">
              {dbtGatewayActive ? 'Farmers can submit Raitha Siri/PM-KISAN claims.' : 'Claims submission paused.'}
            </p>
          </div>

          {/* Switch 4: AI Voice Assistant */}
          <div className="p-3 rounded-lg border border-stone-200 bg-stone-50 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-stone-900">Raitha Mitra AI & Voice</span>
              <button
                type="button"
                onClick={() => setVoiceAiActive(!voiceAiActive)}
                className={`w-10 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${
                  voiceAiActive ? 'bg-stone-900 justify-end' : 'bg-stone-300 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>
            <p className="text-[11px] text-stone-500">
              {voiceAiActive ? 'Bilingual speech recognition active.' : 'Voice services disabled.'}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Section: Database Master Control & Disaster Recovery */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Left: Master Database Operations */}
        <div className="bg-white rounded-xl border border-stone-200 p-3.5 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-stone-700" />
              <h2 className="text-xs font-black uppercase tracking-wider text-stone-900">
                Master Database Sync & Override Controls
              </h2>
            </div>
            <span className="text-[10px] text-stone-400 font-mono">PostgreSQL / In-Memory</span>
          </div>

          <div className="space-y-2 text-xs">
            {/* Force Scheme Re-Index */}
            <div className="p-2.5 rounded-lg border border-stone-200 bg-stone-50 flex items-center justify-between gap-2">
              <div>
                <div className="font-bold text-stone-900">Force Re-Sync All Government Schemes</div>
                <div className="text-[11px] text-stone-500">
                  Scrapes official Indian MoA&FW and Karnataka FRUITS/Samrakshane portals.
                </div>
              </div>
              <button
                type="button"
                disabled={isGovtFetching}
                onClick={() => autoFetchGovtSchemes(true)}
                className="h-8 px-3 rounded-lg bg-stone-900 text-white hover:bg-stone-800 font-bold text-xs shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-white ${isGovtFetching ? 'animate-spin' : ''}`} />
                <span>Force Re-Sync</span>
              </button>
            </div>

            {/* Emergency Disaster Recovery / Factory Wipe */}
            <div className="p-2.5 rounded-lg border border-rose-200 bg-rose-50/60 flex items-center justify-between gap-2">
              <div>
                <div className="font-bold text-rose-950 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                  <span>Sanitize & Factory Reset Master State</span>
                </div>
                <div className="text-[11px] text-rose-800">
                  Wipes test data and restores seed integrity with audit compliance.
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowWipeDialog(true)}
                className="h-8 px-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shrink-0 cursor-pointer shadow-xs"
              >
                Reset Platform
              </button>
            </div>
          </div>
        </div>

        {/* Right: Commercial Rules & Commissions */}
        <div className="bg-white rounded-xl border border-stone-200 p-3.5 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-stone-700" />
              <h2 className="text-xs font-black uppercase tracking-wider text-stone-900">
                Commercial Rules & Platform Tariffs
              </h2>
            </div>
            <span className="text-[10px] text-stone-400 font-mono">Owner Discretion</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-stone-900">APMC Mandi Platform Fee</span>
                <span className="font-mono font-bold text-stone-700">{mandiCommissionPct}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="2.5"
                step="0.1"
                value={mandiCommissionPct}
                onChange={(e) => setMandiCommissionPct(parseFloat(e.target.value))}
                className="w-full accent-stone-900 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-mono mt-0.5">
                <span>0% (Subsidized Free)</span>
                <span>1.0%</span>
                <span>2.5% (Standard Commercial)</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-stone-900">RSK Equipment Escrow Deposit Fee</span>
                <span className="font-mono font-bold text-stone-900">₹{rskRentalFeeInr} / booking</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                step="10"
                value={rskRentalFeeInr}
                onChange={(e) => setRskRentalFeeInr(parseInt(e.target.value))}
                className="w-full accent-stone-900 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Section: Admin Privileges & Staff Management */}
      <div className="bg-white rounded-xl border border-stone-200 p-3.5 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-stone-200 pb-2">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-stone-700" />
            <h2 className="text-xs font-black uppercase tracking-wider text-stone-900">
              Admin Access Control & Staff Privileges
            </h2>
          </div>
          <span className="text-[10px] text-stone-400 font-mono">{adminsList.length} Active Admins</span>
        </div>

        {/* Add new admin form */}
        <form onSubmit={handleGrantAdmin} className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
          <div className="font-bold text-stone-900 mb-2 flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5 text-stone-700" />
            <span>Grant Admin Clearance to New Staff Member</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="Staff Name (e.g. Ramesh Hegde)"
              value={newAdminName}
              onChange={(e) => setNewAdminName(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-stone-200 bg-white text-xs focus:outline-none focus:border-stone-900"
            />
            <input
              type="email"
              required
              placeholder="staff.email@gmail.com"
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-stone-200 bg-white text-xs focus:outline-none focus:border-stone-900"
            />
            <button
              type="submit"
              className="h-8 rounded-lg bg-stone-900 text-white hover:bg-stone-800 font-bold text-xs cursor-pointer flex items-center justify-center gap-1.5 shadow-xs transition-colors"
            >
              <Key className="w-3.5 h-3.5 text-white" />
              <span>Grant Admin Rights</span>
            </button>
          </div>
        </form>

        {/* List of current admins */}
        <div className="divide-y divide-stone-100 border border-stone-200 rounded-lg overflow-hidden text-xs">
          {adminsList.map((admin) => (
            <div key={admin.id} className="p-2.5 hover:bg-stone-50 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-stone-100 border border-stone-300 flex items-center justify-center font-bold text-[10px] text-stone-800">
                  {admin.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="font-bold text-stone-900 flex items-center gap-1.5">
                    <span>{admin.name}</span>
                    <span className="text-[10px] font-mono text-stone-400">({admin.role})</span>
                  </div>
                  <div className="text-[11px] text-stone-500 font-mono">{admin.email} · Added {admin.addedAt}</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleRevokeAdmin(admin.id, admin.email)}
                className="px-2 py-1 rounded bg-stone-100 hover:bg-rose-100 hover:text-rose-900 text-stone-600 font-bold text-[10px] flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                <span>Revoke</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Wipe Confirmation Modal */}
      {showWipeDialog && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white rounded-xl border border-stone-300 max-w-md w-full p-4 space-y-3 shadow-xl">
            <div className="flex items-center gap-2 text-rose-600 font-black text-sm">
              <ShieldAlert className="w-5 h-5" />
              <span>Owner Emergency Reset Confirmation</span>
            </div>
            <p className="text-xs text-stone-700">
              This action will reset the local cache and restore all government schemes and farmer data to factory state.
            </p>
            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                Type <strong>CONFIRM WIPE</strong> to authenticate:
              </label>
              <input
                type="text"
                placeholder="CONFIRM WIPE"
                value={wipeConfirmInput}
                onChange={(e) => setWipeConfirmInput(e.target.value)}
                className="w-full px-3 py-1.5 border border-stone-300 rounded font-mono text-xs"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowWipeDialog(false)}
                className="px-3 py-1.5 rounded bg-stone-100 text-stone-700 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleTriggerEmergencyWipe}
                className="px-3 py-1.5 rounded bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer"
              >
                Execute Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
