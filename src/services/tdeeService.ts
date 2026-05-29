export type Sex = 'male' | 'female';

export type ActivityLevel = 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extra_active';

export interface TDEEParams {
  sex: Sex;
  age: number;
  weight: number;
  height: number;
  activityLevel: ActivityLevel;
}

const ACTIVITY_FACTORS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  lightly_active: 1.375,
  moderately_active: 1.55,
  very_active: 1.725,
  extra_active: 1.9,
};


export const calculateTDEE = ({ sex, age, weight, height, activityLevel }: TDEEParams): number => {
  const heightInCm = height < 3 ? height * 100 : height;

  let bmr: number;
  
  if (sex === 'male') {
    bmr = 10 * weight + 6.25 * heightInCm - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * heightInCm - 5 * age - 161;
  }

  const factor = ACTIVITY_FACTORS[activityLevel];
  return bmr * factor;
};
