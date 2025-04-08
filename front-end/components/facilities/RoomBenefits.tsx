import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/common/ui/Table';
import { roomBenefits } from '@/data/static/facilities/benefits-data';
import { Check, X } from 'lucide-react';

export default function RoomBenefits() {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">객실 등급별 혜택</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            각 객실 유형별로 제공되는 특별 이용 혜택과 무료 서비스를 확인하세요.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px] bg-neutral-100">객실 유형</TableHead>
                  <TableHead className="text-center">웰니스 센터 이용</TableHead>
                  <TableHead className="text-center">요가/명상 클래스</TableHead>
                  <TableHead className="text-center">가족 액티비티</TableHead>
                  <TableHead className="text-center">스파 트리트먼트</TableHead>
                  <TableHead className="text-center">카바나 우선권</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roomBenefits.roomTypes.map((roomType) => (
                  <TableRow key={roomType.id}>
                    <TableCell className="font-medium bg-neutral-50">
                      {roomType.displayName}
                    </TableCell>
                    <TableCell className="text-center">
                      {roomType.benefits.wellnessAccess ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-neutral-300 mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {roomType.benefits.yogaClass ? (
                        typeof roomType.benefits.yogaClass === 'object' ? (
                          <div className="text-sm text-center">
                            {roomType.benefits.yogaClass.description}
                          </div>
                        ) : (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        )
                      ) : (
                        <X className="h-5 w-5 text-neutral-300 mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {roomType.benefits.familyActivity ? (
                        typeof roomType.benefits.familyActivity === 'object' ? (
                          <div className="text-sm text-center">
                            {roomType.benefits.familyActivity.description}
                          </div>
                        ) : (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        )
                      ) : (
                        <X className="h-5 w-5 text-neutral-300 mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {roomType.benefits.spaTreatment ? (
                        typeof roomType.benefits.spaTreatment === 'object' ? (
                          <div className="text-sm text-center">
                            {roomType.benefits.spaTreatment.description}
                          </div>
                        ) : (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        )
                      ) : (
                        <X className="h-5 w-5 text-neutral-300 mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {roomType.benefits.cabanaPriority ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-neutral-300 mx-auto" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">추가 혜택</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roomBenefits.additionalBenefits.map((benefit, index) => (
              <div key={index} className="bg-neutral-50 p-4 rounded-lg">
                <h4 className="font-bold mb-2">{benefit.title}</h4>
                <p className="text-neutral-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
