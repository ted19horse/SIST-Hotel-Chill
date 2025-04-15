'use client';

import { Button } from '@/components/common/ui/Button';
import { Calendar } from '@/components/common/ui/Calendar';
import { Checkbox } from '@/components/common/ui/Checkbox';
import { Input } from '@/components/common/ui/Input';
import { Label } from '@/components/common/ui/Label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/common/ui/Popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, Send } from 'lucide-react';
import { useState } from 'react';

export default function RegistrationForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState(undefined);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToMarketing, setAgreedToMarketing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setBirthDate(undefined);
      setAddress('');
      setCity('');
      setPostalCode('');
      setCountry('');
      setAgreedToTerms(false);
      setAgreedToMarketing(false);

      // Reset submission status after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section className="py-20 bg-neutral-50" id="join">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Chill Rewards 가입하기</h2>
            <p className="text-neutral-600">
              멤버십 프로그램에 가입하여 특별한 혜택과 매 투숙마다 Chill 포인트를 적립하세요.
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
                <h3 className="text-xl font-bold mb-2">Chill Rewards에 오신 것을 환영합니다!</h3>
                <p className="text-neutral-600">
                  회원 가입이 성공적으로 완료되었습니다. 멤버십 상세 정보가 포함된 확인 이메일을 곧
                  받아보실 것입니다.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <Label htmlFor="firstName" className="mb-2 block">
                      이름 *
                    </Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="이름을 입력하세요"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="mb-2 block">
                      성 *
                    </Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="성을 입력하세요"
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
                      전화번호 *
                    </Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="전화번호를 입력하세요"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="birthDate" className="mb-2 block">
                      생년월일
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !birthDate && 'text-neutral-500'
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {birthDate ? format(birthDate, 'PPP') : '생년월일을 선택하세요'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={birthDate}
                          onSelect={setBirthDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label htmlFor="address" className="mb-2 block">
                      주소 *
                    </Label>
                    <Input
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="주소를 입력하세요"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="city" className="mb-2 block">
                      도시 *
                    </Label>
                    <Input
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="도시를 입력하세요"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode" className="mb-2 block">
                      우편번호 *
                    </Label>
                    <Input
                      id="postalCode"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="우편번호를 입력하세요"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="country" className="mb-2 block">
                      국가 *
                    </Label>
                    <Input
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="국가를 입력하세요"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked)}
                      required
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        이용약관 및 개인정보 처리방침에 동의합니다 *
                      </label>
                      <p className="text-sm text-neutral-500">
                        이 체크박스를 선택하면 다음에 동의하게 됩니다:{' '}
                        <a href="#" className="text-primary hover:underline">
                          이용약관
                        </a>{' '}
                        및{' '}
                        <a href="#" className="text-primary hover:underline">
                          개인정보 처리방침
                        </a>
                        .
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="marketing"
                      checked={agreedToMarketing}
                      onCheckedChange={(checked) => setAgreedToMarketing(checked)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="marketing"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        특별 혜택 및 프로모션 정보 수신에 동의합니다 (선택사항)
                      </label>
                      <p className="text-sm text-neutral-500">
                        이메일로 Chill Haven의 특별 프로모션, 행사, 혜택 정보를 받아보세요.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      처리 중...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Send className="mr-2 h-5 w-5" />
                      가입 신청하기
                    </span>
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