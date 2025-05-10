import AppearanceToggleTab from '@/components/appearance-tabs';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { MenuIcon, XIcon } from 'lucide-react'; // Menambahkan XIcon
import { useState } from 'react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Menyimpan state apakah menu terbuka atau tidak

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Mengubah state menu ketika tombol ditekan
    };

    const closeMenu = () => {
        setIsMenuOpen(false); // Menutup menu
    };

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
<<<<<<< HEAD
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
=======
            <div className="relative flex h-screen flex-col items-center justify-between overflow-hidden bg-[#FDFDFC] p-6 text-[#1b1b18] transition-colors duration-300 dark:bg-gradient-to-b dark:from-[#0a0a0a] dark:via-[#08164f] dark:to-[#186ffb] dark:text-white">
                {/* Background kiri */}
                <div
                    className="absolute inset-y-0 left-0 w-1/6 bg-cover bg-right sm:w-1/4 md:w-1/6 lg:w-1/6 dark:hidden"
                    style={{ backgroundImage: 'url(/cmlabs/cover-left.png)' }}
                ></div>
>>>>>>> cd6d292ee742ea5fc1ca13f064c1c18a15162c08

                {/* Background kanan */}
                <div
                    className="absolute inset-y-0 right-0 z-10 w-1/6 bg-cover bg-left sm:w-1/4 md:w-1/6 lg:w-1/6 dark:hidden"
                    style={{ backgroundImage: 'url(/cmlabs/cover-right.png)' }}
                ></div>

                <header className="relative z-10 flex w-full items-center justify-between px-5 py-4">
                    <div className="flex items-center gap-2">
                        <img src="/cmlabs.ico" alt="logo" className="h-8 w-8 rounded-[4px]" />
                        <span className="text-xl font-semibold text-sky-600 dark:text-white">cmlabs</span>
                    </div>

                    {/* Navbar Menu */}
                    <div className="flex items-center gap-4">
                        <AppearanceToggleTab />
                        <div className="hidden items-center gap-4 sm:flex">
                            {auth.user ? (
                                <Link href={route('dashboard')}>
                                    <button className="rounded-full border border-black px-4 py-2 text-sm transition hover:bg-black/10 dark:border-white dark:hover:bg-white/20">
                                        Dashboard
                                    </button>
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')}>
                                        <button className="cursor-pointer text-sm text-black transition hover:underline dark:text-white">
                                            Log In
                                        </button>
                                    </Link>
                                    <Link href={route('register')}>
                                        <button className="cursor-pointer rounded-full border border-black px-4 py-2 text-sm text-black transition hover:bg-black/10 dark:border-white dark:text-white dark:hover:bg-white/20">
                                            Get Started
                                        </button>
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="sm:hidden">
                            <button onClick={toggleMenu} className="text-black dark:text-white">
                                <MenuIcon size={24} /> {/* Menambahkan ukuran icon */}
                            </button>
                        </div>
                    </div>
                </header>

                {/* Menu Toggle - Mobile */}
                {isMenuOpen && (
                    <div className="absolute top-0 left-0 z-20 flex h-1/2 w-full flex-col justify-center bg-white p-4 shadow-lg sm:hidden dark:bg-black dark:text-white">
                        <div className="flex flex-col items-center space-y-4">
                            {/* Tombol X untuk menutup menu */}
                            <button onClick={closeMenu} className="absolute top-4 right-4 text-black dark:text-white">
                                <XIcon size={24} /> {/* Icon X untuk menutup menu */}
                            </button>

                            {auth.user ? (
                                <Link href={route('dashboard')}>
                                    <button className="rounded-full border border-black px-4 py-2 text-sm transition hover:bg-black/10 dark:border-white dark:hover:bg-white/20">
                                        Dashboard
                                    </button>
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')}>
                                        <button className="cursor-pointer text-sm text-black transition hover:underline dark:text-white">
                                            Log In
                                        </button>
                                    </Link>
                                    <Link href={route('register')}>
                                        <button className="cursor-pointer rounded-full border border-black px-4 py-2 text-sm text-black transition hover:bg-black/10 dark:border-white dark:text-white dark:hover:bg-white/20">
                                            Get Started
                                        </button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}

                <main className="relative z-10 mt-10 flex flex-1 flex-col items-center justify-center px-4 text-center">
                    <h1 className="mb-4 text-4xl font-bold md:text-5xl">KPI Performance Management System</h1>
                    <p className="mb-6 max-w-xl text-lg text-gray-600 md:text-xl dark:text-gray-300">
                        Optimalkan pengelolaan performa tim dengan sistem KPI yang transparan, akurat, dan efisien di cmlabs.
                    </p>
                    <Link href={auth.user ? route('dashboard') : route('login')}>
                        <button className="cursor-pointer rounded-full bg-black px-6 py-2 text-sm font-medium text-white transition hover:opacity-80 md:text-base dark:bg-white dark:text-black">
                            {auth.user ? 'Go to Dashboard' : 'See u Performance'}
                        </button>
                    </Link>
                    <div className="mt-8 hidden rounded-xl border p-5 shadow-lg lg:block dark:border-none dark:shadow-none">
                        <img src="/cmlabs/dashboard-preview.png" alt="Dashboard Preview" className="w-full max-w-4xl rounded-xl" />
                    </div>
                </main>

                <footer className="h-14" />
            </div>
        </>
    );
}
