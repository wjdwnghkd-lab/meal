import { useState } from 'react';
import AppHeader from './components/AppHeader';
import HomeView from './components/HomeView';
import CalendarView from './components/CalendarView';
import CalculatorView from './components/CalculatorView';
import ProfileView from './components/ProfileView';
import { generateMockMeals } from './data/mockMeals';
import { getTodayKST } from './utils/dateUtils';
import { Home, CalendarDays, Calculator, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Tab = 'home' | 'calendar' | 'calculate' | 'profile';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  
  // Dynamic initialization of weekly meals based on real KST time
  const [meals] = useState(() => {
    const today = getTodayKST();
    return generateMockMeals(today);
  });

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView meals={meals} />;
      case 'calendar':
        return <CalendarView meals={meals} />;
      case 'calculate':
        return <CalculatorView meals={meals} />;
      case 'profile':
        return <ProfileView />;
    }
  };

  return (
    <div className="w-full max-w-[420px] bg-background relative min-h-screen pb-28 flex flex-col mx-auto shadow-xl ring-1 ring-black/5 rounded-b-3xl">
      {/* Universal Sticky Title Bar */}
      <AppHeader />

      {/* Main Tab Transitions */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Persistent Bottom Nav Bar */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] bg-surface-container-lowest border-t border-outline-variant/10 px-4 py-3 flex justify-around items-center z-50 rounded-t-2xl shadow-[0px_-4px_16px_rgba(79,111,0,0.06)] backdrop-blur-md bg-white/95">
        {/* Home */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center transition-all duration-200 cursor-pointer ${
            activeTab === 'home'
              ? 'bg-primary-container text-on-primary-container rounded-2xl px-5 py-1.5 shadow-[0px_4px_10px_rgba(79,111,0,0.15)] active-nav-glow scale-105'
              : 'text-on-surface-variant hover:bg-surface-container-high px-5 py-1.5 rounded-2xl'
          }`}
        >
          <Home className={`h-5 w-5 ${activeTab === 'home' ? 'fill-current' : ''}`} />
          <span className="text-[11px] font-bold font-sans mt-0.5">홈</span>
        </button>

        {/* Weekly Calendar */}
        <button
          onClick={() => setActiveTab('calendar')}
          className={`flex flex-col items-center justify-center transition-all duration-200 cursor-pointer ${
            activeTab === 'calendar'
              ? 'bg-primary-container text-on-primary-container rounded-2xl px-5 py-1.5 shadow-[0px_4px_10px_rgba(79,111,0,0.15)] active-nav-glow scale-105'
              : 'text-on-surface-variant hover:bg-surface-container-high px-5 py-1.5 rounded-2xl'
          }`}
        >
          <CalendarDays className={`h-5 w-5 ${activeTab === 'calendar' ? 'fill-current' : ''}`} />
          <span className="text-[11px] font-bold font-sans mt-0.5">식단표</span>
        </button>

        {/* Nutritional Calculator */}
        <button
          onClick={() => setActiveTab('calculate')}
          className={`flex flex-col items-center justify-center transition-all duration-200 cursor-pointer ${
            activeTab === 'calculate'
              ? 'bg-primary-container text-on-primary-container rounded-2xl px-5 py-1.5 shadow-[0px_4px_10px_rgba(79,111,0,0.15)] active-nav-glow scale-105'
              : 'text-on-surface-variant hover:bg-surface-container-high px-5 py-1.5 rounded-2xl'
          }`}
        >
          <Calculator className={`h-5 w-5 ${activeTab === 'calculate' ? 'fill-current' : ''}`} />
          <span className="text-[11px] font-bold font-sans mt-0.5">영양계산</span>
        </button>

        {/* Student Profile Settings */}
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center transition-all duration-200 cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-primary-container text-on-primary-container rounded-2xl px-5 py-1.5 shadow-[0px_4px_10px_rgba(79,111,0,0.15)] active-nav-glow scale-105'
              : 'text-on-surface-variant hover:bg-surface-container-high px-5 py-1.5 rounded-2xl'
          }`}
        >
          <User className={`h-5 w-5 ${activeTab === 'profile' ? 'fill-current' : ''}`} />
          <span className="text-[11px] font-bold font-sans mt-0.5">프로필</span>
        </button>
      </nav>
    </div>
  );
}
