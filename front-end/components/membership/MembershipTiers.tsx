'use client';

import { Button } from '@/components/common/ui/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/ui/Tabs';
import { membershipTiers } from '@/lib/data/membership/membership-tiers';
import { Check, Droplets, Waves, Wind } from 'lucide-react';
import { useState } from 'react';

// 아이콘 매핑
const tierIcons = {
  'chill-breeze': Wind,
  'chill-flow': Waves,
  'deep-chill': Droplets,
};

export default function MembershipTiers() {
  const [tiers, setTiers] = useState(membershipTiers);
  const [activeTab, setActiveTab] = useState(membershipTiers[0]?.id || '');
  const [isLoading, setIsLoading] = useState(false);

  // 실제 API 통합 시 사용할 수 있는 useEffect
  /*
  useEffect(() => {
    const fetchTiers = async () => {
      setIsLoading(true);
      try {
        const response = await api.membership.getMembershipTiers();
        setTiers(response);
        if (response.length > 0) {
          setActiveTab(response[0].id);
        }
      } catch (error) {
        console.error('Error fetching membership tiers:', error);
        // 에러 발생 시 더미 데이터 사용
        setTiers(membershipTiers);
        if (membershipTiers.length > 0) {
          setActiveTab(membershipTiers[0].id);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTiers();
  }, []);
  */

  // 각 등급에 아이콘 컴포넌트 할당
  const tiersWithIcons = tiers.map((tier) => ({
    ...tier,
    icon: tierIcons[tier.id as keyof typeof tierIcons],
  }));

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">멤버십 등급</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            나의 라이프스타일에 맞는 멤버십 등급을 선택하고 Chill Haven 경험을 향상시키는 다양한
            혜택을 누리세요.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p>멤버십 정보를 불러오는 중...</p>
          </div>
        ) : (
          <>
            {/* 모바일 뷰 - 탭 */}
            <div className="md:hidden">
              <Tabs defaultValue={tiersWithIcons[0]?.id} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 mb-8">
                  {tiersWithIcons.map((tier) => (
                    <TabsTrigger key={tier.id} value={tier.id}>
                      {tier.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {tiersWithIcons.map((tier) => (
                  <TabsContent key={tier.id} value={tier.id}>
                    <div className={`rounded-lg border p-6 ${tier.color}`}>
                      <div className="flex items-center mb-4">
                        <div
                          className={`w-10 h-10 rounded-full ${tier.iconColor} bg-white/80 flex items-center justify-center mr-3`}
                        >
                          {tier.icon && <tier.icon className="h-5 w-5" />}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{tier.name}</h3>
                          <p className="text-sm text-neutral-600">{tier.level} 등급</p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold mb-2 text-sm uppercase text-neutral-500">
                          가입 조건 (하나 충족)
                        </h4>
                        <ul className="space-y-2">
                          {tier.requirements.map((req, index) => (
                            <li key={index} className="flex items-start">
                              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 text-sm uppercase text-neutral-500">
                          혜택
                        </h4>
                        <ul className="space-y-2">
                          {tier.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start">
                              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6 pt-6 border-t border-neutral-200">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-2xl font-bold">{tier.pointsPerNight}</span>
                            <span className="text-neutral-600 ml-1">포인트 (1박당)</span>
                          </div>
                          <Button className="bg-primary hover:bg-primary/90">가입하기</Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            {/* 데스크톱 뷰 - 나란히 비교 */}
            <div className="hidden md:block">
              <div className="grid grid-cols-3 gap-6">
                {tiersWithIcons.map((tier) => (
                  <div
                    key={tier.id}
                    className={`rounded-lg border p-6 ${tier.color} h-full flex flex-col`}
                  >
                    <div className="flex items-center mb-4">
                      <div
                        className={`w-10 h-10 rounded-full ${tier.iconColor} bg-white/80 flex items-center justify-center mr-3`}
                      >
                        {tier.icon && <tier.icon className="h-5 w-5" />}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{tier.name}</h3>
                        <p className="text-sm text-neutral-600">{tier.level} 등급</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold mb-2 text-sm uppercase text-neutral-500">
                        가입 조건 (하나 충족)
                      </h4>
                      <ul className="space-y-2">
                        {tier.requirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex-grow">
                      <h4 className="font-semibold mb-2 text-sm uppercase text-neutral-500">
                        혜택
                      </h4>
                      <ul className="space-y-2">
                        {tier.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 pt-6 border-t border-neutral-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-2xl font-bold">{tier.pointsPerNight}</span>
                          <span className="text-neutral-600 ml-1">포인트 (1박당)</span>
                        </div>
                        <Button className="bg-primary hover:bg-primary/90">가입하기</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="mt-12 text-center">
          <p className="text-neutral-500 italic">
            멤버십 등급은 매년 숙박 이력과 소비 금액을 기준으로 평가됩니다.
            <br />
            조건이 충족되면 언제든지 업그레이드될 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
