import { userData } from '@/lib/mock-data/my-account/user';
import { User } from '@/lib/types/my-account';

/**
 * 사용자 프로필 조회 API
 */
export interface GetUserProfileRequest {
  userId: number;
}

export interface GetUserProfileResponse {
  data: User;
  success: boolean;
  message: string;
}

export const getUserProfile = async ({
  userId,
}: GetUserProfileRequest): Promise<GetUserProfileResponse> => {
  try {
    // 실제 환경에서는 API 호출
    // const response = await apiClient.get(`/api/my-account/profile/${userId}`);
    // return response.data;

    // 개발 환경에서는 더미데이터 반환
    return {
      data: userData,
      success: true,
      message: 'User profile retrieved successfully',
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

/**
 * 사용자 프로필 업데이트 API
 */
export interface UpdateUserProfileRequest {
  userId: number;
  name?: string;
  email?: string;
  phone?: string;
  profileImage?: string;
}

export interface UpdateUserProfileResponse {
  data: User;
  success: boolean;
  message: string;
}

export const updateUserProfile = async (
  request: UpdateUserProfileRequest
): Promise<UpdateUserProfileResponse> => {
  try {
    // 실제 환경에서는 API 호출
    // const response = await apiClient.put(`/api/my-account/profile/${request.userId}`, request);
    // return response.data;

    // 개발 환경에서는 더미데이터 업데이트 후 반환
    const updatedUser: User = {
      ...userData,
      ...request,
    };

    return {
      data: updatedUser,
      success: true,
      message: 'User profile updated successfully',
    };
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

/**
 * 프로필 이미지 업로드 API
 */
export interface UploadProfileImageRequest {
  userId: number;
  imageFile: File;
}

export interface UploadProfileImageResponse {
  data: {
    imageUrl: string;
  };
  success: boolean;
  message: string;
}

export const uploadProfileImage = async ({
  userId,
  imageFile,
}: UploadProfileImageRequest): Promise<UploadProfileImageResponse> => {
  try {
    // 실제 환경에서는 API 호출 (FormData 사용)
    // const formData = new FormData();
    // formData.append('image', imageFile);
    // const response = await apiClient.post(`/api/my-account/profile/${userId}/image`, formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });
    // return response.data;

    // 개발 환경에서는 임의 URL 반환
    return {
      data: {
        imageUrl: URL.createObjectURL(imageFile),
      },
      success: true,
      message: 'Profile image uploaded successfully',
    };
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw error;
  }
};
