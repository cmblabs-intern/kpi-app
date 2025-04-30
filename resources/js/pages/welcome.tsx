import AnimatedHeadline from '@/components/animated-headline';
import AppearanceToggleTab from '@/components/appearance-tabs';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] justify-between lg:p-8 dark:bg-[#0a0a0a]">
                <header className="px-5 w-full flex justify-between">
                    <nav className="flex items-center justify-end gap-4">
                        <img src="/cmlabs.ico" alt="logo" className="h-10 w-10 rounded-[4px]" />
                        <span className="text-3xl font-semibold text-sky-500">cmlabs</span>
                    </nav>
                    <AppearanceToggleTab />
                </header>
                <div className="max-w-2xl rounded-lg border p-6 px-6 text-center text-[#1b1b18] backdrop-blur-sm dark:text-[#EDEDEC] bg-current/10">
                    <AnimatedHeadline />
                    <p className="text-muted-foreground mb-6 text-sm md:text-lg">Pantau dan kelola performa karyawan secara transparan, akurat, dan efisien.</p>

                    {!auth.user && (
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <Link href={route('login')}>
                                <button className="cursor-pointer text-sm md:text-base rounded-md bg-sky-500 px-6 py-2 text-white transition hover:bg-sky-500/75">
                                    Masuk
                                </button>
                            </Link>
                            <Link href={route('register')}>
                                <button className="cursor-pointer text-sm md:text-base rounded-md border border-[#1b1b18] px-6 py-2 text-[#1b1b18] transition hover:bg-[#1b1b18] hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black">
                                    Daftar
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
                <div className="h-14.5 block"></div>
            </div>
        </>
    );
}
