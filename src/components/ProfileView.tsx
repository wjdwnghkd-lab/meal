import { useState, FormEvent } from 'react';
import { Bell, ChevronRight, Gavel, Landmark, Eye, EyeOff, Compass, Settings, AlertTriangle, MessageCircle, LogOut, Plus, Check } from 'lucide-react';

export default function ProfileView() {
  const [allergyAlert, setAllergyAlert] = useState(true);
  const [dailyAlert, setDailyAlert] = useState(true);
  
  // Real active list of allergies in state so user can add custom triggers
  const [allergies, setAllergies] = useState(['우유', '땅콩']);
  const [newAllergy, setNewAllergy] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddAllergy = (e: FormEvent) => {
    e.preventDefault();
    if (newAllergy.trim() && !allergies.includes(newAllergy.trim())) {
      setAllergies([...allergies, newAllergy.trim()]);
      setNewAllergy('');
      setShowAddForm(false);
    }
  };

  const handleRemoveAllergy = (tag: string) => {
    setAllergies(allergies.filter(item => item !== tag));
  };

  return (
    <main className="flex-1 px-5 py-6 space-y-4">
      {/* Profile Card */}
      <section className="relative p-5 rounded-2xl bg-white shadow-[0px_4px_20px_rgba(79,111,0,0.05)] bg-gradient-to-br from-white to-[#EEF0EA] flex items-center gap-4">
        <div className="relative shrink-0">
          <img
            alt="Student Avatar"
            className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnYTLfGCUFHX6--FhJXb0X8oTjX-H-9tEh2_QCyvXz7fDbqt088fRM8WWbxE1zC5TQgsaD34Z6bx22H-5ih-8ZrfvgHJVTQzeZKEhBg_cK1BPy8n5-YABrWneLZtn8e0HNRsS4JVJF9tsSJYo28TsoYPgmXXK-2MNHSq2vh7JpKMwXklvakEpoOuNh66QIUg-lWmNX30FqwNlv4gsGUk3kO_fmjiBcO0Ir78e_YlRXP90gBteqpZ9LnVBsJB5Gr6JrEMLYs6USKUg"
          />
          <button className="absolute -bottom-1 -right-1 bg-primary hover:bg-primary-container text-white p-1.5 rounded-full shadow-md active:scale-90 transition-transform">
            <Settings className="h-3 w-3" />
          </button>
        </div>
        <div className="flex flex-col">
          <h2 className="font-bold text-xl text-on-surface font-sans">김학생</h2>
          <p className="text-xs text-on-surface-variant font-medium mt-0.5">2학년 3반 15번 (씨마스고등학교)</p>
        </div>
      </section>

      {/* Settings Section */}
      <div className="space-y-3">
        {/* Allergy Settings */}
        <div className="p-5 rounded-2xl bg-white shadow-[0px_4px_20px_rgba(79,111,0,0.05)] space-y-4 border border-outline-variant/10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <span className="font-bold text-sm text-on-surface font-sans">알레르기 경고 알림</span>
            </div>
            
            {/* Custom toggle switch */}
            <button 
              onClick={() => setAllergyAlert(!allergyAlert)}
              className={`w-12 h-6 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${
                allergyAlert ? 'bg-primary' : 'bg-outline-variant'
              }`}
            >
              <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                allergyAlert ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {allergies.map((tag) => (
              <span 
                key={tag} 
                onClick={() => handleRemoveAllergy(tag)}
                className="bg-tertiary-fixed hover:bg-red-200 hover:text-red-800 transition-colors cursor-pointer px-3 py-1 rounded-full text-xs font-semibold text-on-tertiary-fixed-variant flex items-center gap-1 select-none"
                title="클릭하여 삭제"
              >
                {tag} <span className="text-[9px] opacity-70">×</span>
              </span>
            ))}
            
            {!showAddForm ? (
              <button 
                onClick={() => setShowAddForm(true)}
                className="bg-[#EEF0EA] hover:bg-outline-variant/30 text-on-surface-variant px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 active:bg-outline-variant transition-colors cursor-pointer"
              >
                <Plus className="h-3 w-3" /> 추가
              </button>
            ) : (
              <form onSubmit={handleAddAllergy} className="flex gap-1.5 items-center w-full mt-2 animate-fadeIn">
                <input
                  type="text"
                  placeholder="예: 메밀, 복숭아"
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  className="bg-[#EEF0EA] text-xs font-semibold px-3 py-1.5 rounded-xl border-none outline-none focus:ring-1 focus:ring-primary w-28"
                  autoFocus
                />
                <button 
                  type="submit"
                  className="bg-primary text-white p-1.5 rounded-xl text-xs font-bold active:scale-90 transition-transform cursor-pointer"
                >
                  <Check className="h-3.5 w-3.5" />
                </button>
                <button 
                  type="button" 
                  onClick={() => { setShowAddForm(false); setNewAllergy(''); }}
                  className="text-xs text-on-surface-variant hover:underline font-semibold ml-1 cursor-pointer"
                >
                  취소
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Daily Meal Notification */}
        <div className="p-5 rounded-2xl bg-white shadow-[0px_4px_20px_rgba(79,111,0,0.05)] border border-outline-variant/10 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <span className="font-bold text-sm text-on-surface font-sans">일일 식단 알림</span>
          </div>
          
          {/* Custom toggle switch */}
          <button 
            onClick={() => setDailyAlert(!dailyAlert)}
            className={`w-12 h-6 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${
              dailyAlert ? 'bg-primary' : 'bg-outline-variant'
            }`}
          >
            <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
              dailyAlert ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Navigation List */}
        <div className="bg-white rounded-2xl shadow-[0px_4px_20px_rgba(79,111,0,0.05)] border border-outline-variant/10 overflow-hidden">
          <button className="w-full flex justify-between items-center p-5 hover:bg-surface-container-low transition-colors text-left cursor-pointer group">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-on-surface-variant group-hover:text-primary transition-colors" />
              <span className="text-sm font-semibold text-on-surface font-sans">고객센터 / 문의하기</span>
            </div>
            <ChevronRight className="h-5 w-5 text-outline transition-transform group-hover:translate-x-1" />
          </button>
          
          <div className="h-[1px] bg-outline-variant/10 mx-5"></div>
          
          <button className="w-full flex justify-between items-center p-5 hover:bg-surface-container-low transition-colors text-left cursor-pointer group">
            <div className="flex items-center gap-2">
              <Gavel className="h-5 w-5 text-on-surface-variant group-hover:text-primary transition-colors" />
              <span className="text-sm font-semibold text-on-surface font-sans">이용약관</span>
            </div>
            <ChevronRight className="h-5 w-5 text-outline transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Logout */}
        <div className="flex justify-center pt-4">
          <button className="text-on-surface-variant hover:text-red-600 font-bold text-xs underline underline-offset-4 decoration-outline-variant/50 cursor-pointer flex items-center gap-1.5 transition-colors">
            <LogOut className="h-3.5 w-3.5" />
            로그아웃
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="pt-6 pb-10 text-center space-y-1">
        <p className="text-[10px] font-semibold text-outline tracking-wider uppercase font-mono">
          © 2026 씨마스고등학교 급식
        </p>
        <p className="text-[11px] font-medium text-outline opacity-80">
          "건강하고 맛있는 학교 식단을 지원합니다."
        </p>
      </footer>
    </main>
  );
}
