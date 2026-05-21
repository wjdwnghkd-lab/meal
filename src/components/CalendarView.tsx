import { useState } from 'react';
import { Meal } from '../types';
import { getTodayKST, getWeekDates, getWeekOfMonth, getKoreanDayOfWeek, formatDateKey, getDefaultSelectedDate } from '../utils/dateUtils';
import { Info, Sparkles } from 'lucide-react';

interface CalendarViewProps {
  meals: Meal[];
}

export default function CalendarView({ meals }: CalendarViewProps) {
  const today = getTodayKST();
  const weekDates = getWeekDates(today);

  // Initialize selected date based on 평일/주말 rule
  const [selectedDate, setSelectedDate] = useState<Date>(() => getDefaultSelectedDate(today));

  const selectedDateKey = formatDateKey(selectedDate);
  const selectedMeals = meals.filter(m => m.dateKey === selectedDateKey);
  const lunch = selectedMeals.find(m => m.mealType === '중식');
  const dinner = selectedMeals.find(m => m.mealType === '석식');

  // Dynamic news depending on select day
  const getDayNews = (dateKey: string): string => {
    if (lunch) {
      if (lunch.title.includes('치즈돈까스')) {
        return '수제 치즈돈까스에는 고소하고 쭉 늘어나는 고품질 자연치즈가 듬뿍 들어갔습니다.';
      } else if (lunch.title.includes('해물볶음우동')) {
        return '해물볶음우동의 매콤함은 국산 고춧가루와 비법 간장 소스를 72시간 숙성해 완성했습니다.';
      } else if (lunch.title.includes('미트볼')) {
        return '미트볼은 철저히 국산 양파와 순돈육을 수제품으로 빚어 내어 고소함이 일품입니다.';
      } else if (lunch.title.includes('함박스테이크')) {
        return '수제함박스테이크에는 국내산 돈육과 우육이 7:3 비율로 아주 쫀득히 결합되었습니다.';
      } else if (lunch.title.includes('제육덮밥')) {
        return '숯불제육은 국내산 브랜드 돈육 앞다리살을 전통 가마방식 불길로 볶아 숯향이 자욱합니다.';
      }
    }
    return '언제나 신선하고 위생적인 국산 식재료만을 선별해 공급하고 있습니다.';
  };

  // Dynamic protein progress bar color depending on achievement percentage
  const getProgressColor = (percentage: number): string => {
    if (percentage >= 80) return 'bg-primary-container';
    return 'bg-tertiary-container';
  };

  return (
    <main className="px-5 mt-6 flex flex-col gap-6">
      {/* Dynamic Week & Subtitle */}
      <section className="space-y-1">
        <h2 className="text-2xl font-bold text-primary font-sans tracking-tight">주간 식단</h2>
        <p className="text-sm font-medium text-on-surface-variant opacity-70">
          {getWeekOfMonth(selectedDate)}
        </p>
      </section>

      {/* Date Selector */}
      <section className="flex justify-between items-center bg-surface-container-low p-3 rounded-2xl border border-outline-variant/10">
        {weekDates.map((dateObj, idx) => {
          const dayName = getKoreanDayOfWeek(dateObj); // 월, 화, 수 ...
          const mDateKey = formatDateKey(dateObj);
          const isSelected = mDateKey === selectedDateKey;
          const dayNum = dateObj.getDate();

          return (
            <button
              key={idx}
              onClick={() => setSelectedDate(dateObj)}
              className={`flex-1 flex flex-col items-center gap-1.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                isSelected
                  ? 'bg-primary text-on-primary font-semibold shadow-md scale-105'
                  : 'text-on-surface-variant hover:bg-surface-variant/40'
              }`}
            >
              <span className={`text-[11px] uppercase tracking-wider ${isSelected ? 'opacity-90' : 'opacity-60 font-medium'}`}>
                {dayName}
              </span>
              <span className="text-base font-bold font-mono">
                {dayNum}
              </span>
            </button>
          );
        })}
      </section>

      {/* Meals Stack */}
      <div className="space-y-4">
        {/* Lunch Card */}
        {lunch ? (
          <article className="bg-surface-container-lowest rounded-2xl p-5 shadow-[0px_4px_20px_rgba(79,111,0,0.05)] flex flex-col gap-3 border border-outline-variant/10">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <span className="inline-flex items-center px-2.5 py-0.5 bg-secondary-container text-on-secondary-container rounded-full font-semibold text-xs w-fit">
                  중식
                </span>
                <h3 className="text-lg font-bold text-on-surface font-sans mt-1">
                  {lunch.title}
                </h3>
              </div>
              <span className="text-sm font-bold text-primary font-mono select-none">
                {lunch.totalCalories} kcal
              </span>
            </div>

            <div className="p-4 bg-surface rounded-xl card-inner-shadow">
              <p className="text-sm leading-relaxed text-on-surface-variant">
                {lunch.dishes.join(', ')}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {lunch.allergens.map((alg, i) => (
                <span key={i} className="px-3 py-1 bg-[#EEF0EA] text-primary rounded-full text-xs font-semibold">
                  {alg}
                </span>
              ))}
            </div>

            {/* Protein Target */}
            <div className="mt-2 space-y-1">
              <div className="flex justify-between items-center text-xs font-semibold text-on-surface-variant">
                <span>단백질 영양 기준 달성도</span>
                <span className="text-primary font-mono">
                  {Math.round((lunch.nutrition.protein / 40) * 100)}%
                </span>
              </div>
              <div className="h-2 w-full bg-[#EEF0EA] rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${getProgressColor(Math.round((lunch.nutrition.protein / 40) * 100))}`}
                  style={{ width: `${Math.min(100, Math.round((lunch.nutrition.protein / 40) * 100))}%` }}
                ></div>
              </div>
            </div>
          </article>
        ) : (
          <div className="bg-surface-container-lowest p-6 rounded-2xl text-center text-on-surface-variant font-medium">
            이 날은 중식 급식 정보가 존재하지 않습니다.
          </div>
        )}

        {/* Dinner Card */}
        {dinner ? (
          <article className="bg-surface-container-lowest rounded-2xl p-5 shadow-[0px_4px_20px_rgba(79,111,0,0.05)] flex flex-col gap-3 border border-outline-variant/10 opacity-95">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <span className="inline-flex items-center px-2.5 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full font-semibold text-xs w-fit">
                  석식
                </span>
                <h3 className="text-lg font-bold text-on-surface font-sans mt-1">
                  {dinner.title}
                </h3>
              </div>
              <span className="text-sm font-bold text-primary font-mono select-none">
                {dinner.totalCalories} kcal
              </span>
            </div>

            <div className="p-4 bg-surface rounded-xl card-inner-shadow">
              <p className="text-sm leading-relaxed text-on-surface-variant">
                {dinner.dishes.join(', ')}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {dinner.allergens.map((alg, i) => (
                <span key={i} className="px-3 py-1 bg-[#EEF0EA] text-primary rounded-full text-xs font-semibold">
                  {alg}
                </span>
              ))}
            </div>

            {/* Protein Target */}
            <div className="mt-2 space-y-1">
              <div className="flex justify-between items-center text-xs font-semibold text-on-surface-variant">
                <span>단백질 영양 기준 달성도</span>
                <span className="text-primary font-mono">
                  {Math.round((dinner.nutrition.protein / 40) * 100)}%
                </span>
              </div>
              <div className="h-2 w-full bg-[#EEF0EA] rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${getProgressColor(Math.round((dinner.nutrition.protein / 40) * 100))}`}
                  style={{ width: `${Math.min(100, Math.round((dinner.nutrition.protein / 40) * 100))}%` }}
                ></div>
              </div>
            </div>
          </article>
        ) : (
          <div className="bg-surface-container-lowest p-6 rounded-2xl text-center text-on-surface-variant font-medium">
            이 날은 석식 급식 정보가 존재하지 않습니다.
          </div>
        )}
      </div>

      {/* Decorative Info News Section */}
      <section className="bg-primary-container p-5 rounded-2xl text-on-primary-container flex items-center gap-4 shadow-sm border border-outline-variant/10">
        <Sparkles className="h-8 w-8 text-secondary-fixed shrink-0" />
        <div className="space-y-0.5">
          <p className="font-bold text-sm font-sans">오늘의 급식 뉴스</p>
          <p className="text-xs opacity-90 leading-relaxed font-sans font-medium">
            {getDayNews(selectedDateKey)}
          </p>
        </div>
      </section>
    </main>
  );
}
