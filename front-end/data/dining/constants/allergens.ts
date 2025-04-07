import { AllergenType } from '../types';

export const ALLERGEN_LABELS: Record<AllergenType, string> = {
  EGGS: '계란',
  MILK: '우유',
  FISH: '생선',
  SHELLFISH: '갑각류',
  NUTS: '견과류',
  GLUTEN: '글루텐',
  SOY: '대두',
} as const;

export const ALLERGEN_ICONS: Record<AllergenType, string> = {
  EGGS: '🥚',
  MILK: '🥛',
  FISH: '🐟',
  SHELLFISH: '🦐',
  NUTS: '🥜',
  GLUTEN: '🌾',
  SOY: '🫘',
} as const;

export const ALLERGEN_DESCRIPTIONS: Record<AllergenType, string> = {
  EGGS: '계란 또는 계란 성분이 포함되어 있습니다',
  MILK: '우유 또는 유제품이 포함되어 있습니다',
  FISH: '생선 또는 생선 성분이 포함되어 있습니다',
  SHELLFISH: '갑각류가 포함되어 있습니다',
  NUTS: '견과류가 포함되어 있습니다',
  GLUTEN: '글루텐이 포함되어 있습니다',
  SOY: '대두 또는 대두 성분이 포함되어 있습니다',
} as const;
