import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { Bell, Dot } from 'lucide-react';

const notifications = [
  {
      id: 1,
      message: 'Penilaian KPI bulan Maret telah dirilis.',
      timestamp: new Date('2025-04-29T09:30:00'),
      read: false,
  },
  {
      id: 2,
      message: 'Rapat evaluasi KPI akan diadakan Jumat ini.',
      timestamp: new Date('2025-04-28T16:45:00'),
      read: true,
  },
  {
      id: 3,
      message: 'Anda mendapatkan badge “Performer of the Month”.',
      timestamp: new Date('2025-04-27T13:10:00'),
      read: true,
  },
];

const Notification = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <Bell className="mr-2 h-4 w-4" />
                    Notifikasi ({notifications.length})
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80">
                <DropdownMenuLabel>Notifikasi Terbaru</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length > 0 ? (
                    notifications.map((notif) => (
                        <DropdownMenuItem
                            key={notif.id}
                            className={`flex items-start gap-2 px-3 py-2 ${notif.read ? 'text-muted-foreground' : 'font-medium'}`}
                        >
                            {!notif.read && <Dot className="mt-1 h-4 w-4 shrink-0 text-blue-500" />}
                            <div className="flex flex-col">
                                <span>{notif.message}</span>
                                <span className="text-xs text-gray-500">
                                    {notif.timestamp.toLocaleDateString('id-ID', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                    })}{' '}
                                    •{' '}
                                    {notif.timestamp.toLocaleTimeString('id-ID', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </span>
                            </div>
                        </DropdownMenuItem>
                    ))
                ) : (
                    <DropdownMenuItem className="text-muted-foreground">Tidak ada notifikasi</DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-primary justify-center font-semibold">Lihat Semua</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Notification;
