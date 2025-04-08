/**
 * 마이 페이지 API 모듈 인덱스 파일
 */
import * as diningReservations from './dining-reservations';
import * as membership from './membership';
import * as payments from './payments';
import * as preferences from './preferences';
import * as profile from './profile';
import * as roomReservations from './room-reservations';

// API 모듈 내보내기
const myAccountApi = {
  profile,
  membership,
  roomReservations,
  diningReservations,
  payments,
  preferences,
};

export default myAccountApi;
