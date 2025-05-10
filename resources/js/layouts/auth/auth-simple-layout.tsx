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
        <div className="flex flex-1 flex-col items-center justify-center gap-6 p-6 backdrop-blur-sm md:p-10 lg:rounded-none">
            <div className="w-full">
                <div className="flex flex-col items-center justify-center gap-8 text-current">
                    <div className="flex w-full max-w-sm flex-col items-center gap-4">
                        <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                            <div className="mb-1 flex h-9 flex-col items-center justify-center rounded-md">
                                <AppLogoIcon className="size-9 fill-current" />
                                <h1 className="font-semibold text-sky-500">CMLABS</h1>
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>
                        <Separator className="w-full" />

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
