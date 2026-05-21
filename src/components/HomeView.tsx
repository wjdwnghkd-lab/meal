import { useState } from 'react';
import { Meal } from '../types';
import { getTodayKST, formatKoreanDate, formatDateKey, getDefaultSelectedDate } from '../utils/dateUtils';
import { Heart, Lightbulb, Info } from 'lucide-react';

interface HomeViewProps {
  meals: Meal[];
}

export default function HomeView({ meals }: HomeViewProps) {
  const today = getTodayKST();
  const isWeekend = today.getDay() === 0 || today.getDay() === 6;
  
  // Decide actual display date depending on weekend mode B
  const displayDate = isWeekend ? getDefaultSelectedDate(today) : today;
  const displayDateKey = formatDateKey(displayDate);

  // Extract Lunch and Dinner for display date
  const selectedMeals = meals.filter(m => m.dateKey === displayDateKey);
  const lunch = selectedMeals.find(m => m.mealType === '중식');
  const dinner = selectedMeals.find(m => m.mealType === '석식');

  const [favored, setFavored] = useState(false);

  // Unique food images corresponding to weekday lunches
  const getHeroImage = (mealTitle: string): string => {
    if (mealTitle.includes('치즈돈까스')) {
      return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800';
    } else if (mealTitle.includes('해물볶음우동')) {
      return 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=800';
    } else if (mealTitle.includes('미트볼')) {
      return 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&q=80&w=800';
    } else if (mealTitle.includes('함박스테이크')) {
      return 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800';
    } else if (mealTitle.includes('제육덮밥')) {
      return 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&q=80&w=800';
    }
    return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800';
  };

  // Fun custom nutritional tip based on lunch main dish
  const getNutritionTip = (mealTitle: string): string => {
    if (mealTitle.includes('치즈돈까스')) {
      return '치즈의 칼슘과 돼지고기의 비타민 B1이 가득한 든든한 고단백 식단입니다. 천천히 꼭꼭 씹어 드세요!';
    } else if (mealTitle.includes('해물볶음우동')) {
      return '해산물의 타우린 성분이 풍부해 피로를 풀어 줍니다. 신선한 아채와 함께 즐겨 보세요!';
    } else if (mealTitle.includes('미트볼')) {
      return '수제 미트볼로 채워진 알찬 단백질 식단입니다. 속을 뜨끈하게 채우는 얼큰부대찌개와 조합이 좋습니다!';
    } else if (mealTitle.includes('함박스테이크')) {
      return '부드러운 함박스테이크의 아미노산이 뇌 활동을 자극해 집중력을 올려요! 오후 수업도 힘내세요!';
    } else if (mealTitle.includes('제육덮밥')) {
      return '숯불 제육의 단백질이 면역력을 높여 줍니다. 계란찜과 조화가 어우러져 지치기 쉬운 금요일에 최고입니다!';
    }
    return '언제나 정성을 담아 만듭니다. 즐거운 급식 시간 보내세요!';
  };

  const currentHeroTitle = lunch ? lunch.title : '오늘의 특식';
  const currentHeroKcal = lunch ? lunch.totalCalories : 850;
  const currentHeroImg = getHeroImage(currentHeroTitle);
  const currentHeroTip = getNutritionTip(currentHeroTitle);

  return (
    <main className="px-5 mt-6 flex flex-col gap-6">
      {/* Weekend Way B Badge Info */}
      {isWeekend && (
        <div className="bg-primary-container text-on-primary-container px-4 py-3 rounded-xl organic-shadow flex items-center gap-3 border border-outline-variant/20">
          <Info className="h-5 w-5 shrink-0" />
          <div className="text-xs">
            <span className="font-bold underline">오늘은 주말이라 급식 정보가 없습니다.</span>
            <span className="block mt-0.5 font-medium text-opacity-80">가장 두꺼운 혜택! 다가오는 월요일의 식단을 미리 확인하세요.</span>
          </div>
        </div>
      )}

      {/* Hero Card: 오늘의 추천 급식 */}
      <section className="relative group">
        <div className="rounded-2xl overflow-hidden shadow-[0px_4px_20px_rgba(79,111,0,0.05)] bg-surface-container-lowest">
          <div className="relative h-64 w-full overflow-hidden">
            <img
              alt="Today's Recommendation"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              src={currentHeroImg}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-primary text-on-primary px-3 py-1 rounded-full font-semibold text-xs shadow-sm">
                오늘의 추천 급식
              </span>
              {isWeekend && (
                <span className="bg-secondary text-white px-3 py-1 rounded-full font-semibold text-xs shadow-sm flex items-center gap-1">
                  다음 급식일 미리보기
                </span>
              )}
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="text-xs font-semibold opacity-90 font-mono">
                {formatKoreanDate(displayDate)}
              </p>
              <div className="flex justify-between items-end mt-1">
                <div>
                  <h2 className="text-2xl font-bold font-sans tracking-tight">
                    {currentHeroTitle}
                  </h2>
                  <span className="inline-block mt-1 font-semibold text-xs bg-white/20 backdrop-blur-md px-3 py-0.5 rounded-full select-none">
                    {currentHeroKcal} kcal
                  </span>
                </div>
                <button 
                  onClick={() => setFavored(!favored)}
                  className="w-10 h-10 rounded-full bg-white/25 hover:bg-white/40 backdrop-blur-md flex items-center justify-center active:scale-90 transition-transform shadow-md"
                >
                  <Heart 
                    className={`h-5 w-5 transition-colors ${favored ? 'text-red-500 fill-red-500' : 'text-white'}`} 
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 오늘의 급식 Section */}
      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-on-surface">오늘의 식단 리스트</h3>
          <span className="text-xs font-mono font-medium text-primary bg-primary-container/40 px-2 py-1 rounded-full">{formatKoreanDate(today)} (KST 기준)</span>
        </div>

        {/* Lunch (중식) Card */}
        {lunch ? (
          <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-[0px_4px_20px_rgba(79,111,0,0.05)] flex flex-col gap-3 border border-outline-variant/10">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-5 bg-primary rounded-full"></div>
                <h4 className="font-bold text-base text-on-surface">중식</h4>
              </div>
              <span className="text-xs font-semibold text-primary bg-primary-fixed/30 px-3 py-1 rounded-full">
                {lunch.totalCalories} kcal
              </span>
            </div>
            <div className="bg-surface-container-low rounded-xl p-4 card-inner-shadow">
              <p className="text-sm text-on-surface-variant leading-relaxed font-sans">
                {lunch.dishes.map((dish, i) => {
                  const isHighlight = i === 2; // Represent custom focus dish styling
                  return (
                    <span key={i}>
                      {isHighlight ? (
                        <span className="text-primary font-bold">{dish}</span>
                      ) : (
                        dish
                      )}
                      {i < lunch.dishes.length - 1 ? ', ' : ''}
                    </span>
                  );
                })}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {lunch.allergens.map((alg, i) => (
                <span key={i} className="bg-surface-variant text-on-surface-variant px-3 py-1 rounded-full text-xs font-medium">
                  {alg}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-surface-container-lowest rounded-2xl p-5 text-center text-on-surface-variant">
            가장 안전한 식단을 준비 중입니다.
          </div>
        )}

        {/* Dinner (석식) Card */}
        {dinner ? (
          <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-[0px_4px_20px_rgba(79,111,0,0.05)] flex flex-col gap-3 border border-outline-variant/10">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-5 bg-secondary-container rounded-full"></div>
                <h4 className="font-bold text-base text-on-surface">석식</h4>
              </div>
              <span className="text-xs font-semibold text-secondary bg-secondary-container/50 px-3 py-1 rounded-full">
                {dinner.totalCalories} kcal
              </span>
            </div>
            <div className="bg-surface-container-low rounded-xl p-4 card-inner-shadow">
              <p className="text-sm text-on-surface-variant leading-relaxed font-sans">
                {dinner.dishes.map((dish, i) => {
                  const isHighlight = i === 0; // Highlight main menu item in dinner too
                  return (
                    <span key={i}>
                      {isHighlight ? (
                        <span className="text-secondary font-bold">{dish}</span>
                      ) : (
                        dish
                      )}
                      {i < dinner.dishes.length - 1 ? ', ' : ''}
                    </span>
                  );
                })}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {dinner.allergens.map((alg, i) => (
                <span key={i} className="bg-surface-variant text-on-surface-variant px-3 py-1 rounded-full text-xs font-medium">
                  {alg}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-surface-container-lowest rounded-2xl p-5 text-center text-on-surface-variant">
            석식 정보 조리 준비 중입니다.
          </div>
        )}
      </section>

      {/* Nutrition Tip Card (Custom Addition) */}
      <section className="bg-tertiary-fixed rounded-2xl p-5 flex gap-4 items-center shadow-[0px_4px_20px_rgba(79,111,0,0.05)] mb-4">
        <div className="w-12 h-12 rounded-full bg-tertiary-container flex items-center justify-center shrink-0">
          <Lightbulb className="h-6 w-6 text-tertiary-fixed" />
        </div>
        <div className="flex-1">
          <h5 className="font-bold text-sm text-on-tertiary-fixed font-sans">영양사의 한마디</h5>
          <p className="text-xs text-on-tertiary-fixed-variant leading-relaxed mt-0.5 font-medium">
            {currentHeroTip}
          </p>
        </div>
      </section>
    </main>
  );
}
