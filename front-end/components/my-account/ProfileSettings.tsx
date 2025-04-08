'use client';

import { Button } from '@/components/common/ui/Button';
import { Checkbox } from '@/components/common/ui/Checkbox';
import { Input } from '@/components/common/ui/Input';
import { Label } from '@/components/common/ui/Label';
import { Select } from '@/components/common/ui/Select';
import { Switch } from '@/components/common/ui/Switch';
import { Smartphone, Tablet, X } from 'lucide-react';
import { useState } from 'react';

export default function ProfileSettings() {
  // Mock user data
  const [user, setUser] = useState({
    firstName: 'Min-Ji',
    lastName: 'Park',
    email: 'minji.park@example.com',
    phone: '+82 10-1234-5678',
    address: '123 Sejong Street',
    city: 'Seoul',
    postalCode: '04515',
    country: 'South Korea',
    language: 'korean',
    profileImage: '/placeholder.svg?height=200&width=200',
  });

  // Communication preferences
  const [preferences, setPreferences] = useState({
    emailMarketing: true,
    smsNotifications: true,
    appNotifications: true,
    emailReservationUpdates: true,
    emailAccountUpdates: true,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
    }, 1000);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">프로필 및 설정</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 개인 정보 */}
        <div className="lg:col-span-2">
          <div className="bg-neutral-50 rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">개인 정보</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName">이름</Label>
                <Input id="firstName" defaultValue="박" />
              </div>

              <div>
                <Label htmlFor="lastName">성</Label>
                <Input id="lastName" defaultValue="민지" />
              </div>

              <div>
                <Label htmlFor="email">이메일</Label>
                <Input id="email" type="email" defaultValue="minji.park@example.com" />
              </div>

              <div>
                <Label htmlFor="phone">전화번호</Label>
                <Input id="phone" type="tel" defaultValue="010-1234-5678" />
              </div>

              <div>
                <Label htmlFor="birthdate">생년월일</Label>
                <Input id="birthdate" type="date" defaultValue="1990-03-15" />
              </div>

              <div>
                <Label htmlFor="language">선호 언어</Label>
                <Select id="language" defaultValue="ko">
                  <option value="ko">한국어</option>
                  <option value="en">영어</option>
                  <option value="ja">일본어</option>
                  <option value="zh">중국어</option>
                </Select>
              </div>
            </div>

            <div className="mt-6">
              <Label htmlFor="address">주소</Label>
              <Input id="address" defaultValue="서울특별시 강남구 테헤란로 123" className="mb-2" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <Input placeholder="상세주소" />
                <Input placeholder="우편번호" />
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  주소 찾기
                </Button>
              </div>
            </div>

            <div className="mt-6">
              <Label>마케팅 수신 동의</Label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Checkbox id="emailMarketing" />
                  <label htmlFor="emailMarketing" className="ml-2 text-sm">
                    이메일 수신 동의
                  </label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="smsMarketing" />
                  <label htmlFor="smsMarketing" className="ml-2 text-sm">
                    SMS 수신 동의
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button className="bg-primary hover:bg-primary/90 text-white">변경사항 저장</Button>
            </div>
          </div>
        </div>

        {/* 보안 설정 */}
        <div className="lg:col-span-1">
          <div className="bg-neutral-50 rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">보안 설정</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">비밀번호 변경</h3>
                <div className="space-y-2">
                  <Input type="password" placeholder="현재 비밀번호" />
                  <Input type="password" placeholder="새 비밀번호" />
                  <Input type="password" placeholder="새 비밀번호 확인" />
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                    비밀번호 변경
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">2단계 인증</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600">
                      계정 보안을 강화하기 위해 2단계 인증을 설정하세요.
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">로그인 기록</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium">서울, 대한민국</p>
                      <p className="text-neutral-500">Chrome - Windows</p>
                    </div>
                    <p className="text-neutral-500">방금 전</p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium">부산, 대한민국</p>
                      <p className="text-neutral-500">Safari - iOS</p>
                    </div>
                    <p className="text-neutral-500">2일 전</p>
                  </div>
                </div>
                <Button
                  variant="link"
                  className="text-primary hover:text-primary/90 mt-2 h-auto p-0"
                >
                  전체 기록 보기
                </Button>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">연결된 기기</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Smartphone className="h-4 w-4 text-neutral-500 mr-2" />
                      <div>
                        <p className="font-medium">iPhone 13 Pro</p>
                        <p className="text-neutral-500">앱 버전 2.1.0</p>
                      </div>
                    </div>
                    <Button variant="ghost" className="h-auto p-1">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Tablet className="h-4 w-4 text-neutral-500 mr-2" />
                      <div>
                        <p className="font-medium">iPad Air</p>
                        <p className="text-neutral-500">앱 버전 2.1.0</p>
                      </div>
                    </div>
                    <Button variant="ghost" className="h-auto p-1">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
