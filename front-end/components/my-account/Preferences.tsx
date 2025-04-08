'use client';

import { Button } from '@/components/common/ui/Button';
import { Label } from '@/components/common/ui/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common/ui/Select';
import { Switch } from '@/components/common/ui/Switch';
import { useState } from 'react';

export default function Preferences() {
  // Mock preferences data
  const [preferences, setPreferences] = useState({
    // Room preferences
    roomPreferences: {
      bedType: 'king',
      floorPreference: 'high',
      pillowType: 'soft',
      roomTemperature: 'cool',
      specialRequests: 'Please provide extra towels and bottled water.',
    },

    // Dining preferences
    diningPreferences: {
      dietaryRestrictions: ['vegetarian'],
      allergies: 'Nuts, shellfish',
      preferredDiningTime: 'evening',
      tableLocation: 'window',
    },

    // Communication preferences
    communicationPreferences: {
      language: 'korean',
      emailNotifications: true,
      smsNotifications: true,
      pushNotifications: true,
      marketingEmails: true,
      specialOffers: true,
      newsletterFrequency: 'monthly',
    },
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

  const dietaryOptions = [
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'gluten-free', label: 'Gluten-Free' },
    { id: 'dairy-free', label: 'Dairy-Free' },
    { id: 'halal', label: 'Halal' },
    { id: 'kosher', label: 'Kosher' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">환경 설정</h1>

      <div className="space-y-6">
        <div className="bg-neutral-50 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">알림 설정</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">이메일 알림</p>
                <p className="text-sm text-neutral-500">예약 확인 및 업데이트</p>
              </div>
              <Switch
                checked={preferences.communicationPreferences.emailNotifications}
                onCheckedChange={(checked) =>
                  setPreferences({
                    ...preferences,
                    communicationPreferences: {
                      ...preferences.communicationPreferences,
                      emailNotifications: checked,
                    },
                  })
                }
                disabled={!isEditing}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS 알림</p>
                <p className="text-sm text-neutral-500">긴급 알림 및 중요 업데이트</p>
              </div>
              <Switch
                checked={preferences.communicationPreferences.smsNotifications}
                onCheckedChange={(checked) =>
                  setPreferences({
                    ...preferences,
                    communicationPreferences: {
                      ...preferences.communicationPreferences,
                      smsNotifications: checked,
                    },
                  })
                }
                disabled={!isEditing}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">푸시 알림</p>
                <p className="text-sm text-neutral-500">모바일 앱 알림</p>
              </div>
              <Switch
                checked={preferences.communicationPreferences.pushNotifications}
                onCheckedChange={(checked) =>
                  setPreferences({
                    ...preferences,
                    communicationPreferences: {
                      ...preferences.communicationPreferences,
                      pushNotifications: checked,
                    },
                  })
                }
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>

        <div className="bg-neutral-50 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">객실 선호도</h2>

          <div className="space-y-4">
            <div>
              <Label>선호 층수</Label>
              <Select
                disabled={!isEditing}
                value={preferences.roomPreferences.floorPreference}
                onValueChange={(value) =>
                  setPreferences({
                    ...preferences,
                    roomPreferences: {
                      ...preferences.roomPreferences,
                      floorPreference: value,
                    },
                  })
                }
              >
                <SelectTrigger id="floorPreference">
                  <SelectValue placeholder="Select floor preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">고층 (15층 이상)</SelectItem>
                  <SelectItem value="middle">중층 (8-14층)</SelectItem>
                  <SelectItem value="low">저층 (1-7층)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>전망 선호도</Label>
              <Select
                disabled={!isEditing}
                value={preferences.roomPreferences.roomTemperature}
                onValueChange={(value) =>
                  setPreferences({
                    ...preferences,
                    roomPreferences: {
                      ...preferences.roomPreferences,
                      roomTemperature: value,
                    },
                  })
                }
              >
                <SelectTrigger id="roomTemperature">
                  <SelectValue placeholder="Select room temperature" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cool">Cool (19-21°C)</SelectItem>
                  <SelectItem value="moderate">Moderate (22-24°C)</SelectItem>
                  <SelectItem value="warm">Warm (25-27°C)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>침대 타입</Label>
              <Select
                disabled={!isEditing}
                value={preferences.roomPreferences.bedType}
                onValueChange={(value) =>
                  setPreferences({
                    ...preferences,
                    roomPreferences: {
                      ...preferences.roomPreferences,
                      bedType: value,
                    },
                  })
                }
              >
                <SelectTrigger id="bedType">
                  <SelectValue placeholder="Select bed type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="king">킹 사이즈</SelectItem>
                  <SelectItem value="queen">퀸 사이즈</SelectItem>
                  <SelectItem value="twin">트윈 베드</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="bg-neutral-50 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">다이닝 선호도</h2>

          <div className="space-y-4">
            <div>
              <Label>선호 좌석</Label>
              <Select
                disabled={!isEditing}
                value={preferences.diningPreferences.tableLocation}
                onValueChange={(value) =>
                  setPreferences({
                    ...preferences,
                    diningPreferences: {
                      ...preferences.diningPreferences,
                      tableLocation: value,
                    },
                  })
                }
              >
                <SelectTrigger id="tableLocation">
                  <SelectValue placeholder="Select preferred table location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="window">창가 좌석</SelectItem>
                  <SelectItem value="private">프라이빗 룸</SelectItem>
                  <SelectItem value="terrace">테라스</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>식사 시간대</Label>
              <Select
                disabled={!isEditing}
                value={preferences.diningPreferences.preferredDiningTime}
                onValueChange={(value) =>
                  setPreferences({
                    ...preferences,
                    diningPreferences: {
                      ...preferences.diningPreferences,
                      preferredDiningTime: value,
                    },
                  })
                }
              >
                <SelectTrigger id="preferredDiningTime">
                  <SelectValue placeholder="Select preferred dining time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakfast">아침 (7:00-10:00)</SelectItem>
                  <SelectItem value="lunch">점심 (12:00-14:00)</SelectItem>
                  <SelectItem value="dinner">저녁 (18:00-21:00)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">식이 제한</p>
                <p className="text-sm text-neutral-500">알레르기 또는 선호도</p>
              </div>
              <Button variant="outline">선호도 설정</Button>
            </div>
          </div>
        </div>

        <div className="bg-neutral-50 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">언어 및 통화</h2>

          <div className="space-y-4">
            <div>
              <Label>선호 언어</Label>
              <Select
                disabled={!isEditing}
                value={preferences.communicationPreferences.language}
                onValueChange={(value) =>
                  setPreferences({
                    ...preferences,
                    communicationPreferences: {
                      ...preferences.communicationPreferences,
                      language: value,
                    },
                  })
                }
              >
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="korean">한국어</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="japanese">日本語</SelectItem>
                  <SelectItem value="chinese">中文</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>통화</Label>
              <Select
                disabled={!isEditing}
                value={preferences.communicationPreferences.marketingEmails ? 'krw' : 'usd'}
                onValueChange={(value) =>
                  setPreferences({
                    ...preferences,
                    communicationPreferences: {
                      ...preferences.communicationPreferences,
                      marketingEmails: value === 'krw',
                    },
                  })
                }
              >
                <SelectTrigger id="marketingEmails">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="krw">KRW (₩)</SelectItem>
                  <SelectItem value="usd">USD ($)</SelectItem>
                  <SelectItem value="jpy">JPY (¥)</SelectItem>
                  <SelectItem value="cny">CNY (¥)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
