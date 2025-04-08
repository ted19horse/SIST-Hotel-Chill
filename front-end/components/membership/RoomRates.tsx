import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/common/ui/Table';
import { Info } from 'lucide-react';

export default function RoomRates() {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">객실 요금 안내</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            투명한 가격 정책으로 투숙 계획을 세우고 멤버십 할인의 가치를 확인하세요.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px] bg-neutral-100">객실 타입</TableHead>
                  <TableHead className="text-right">
                    주중 요금
                    <br />
                    (일-목)
                  </TableHead>
                  <TableHead className="text-right">
                    주말 요금
                    <br />
                    (금-토)
                  </TableHead>
                  <TableHead className="text-right">성수기 요금</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Chill Comfort Room</TableCell>
                  <TableCell className="text-right">₩220,000</TableCell>
                  <TableCell className="text-right">₩270,000</TableCell>
                  <TableCell className="text-right">₩320,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Chill Harmony Room</TableCell>
                  <TableCell className="text-right">₩280,000</TableCell>
                  <TableCell className="text-right">₩350,000</TableCell>
                  <TableCell className="text-right">₩400,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Chill Serenity Room</TableCell>
                  <TableCell className="text-right">₩380,000</TableCell>
                  <TableCell className="text-right">₩450,000</TableCell>
                  <TableCell className="text-right">₩520,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Chill Family Suite</TableCell>
                  <TableCell className="text-right">₩520,000</TableCell>
                  <TableCell className="text-right">₩650,000</TableCell>
                  <TableCell className="text-right">₩750,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Chill Lake Suite</TableCell>
                  <TableCell className="text-right">₩680,000</TableCell>
                  <TableCell className="text-right">₩820,000</TableCell>
                  <TableCell className="text-right">₩950,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Ultimate Chill Suite</TableCell>
                  <TableCell className="text-right">₩950,000</TableCell>
                  <TableCell className="text-right">₩1,200,000</TableCell>
                  <TableCell className="text-right">₩1,500,000</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="p-4 bg-neutral-50 flex items-start">
            <Info className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-neutral-600">
              성수기는 7-8월 여름 시즌, 12월 20일-1월 5일 연말연시, 그리고 주요 휴일 기간을
              포함합니다. 모든 요금은 10% 부가세가 별도입니다. 멤버십 할인은 이 기본 요금에
              적용됩니다.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold mb-3">멤버십 할인 예시</h3>
            <p className="text-neutral-600 text-sm mb-4">
              Chill Rewards 멤버십으로 얼마나 절약할 수 있는지 확인하세요:
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-neutral-100">
                <span className="text-sm">2박 주말 투숙 (Chill Harmony Room)</span>
                <span className="font-medium">₩700,000</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-neutral-100">
                <span className="text-sm">Deep Chill 할인 (15%)</span>
                <span className="font-medium text-green-600">-₩105,000</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-neutral-100">
                <span className="text-sm">적립 포인트 (600 포인트)</span>
                <span className="font-medium text-primary">+₩6,000 가치</span>
              </div>
              <div className="flex justify-between items-center font-bold">
                <span>총 절약 금액</span>
                <span className="text-green-600">₩111,000</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold mb-3">시즌별 요금 달력</h3>
            <p className="text-neutral-600 text-sm mb-4">가치를 극대화하는 투숙 계획:</p>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>비수기 (최저 요금)</span>
                <span className="font-medium">2, 5, 6, 9, 11월</span>
              </li>
              <li className="flex justify-between">
                <span>일반 시즌</span>
                <span className="font-medium">3, 4, 10월</span>
              </li>
              <li className="flex justify-between">
                <span>성수기</span>
                <span className="font-medium">7, 8, 12, 1월</span>
              </li>
            </ul>
            <p className="mt-4 text-xs text-neutral-500">
              * 특정 날짜는 변동될 수 있습니다. 가장 정확한 요금은 예약 캘린더에서 확인하세요.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold mb-3">특별 요금 혜택</h3>
            <p className="text-neutral-600 text-sm mb-4">Chill Rewards 회원 전용:</p>
            <ul className="space-y-2 text-sm">
              <li>• 회원 전용 플래시 세일 (최대 30% 할인)</li>
              <li>• 장기 투숙 할인 (5박 이상)</li>
              <li>• 얼리버드 예약 혜택</li>
              <li>• 막바지 예약 특가</li>
              <li>• 생일 월 특별 요금</li>
              <li>• 기념일 축하 패키지</li>
            </ul>
            <p className="mt-4 text-xs text-neutral-500">
              * 특별 혜택은 이메일과 모바일 앱을 통해 안내됩니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
