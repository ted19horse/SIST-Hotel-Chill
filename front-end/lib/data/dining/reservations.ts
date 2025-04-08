// 레스토랑 예약 정보 목업 데이터
export const reservations = [
  {
    id: 'reservation1',
    restaurantId: 'restaurant1',
    userId: 'user1',
    date: '2024-03-20',
    time: '19:00',
    partySize: 4,
    status: 'confirmed',
    specialRequests: '창가 자리로 부탁드립니다.',
    contactInfo: {
      name: '김서연',
      phone: '010-1234-5678',
      email: 'kim.seoyeon@example.com',
    },
    menuItems: [
      {
        menuItemId: 'item1',
        quantity: 2,
        specialInstructions: '레어로 해주세요.',
      },
      {
        menuItemId: 'item2',
        quantity: 1,
        specialInstructions: '매운맛 조절해주세요.',
      },
    ],
    winePairing: true,
    createdAt: '2024-03-15T10:30:00Z',
    updatedAt: '2024-03-15T10:30:00Z',
  },
  {
    id: 'reservation2',
    restaurantId: 'restaurant2',
    userId: 'user2',
    date: '2024-03-21',
    time: '18:30',
    partySize: 2,
    status: 'pending',
    specialRequests: '프라이빗 룸 예약 가능한가요?',
    contactInfo: {
      name: '이준호',
      phone: '010-9876-5432',
      email: 'lee.junho@example.com',
    },
    menuItems: [
      {
        menuItemId: 'item5',
        quantity: 1,
        specialInstructions: '미디움 레어로 해주세요.',
      },
      {
        menuItemId: 'item6',
        quantity: 1,
        specialInstructions: '버터 소스 추가해주세요.',
      },
    ],
    winePairing: true,
    createdAt: '2024-03-16T14:20:00Z',
    updatedAt: '2024-03-16T14:20:00Z',
  },
  {
    id: 'reservation3',
    restaurantId: 'restaurant1',
    userId: 'user3',
    date: '2024-03-22',
    time: '20:00',
    partySize: 6,
    status: 'cancelled',
    specialRequests: '생일 파티를 위한 케이크 준비 부탁드립니다.',
    contactInfo: {
      name: '박지민',
      phone: '010-5555-6666',
      email: 'park.jimin@example.com',
    },
    menuItems: [
      {
        menuItemId: 'item3',
        quantity: 2,
        specialInstructions: '양념 간 조절해주세요.',
      },
      {
        menuItemId: 'item4',
        quantity: 2,
        specialInstructions: '소금 간만 해주세요.',
      },
    ],
    winePairing: false,
    createdAt: '2024-03-17T09:15:00Z',
    updatedAt: '2024-03-18T11:30:00Z',
    cancellationReason: '일정 변경으로 인한 취소',
  },
];
