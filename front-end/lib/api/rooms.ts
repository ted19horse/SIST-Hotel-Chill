/**
 * 서버 컴포넌트에서 사용하기 위한 객실 타입 데이터 가져오기 함수
 * 
 * @returns {Promise<any[]>} 객실 타입 데이터 배열
 */
export async function getRoomTypes() {
  try {
    // server-side 요청을 위한 fetch 사용
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/rooms/getRoomTypes`, {
      cache: 'no-store', // 항상 최신 데이터 요청
      // next: { revalidate: 3600 }, // 데이터 캐싱 필요 시 활성화 (1시간마다 갱신)
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch room types: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching room types:', error);
    return []; // 에러 발생 시 빈 배열 반환
  }
}

/**
 * 특정 객실 타입에 대한 상세 정보 가져오기
 * 
 * @param {number} id - 객실 타입 ID
 * @returns {Promise<any>} 객실 타입 상세 정보
 */
export async function getRoomTypeById(id: number) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/rooms/getRoomType/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch room type: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching room type ${id}:`, error);
    return null;
  }
}
