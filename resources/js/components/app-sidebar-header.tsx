import { SidebarTrigger } from '@/components/ui/sidebar';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import AppLogoIcon from './app-logo-icon';
import { NavUser } from './nav-user';

const navbars = [
    {
        id: 1,
        name: 'Dashboard',
        href: '/dashboard',
        role: ['user', 'admin'],
    },
    {
        id: 2,
        name: 'Karyawan',
        href: '/employees/dashboard',
        role: ['admin'],
    },
    {
        id: 3,
        name: 'Divisi',
        href: '/divisions/dashboard',
        role: ['admin'],
    },
    {
        id: 4,
        name: 'Nilai KPI',
        href: '/kpi/my-scores',
        role: ['user']
    },
    {
        id: 5,
        name: 'Matrix KPI',
        href: '/kpi-metrics/dashboard',
        role: ['admin']
    },
    {
        id: 6,
        name: 'Penilaian KPI',
        href: '/kpi-assessments/dashboard',
        role: ['admin']
    },
    {
        id: 7,
        name: 'Laporan',
        href: '/report',
        role: ['admin']
    },
];

export function AppSidebarHeader() {
    const { url } = usePage();
    const { auth } = usePage<SharedData>().props;
    const role = auth.user.role;

    return (
        <header className="border-sidebar-border/50 flex shrink-0 items-center gap-2 border-b py-2 transition-[width,height] ease-linear">
            <div className="flex w-full items-center justify-between gap-6 px-4">
                <SidebarTrigger className="-ml-1 flex lg:hidden" />

                <Link href='/dashboard' className="hidden items-center justify-center gap-x-2 rounded-md px-4 lg:flex">
                    <AppLogoIcon className="size-8 fill-current" />
                    <h1 className="items-center text-3xl font-semibold text-sky-500">cmlabs</h1>
                </Link>

                <nav className="hidden w-full lg:block">
                    <ul className="flex justify-center gap-x-2">
                        {navbars.map((nav) => {
                            const isActive = url.startsWith(nav.href);
                            const hasAccess = nav.role.includes(role);

                            if (!hasAccess) return null;
                            return (
                                <li key={nav.id}>
                                    <Link
                                        href={nav.href}
                                        className={`hover:bg-accent px-4 py-1 rounded-sm font-medium ${isActive ? 'text-sky-500 font-semibold' : 'text-accent-foreground'}`}
                                    >
                                        {nav.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                <NavUser />
            </div>
        </header>
    );
}
