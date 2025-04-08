import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

// API 기본 설정
const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  timeout: 15000, // 15초
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

// API 클라이언트 싱글톤 인스턴스
class ApiClient {
  private static instance: ApiClient;
  private client: AxiosInstance;

  private constructor() {
    this.client = axios.create(API_CONFIG);
    this.setupInterceptors();
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  // 요청/응답 인터셉터 설정
  private setupInterceptors(): void {
    // 요청 인터셉터
    this.client.interceptors.request.use(
      (config) => {
        // 요청 전 처리 (토큰 추가 등)
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 응답 인터셉터
    this.client.interceptors.response.use(
      (response) => {
        // 응답 데이터 처리
        return response;
      },
      (error: AxiosError) => {
        // 에러 처리 로직
        if (error.response) {
          // 서버가 응답한 에러 (4xx, 5xx)
          const status = error.response.status;

          // 인증 관련 에러 처리
          if (status === 401) {
            // 인증 만료 처리
            localStorage.removeItem('authToken');
            // 로그인 페이지로 리다이렉트 (클라이언트 사이드에서만)
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
          }
        } else if (error.request) {
          // 요청은 보냈지만 응답이 없음 (네트워크 오류 등)
          console.error('Network error or server is not responding');
        } else {
          // 요청 설정 단계에서 발생한 오류
          console.error('Error setting up request:', error.message);
        }

        return Promise.reject(error);
      }
    );
  }

  // API 메소드들
  public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  public async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  public async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  public async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  // 원본 인스턴스 접근자 (고급 사용을 위함)
  public getAxiosInstance(): AxiosInstance {
    return this.client;
  }
}

// API 클라이언트 인스턴스 내보내기
const apiClient = ApiClient.getInstance();
export default apiClient;
// 원래 코드와의 호환성을 위한 export
export { apiClient as client };
