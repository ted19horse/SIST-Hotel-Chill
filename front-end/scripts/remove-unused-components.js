/**
 * 미사용 컴포넌트 자동 삭제 스크립트
 * 
 * 이 스크립트는 UNUSED_COMPONENTS.md에 나열된 미사용 컴포넌트들을 자동으로 삭제합니다.
 * 실행 방법: Node.js 환경에서 `node scripts/remove-unused-components.js` 명령어 실행
 * 
 * 주의: 스크립트 실행 전 프로젝트 백업을 권장합니다.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 프로젝트 루트 디렉토리
const rootDir = path.resolve(__dirname, '..');

// 미사용 컴포넌트 파일 경로
const unusedComponentsPath = [
  // 다이닝(dining) 관련 미사용 컴포넌트 - 빈 파일
  'components/dining/CategoryGrid.tsx',
  'components/dining/FeaturedProducts.tsx',
  'components/dining/ProductFilters.tsx',
  'components/dining/ShopInfo.tsx',

  // 다이닝(dining) 관련 미사용 컴포넌트 - 거의 비어 있는 파일
  'components/dining/GiftShopSection.tsx',
  'components/dining/ProductGrid.tsx',
  'components/dining/ProductSearch.tsx',
  'components/dining/ShopIntro.tsx',

  // 다이닝(dining) 관련 미사용 컴포넌트 - 사용되지 않는 파일
  'components/dining/DiningIntro.tsx',
  'components/dining/DiningMap.tsx',
  'components/dining/DiningSection.tsx',
  'components/dining/DiningFilters.tsx',
  'components/dining/RestaurantGrid.tsx',

  // 상품(products) 관련 미사용 컴포넌트
  'components/products/ProductCard.tsx',
  'components/products/ProductList.tsx',

  // 예약(reservations) 관련 미사용 컴포넌트
  'components/reservations/AvailabilityCalendar.tsx',
  'components/reservations/ReservationStatus.tsx',

  // 객실(rooms) 관련 미사용 컴포넌트
  'components/rooms/RoomAmenities.tsx',
  'components/rooms/RoomAvailability.tsx',

  // 공통(common) 미사용 컴포넌트
  'components/common/marketing/HeroSection.tsx',
  'components/common/marketing/TestimonialSection.tsx',
  'components/common/ui/FormGroup.tsx',

  // 회원(membership) 관련 미사용 컴포넌트
  'components/membership/MembershipCard.tsx',
  'components/membership/MemberForm.tsx',
];

// 백업 디렉토리 생성
const backupDir = path.join(rootDir, 'backup-unused-components');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

console.log('미사용 컴포넌트 삭제 시작...');
console.log(`백업 디렉토리: ${backupDir}`);

// 미사용 컴포넌트 삭제 (백업 후)
let removedCount = 0;
let notFoundCount = 0;

unusedComponentsPath.forEach(componentPath => {
  const fullPath = path.join(rootDir, componentPath);
  
  // 파일 존재 확인
  if (fs.existsSync(fullPath)) {
    // 백업
    const backupPath = path.join(backupDir, componentPath);
    const backupDirPath = path.dirname(backupPath);
    
    if (!fs.existsSync(backupDirPath)) {
      fs.mkdirSync(backupDirPath, { recursive: true });
    }
    
    // 파일 복사
    fs.copyFileSync(fullPath, backupPath);
    
    // 로그
    console.log(`백업 완료: ${componentPath} -> ${path.relative(rootDir, backupPath)}`);
    
    // Git 삭제
    try {
      execSync(`git rm "${fullPath}"`, { stdio: 'inherit' });
      removedCount++;
      console.log(`삭제 완료: ${componentPath}`);
    } catch (err) {
      console.error(`삭제 실패: ${componentPath}`, err.message);
      
      // Git 오류 발생 시 일반 파일 삭제로 대체
      try {
        fs.unlinkSync(fullPath);
        removedCount++;
        console.log(`일반 삭제 완료: ${componentPath}`);
      } catch (e) {
        console.error(`일반 삭제 실패: ${componentPath}`, e.message);
      }
    }
  } else {
    console.warn(`파일 없음: ${componentPath}`);
    notFoundCount++;
  }
});

console.log('\n=== 삭제 작업 완료 ===');
console.log(`총 파일 수: ${unusedComponentsPath.length}`);
console.log(`삭제된 파일 수: ${removedCount}`);
console.log(`없는 파일 수: ${notFoundCount}`);
console.log('\n미사용 컴포넌트가 삭제되었습니다. 모든 파일은 다음 위치에 백업되었습니다:');
console.log(backupDir);
console.log('\n삭제된 파일을 복원하려면 백업 디렉토리에서 파일을 복사하세요.');
console.log('또는 git 명령어를 사용하여 복원할 수 있습니다: git checkout HEAD^ -- path/to/file');
