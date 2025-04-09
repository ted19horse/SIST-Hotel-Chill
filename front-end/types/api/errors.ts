/**
 * API 관련 에러 타입 정의
 * 
 * API 호출 시 발생할 수 있는 에러를 표준화하여 처리하기 위한 타입과 클래스를 정의합니다.
 */

/**
 * HTTP 상태 코드 타입
 */
export type HttpStatusCode = number;

/**
 * API 에러 인터페이스
 * API 호출 시 발생하는 에러의 구조를 정의합니다.
 */
export interface ApiErrorData {
  message: string;      // 에러 메시지
  code?: string;        // 에러 코드 (선택)
  details?: unknown;    // 추가 상세 정보 (선택)
}

/**
 * API 에러 클래스
 * 표준화된 API 에러 처리를 위한 에러 클래스입니다.
 */
export class ApiError extends Error {
  /**
   * HTTP 상태 코드
   */
  public statusCode: HttpStatusCode;
  
  /**
   * 원본 에러 메시지 (서버에서 반환한 메시지)
   */
  public originalMessage?: string;
  
  /**
   * 에러 코드 (서버에서 반환한 코드)
   */
  public code?: string;
  
  /**
   * 추가 상세 정보
   */
  public details?: unknown;

  /**
   * API 에러 생성자
   * @param message 에러 메시지
   * @param statusCode HTTP 상태 코드
   * @param originalMessage 원본 에러 메시지
   * @param code 에러 코드
   * @param details 추가 상세 정보
   */
  constructor(
    message: string,
    statusCode: HttpStatusCode = 500,
    originalMessage?: string,
    code?: string,
    details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.originalMessage = originalMessage;
    this.code = code;
    this.details = details;
  }

  /**
   * 사용자에게 표시할 메시지를 반환합니다.
   */
  public getUserMessage(): string {
    // 클라이언트 상태 코드일 경우 (4xx)
    if (this.statusCode >= 400 && this.statusCode < 500) {
      // 다양한 클라이언트 에러 처리
      switch (this.statusCode) {
        case 400:
          return '잘못된 요청입니다. 입력 내용을 확인해주세요.';
        case 401:
          return '로그인이 필요한 서비스입니다.';
        case 403:
          return '접근 권한이 없습니다.';
        case 404:
          return '요청하신 정보를 찾을 수 없습니다.';
        case 409:
          return '요청이 현재 상태와 충돌합니다.';
        case 429:
          return '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.';
        default:
          return this.message;
      }
    }
    
    // 서버 상태 코드일 경우 (5xx)
    if (this.statusCode >= 500) {
      return '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
    }
    
    // 그 외의 경우
    return this.message;
  }

  /**
   * 에러를 로깅하기 위한 문자열을 반환합니다.
   */
  public getLogMessage(): string {
    return `[API Error ${this.statusCode}] ${this.message}${
      this.originalMessage ? ` (Original: ${this.originalMessage})` : ''
    }${this.code ? ` [Code: ${this.code}]` : ''}`;
  }
}

/**
 * 네트워크 에러 클래스
 * 네트워크 연결 문제로 인한 에러를 처리하기 위한 클래스입니다.
 */
export class NetworkError extends ApiError {
  constructor(message: string = '네트워크 연결 오류가 발생했습니다.') {
    super(message, 0);
    this.name = 'NetworkError';
  }
}
