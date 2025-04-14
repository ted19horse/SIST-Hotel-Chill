import { reservationInfo } from '@/lib/data/static/facilities/reservation-info-data';
import { CalendarClock, Clock, Sparkles, Users } from 'lucide-react';

const IconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Clock':
      return <Clock className="h-5 w-5 text-primary" />;
    case 'Users':
      return <Users className="h-5 w-5 text-primary" />;
    case 'Sparkles':
      return <Sparkles className="h-5 w-5 text-primary" />;
    case 'CalendarClock':
      return <CalendarClock className="h-5 w-5 text-primary" />;
    default:
      return <Clock className="h-5 w-5 text-primary" />;
  }
};

export default function ReservationInfo() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">예약 안내</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            투숙 기간 동안 인기 시설과 서비스의 이용을 위해 사전 예약을 계획하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <CalendarClock className="h-5 w-5 mr-2 text-primary" />
              사전 예약 필요 시설
            </h3>

            <div className="space-y-6">
              {reservationInfo.advanceRequirements.map((item) => (
                <div key={item.id} className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                    {IconComponent(item.icon)}
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{item.title}</h4>
                    <p className="text-neutral-600 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-xl font-bold mb-6">예약 방법</h3>

            <div className="space-y-6">
              {reservationInfo.howToReserve.map((method) => (
                <div key={method.id} className="bg-neutral-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">{method.title}</h4>
                  <p className="text-neutral-600 text-sm">{method.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 border border-primary/20 rounded-lg bg-primary/5">
              <p className="text-sm text-neutral-700">
                <strong>참고:</strong> {reservationInfo.cancellationPolicy}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
