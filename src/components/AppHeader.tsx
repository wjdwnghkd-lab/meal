import { Utensils, Bell } from 'lucide-react';

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-50 bg-surface shadow-sm flex justify-between items-center w-full px-5 h-16 border-b border-outline-variant/10">
      <div className="flex items-center gap-2 active:scale-95 transition-transform cursor-pointer">
        <Utensils className="h-6 w-6 text-primary" />
        <h1 className="font-semibold text-lg text-primary font-sans">씨마스고등학교 급식</h1>
      </div>
      <button className="text-on-surface-variant hover:opacity-80 transition-opacity active:scale-95 transition-transform p-1">
        <Bell className="h-6 w-6 text-primary" />
      </button>
    </header>
  );
}
