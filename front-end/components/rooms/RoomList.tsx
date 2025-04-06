import ClientComponentWrapper from '@/components/common/ClientComponentWrapper';
import { RoomDisplay } from '@/types/room';
import RoomListContent from './RoomListContent';

interface RoomListProps {
  rooms?: RoomDisplay[];
  isLoading?: boolean;
  error?: string;
  onViewDetails?: (room: RoomDisplay) => void;
  onBookNow?: (room: RoomDisplay) => void;
}

export default function RoomList(props: RoomListProps) {
  return (
    <ClientComponentWrapper>
      <RoomListContent {...props} />
    </ClientComponentWrapper>
  );
}
