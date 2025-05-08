import { CalendarClock, CalendarPlus2, CalendarSync } from 'lucide-react';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';

const DetailDropdown = ({ created_at, updated_at }: { created_at: string; updated_at: string }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-2">
                    Lihat Detail
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel className="flex w-full items-center justify-center gap-x-2">
                    <CalendarClock className="h-4 w-4" /> Detail tanggal dan waktu
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-col items-start text-xs md:text-sm">
                    <div className="flex w-full items-center gap-2">
                        <CalendarPlus2 className="h-4 w-4 text-muted-foreground dark:text-white" />
                        <span className="text-muted-foreground"> Dibuat pada:</span>
                    </div>
                    <span className="text-sm font-medium">{created_at}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start text-xs md:text-sm">
                    <div className="flex w-full items-center gap-2">
                        <CalendarSync className="h-4 w-4 text-muted-foreground dark:text-white" />
                        <span className="text-muted-foreground">Diperbarui pada:</span>
                    </div>
                    <span className="text-sm font-medium">{updated_at}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DetailDropdown;
