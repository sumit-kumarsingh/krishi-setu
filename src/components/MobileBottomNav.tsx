import React from 'react';
import { LayoutDashboard, Sprout, Wrench, Store, Landmark, Package } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MobileBottomNav: React.FC = () => {
  const { activeTab, setActiveTab, language, activePortal, switchPortal } = useApp();

  const navItems = [
    { id: 'dashboard', labelEn: 'Home', labelKn: 'ಮುಖಪುಟ', labelHi: 'होम', icon: LayoutDashboard },
    { id: 'crop_care', labelEn: 'Crops', labelKn: 'ಬೆಳೆ', labelHi: 'फसल', icon: Sprout },
    { id: 'services', labelEn: 'Services', labelKn: 'ಸೇವೆ', labelHi: 'सेवाएं', icon: Wrench },
    { id: 'mandi', labelEn: 'Mandi', labelKn: 'ಮಂಡಿ', labelHi: 'मंडी', icon: Store },
    { id: 'finance', labelEn: 'Schemes', labelKn: 'ಯೋಜನೆ', labelHi: 'योजना', icon: Landmark },
    { id: 'orders', labelEn: 'Orders', labelKn: 'ಆರ್ಡರ್', labelHi: 'ऑर्डर्स', icon: Package },
  ] as const;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-stone-200 shadow-sm">
      <div className="grid grid-cols-6 h-13 max-w-md mx-auto items-center px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id && activePortal === 'user';
          const label =
            language === 'kn' ? item.labelKn : language === 'hi' ? item.labelHi : item.labelEn;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                if (activePortal !== 'user') switchPortal('user');
                setActiveTab(item.id as any);
              }}
              className={`flex flex-col items-center justify-center py-1 h-full cursor-pointer transition-colors ${
                isActive ? 'text-stone-950 font-black' : 'text-stone-400 hover:text-stone-800'
              }`}
              aria-label={item.labelEn}
            >
              <div className="relative">
                <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5px] text-stone-950' : 'stroke-2'}`} />
                {item.id === 'orders' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 absolute -top-0.5 -right-1" />
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-0.5 truncate max-w-[50px] leading-tight">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
