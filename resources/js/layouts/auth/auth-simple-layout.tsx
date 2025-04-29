import AppLogoIcon from '@/components/app-logo-icon';
import { Separator } from '@/components/ui/separator';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="md:bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center gap-6 p-6 md:p-10 md:rounded-sm max-w-2xl">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8 text-current md:text-white justify-center items-center">
                    <div className="flex flex-col items-center gap-4">
                        <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                            <div className="mb-1 flex flex-col h-9 items-center justify-center rounded-md">
                                <AppLogoIcon className="size-9 fill-current" />
                                <h1 className='font-semibold text-sky-500'>CMLABS</h1>
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>
                        <Separator className='md:bg-white'/>

                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-medium">{title}</h1>
                            <p className="text-center text-sm">{description}</p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
