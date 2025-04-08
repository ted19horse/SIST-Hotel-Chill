'use client';

import { testimonials } from '@/lib/data/membership/testimonials';
import { Testimonial } from '@/lib/types/membership';
import { getUserAvatarImage } from '@/lib/utils/image-utils';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Testimonials() {
  const [memberTestimonials, setMemberTestimonials] = useState<Testimonial[]>([]);
  const [featuredTestimonial, setFeaturedTestimonial] = useState<Testimonial | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      setIsLoading(true);
      try {
        // 실제 API 연동 시 아래 주석을 해제
        // const data = await api.membership.getTestimonials();
        // setMemberTestimonials(data);

        // 더미 데이터 사용
        setMemberTestimonials(testimonials);

        // 별점이 가장 높은 testimonial을 featured로 설정
        const featured = [...testimonials].sort((a, b) => b.rating - a.rating)[0];
        setFeaturedTestimonial(featured);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // 오류 발생 시 더미 데이터 사용
        setMemberTestimonials(testimonials);
        setFeaturedTestimonial(testimonials[0]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // 별점 렌더링 헬퍼 함수
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-300'}`}
      />
    ));
  };

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">회원 후기</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Chill Rewards 회원들의 진솔한 경험담을 들어보세요.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p>회원 후기를 불러오는 중...</p>
          </div>
        ) : (
          <>
            {/* 주요 회원 후기 */}
            {featuredTestimonial && (
              <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden mb-12">
                <div className="md:flex">
                  <div className="md:w-1/3 relative">
                    <div className="h-64 md:h-full relative">
                      <Image
                        src={
                          featuredTestimonial.avatar || getUserAvatarImage(featuredTestimonial.name)
                        }
                        alt={featuredTestimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 md:hidden">
                      <div className="flex items-center">
                        <div className="flex space-x-1 mb-1">
                          {renderStars(featuredTestimonial.rating)}
                        </div>
                      </div>
                      <p className="text-white font-medium">{featuredTestimonial.name}</p>
                      <p className="text-white/80 text-sm">{featuredTestimonial.tier} 멤버</p>
                    </div>
                  </div>
                  <div className="md:w-2/3 p-6 md:p-8">
                    <div className="hidden md:block mb-4">
                      <div className="flex space-x-1 mb-2">
                        {renderStars(featuredTestimonial.rating)}
                      </div>
                      <p className="font-medium text-lg">{featuredTestimonial.name}</p>
                      <p className="text-neutral-500 text-sm">
                        {featuredTestimonial.tier} 멤버 • {featuredTestimonial.memberSince}
                      </p>
                    </div>
                    <blockquote className="italic text-neutral-600 border-l-4 border-primary pl-4 py-1 mb-4">
                      "{featuredTestimonial.quote}"
                    </blockquote>
                    <p className="text-neutral-600">{featuredTestimonial.testimonial}</p>
                  </div>
                </div>
              </div>
            )}

            {/* 회원 후기 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {memberTestimonials
                .filter((t) => featuredTestimonial && t.id !== featuredTestimonial.id)
                .slice(0, 6)
                .map((testimonial) => (
                  <div key={testimonial.id} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={testimonial.avatar || getUserAvatarImage(testimonial.name)}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-neutral-500 text-sm">{testimonial.tier} 멤버</p>
                        <div className="flex space-x-1 mt-1">{renderStars(testimonial.rating)}</div>
                      </div>
                    </div>
                    <blockquote className="text-neutral-600">"{testimonial.quote}"</blockquote>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
