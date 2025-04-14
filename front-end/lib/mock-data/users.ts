/**
 * 사용자 더미 데이터
 */
import { User, UserStatus } from '@/lib/types/my-account';

export const mockUsers: User[] = [
  {
    userId: 1,
    email: 'minji.park@example.com',
    name: 'Min-Ji Park',
    phone: '010-1234-5678',
    status: UserStatus.ACTIVE,
    profileImage: '/placeholder.svg?height=200&width=200',
    createdAt: '2023-05-15T09:00:00Z',
    updatedAt: '2024-03-10T14:30:00Z',
  },
  {
    userId: 2,
    email: 'jiwon.kim@example.com',
    name: 'Ji-Won Kim',
    phone: '010-2345-6789',
    status: UserStatus.ACTIVE,
    profileImage: '/placeholder.svg?height=200&width=200',
    createdAt: '2023-06-20T10:15:00Z',
    updatedAt: '2024-02-15T16:45:00Z',
  },
  {
    userId: 3,
    email: 'sunghoon.lee@example.com',
    name: 'Sung-Hoon Lee',
    phone: '010-3456-7890',
    status: UserStatus.ACTIVE,
    profileImage: '/placeholder.svg?height=200&width=200',
    createdAt: '2023-07-05T11:30:00Z',
    updatedAt: '2024-01-20T09:15:00Z',
  },
];

// 현재 로그인한 사용자로 가정
export const currentUser = mockUsers[0];
