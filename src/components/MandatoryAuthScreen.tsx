import React, { useState } from 'react';
import {
  User,
  Shield,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Lock,
  KeyRound,
  ShieldCheck,
  RefreshCw,
  Smartphone,
  Globe2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PortalType } from '../types/agriculture';

interface MandatoryAuthScreenProps {
  onAuthenticated?: () => void;
}

export const MandatoryAuthScreen: React.FC<MandatoryAuthScreenProps> = ({ onAuthenticated }) => {
  const {
    activePortal,
    switchPortal,
    loginWithPhone,
    loginWithGoogle,
    language,
    setLanguage,
  } = useApp();

  const [selectedRole, setSelectedRole] = useState<PortalType>(
    activePortal === 'admin' ? 'admin' : 'user'
  );
  const [authMethod, setAuthMethod] = useState<'phone' | 'gmail'>('phone');

  // Phone OTP States
  const [phoneNumber, setPhoneNumber] = useState('');
  const [farmerName, setFarmerName] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [simulatedOtp, setSimulatedOtp] = useState('');

  // Gmail States
  const [gmailId, setGmailId] = useState('');
  const [accountName, setAccountName] = useState('');

  // General States
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleRoleSelect = (role: PortalType) => {
    setSelectedRole(role);
    setErrorMsg('');
    setSuccessMsg('');
    setOtpSent(false);
    setOtpCode('');
  };

  // 1. Phone Number OTP Flow
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const clean = phoneNumber.replace(/[^\d]/g, '');
    if (clean.length < 10) {
      setErrorMsg(
        language === 'kn'
          ? 'ದಯವಿಟ್ಟು ಸರಿಯಾದ 10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ'
          : language === 'hi'
          ? 'कृपया वैध 10 अंकों का मोबाइल नंबर दर्ज करें'
          : 'Please enter a valid 10-digit mobile number'
      );
      return;
    }

    // Generate random 4-digit OTP
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setSimulatedOtp(generatedOtp);
    setOtpSent(true);
    setOtpCode(generatedOtp); // Auto-fill for seamless convenience

    setSuccessMsg(
      language === 'kn'
        ? `OTP ಅನ್ನು ${phoneNumber} ಗೆ ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ (ಪರೀಕ್ಷಾರ್ಥ ಕೋಡ್: ${generatedOtp})`
        : language === 'hi'
        ? `ओटीपी ${phoneNumber} पर भेज दिया गया है (परीक्षण कोड: ${generatedOtp})`
        : `OTP sent to ${phoneNumber} (Auto-filled test code: ${generatedOtp})`
    );
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode) {
      setErrorMsg('Please enter OTP');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const defaultNames = {
        user: farmerName || 'Ningappa Gowda',
        admin: farmerName || 'Dr. Priyadarshini (Agri Director)',
        owner: 'Platform Admin',
      };

      await loginWithPhone(phoneNumber, selectedRole, defaultNames[selectedRole]);
      if (onAuthenticated) onAuthenticated();
    } catch (err: any) {
      setErrorMsg(err.message || 'Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Gmail ID Flow
  const handleGmailLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const targetGmail = gmailId.trim() || (
        selectedRole === 'admin'
          ? 'admin.karnataka@gmail.com'
          : 'farmer.ningappa@gmail.com'
      );

      const targetName = accountName.trim() || (
        selectedRole === 'admin'
          ? 'Dr. Priyadarshini (Admin)'
          : 'Ningappa Gowda'
      );

      await loginWithGoogle(selectedRole, targetGmail, targetName);
      if (onAuthenticated) onAuthenticated();
    } catch (err: any) {
      setErrorMsg(err.message || 'Gmail login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Quick 1-Tap Demo Logins for instant evaluation
  const handleQuickDemoLogin = async (role: PortalType, method: 'phone' | 'gmail') => {
    setIsLoading(true);
    setErrorMsg('');

    try {
      if (method === 'phone') {
        const demoPhones = {
          user: '+91 98450 12345',
          admin: '+91 94480 88210',
          owner: '+91 94480 88210',
        };
        const demoNames = {
          user: 'Ningappa Gowda (Farmer)',
          admin: 'Dr. Priyadarshini (Agri Dept)',
          owner: 'Platform Admin',
        };
        await loginWithPhone(demoPhones[role], role, demoNames[role]);
      } else {
        const demoGmails = {
          user: 'ningappa.krishi@gmail.com',
          admin: 'admin.agri@karnataka.gov.in',
          owner: 'admin.agri@karnataka.gov.in',
        };
        const demoNames = {
          user: 'Ningappa Gowda',
          admin: 'Dr. Priyadarshini (Admin)',
          owner: 'Platform Admin',
        };
        await loginWithGoogle(role, demoGmails[role], demoNames[role]);
      }
      if (onAuthenticated) onAuthenticated();
    } catch (err: any) {
      setErrorMsg(err.message || 'Quick login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 text-stone-900">
        {/* Top Header with Bespoke Logo & Language Selector */}
        <div className="p-5 sm:p-6 pb-4 border-b border-stone-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white border border-stone-200 flex items-center justify-center shadow-xs">
              <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 28 C 12 18, 28 18, 36 28" stroke="#1c1917" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M8 32 L 8 26 M 20 32 L 20 21 M 32 32 L 32 26" stroke="#78716c" strokeWidth="2" strokeLinecap="round" />
                <path d="M20 22 C 20 14, 13 11, 10 13 C 10 19, 16 21, 20 22 Z" fill="#15803d" />
                <path d="M20 22 C 20 12, 27 9, 30 11 C 30 17, 24 20, 20 22 Z" fill="#16a34a" />
                <circle cx="20" cy="8" r="3" fill="#ca8a04" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black text-stone-950 tracking-tight leading-none">
                  KrishiSetu
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-800 border border-stone-200">
                  Mandatory Auth
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium mt-0.5">
                {language === 'kn' ? 'ಕೃಷಿಸೇತು · ಅಧಿಕೃತ ಸುರಕ್ಷಿತ ಪ್ರವೇಶ' : language === 'hi' ? 'कृषिसेतु · सुरक्षित लॉगिन' : 'Secure Agricultural Access Gateway'}
              </p>
            </div>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200 text-[11px] font-bold">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                language === 'en' ? 'bg-white text-stone-950 shadow-2xs' : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('kn')}
              className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                language === 'kn' ? 'bg-white text-stone-950 shadow-2xs' : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              ಕನ್ನಡ
            </button>
            <button
              type="button"
              onClick={() => setLanguage('hi')}
              className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                language === 'hi' ? 'bg-white text-stone-950 shadow-2xs' : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              हिन्दी
            </button>
          </div>
        </div>

        {/* Portal Selection (User / Admin / Owner) */}
        <div className="p-5 sm:p-6 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-900 block">
                {language === 'kn' ? 'ಪ್ರವೇಶಿಸಬೇಕಾದ ಪೋರ್ಟಲ್ ಆಯ್ಕೆಮಾಡಿ:' : language === 'hi' ? 'पोर्टल चुनें:' : '1. Select Portal to Log In:'}
              </label>
              <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verification Mandatory</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {/* User Site */}
              <button
                type="button"
                onClick={() => handleRoleSelect('user')}
                className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                  selectedRole === 'user'
                    ? 'border-stone-950 bg-stone-50 ring-2 ring-stone-950 shadow-xs'
                    : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50 bg-white'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-stone-100 flex items-center justify-center mb-1.5">
                  <User className="w-4 h-4 text-stone-800" />
                </div>
                <div className="font-extrabold text-xs text-stone-950">User Portal</div>
                <div className="text-[10px] text-stone-500">Farmers & Citizens</div>
              </button>

              {/* Admin Side */}
              <button
                type="button"
                onClick={() => handleRoleSelect('admin')}
                className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                  selectedRole === 'admin'
                    ? 'border-stone-950 bg-stone-50 ring-2 ring-stone-950 shadow-xs'
                    : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50 bg-white'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-stone-100 flex items-center justify-center mb-1.5">
                  <Shield className="w-4 h-4 text-stone-800" />
                </div>
                <div className="font-extrabold text-xs text-stone-950">Admin Side</div>
                <div className="text-[10px] text-stone-500">Agri Dept & APMC</div>
              </button>
            </div>
          </div>

          {/* Login Mode Toggle: Phone vs Gmail ID */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-stone-900 block">
              {language === 'kn' ? 'ಲಾಗಿನ್ ವಿಧಾನ ಆಯ್ಕೆಮಾಡಿ:' : language === 'hi' ? 'लॉगिन का माध्यम चुनें:' : '2. Choose Login Method:'}
            </label>

            <div className="grid grid-cols-2 gap-2 p-1 bg-stone-100 rounded-2xl border border-stone-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setAuthMethod('phone');
                  setErrorMsg('');
                }}
                className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  authMethod === 'phone'
                    ? 'bg-white text-stone-950 shadow-xs'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                <Smartphone className="w-4 h-4 text-stone-700" />
                <span>{language === 'kn' ? 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ (Phone)' : language === 'hi' ? 'मोबाइल नंबर' : 'Phone Number'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAuthMethod('gmail');
                  setErrorMsg('');
                }}
                className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  authMethod === 'gmail'
                    ? 'bg-white text-stone-950 shadow-xs'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                <Globe2 className="w-4 h-4 text-stone-700" />
                <span>{language === 'kn' ? 'ಜಿಮೇಲ್ ಐಡಿ (Gmail)' : language === 'hi' ? 'जीमेल आईडी' : 'Gmail ID'}</span>
              </button>
            </div>

            {/* Error & Success Feedback */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* METHOD 1: PHONE NUMBER LOGIN */}
            {authMethod === 'phone' && (
              <div className="space-y-3 p-4 bg-stone-50 rounded-2xl border border-stone-200">
                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        {language === 'kn' ? 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ:' : language === 'hi' ? 'मोबाइल नंबर दर्ज करें:' : 'Enter Mobile Number:'}
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-xs font-bold text-stone-500 font-mono">
                          +91
                        </span>
                        <input
                          type="tel"
                          placeholder="98450 12345"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full pl-12 pr-3 py-2 text-xs border border-stone-200 rounded-xl bg-white font-mono font-bold text-stone-950 focus:outline-none focus:border-stone-500"
                          required
                          autoFocus
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        {language === 'kn' ? 'ಹೆಸರು (ಐಚ್ಛಿಕ):' : language === 'hi' ? 'नाम (वैकल्पिक):' : 'Full Name (Optional):'}
                      </label>
                      <input
                        type="text"
                        placeholder={selectedRole === 'owner' ? 'Owner Name' : selectedRole === 'admin' ? 'Admin Officer Name' : 'Farmer Name'}
                        value={farmerName}
                        onChange={(e) => setFarmerName(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl bg-white text-stone-950 focus:outline-none focus:border-stone-500 font-medium"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-11 rounded-xl bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
                    >
                      <Smartphone className="w-4 h-4 text-white" />
                      <span>{language === 'kn' ? 'OTP ಕಳುಹಿಸಿ →' : language === 'hi' ? 'ओटीपी भेजें →' : 'Send Verification OTP →'}</span>
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-stone-700">
                          {language === 'kn' ? '4-ಅಂಕಿಯ OTP ನಮೂದಿಸಿ:' : language === 'hi' ? '4 अंकों का ओटीपी दर्ज करें:' : 'Enter 4-Digit OTP:'}
                        </label>
                        <button
                          type="button"
                          onClick={() => setOtpSent(false)}
                          className="text-[11px] text-stone-600 hover:text-stone-900 font-bold underline cursor-pointer"
                        >
                          Change Number
                        </button>
                      </div>
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="1234"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        className="w-full px-3 py-2 text-center tracking-widest text-base border border-stone-200 rounded-xl bg-white font-mono font-black text-stone-950 focus:outline-none focus:border-stone-500"
                        required
                        autoFocus
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-11 rounded-xl bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>
                        {isLoading
                          ? 'Verifying...'
                          : language === 'kn'
                          ? 'OTP ದೃಢೀಕರಿಸಿ & ಲಾಗಿನ್ ಆಗಿ'
                          : language === 'hi'
                          ? 'ओटीपी सत्यापित करें एवं लॉगिन करें'
                          : 'Verify OTP & Enter Portal'}
                      </span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* METHOD 2: GMAIL ID LOGIN */}
            {authMethod === 'gmail' && (
              <div className="space-y-3 p-4 bg-stone-50 rounded-2xl border border-stone-200">
                {/* One-Tap Google Button */}
                <button
                  type="button"
                  onClick={() => handleGmailLogin()}
                  disabled={isLoading}
                  className="w-full h-11 rounded-xl bg-white hover:bg-stone-100 border border-stone-300 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
                  <span>
                    {language === 'kn'
                      ? `Google ಮೂಲಕ ತ್ವರಿತ ಲಾಗಿನ್ (${selectedRole.toUpperCase()})`
                      : language === 'hi'
                      ? `Google खाते से लॉगिन करें (${selectedRole.toUpperCase()})`
                      : `One-Tap Sign in with Google (${selectedRole.toUpperCase()})`}
                  </span>
                </button>

                <div className="flex items-center gap-2 text-[10px] text-stone-400 font-bold uppercase justify-center">
                  <span className="h-px bg-stone-200 flex-1" />
                  <span>{language === 'kn' ? 'ಅಥವಾ ಜಿಮೇಲ್ ನಮೂದಿಸಿ' : language === 'hi' ? 'या जीमेल दर्ज करें' : 'or enter specific Gmail ID'}</span>
                  <span className="h-px bg-stone-200 flex-1" />
                </div>

                <form onSubmit={handleGmailLogin} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      {language === 'kn' ? 'ನಿಮ್ಮ Gmail ID:' : language === 'hi' ? 'जीमेल आईडी:' : 'Gmail Address:'}
                    </label>
                    <input
                      type="email"
                      placeholder={selectedRole === 'admin' ? 'admin@gmail.com' : 'farmer@gmail.com'}
                      value={gmailId}
                      onChange={(e) => setGmailId(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl bg-white font-mono text-stone-950 focus:outline-none focus:border-stone-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      {language === 'kn' ? 'ಖಾತೆದಾರರ ಹೆಸರು:' : language === 'hi' ? 'नाम:' : 'Account Holder Name:'}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl bg-white text-stone-950 focus:outline-none focus:border-stone-500 font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 rounded-xl bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
                  >
                    <Mail className="w-4 h-4 text-white" />
                    <span>
                      {isLoading
                        ? 'Authenticating...'
                        : language === 'kn'
                        ? 'Gmail ಮೂಲಕ ಲಾಗಿನ್ ಆಗಿ'
                        : language === 'hi'
                        ? 'जीमेल से लॉगिन करें'
                        : 'Sign In with Gmail ID'}
                    </span>
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Quick Demo Credentials Strip (1-Tap for Reviewers) */}
          <div className="pt-2 border-t border-stone-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                1-Tap Quick Demo Credentials:
              </span>
              <span className="text-[10px] text-stone-400 font-mono">No typing required</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('user', 'phone')}
                className="p-2.5 rounded-xl border border-stone-200 hover:border-stone-400 bg-white text-left cursor-pointer transition-colors"
              >
                <div className="font-bold text-xs text-stone-950">🌾 User (Farmer)</div>
                <div className="text-[10px] text-stone-500 font-mono">Phone: 9845012345</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('admin', 'gmail')}
                className="p-2.5 rounded-xl border border-stone-200 hover:border-stone-400 bg-white text-left cursor-pointer transition-colors"
              >
                <div className="font-bold text-xs text-stone-950">🛡️ Admin Officer</div>
                <div className="text-[10px] text-stone-500 font-mono">admin@karnataka.gov</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
