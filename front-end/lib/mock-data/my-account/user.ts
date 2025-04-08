import { User, UserPreferences } from '@/types/my-account';

/**
 * 사용자 더미데이터
 */
export const userData: User = {
  userId: 1,
  name: 'Min-Ji Park',
  email: 'minji.park@example.com',
  phone: '010-1234-5678',
  status: 'ACTIVE',
  profileImage: '/placeholder.svg?height=200&width=200',
};

/**
 * 사용자 기본 설정 더미데이터
 */
export const userPreferences: UserPreferences = {
  userId: 1,
  emailNotifications: true,
  smsNotifications: false,
  marketingCommunications: true,
  roomPreferences: {
    preferredFloor: '고층',
    preferredView: '바다 전망',
    preferredBedType: '킹 사이즈',
    additionalRequests: '알러지가 있으니 깃털 베개를 제외해 주세요.',
  },
};
