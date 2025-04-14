import { CourseMenu, MenuItem } from '../types/menu';
import { chillBitesMenu } from './chill-bites';
import { chillEleganceMenu } from './chill-elegance';
import { chillGardenMenu } from './chill-garden';
import { chillMomentsMenu } from './chill-moments';

export { chillBitesMenu, chillEleganceMenu, chillGardenMenu, chillMomentsMenu };

// 전체 메뉴 항목을 하나의 배열로 결합 (필요한 경우)
export const getAllMenuItems = (): MenuItem[] => {
  const menuItems: MenuItem[] = [
    ...chillBitesMenu,
    ...chillGardenMenu,
    // CourseMenu의 각 코스 항목을 평면화
    ...chillEleganceMenu.flatMap((course) => course.courses.flatMap((section) => section.items)),
    ...chillMomentsMenu,
  ];

  return menuItems;
};

// 레스토랑별 메뉴 아이템 조회
export const getMenuItemsByRestaurant = (restaurantId: string): MenuItem[] => {
  return getAllMenuItems().filter((item) => item.restaurantId === restaurantId);
};

// 카테고리별 메뉴 아이템 조회
export const getMenuItemsByCategory = (category: string): MenuItem[] => {
  return getAllMenuItems().filter((item) => item.category === category);
};

// 코스 메뉴 조회
export const getCourseMenus = (): CourseMenu[] => {
  return chillEleganceMenu;
};

// 시그니처 메뉴 조회
export const getSignatureMenuItems = (): MenuItem[] => {
  return getAllMenuItems().filter((item) => item.badges?.includes('SIGNATURE'));
};

// 채식 메뉴 조회
export const getVegetarianMenuItems = (): MenuItem[] => {
  return getAllMenuItems().filter(
    (item) => item.dietaryOptions?.includes('VEGETARIAN') || item.dietaryOptions?.includes('VEGAN')
  );
};
