import { Meal } from '../types';
import { getWeekDates, formatDateKey, getKoreanDayOfWeek } from '../utils/dateUtils';

export function generateMockMeals(baseDate: Date): Meal[] {
  const weekDates = getWeekDates(baseDate);
  const meals: Meal[] = [];

  // Monday
  const mon = weekDates[0];
  meals.push(
    {
      id: `lunch-${formatDateKey(mon)}`,
      schoolName: '씨마스고등학교',
      date: mon,
      dateKey: formatDateKey(mon),
      dayOfWeek: getKoreanDayOfWeek(mon),
      mealType: '중식',
      title: '치즈돈까스 정식',
      dishes: ['친환경현미밥', '쇠고기미역국', '매콤돈육강정', '숙주미나리무침', '배추김치'],
      totalCalories: 845,
      nutrition: { kcal: 845, carbs: 110, protein: 32, fat: 25 },
      allergens: ['대두', '밀', '쇠고기', '돼지고기']
    },
    {
      id: `dinner-${formatDateKey(mon)}`,
      schoolName: '씨마스고등학교',
      date: mon,
      dateKey: formatDateKey(mon),
      dayOfWeek: getKoreanDayOfWeek(mon),
      mealType: '석식',
      title: '참치마요덮밥',
      dishes: ['참치마요덮밥', '유부장국', '매콤떡볶이', '깍두기', '요구르트'],
      totalCalories: 720,
      nutrition: { kcal: 720, carbs: 95, protein: 22, fat: 18 },
      allergens: ['난류', '우유', '대두', '밀']
    }
  );

  // Tuesday
  const tue = weekDates[1];
  meals.push(
    {
      id: `lunch-${formatDateKey(tue)}`,
      schoolName: '씨마스고등학교',
      date: tue,
      dateKey: formatDateKey(tue),
      dayOfWeek: getKoreanDayOfWeek(tue),
      mealType: '중식',
      title: '해물볶음우동 & 계란말이',
      dishes: ['흑미밥', '팽이버섯장국', '해물볶음우동', '야채계란말이', '배추김치'],
      totalCalories: 820,
      nutrition: { kcal: 820, carbs: 115, protein: 28, fat: 22 },
      allergens: ['대두', '밀', '난류', '조개류']
    },
    {
      id: `dinner-${formatDateKey(tue)}`,
      schoolName: '씨마스고등학교',
      date: tue,
      dateKey: formatDateKey(tue),
      dayOfWeek: getKoreanDayOfWeek(tue),
      mealType: '석식',
      title: '스팸마요덮밥',
      dishes: ['스팸마요덮밥', '얼큰김치찌개', '바삭군만두', '깍두기', '오렌지주스'],
      totalCalories: 750,
      nutrition: { kcal: 750, carbs: 98, protein: 20, fat: 20 },
      allergens: ['난류', '대두', '밀', '돼지고기']
    }
  );

  // Wednesday
  const wed = weekDates[2];
  meals.push(
    {
      id: `lunch-${formatDateKey(wed)}`,
      schoolName: '씨마스고등학교',
      date: wed,
      dateKey: formatDateKey(wed),
      dayOfWeek: getKoreanDayOfWeek(wed),
      mealType: '중식',
      title: '동글동글미트볼 정식',
      dishes: ['귀리밥', '얼큰부대찌개', '수제미트볼조림', '감자채볶음', '석박지'],
      totalCalories: 810,
      nutrition: { kcal: 810, carbs: 105, protein: 30, fat: 23 },
      allergens: ['대두', '밀', '돼지고기', '쇠고기']
    },
    {
      id: `dinner-${formatDateKey(wed)}`,
      schoolName: '씨마스고등학교',
      date: wed,
      dateKey: formatDateKey(wed),
      dayOfWeek: getKoreanDayOfWeek(wed),
      mealType: '석식',
      title: '가쓰오우동 & 닭강정',
      dishes: ['사누끼우동', '통주먹밥', '달콤닭강정', '단무지무침', '요구르트'],
      totalCalories: 790,
      nutrition: { kcal: 790, carbs: 110, protein: 24, fat: 19 },
      allergens: ['대두', '밀', '닭고기']
    }
  );

  // Thursday
  const thu = weekDates[3];
  meals.push(
    {
      id: `lunch-${formatDateKey(thu)}`,
      schoolName: '씨마스고등학교',
      date: thu,
      dateKey: formatDateKey(thu),
      dayOfWeek: getKoreanDayOfWeek(thu),
      mealType: '중식',
      title: '수제함박스테이크 정식',
      dishes: ['혼합잡곡밥', '돈육김치찌개', '수제함박스테이크', '숙주미나리무침', '깍두기', '콘드레싱'],
      totalCalories: 850,
      nutrition: { kcal: 850, carbs: 110, protein: 34, fat: 26 },
      allergens: ['돼지고기', '쇠고기', '대두', '밀']
    },
    {
      id: `dinner-${formatDateKey(thu)}`,
      schoolName: '씨마스고등학교',
      date: thu,
      dateKey: formatDateKey(thu),
      dayOfWeek: getKoreanDayOfWeek(thu),
      mealType: '석식',
      title: '돈까스카레덮밥',
      dishes: ['돈까스카레덮밥', '가쓰오장국', '모듬해조류무침', '배추김치', '아이스홍시'],
      totalCalories: 730,
      nutrition: { kcal: 730, carbs: 98, protein: 23, fat: 18 },
      allergens: ['대두', '밀', '돼지고기']
    }
  );

  // Friday
  const fri = weekDates[4];
  meals.push(
    {
      id: `lunch-${formatDateKey(fri)}`,
      schoolName: '씨마스고등학교',
      date: fri,
      dateKey: formatDateKey(fri),
      dayOfWeek: getKoreanDayOfWeek(fri),
      mealType: '중식',
      title: '숯불제육덮밥 정식',
      dishes: ['흰쌀밥', '가마솥사골국', '숯불제육볶음', '야채계란찜', '섞박지'],
      totalCalories: 830,
      nutrition: { kcal: 830, carbs: 108, protein: 31, fat: 24 },
      allergens: ['대두', '밀', '돼지고기', '쇠고기', '난류']
    },
    {
      id: `dinner-${formatDateKey(fri)}`,
      schoolName: '씨마스고등학교',
      date: fri,
      dateKey: formatDateKey(fri),
      dayOfWeek: getKoreanDayOfWeek(fri),
      mealType: '석식',
      title: '치킨마요덮밥',
      dishes: ['치킨마요덮밥', '유부장국', '매콤떡볶이', '깍두기', '사과주스'],
      totalCalories: 710,
      nutrition: { kcal: 710, carbs: 92, protein: 21, fat: 17 },
      allergens: ['난류', '우유', '대두', '밀', '닭고기']
    }
  );

  return meals;
}
