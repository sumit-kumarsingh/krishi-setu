import React, { useState } from 'react';
import {
  Languages,
  User,
  Shield,
  Bell,
  Search,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  FileSpreadsheet,
  LogOut,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LanguageCode } from '../types/agriculture';

export const Header: React.FC = () => {
  const {
    language,
    setLanguage,
    activeTab,
    setActiveTab,
    setIsNotificationOpen,
    activePortal,
    switchPortal,
    authAccount,
    farmerExtendedProfile,
    logout,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const languagesList: { code: LanguageCode; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4 relative">
        {/* Left Side: 3-Portal Switcher & Mobile Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Desktop 2-Portal Switcher (Clean Neutral / Pure White & Slate) */}
          <div className="hidden lg:flex items-center gap-0.5 p-0.5 bg-stone-100 rounded-lg border border-stone-200 text-xs font-semibold">
            <button
              type="button"
              onClick={() => switchPortal('user')}
              className={`h-7 px-2.5 rounded-md text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                activePortal === 'user'
                  ? 'bg-white text-stone-950 shadow-2xs font-extrabold border border-stone-200'
                  : 'text-stone-600 hover:text-stone-950 hover:bg-stone-50'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>User Site</span>
            </button>

            <button
              type="button"
              onClick={() => switchPortal('admin')}
              className={`h-7 px-2.5 rounded-md text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                activePortal === 'admin'
                  ? 'bg-white text-stone-950 shadow-2xs font-extrabold border border-stone-200'
                  : 'text-stone-600 hover:text-stone-950 hover:bg-stone-50'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Side</span>
            </button>
          </div>

          {/* Mobile Portal Selector Dropdown */}
          <div className="lg:hidden relative">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-900 flex items-center justify-center cursor-pointer shadow-2xs transition-colors shrink-0"
              title={`Active Portal: ${activePortal}`}
              aria-label="Switch Portal"
            >
              {activePortal === 'admin' ? (
                <Shield className="w-4 h-4 text-stone-800" />
              ) : (
                <User className="w-4 h-4 text-stone-800" />
              )}
            </button>

            {mobileMenuOpen && (
              <div className="absolute left-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-stone-200 p-1.5 z-50 space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    switchPortal('user');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 ${
                    activePortal === 'user' ? 'bg-stone-900 text-white' : 'text-stone-800 hover:bg-stone-100'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>1. User Site</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    switchPortal('admin');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 ${
                    activePortal === 'admin' ? 'bg-stone-900 text-white' : 'text-stone-800 hover:bg-stone-100'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>2. Admin Side</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Center: Bespoke Logo, Centered App Name "KrishiSetu", and Notification Bell Icon */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3 absolute left-1/2 -translate-x-1/2">
          <button
            type="button"
            onClick={() => {
              if (activePortal !== 'user') switchPortal('user');
              setActiveTab('dashboard');
            }}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group"
          >
            {/* Elegant Bespoke KrishiSetu Logo: Green Sprout + Golden Wheat + Setu Arch */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center shadow-xs group-hover:border-stone-400 transition-colors">
              <svg viewBox="0 0 40 40" className="w-6 h-6 sm:w-7 sm:h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Bridge (Setu) arch curve */}
                <path
                  d="M4 28 C 12 18, 28 18, 36 28"
                  stroke="#1c1917"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M8 32 L 8 26 M 20 32 L 20 21 M 32 32 L 32 26"
                  stroke="#78716c"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                {/* Sprout & Seedling Leaf (Krishi) */}
                <path
                  d="M20 22 C 20 14, 13 11, 10 13 C 10 19, 16 21, 20 22 Z"
                  fill="#15803d"
                />
                <path
                  d="M20 22 C 20 12, 27 9, 30 11 C 30 17, 24 20, 20 22 Z"
                  fill="#16a34a"
                />
                {/* Sun / Wheat Grain */}
                <circle cx="20" cy="8" r="3" fill="#ca8a04" />
              </svg>
            </div>

            <div className="text-center sm:text-left">
              <div className="text-base sm:text-xl font-black tracking-tight text-stone-950 leading-none">
                KrishiSetu
              </div>
              <div className="text-[10px] text-stone-500 font-medium tracking-wide hidden sm:block">
                {language === 'kn' ? 'ಕೃಷಿಸೇತು · ಸಮೃದ್ಧ ಭಾರತ' : language === 'hi' ? 'कृषिसेतु · किसान मंच' : 'Farmer-First Agri Platform'}
              </div>
            </div>
          </button>

          {/* Notification Icon beside Centered App Name */}
          <button
            type="button"
            onClick={() => setIsNotificationOpen(true)}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-stone-100 hover:bg-stone-200 border border-stone-200 flex items-center justify-center text-stone-800 cursor-pointer transition-colors relative shadow-2xs shrink-0"
            title="Notifications & Alerts"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 text-stone-800" />
            {/* Live Notification Indicator */}
            <span className="w-2 h-2 rounded-full bg-emerald-500 absolute top-1.5 right-1.5 animate-pulse" />
          </button>
        </div>

        {/* Right Top Corner: Translator (Hindi, English, Kannada) & Farmer Profile with Farm Report */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Language Translator Dropdown (Hindi, English, Kannada) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full text-xs font-bold bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-900 flex items-center justify-center cursor-pointer transition-colors shadow-2xs shrink-0"
              title={`Language: ${language === 'kn' ? 'ಕನ್ನಡ' : language === 'hi' ? 'हिन्दी' : 'English'} (Click to change)`}
              aria-label="Change Language"
            >
              <span className="text-[11px] font-black uppercase font-mono tracking-tight text-stone-800">
                {language === 'kn' ? 'ಕ' : language === 'hi' ? 'हि' : 'EN'}
              </span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-lg border border-stone-200 p-1 z-50 space-y-0.5">
                {languagesList.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => {
                      setLanguage(l.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center justify-between ${
                      language === l.code ? 'bg-stone-900 text-white' : 'text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <span>{l.native}</span>
                    <span className="text-[10px] opacity-75 uppercase font-mono">{l.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile in Right Top Corner (View Farmer Report Card) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-stone-900 hover:bg-stone-800 text-white border-2 border-stone-200 hover:border-stone-400 flex items-center justify-center text-xs font-black cursor-pointer shadow-2xs transition-all shrink-0 relative"
              title={`${authAccount.name || farmerExtendedProfile.name} - My Profile & Options`}
              aria-label="User Profile"
            >
              <span className="text-[11px] font-black text-white">
                {authAccount.avatarInitials || (authAccount.name ? authAccount.name.slice(0, 2).toUpperCase() : 'KS')}
              </span>
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white absolute -bottom-0.5 -right-0.5" />
            </button>

            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-stone-200 p-3 z-50 space-y-3 text-stone-900">
                <div className="flex items-center gap-2.5 pb-2 border-b border-stone-100">
                  <div className="w-9 h-9 rounded-xl bg-stone-900 text-white flex items-center justify-center text-xs font-black shrink-0">
                    {authAccount.avatarInitials || 'KS'}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-black text-stone-950 truncate">
                      {authAccount.name || 'Ningappa Gowda'}
                    </div>
                    <div className="text-[10px] text-stone-500 truncate font-mono">
                      {authAccount.phone || authAccount.email || 'Verified Session'}
                    </div>
                    <div className="text-[10px] text-emerald-700 font-bold capitalize mt-0.5">
                      ● {authAccount.role || activePortal} Portal Active
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (activePortal !== 'user') switchPortal('user');
                      setActiveTab('profile');
                      setProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-stone-50 text-xs font-bold text-stone-900 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>{language === 'kn' ? 'ಅಧಿಕೃತ ಕೃಷಿ ವರದಿ' : language === 'hi' ? 'आधिकारिक कृषि रिपोर्ट' : 'View Farm Report Card'}</span>
                    <span className="text-stone-400">→</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-rose-50 text-xs font-bold text-rose-700 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-600" />
                    <span>{language === 'kn' ? 'ಖಾತೆಯಿಂದ ಲಾಗ್ ಔಟ್' : language === 'hi' ? 'लॉगआउट करें' : 'Log Out / Switch Account'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
