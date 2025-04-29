import { cn } from '@/lib/utils';

export default function AppLogoIcon({className}: {className: string}) {
    return (
        <img
            className={cn('rounded-sm', className)}
            src='/cmlabs.ico'
            alt='Logo CM LABS'
        />
    );
}
