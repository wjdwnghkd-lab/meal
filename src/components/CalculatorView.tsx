import { useState, useEffect } from 'react';
import { Meal } from '../types';
import { getTodayKST, getDefaultSelectedDate, formatDateKey } from '../utils/dateUtils';
import { Check, Plus, Save, Sparkles, CheckCircle } from 'lucide-react';

interface CalculatorViewProps {
  meals: Meal[];
}

interface DishNutrient {
  kcal: number;
  carbs: number; // in grams
  protein: number; // in grams
  fat: number; // in grams
  tag: string;
  category: '밥류' | '국/찌개' | '반찬' | '디저트';
}

// Highly comprehensive nutrition database mapping every possible side dish in the mock schedule
const sideNutritionDb: Record<string, DishNutrient> = {
  // Monday Lunch
  '친환경현미밥': { kcal: 320, carbs: 68, protein: 7, fat: 1, tag: '탄수화물 68g', category: '밥류' },
  '쇠고기미역국': { kcal: 110, carbs: 6, protein: 10, fat: 5, tag: '쇠고기 다량', category: '국/찌개' },
  '수제치즈돈까스': { kcal: 360, carbs: 22, protein: 14, fat: 19, tag: '자연치즈 함유', category: '반찬' }, // Fallback mock matching is 치즈돈까스 정식 dishes
  '매콤돈육강정': { kcal: 360, carbs: 22, protein: 14, fat: 19, tag: '국산돈육 100%', category: '반찬' }, 
  '숙주미나리무침': { kcal: 35, carbs: 6, protein: 1, fat: 0, tag: '식이섬유 2g', category: '반찬' },
  '배추김치': { kcal: 20, carbs: 4, protein: 0.5, fat: 0, tag: '비타민 C', category: '반찬' },

  // Tuesday Lunch
  '흑미밥': { kcal: 310, carbs: 66, protein: 6, fat: 1, tag: '밀도 높은 영양', category: '밥류' },
  '팽이버섯장국': { kcal: 50, carbs: 8, protein: 2, fat: 1, tag: '버섯 추출액', category: '국/찌개' },
  '해물볶음우동': { kcal: 330, carbs: 54, protein: 12, fat: 7, tag: '통주꾸미 푸짐', category: '반찬' },
  '야채계란말이': { kcal: 110, carbs: 2, protein: 8, fat: 8, tag: '양질의 단백질', category: '반찬' },

  // Wednesday Lunch
  '귀리밥': { kcal: 315, carbs: 65, protein: 8, fat: 1.5, tag: '고식이섬유 귀리', category: '밥류' },
  '얼큰부대찌개': { kcal: 220, carbs: 12, protein: 13, fat: 13, tag: '고소한 햄 사리', category: '국/찌개' },
  '수제미트볼조림': { kcal: 240, carbs: 18, protein: 12, fat: 13, tag: '촉촉한 고기 입자', category: '반찬' },
  '감자채볶음': { kcal: 85, carbs: 15, protein: 1, fat: 2.5, tag: '든든한 에너지', category: '반찬' },
  '석박지': { kcal: 15, carbs: 3, protein: 0.2, fat: 0, tag: '시원한 아삭함', category: '반찬' },

  // Thursday Lunch (Today's default!)
  '혼합잡곡밥': { kcal: 300, carbs: 65, protein: 6, fat: 1, tag: '건강 잡곡 5종', category: '밥류' },
  '돈육김치찌개': { kcal: 230, carbs: 9, protein: 15, fat: 12, tag: '국산 돼지 듬뿍', category: '국/찌개' },
  '수제함박스테이크': { kcal: 240, carbs: 12, protein: 15, fat: 13, tag: '육즙 촉촉 함박', category: '반찬' },
  '콘드레싱': { kcal: 65, carbs: 10, protein: 0.5, fat: 3, tag: '상큼 고소 드레싱', category: '반찬' },
  '깍두기': { kcal: 15, carbs: 4, protein: 0.1, fat: 0, tag: '시원 아삭', category: '반찬' },

  // Friday Lunch
  '흰쌀밥': { kcal: 310, carbs: 68, protein: 5, fat: 0.5, tag: '기본 탄수화물', category: '밥류' },
  '가마솥사골국': { kcal: 130, carbs: 4, protein: 13, fat: 7, tag: '가마솥 24시간', category: '국/찌개' },
  '숯불제육볶음': { kcal: 290, carbs: 15, protein: 15, fat: 15, tag: '불맛 제육', category: '반찬' },
  '야채계란찜': { kcal: 80, carbs: 3, protein: 6, fat: 5, tag: '야들야들 단백질', category: '반찬' },
  '섞박지': { kcal: 15, carbs: 3, protein: 0.2, fat: 0, tag: '칼칼한 감칠맛', category: '반찬' }
};

