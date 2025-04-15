'use client';

import { Button } from '@/components/common/ui/Button';
import { Calendar } from '@/components/common/ui/Calendar';
import { Checkbox } from '@/components/common/ui/Checkbox';
import { Input } from '@/components/common/ui/Input';
import { Label } from '@/components/common/ui/Label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/common/ui/Popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common/ui/Select';
import { Textarea } from '@/components/common/ui/Textarea';
import { facilities } from '@/lib/data/static/facilities/facilities-data';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CalendarIcon, Send } from 'lucide-react';
import { useState } from 'react';

export default function InfoRequestForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(undefined);
  const [facility, setFacility] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 폼 제출 시뮬레이션
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // 폼 초기화
      setName('');
      setEmail('');
      setPhone('');
      setDate(undefined);
      setFacility('');
      setMessage('');

      // 5초 후 제출 상태 리셋
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">추가 정보 요청</h2>
            <p className="text-neutral-600">
              시설에 대해 궁금한 점이 있으신가요? 아래 양식을 작성해 주시면 빠른 시일 내에 답변
              드리겠습니다.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-600"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">감사합니다!</h3>
                <p className="text-neutral-600">
                  요청이 성공적으로 접수되었습니다. 24시간 이내에 담당 팀에서 연락드릴 예정입니다.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <Label htmlFor="name" className="mb-2 block">
                      이름 *
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="이름을 입력하세요"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="mb-2 block">
                      이메일 주소 *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="이메일 주소를 입력하세요"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="mb-2 block">
                      연락처
                    </Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="연락 가능한 전화번호를 입력하세요"
                    />
                  </div>
                  <div>
                    <Label htmlFor="date" className="mb-2 block">
                      예정 방문일
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant={'outline'}
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !date && 'text-neutral-500'
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, 'PPP', { locale: ko }) : <span>날짜 선택</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          locale={ko}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="mb-6">
                  <Label htmlFor="facility" className="mb-2 block">
                    관심 시설 *
                  </Label>
                  <Select value={facility} onValueChange={setFacility} required>
                    <SelectTrigger id="facility">
                      <SelectValue placeholder="시설을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {facilities.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.displayName}
                        </SelectItem>
                      ))}
                      <SelectItem value="all">모든 시설</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="mb-6">
                  <Label htmlFor="message" className="mb-2 block">
                    문의 내용 *
                  </Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="어떤 정보가 필요하신지 구체적으로 알려주세요"
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <div className="flex items-start space-x-2 mb-6">
                  <Checkbox id="terms" required />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      개인정보 수집 및 이용에 동의합니다 *
                    </label>
                    <p className="text-sm text-neutral-500">
                      입력하신 정보는 문의 응대 목적으로만 사용되며 제3자에게 제공되지 않습니다.
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      제출 중...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      문의 제출하기
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}