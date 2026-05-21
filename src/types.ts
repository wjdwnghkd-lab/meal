export interface Nutrition {
  kcal: number;
  carbs: number; // 탄수화물 (g)
  protein: number; // 단백질 (g)
  fat: number; // 지방 (g)
}

export interface Meal {
  id: string;
  schoolName: string; // 씨마스고등학교
  date: Date;
  dateKey: string; // YYYYMMDD
  dayOfWeek: string; // 월, 화, 수, 목, 금
  mealType: '중식' | '석식';
  title: string;
  dishes: string[];
  totalCalories: number;
  nutrition: Nutrition;
  allergens: string[];
}
