import React, { useState } from 'react';
import {
  User,
  Shield,
  Crown,
  Mail,
  Lock,
  Phone,
  CheckCircle2,
  AlertCircle,
  LogIn,
  UserPlus,
  LogOut,
  Sparkles,
  ExternalLink,
  KeyRound,
  ShieldCheck,
  Building,
  RefreshCw,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PortalType } from '../types/agriculture';

interface AuthSectionProps {
  onSuccess?: () => void;
  defaultRole?: PortalType;
}

export const AuthSection: React.FC<AuthSectionProps> = ({ onSuccess, defaultRole }) => {
  const {
    activePortal,
    switchPortal,
    authAccount,
    loginWithGoogle,
    loginWithEmail,
    signupWithEmail,
    logout,
    language,
  } = useApp();

  const [selectedPortal, setSelectedPortal] = useState<PortalType>(defaultRole || activePortal);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [customGoogleName, setCustomGoogleName] = useState('');

  const handlePortalSelect = (portal: PortalType) => {
    setSelectedPortal(portal);
    setStatusMessage(null);
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid email or Gmail ID' });
      return;
    }
    setIsLoading(true);
    setStatusMessage(null);

    try {
      if (authMode === 'signin') {
        await loginWithEmail(email, password, selectedPortal);
        setStatusMessage({
          type: 'success',
          text: `Signed in successfully into ${selectedPortal.toUpperCase()} Portal as ${email}`,
        });
      } else {
        await signupWithEmail(name || 'New Registered User', email, password, selectedPortal, phone);
        setStatusMessage({
          type: 'success',
          text: `Account created successfully! You are logged into the ${selectedPortal.toUpperCase()} Portal.`,
        });
      }
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Authentication failed. Please verify credentials.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleQuickLogin = async (
    role: PortalType,
    customEmailVal?: string,
    customNameVal?: string
  ) => {
    setIsLoading(true);
    setStatusMessage(null);
    try {
      await loginWithGoogle(role, customEmailVal, customNameVal);
      setStatusMessage({
        type: 'success',
        text: `Signed in with Google as ${customEmailVal || (role === 'owner' ? 'founder.owner@krishisetu.gov.in' : role === 'admin' ? 'admin.karnataka@gmail.com' : 'farmer.ningappa@gmail.com')} into ${role.toUpperCase()} Portal!`,
      });
      setShowGoogleModal(false);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: 'Google authentication error. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 p-4 sm:p-6 shadow-xs text-stone-900 space-y-5">
      {/* 1. Header with Title & Domain Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-stone-900" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-700">
              Unified Portal Access
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-stone-950 tracking-tight">
            Account Login & 3 Distinct Portals
          </h2>
          <p className="text-xs text-stone-600 mt-0.5">
            Sign up with your Gmail ID or email. Select one of the 3 portals according to your authorization.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-stone-500 bg-stone-100 px-2.5 py-1 rounded-lg">
            Active: <strong className="text-stone-950 uppercase">{activePortal}</strong>
          </span>
        </div>
      </div>

      {/* 2. Three Login Portals Selector (User / Admin / Owner) */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-stone-900">
          Select Target Portal To Sign In / Sign Up:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {/* Site 1: User Side */}
          <button
            type="button"
            onClick={() => handlePortalSelect('user')}
            className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
              selectedPortal === 'user'
                ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900 shadow-xs'
                : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50 bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                  selectedPortal === 'user' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700'
                }`}>
                  <User className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-xs text-stone-950">1. User Side</span>
              </div>
              {selectedPortal === 'user' && (
                <CheckCircle2 className="w-4 h-4 text-stone-700" />
              )}
            </div>
            <p className="text-[11px] text-stone-600 leading-snug">
              Farmers, agri entrepreneurs, and citizens. Crop care, mandi sales & subsidies.
            </p>
          </button>

          {/* Site 2: Admin Side */}
          <button
            type="button"
            onClick={() => handlePortalSelect('admin')}
            className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
              selectedPortal === 'admin'
                ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900 shadow-xs'
                : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50 bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                  selectedPortal === 'admin' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700'
                }`}>
                  <Shield className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-xs text-stone-950">2. Admin Side</span>
              </div>
              {selectedPortal === 'admin' && (
                <CheckCircle2 className="w-4 h-4 text-stone-700" />
              )}
            </div>
            <p className="text-[11px] text-stone-600 leading-snug">
              Full data visibility. Inspect all registered farmers, farm plots, mandi lots, and applications.
            </p>
          </button>

          {/* Site 3: Owner Side */}
          <button
            type="button"
            onClick={() => handlePortalSelect('owner')}
            className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
              selectedPortal === 'owner'
                ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900 shadow-xs'
                : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50 bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                  selectedPortal === 'owner' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700'
                }`}>
                  <Crown className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-xs text-stone-950">3. Owner Side</span>
              </div>
              {selectedPortal === 'owner' && (
                <CheckCircle2 className="w-4 h-4 text-stone-700" />
              )}
            </div>
            <p className="text-[11px] text-stone-600 leading-snug">
              Supreme executive console. Master killswitches, admin permissions, and policy controls.
            </p>
          </button>
        </div>
      </div>

      {/* 3. Current Active Session Strip (If logged in) */}
      {authAccount.isLoggedIn && (
        <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-stone-900 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
              {authAccount.avatarInitials}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-stone-950 truncate">
                  {authAccount.name}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-stone-100 text-stone-900 border border-stone-200">
                  {authAccount.role.toUpperCase()}
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Active Session
                </span>
              </div>
              <div className="text-xs text-stone-500 font-mono truncate mt-0.5">
                {authAccount.email} · via {authAccount.authMethod === 'google' ? 'Google / Gmail' : 'Password Credentials'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
            {activePortal !== selectedPortal ? (
              <button
                type="button"
                onClick={() => switchPortal(selectedPortal)}
                className="h-8 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center gap-1 cursor-pointer shadow-xs transition-colors"
              >
                <span>Launch {selectedPortal.toUpperCase()} Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <span className="text-xs font-bold text-stone-700 px-2.5 py-1 bg-stone-200 rounded-lg">
                Active in this portal
              </span>
            )}
            <button
              type="button"
              onClick={logout}
              title="Sign Out"
              className="h-8 px-3 rounded-lg border border-stone-200 bg-white hover:bg-stone-100 text-stone-800 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <LogOut className="w-3.5 h-3.5 text-stone-500" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Notification feedback */}
      {statusMessage && (
        <div
          className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-950 border border-emerald-200'
              : 'bg-rose-50 text-rose-950 border border-rose-200'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* 4. Google / Gmail Sign-In Section (Prominent & Clean) */}
      <div className="space-y-3">
        <div className="bg-stone-50/70 rounded-xl p-4 border border-stone-200 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-stone-950 flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-stone-700" />
              <span>Sign Up & Sign In with Gmail ID</span>
            </div>
            <span className="text-[10px] text-stone-500 font-mono">Instant 1-Click</span>
          </div>

          <p className="text-xs text-stone-600">
            Everyone can sign up or log in instantly with their Gmail ID. Clear permissions will be configured for the{' '}
            <strong className="text-stone-950">{selectedPortal.toUpperCase()}</strong> portal.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Primary Google Auth Button */}
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleGoogleQuickLogin(selectedPortal)}
              className="h-10 px-4 rounded-xl bg-white border border-stone-200 hover:border-stone-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2.5 shadow-2xs cursor-pointer transition-colors disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google (Gmail)</span>
            </button>

            {/* Custom Gmail Address trigger */}
            <button
              type="button"
              disabled={isLoading}
              onClick={() => setShowGoogleModal(true)}
              className="h-10 px-4 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 hover:border-stone-400 text-stone-900 font-bold text-xs flex items-center justify-center gap-2 shadow-2xs cursor-pointer transition-colors"
            >
              <KeyRound className="w-4 h-4 text-stone-700" />
              <span>Use Any Custom Gmail Address</span>
            </button>
          </div>
        </div>

        {/* Modal for Custom Gmail Entry */}
        {showGoogleModal && (
          <div className="p-4 bg-stone-100 rounded-xl border border-stone-300 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-stone-950">
                Enter Gmail ID for {selectedPortal.toUpperCase()} Portal
              </span>
              <button
                type="button"
                onClick={() => setShowGoogleModal(false)}
                className="text-stone-400 hover:text-stone-950 font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <input
                type="text"
                placeholder="Full Name (e.g. Ramesh Kumar)"
                value={customGoogleName}
                onChange={(e) => setCustomGoogleName(e.target.value)}
                className="px-3 py-2 rounded-lg border border-stone-200 bg-white text-stone-900 text-xs focus:outline-none focus:border-stone-500"
              />
              <input
                type="email"
                placeholder="example@gmail.com"
                value={customGoogleEmail}
                onChange={(e) => setCustomGoogleEmail(e.target.value)}
                className="px-3 py-2 rounded-lg border border-stone-200 bg-white text-stone-900 text-xs focus:outline-none focus:border-stone-500"
              />
            </div>
            <button
              type="button"
              onClick={() =>
                handleGoogleQuickLogin(
                  selectedPortal,
                  customGoogleEmail || undefined,
                  customGoogleName || undefined
                )
              }
              className="w-full h-9 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-extrabold text-xs cursor-pointer shadow-xs transition-colors"
            >
              Sign In / Sign Up With This Gmail Address
            </button>
          </div>
        )}

        {/* Divider */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-stone-200"></div>
          <span className="shrink-0 mx-3 text-[11px] font-mono font-bold text-stone-400 uppercase tracking-wider">
            or standard email & password
          </span>
          <div className="flex-grow border-t border-stone-200"></div>
        </div>

        {/* 5. Standard Website Email & Password Signup / Sign In Form */}
        <form onSubmit={handleEmailAuth} className="space-y-3">
          {/* Segmented Sign In vs Sign Up toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setAuthMode('signin')}
                className={`px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${
                  authMode === 'signin'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-950'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('signup')}
                className={`px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${
                  authMode === 'signup'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-950'
                }`}
              >
                Sign Up (Create Account)
              </button>
            </div>

            <span className="text-xs text-stone-500 font-mono">
              Target: <strong className="text-stone-950 uppercase">{selectedPortal}</strong>
            </span>
          </div>

          {authMode === 'signup' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ningappa Gowda"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-950 focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Mobile Number (Optional)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                  <input
                    type="tel"
                    placeholder="+91 98450 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-950 focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Email Address or Gmail *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                <input
                  type="email"
                  required
                  placeholder="name@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-950 focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-950 focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500 transition-colors"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-10 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors disabled:opacity-50"
          >
            {authMode === 'signin' ? (
              <>
                <LogIn className="w-4 h-4 text-white" />
                <span>Log In to {selectedPortal.toUpperCase()} Portal</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 text-white" />
                <span>Create Account & Enter {selectedPortal.toUpperCase()} Portal</span>
              </>
            )}
          </button>
        </form>

        {/* 6. Quick Demo Testing Accounts (1-Click Evaluation) */}
        <div className="pt-3 border-t border-stone-100">
          <div className="text-[11px] font-extrabold text-stone-500 uppercase tracking-wider mb-2">
            1-Click Demo Accounts (Instant Test):
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleGoogleQuickLogin('user', 'farmer.ningappa@gmail.com', 'Ningappa Gowda')}
              className="p-2.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-left text-xs cursor-pointer shadow-2xs transition-colors"
            >
              <div className="font-extrabold text-stone-950 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>User: Farmer Ningappa</span>
              </div>
              <div className="text-[10px] text-stone-500 truncate font-mono mt-0.5">
                farmer.ningappa@gmail.com
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleGoogleQuickLogin('admin', 'admin.karnataka@gmail.com', 'Admin Console Custodian')}
              className="p-2.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-left text-xs cursor-pointer shadow-2xs transition-colors"
            >
              <div className="font-extrabold text-stone-950 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>Admin: Data Custodian</span>
              </div>
              <div className="text-[10px] text-stone-500 truncate font-mono mt-0.5">
                admin.karnataka@gmail.com
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleGoogleQuickLogin('owner', 'founder.owner@krishisetu.gov.in', 'Supreme Platform Owner')}
              className="p-2.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-left text-xs cursor-pointer shadow-2xs transition-colors"
            >
              <div className="font-extrabold text-stone-950 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-stone-900" />
                <span>Owner: Supreme Master</span>
              </div>
              <div className="text-[10px] text-stone-500 truncate font-mono mt-0.5">
                founder.owner@krishisetu.gov.in
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
