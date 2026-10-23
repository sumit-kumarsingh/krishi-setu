import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { RoleSwitcherBar } from './components/RoleSwitcherBar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { FarmerDashboard } from './components/FarmerDashboard';
import { CropCareModule } from './components/CropCareModule';
import { MarketplaceModule } from './components/MarketplaceModule';
import { ProduceSalesModule } from './components/ProduceSalesModule';
import { FinanceModule } from './components/FinanceModule';
import { RolePortals } from './components/RolePortals';
import { SeasonPlannerModal } from './components/SeasonPlannerModal';
import { ProduceLotModal } from './components/ProduceLotModal';
import { LogActivityModal } from './components/LogActivityModal';
import { SystemSpecsModal } from './components/SystemSpecsModal';
import { RaithaMitraChatbot } from './components/RaithaMitraChatbot';
import { FarmerProfilePage } from './components/FarmerProfilePage';
import { AdminDataCenter } from './components/AdminDataCenter';
import { OwnerControlPanel } from './components/OwnerControlPanel';
import { YieldReadyModal } from './components/YieldReadyModal';
import { TraceabilityModal } from './components/TraceabilityModal';
import { OrdersModule } from './components/OrdersModule';
import { NotificationModal } from './components/NotificationModal';
import { MandatoryAuthScreen } from './components/MandatoryAuthScreen';

const MainContent: React.FC = () => {
  const {
    authAccount,
    role,
    activeTab,
    activePortal,
    isPlannerModalOpen,
    setIsPlannerModalOpen,
    isProduceModalOpen,
    setIsProduceModalOpen,
    isSystemSpecsOpen,
    setIsSystemSpecsOpen,
    isYieldReadyModalOpen,
    setIsYieldReadyModalOpen,
    isTraceabilityModalOpen,
    setIsTraceabilityModalOpen,
    isNotificationOpen,
    setIsNotificationOpen,
  } = useApp();

  const [isLogActivityOpen, setIsLogActivityOpen] = useState(false);
  const isPortalAuthorized = authAccount.isLoggedIn && authAccount.role === activePortal;

  return (
    <div className="min-h-screen bg-white text-stone-900 flex flex-col font-sans select-none sm:select-auto overflow-x-hidden w-full">
      {/* 1. Header with 3 Site Portals Selector and Account Info */}
      <Header />

      {/* Mandatory Authentication Gateway for User, Admin, and Owner */}
      {!isPortalAuthorized ? (
        <MandatoryAuthScreen />
      ) : (
        <>
          {/* 2. Persona Switcher Bar (only when browsing User Site) */}
          <RoleSwitcherBar />

          {/* 3. Main Viewport Container */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-2 sm:px-4 py-2 sm:py-3">
        {/* Portal 2: ADMIN SIDE - Where all data can be seen */}
        {activePortal === 'admin' && <AdminDataCenter />}

        {/* Portal 3: OWNER SIDE - All things only owner can control */}
        {activePortal === 'owner' && <OwnerControlPanel />}

        {/* Portal 1: USER SIDE - Farmers, Agri Users & Citizens */}
        {activePortal === 'user' && (
          <>
            {role === 'farmer' ? (
              <>
                {activeTab === 'dashboard' && (
                  <FarmerDashboard
                    onOpenPlanner={() => setIsPlannerModalOpen(true)}
                    onOpenLogActivity={() => setIsLogActivityOpen(true)}
                    onOpenProduceModal={() => setIsProduceModalOpen(true)}
                  />
                )}
                {activeTab === 'crop_care' && (
                  <CropCareModule
                    onOpenPlanner={() => setIsPlannerModalOpen(true)}
                    onOpenLogActivity={() => setIsLogActivityOpen(true)}
                  />
                )}
                {activeTab === 'services' && <MarketplaceModule />}
                {activeTab === 'mandi' && (
                  <ProduceSalesModule
                    onOpenProduceModal={() => setIsProduceModalOpen(true)}
                  />
                )}
                {activeTab === 'finance' && <FinanceModule />}
                {activeTab === 'profile' && <FarmerProfilePage />}
                {activeTab === 'orders' && <OrdersModule />}
              </>
            ) : (
              /* Supporting Participant Portals (RSK, APMC, Bank, Buyer) */
              <RolePortals />
            )}
          </>
        )}
      </main>

      {/* 4. Ergonomic Mobile Bottom Nav (Thumb Zone) */}
      <MobileBottomNav />

      {/* 5. Modals & Wizards */}
      <SeasonPlannerModal
        isOpen={isPlannerModalOpen}
        onClose={() => setIsPlannerModalOpen(false)}
      />
      <ProduceLotModal
        isOpen={isProduceModalOpen}
        onClose={() => setIsProduceModalOpen(false)}
      />
      <LogActivityModal
        isOpen={isLogActivityOpen}
        onClose={() => setIsLogActivityOpen(false)}
      />
      <SystemSpecsModal
        isOpen={isSystemSpecsOpen}
        onClose={() => setIsSystemSpecsOpen(false)}
      />
      <YieldReadyModal
        isOpen={isYieldReadyModalOpen}
        onClose={() => setIsYieldReadyModalOpen(false)}
        onOpenTraceability={() => setIsTraceabilityModalOpen(true)}
      />
      <TraceabilityModal
        isOpen={isTraceabilityModalOpen}
        onClose={() => setIsTraceabilityModalOpen(false)}
      />
      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      {/* 6. Raitha Mitra AI Chatbot */}
      <RaithaMitraChatbot />
        </>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
