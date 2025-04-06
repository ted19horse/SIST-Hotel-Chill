import ClientComponentWrapper from '@/components/common/ClientComponentWrapper';
import { Room } from '@/types/room';
import RoomListContent from './RoomListContent';

interface RoomListProps {
  rooms?: Room[];
  onViewDetails?: (room: Room) => void;
  onBookNow?: (room: Room) => void;
}

export default function RoomList(props: RoomListProps) {
  return (
    <ClientComponentWrapper>
      <RoomListContent {...props} />
    </ClientComponentWrapper>
  );
}
