import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { PageProps, User, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BarChart2, BookOpen, Building2, CircleGauge, ClipboardPenLine, LayoutGrid, Users } from 'lucide-react';

const mainNavItems: (NavItem)[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
        role: ['user', 'admin'],
    },
    {
        title: 'Karyawan',
        href: '/employees/dashboard',
        icon: Users,
        role: ['admin'],
    },
    {
        title: 'Divisi',
        href: '/divisions/dashboard',
        icon: Building2,
        role: ['admin'],
    },
    {
        title: 'Nilai KPI',
        href: '/kpi/my-scores',
        icon: CircleGauge,
        role: ['user'],
    },
    {
        title: 'Matrix KPI',
        href: '/kpi-metrics/dashboard',
        icon: BookOpen,
        role: ['admin'],
    },
    {
        title: 'Penilaian KPI',
        href: '/kpi-assessments/dashboard',
        icon: BarChart2,
        role: ['admin']
    },
    {
        title: 'Laporan',
        href: '/report',
        icon: ClipboardPenLine,
        role: ['admin'],
    },
];

export function AppSidebar() {
    const { auth } = usePage<PageProps<{ auth: User[] }>>().props;
    const user = auth.user;

    return (
        <Sidebar collapsible="icon" variant="inset" className="block border-r-[1px] lg:hidden">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch className="flex items-center gap-3 border py-2">
                                <img src="/cmlabs.ico" alt="Logo cm labs" className="h-full rounded-sm object-cover" />
                                <p className="font-semibold text-sky-500">cmlabs</p>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} role={user.role} />
            </SidebarContent>
        </Sidebar>
    );
}