// Fallback calculations in case unique dish name isn't mapped
const getNutrientForDish = (dishName: string): DishNutrient => {
  const normName = dishName.trim();
  if (sideNutritionDb[normName]) {
    return sideNutritionDb[normName];
  }
  
  // Dynamic heuristics to figure out category & tentative values
  let category: '밥류' | '국/찌개' | '반찬' | '디저트' = '반찬';
  let kcal = 120;
  let carbs = 12;
  let protein = 5;
  let fat = 3;
  let tag = '자연 건강 재료';

  if (normName.endsWith('밥')) {
    category = '밥류';
    kcal = 300;
    carbs = 67;
    protein = 6;
    fat = 1;
    tag = '탄수화물 공급원';
  } else if (normName.endsWith('국') || normName.endsWith('찌개') || normName.endsWith('탕')) {
    category = '국/찌개';
    kcal = 110;
    carbs = 7;
    protein = 8;
    fat = 5;
    tag = '따뜻하고 시원한 국물';
  } else if (normName.includes('김치') || normName.endsWith('무침') || normName.endsWith('지')) {
    kcal = 25;
    carbs = 5;
    protein = 1;
    fat = 0;
    tag = '자연 발효 반찬';
  } else if (normName.includes('덮밥')) {
    category = '밥류';
    kcal = 450;
    carbs = 80;
    protein = 15;
    fat = 8;
    tag = '한그릇 특식';
  } else if (normName.includes('요구르트') || normName.includes('주스') || normName.includes('홍시') || normName.includes('오렌지')) {
    category = '디저트';
    kcal = 70;
    carbs = 18;
    protein = 1;
    fat = 0;
    tag = '달콤한 영양 후식';
  }

  return { kcal, carbs, protein, fat, tag, category };
};

