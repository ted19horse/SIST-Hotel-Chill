'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';

interface ReservationActionsProps {
  reservationId: string;
  onConfirm: (id: string) => void;
  onCancel: (id: string) => void;
  onModify: (id: string) => void;
}

export function ReservationActions({
  reservationId,
  onConfirm,
  onCancel,
  onModify,
}: ReservationActionsProps) {
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const handleCancel = () => {
    onCancel(reservationId);
    setShowCancelDialog(false);
  };

  return (
    <>
      <div className="flex space-x-2">
        <Button onClick={() => onConfirm(reservationId)}>예약 확인</Button>
        <Button variant="outline" onClick={() => onModify(reservationId)}>
          수정하기
        </Button>
        <Button variant="destructive" onClick={() => setShowCancelDialog(true)}>
          취소하기
        </Button>
      </div>

      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>예약 취소</DialogTitle>
            <DialogDescription>
              정말로 이 예약을 취소하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              돌아가기
            </Button>
            <Button variant="destructive" onClick={handleCancel}>
              취소하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
