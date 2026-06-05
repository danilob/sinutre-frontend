export type MealCategory = 'breakfast' | 'lunch' | 'snack' | 'dinner';

export interface FoodItem {
  id: string;
  name: string;
  grams: number;
  calories: number;
}

export interface MacroSummary {
  carbs: number;
  proteins: number;
  fats: number;
  calories: number;
}