export default function CalculatorView({ meals }: CalculatorViewProps) {
  const today = getTodayKST();
  const targetDate = getDefaultSelectedDate(today);
  const targetDateKey = formatDateKey(targetDate);

  // Grab lunch menu of current lunch for calculation base
  const activeLunch = meals.find(m => m.dateKey === targetDateKey && m.mealType === '중식');
  
  // Set dynamic category tab filter
  const [selectedCategory, setSelectedCategory] = useState<'전체' | '밥류' | '국/찌개' | '반찬' | '디저트'>('전체');

  // Track check state list
  const [checkedDishes, setCheckedDishes] = useState<string[]>([]);

  // Track커스텀 모달 토스트 알람 상태
  const [showToast, setShowToast] = useState(false);

  // Initialize checks when active lunch changes
  useEffect(() => {
    if (activeLunch) {
      setCheckedDishes(activeLunch.dishes);
    }
  }, [activeLunch]);

  if (!activeLunch) {
    return (
      <div className="p-10 text-center text-on-surface-variant">
        영양을 계산할 식단 정보가 없습니다. 먼저 급식 정보를 추가해 주세요.
      </div>
    );
  }

  // Toggle checkout status
  const handleToggleDish = (dishName: string) => {
    if (checkedDishes.includes(dishName)) {
      setCheckedDishes(checkedDishes.filter(d => d !== dishName));
    } else {
      setCheckedDishes([...checkedDishes, dishName]);
    }
  };

  // Aggregated dynamic nutritional values
  let totalKcal = 0;
  let totalCarbs = 0;
  let totalProtein = 0;
  let totalFat = 0;

  activeLunch.dishes.forEach(dish => {
    if (checkedDishes.includes(dish)) {
      const info = getNutrientForDish(dish);
      totalKcal += info.kcal;
      totalCarbs += info.carbs;
      totalProtein += info.protein;
      totalFat += info.fat;
    }
  });

  // Daily target values for visualization comparison
  const targetKcal = 850;
  const targetCarbs = 150;
  const targetProtein = 60;
  const targetFat = 50;

  // Filter dynamic side list by category
  const filteredDishes = activeLunch.dishes.filter(dishName => {
    if (selectedCategory === '전체') return true;
    const info = getNutrientForDish(dishName);
    return info.category === selectedCategory;
  });

  // Handle saving nutrition values
  const handleSaveResult = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <main className="max-w-[420px] mx-auto px-5 pt-6 space-y-6 relative">
      {/* Toast Notification Container */}
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 z-50 animate-bounce">
          <CheckCircle className="h-5 w-5 text-secondary-fixed shrink-0" />
          <span className="text-xs font-semibold whitespace-nowrap">오늘의 급식 영양 계산 로그가 저장되었습니다!</span>
        </div>
      )}

      {/* Summary Card */}
      <section className="bg-surface-container-lowest p-5 rounded-2xl shadow-[0px_4px_20px_rgba(79,111,0,0.05)] border border-outline-variant/10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-on-surface">오늘의 선택 영양</h2>
          <span className="bg-primary-fixed text-on-primary-fixed px-3 py-1 rounded-full font-bold text-xs font-mono">
            {totalKcal} / {targetKcal} kcal
          </span>
        </div>
        
        <div className="space-y-4">
          {/* Carbs */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-semibold text-on-surface-variant">
              <span>탄수화물</span>
              <span className="font-mono">{totalCarbs}g / {targetCarbs}g</span>
            </div>
            <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-300 progress-bar-glow" 
                style={{ width: `${Math.min(100, Math.round((totalCarbs / targetCarbs) * 100))}%` }}
              ></div>
            </div>
          </div>
          
          {/* Protein */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-semibold text-on-surface-variant">
              <span>단백질</span>
              <span className="font-mono">{totalProtein}g / {targetProtein}g</span>
            </div>
            <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
              <div 
                className="h-full bg-secondary rounded-full transition-all duration-300 progress-bar-glow" 
                style={{ width: `${Math.min(100, Math.round((totalProtein / targetProtein) * 100))}%` }}
              ></div>
            </div>
          </div>
          
          {/* Fat */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-semibold text-on-surface-variant">
              <span>지방</span>
              <span className="font-mono">{totalFat}g / {targetFat}g</span>
            </div>
            <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
              <div 
                className="h-full bg-tertiary-container rounded-full transition-all duration-300 progress-bar-glow" 
                style={{ width: `${Math.min(100, Math.round((totalFat / targetFat) * 100))}%` }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <nav className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {(['전체', '밥류', '국/찌개', '반찬', '디저트'] as const).map((cat, idx) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-primary text-on-primary shadow-sm scale-105'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </nav>

      {/* Selectable Menu Items */}
      <section className="space-y-3">
        {filteredDishes.map((dishName) => {
          const isSelected = checkedDishes.includes(dishName);
          const nutrients = getNutrientForDish(dishName);

          return (
            <div
              key={dishName}
              onClick={() => handleToggleDish(dishName)}
              className={`p-5 rounded-2xl shadow-sm border-2 transition-all duration-200 cursor-pointer flex justify-between items-center bg-surface-container-lowest hover:scale-[0.99] select-none ${
                isSelected 
                  ? 'border-primary-container bg-primary-container/[0.03]' 
                  : 'border-outline-variant/20 hover:border-primary/30'
              }`}
            >
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-on-surface leading-tight font-sans">
                  {dishName}
                </h3>
                <p className="text-xs text-on-surface-variant font-mono">
                  {nutrients.kcal} kcal
                </p>
                <div className="flex gap-1 pt-1">
                  <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full text-[10px] font-semibold">
                    {nutrients.tag}
                  </span>
                </div>
              </div>
              
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm ${
                isSelected 
                  ? 'bg-primary-container text-on-primary-container' 
                  : 'bg-surface-container-high text-outline-variant'
              }`}>
                {isSelected ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </div>
            </div>
          );
        })}

        {filteredDishes.length === 0 && (
          <div className="text-center py-10 bg-white rounded-2xl text-on-surface-variant opacity-70 text-xs font-medium border border-outline-variant/15">
            이 카테고리에 속하는 반찬이 없습니다. 단계를 변경해 보세요.
          </div>
        )}
      </section>

      {/* Save Button */}
      <div className="pt-3 pb-6">
        <button
          onClick={handleSaveResult}
          className="w-full bg-primary hover:bg-primary-container hover:text-on-primary-container text-on-primary py-4 rounded-xl font-bold text-sm shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2 cursor-pointer"
        >
          <Save className="h-5 w-5" />
          계산 결과 저장하기
        </button>
      </div>
    </main>
  );
}
