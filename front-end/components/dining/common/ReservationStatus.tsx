'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Restaurant } from '@/data/dining/types/restaurant';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar, Clock, Mail, MessageSquare, Phone, Users } from 'lucide-react';

export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

interface Reservation {
  id: string;
  restaurant: Restaurant;
  date: Date;
  time: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  specialRequests?: string;
  status: ReservationStatus;
}

interface ReservationStatusProps {
  reservation: Reservation;
  onCancel?: (id: string) => void;
  onModify?: (id: string) => void;
}

const statusConfig = {
  PENDING: {
    label: '대기 중',
    variant: 'secondary' as const,
  },
  CONFIRMED: {
    label: '확정됨',
    variant: 'success' as const,
  },
  CANCELLED: {
    label: '취소됨',
    variant: 'destructive' as const,
  },
  COMPLETED: {
    label: '완료됨',
    variant: 'default' as const,
  },
};

export function ReservationStatus({ reservation, onCancel, onModify }: ReservationStatusProps) {
  const { id, restaurant, date, time, guests, name, email, phone, specialRequests, status } =
    reservation;
  const statusInfo = statusConfig[status];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">예약 번호: {id}</CardTitle>
        <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{format(date, 'PPP', { locale: ko })}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{time}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{guests}명</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{phone}</span>
          </div>
          {specialRequests && (
            <div className="flex items-start space-x-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground mt-1" />
              <span className="text-sm">{specialRequests}</span>
            </div>
          )}
        </div>

        {status === 'CONFIRMED' && (
          <div className="mt-4 flex space-x-2">
            {onModify && (
              <Button variant="outline" size="sm" onClick={() => onModify(id)}>
                수정하기
              </Button>
            )}
            {onCancel && (
              <Button variant="destructive" size="sm" onClick={() => onCancel(id)}>
                취소하기
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
