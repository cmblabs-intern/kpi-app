import AnimatedHeadline from '@/components/animated-headline';
import AppearanceToggleTab from '@/components/appearance-tabs';
import { Button } from '@/components/ui/button';
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
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] dark:bg-[#0a0a0a] p-6 text-[#1b1b18] justify-between lg:p-8">
                <header className="px-5 w-full flex justify-between">
                    <nav className="flex items-center justify-end gap-4">
                        <img src="/cmlabs.ico" alt="logo" className="h-10 w-10 rounded-[4px]" />
                        <span className="text-3xl font-semibold text-sky-500">cmlabs</span>
                    </nav>
                    <AppearanceToggleTab />
                </header>
                <div className="max-w-2xl rounded-lg shadow-2xl dark:shadow-white/20 shadow-black p-6 px-6 text-center text-white backdrop-blur-lg  bg-neutral-500">
                    <AnimatedHeadline />
                    <p className="text-white mb-6 text-sm md:text-lg">Pantau dan kelola performa karyawan secara transparan, akurat, dan efisien.</p>

                    {auth.user && (
                        <Link href={route('dashboard')}>
                            <Button className='text-sm md:text-base rounded-md bg-sky-500 px-6 py-2 text-white transition hover:bg-sky-500/75'>Dashboard</Button>
                        </Link>
                    )}

                    {!auth.user && (
                        <div className="flex justify-center gap-4">
                            <Link href={route('login')}>
                                <button className="cursor-pointer text-sm md:text-base rounded-md bg-sky-500 px-6 py-2 text-white transition hover:bg-sky-500/75">
                                    Masuk
                                </button>
                            </Link>
                            <Link href={route('register')}>
                                <button className="cursor-pointer text-sm md:text-base rounded-md border border-white px-6 py-2 text-white transition hover:bg-white hover:text-black">
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
