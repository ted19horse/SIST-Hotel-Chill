import { RoomGrade } from '@/lib/types/room';

export const PRICE_RANGE = {
  MIN: 220000,
  MAX: 1500000,
  STEP: 10000,
} as const;

export const ROOM_GRADES = [
  {
    grade: 'ULTIMATE_CHILL_SUITE' as RoomGrade,
    name: 'Ultimate Chill Suite',
    maxOccupancy: 8,
    weekdayPrice: 950000,
    weekendPrice: 1200000,
    peakSeasonPrice: 1500000,
  },
  {
    grade: 'CHILL_LAKE_SUITE' as RoomGrade,
    name: 'Chill Lake Suite',
    maxOccupancy: 4,
    weekdayPrice: 680000,
    weekendPrice: 820000,
    peakSeasonPrice: 950000,
  },
  {
    grade: 'CHILL_FAMILY_SUITE' as RoomGrade,
    name: 'Chill Family Suite',
    maxOccupancy: 6,
    weekdayPrice: 520000,
    weekendPrice: 650000,
    peakSeasonPrice: 750000,
  },
  {
    grade: 'CHILL_SERENITY_ROOM' as RoomGrade,
    name: 'Chill Serenity Room',
    maxOccupancy: 4,
    weekdayPrice: 380000,
    weekendPrice: 450000,
    peakSeasonPrice: 520000,
  },
  {
    grade: 'CHILL_HARMONY_ROOM' as RoomGrade,
    name: 'Chill Harmony Room',
    maxOccupancy: 3,
    weekdayPrice: 280000,
    weekendPrice: 350000,
    peakSeasonPrice: 400000,
  },
  {
    grade: 'CHILL_COMFORT_ROOM' as RoomGrade,
    name: 'Chill Comfort Room',
    maxOccupancy: 3,
    weekdayPrice: 220000,
    weekendPrice: 270000,
    peakSeasonPrice: 320000,
  },
] as const;

export const MAX_OCCUPANCY = {
  MIN: 1,
  MAX: 8,
} as const;

export const PEAK_SEASONS = [
  // 여름 휴가 시즌
  { start: '2024-07-01', end: '2024-08-31' },
  // 연말연시
  { start: '2024-12-20', end: '2025-01-05' },
  // 설날
  { start: '2024-02-09', end: '2024-02-12' },
  // 추석
  { start: '2024-09-16', end: '2024-09-19' },
] as const;
