import { Button } from '@/components/common/ui/Button';
import Image from 'next/image';

export default function MembershipHero() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="프리미엄 서비스를 즐기는 투숙객"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Chill Rewards 멤버십</h1>
          <p className="text-xl text-white/90 mb-6">매 투숙마다 깊어지는 휴식을 경험하세요</p>
          <p className="text-lg mb-8 leading-relaxed">
            Chill Haven Resort & Spa에서의 힐링 여정을 더욱 풍요롭게 할 특별한 멤버십 프로그램에
            가입하세요. Chill Rewards 회원으로서 특별한 특권, 맞춤형 서비스, 그리고 매 투숙을 더욱
            가치있게 만드는 다양한 혜택을 누릴 수 있습니다.
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
            지금 가입하기
          </Button>
        </div>
      </div>
    </section>
  );
}
