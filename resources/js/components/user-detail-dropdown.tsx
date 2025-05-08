import { Mail, MapPinHouse, Phone, SquareUser } from 'lucide-react';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';

const UserDetailDropdown = ({ email, phone, address }: { email: string; phone: string; address: string }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-2">
                    Lihat Detail
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel className="flex w-full items-center justify-center gap-x-2">
                    <SquareUser className="h-4 w-4" /> Detail data karyawan
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-col items-start text-xs md:text-sm">
                    <div className="flex w-full items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground dark:text-white" />
                        <span className="text-muted-foreground">Alamat Email:</span>
                    </div>
                    <span className="text-sm font-medium">{email}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start text-xs md:text-sm">
                    <div className="flex w-full items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground dark:text-white" />
                        <span className="text-muted-foreground">Nomor Handphone:</span>
                    </div>
                    <span className="text-sm font-medium">{phone}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start text-xs md:text-sm">
                    <div className="flex w-full items-center gap-2">
                        <MapPinHouse className="h-4 w-4 text-muted-foreground dark:text-white" />
                        <span className="text-muted-foreground">Alamat Tempat Tinggal:</span>
                    </div>
                    <span className="text-sm font-medium">{address}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDetailDropdown;
