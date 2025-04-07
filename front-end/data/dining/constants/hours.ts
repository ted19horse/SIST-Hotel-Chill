export const OPERATING_HOURS = {
  CHILL_BITES: {
    open: '06:30',
    close: '22:30',
    sections: {
      BREAKFAST: {
        name: 'Morning Chill',
        start: '06:30',
        end: '10:30',
      },
      LUNCH: {
        name: 'Afternoon Vibe',
        start: '11:30',
        end: '15:00',
      },
      DINNER: {
        name: 'Evening Zen',
        start: '17:30',
        end: '22:30',
      },
    },
  },
  CHILL_GARDEN: {
    open: '11:30',
    close: '22:00',
    sections: {
      LUNCH: {
        name: '점심',
        start: '11:30',
        end: '15:00',
      },
      DINNER: {
        name: '저녁',
        start: '17:30',
        end: '22:00',
      },
    },
  },
  CHILL_ELEGANCE: {
    open: '18:00',
    close: '22:00',
    sections: {
      DINNER: {
        name: '저녁',
        start: '18:00',
        end: '22:00',
      },
    },
  },
  CHILL_MOMENTS: {
    open: '10:00',
    close: '24:00',
    sections: {
      AFTERNOON_TEA: {
        name: 'Dreamy Afternoon',
        start: '14:00',
        end: '17:00',
      },
      LIVE_MUSIC: {
        name: 'Evening Music',
        start: '19:00',
        end: '22:00',
        days: ['FRIDAY', 'SATURDAY'],
      },
      BAR: {
        name: 'Bar & Lounge',
        start: '17:00',
        end: '24:00',
      },
    },
  },
} as const;

export const RESERVATION_TIME_SLOTS = {
  BREAKFAST: ['07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00'],
  LUNCH: ['11:30', '12:00', '12:30', '13:00', '13:30', '14:00'],
  DINNER: ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'],
  AFTERNOON_TEA: ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30'],
} as const;

export const DAYS_OF_WEEK = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
] as const;

export const DAYS_OF_WEEK_LABELS = {
  SUNDAY: '일요일',
  MONDAY: '월요일',
  TUESDAY: '화요일',
  WEDNESDAY: '수요일',
  THURSDAY: '목요일',
  FRIDAY: '금요일',
  SATURDAY: '토요일',
} as const;
