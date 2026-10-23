import React from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types/agriculture';
import { ChevronDown, Users } from 'lucide-react';

interface RoleOption {
  role: UserRole;
  labelEn: string;
  labelKn: string;
}

const ROLES: RoleOption[] = [
  { role: 'farmer', labelEn: 'Farmer (ರೈತ)', labelKn: 'ರೈತ' },
  { role: 'rsk_officer', labelEn: 'RSK Extension Officer', labelKn: 'ಆರ್‌ಎಸ್‌ಕೆ ಅಧಿಕಾರಿ' },
  { role: 'vendor', labelEn: 'Agri Inputs Vendor', labelKn: 'ಕೃಷಿ ಪರಿಕರ ಮಾರಾಟಗಾರ' },
  { role: 'service_provider', labelEn: 'Fleet & Logistics Operator', labelKn: 'ಸಾರಿಗೆ & ಯಂತ್ರೋಪಕರಣ' },
  { role: 'market_manager', labelEn: 'APMC Mandi Secretary', labelKn: 'ಎಪಿಎಂಸಿ ಮಂಡಿ ಕಾರ್ಯದರ್ಶಿ' },
  { role: 'buyer_exporter', labelEn: 'Institutional Buyer / Exporter', labelKn: 'ಖರೀದಿದಾರ / ರಫ್ತುದಾರ' },
  { role: 'financial_institution', labelEn: 'Bank / KCC Officer', labelKn: 'ಬ್ಯಾಂಕ್ / ಕೆಸಿಸಿ ಅಧಿಕಾರಿ' },
  { role: 'platform_admin', labelEn: 'System Admin View', labelKn: 'ಆಡಳಿತ ನೋಟ' },
];

export const RoleSwitcherBar: React.FC = () => {
  const { role, setRole, currentUser, language, activePortal } = useApp();

  // If viewing dedicated Admin or Owner consoles, keep the interface focused
  if (activePortal !== 'user') {
    return null;
  }

  return (
    <div className="bg-white border-b border-stone-200 px-3 sm:px-6 py-1.5 text-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Active Persona info */}
        <div className="flex items-center gap-2 min-w-0 shrink-0">
          <span className="w-5 h-5 rounded-full bg-stone-900 flex items-center justify-center text-[10px] text-white font-black shrink-0">
            {currentUser.avatarInitials}
          </span>
          <span className="font-extrabold text-stone-950 truncate text-xs">
            {currentUser.name}
          </span>
          <span className="text-stone-500 text-[11px] hidden sm:inline truncate max-w-[200px]">
            ({currentUser.designation || `${currentUser.village}, ${currentUser.district}`})
          </span>
        </div>

        {/* Right: Clean, responsive persona dropdown (Zero Horizontal Scrolling) */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-bold text-stone-500 hidden sm:flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-stone-700" />
            <span>{language === 'kn' ? 'ಪಾತ್ರ ಬದಲಾವಣೆ:' : 'Switch Role:'}</span>
          </span>
          
          <div className="relative">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="h-7 pl-2.5 pr-7 rounded-md text-xs font-bold bg-stone-100 hover:bg-stone-200 border border-stone-200 hover:border-stone-300 text-stone-900 cursor-pointer outline-none focus:border-stone-900 transition-colors appearance-none"
            >
              {ROLES.map((r) => (
                <option key={r.role} value={r.role}>
                  {language === 'kn' ? r.labelKn : r.labelEn}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-stone-500 absolute right-2 top-2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
