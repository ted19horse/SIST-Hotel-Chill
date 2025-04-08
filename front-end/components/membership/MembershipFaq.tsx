'use client';

import { membershipFaqs } from '@/lib/data/membership/faqs';
import { MembershipFaq } from '@/lib/types/membership';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function MembershipFaq() {
  const [faqList, setFaqList] = useState<MembershipFaq[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFaqs = async () => {
      setIsLoading(true);
      try {
        // 실제 API 연동 시 아래 주석을 해제
        // const data = await api.membership.getFaqs();
        // setFaqList(data);

        // 더미 데이터 사용
        setFaqList(membershipFaqs);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
        // 오류 발생 시 더미 데이터 사용
        setFaqList(membershipFaqs);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">자주 묻는 질문</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Chill Rewards 멤버십 프로그램에 대해 자주 묻는 질문과 답변을 확인하세요.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <p>질문 답변을 불러오는 중...</p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="divide-y divide-neutral-200 border-t border-b border-neutral-200">
              {faqList.map((faq, index) => (
                <div key={faq.id} className="py-4">
                  <button
                    className="flex justify-between items-center w-full text-left py-2 focus:outline-none"
                    onClick={() => handleToggle(index)}
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <h3 className="text-lg font-medium">{faq.question}</h3>
                    <ChevronDown
                      className={`h-5 w-5 text-neutral-500 transition-transform ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    id={`faq-answer-${index}`}
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? 'max-h-96 mt-2' : 'max-h-0'
                    }`}
                  >
                    <p className="text-neutral-600">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-8">
          <p className="text-sm text-neutral-500">
            추가 질문이 있으시면{' '}
            <a href="#" className="text-primary hover:underline">
              멤버십 지원팀
            </a>
            에 문의해 주세요
          </p>
        </div>
      </div>
    </section>
  );
}
