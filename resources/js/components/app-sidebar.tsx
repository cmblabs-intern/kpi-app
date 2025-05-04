import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Building2, ClipboardPenLine, LayoutGrid, Users } from 'lucide-react';

const mainNavItems: (NavItem & { onlyAdmin?: boolean })[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Karyawan',
        href: '/employees',
        icon: Users,
        onlyAdmin: true,
    },
    {
        title: 'Divisi',
        href: '/divisions',
        icon: Building2,
        onlyAdmin: true,
    },
    {
        title: 'Laporan',
        href: '/report',
        icon: ClipboardPenLine,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const { url } = usePage();

    return (
        <Sidebar collapsible="icon" variant="inset" className='block md:hidden'>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch className="flex items-center gap-3 border py-2">
                                <img src="/cmlabs.ico" alt="Logo cm labs" className="h-full rounded-sm object-cover" />
                                <p className="font-semibold text-sky-500">CMLABS</p>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain url={url} items={mainNavItems.filter((item) => !item.onlyAdmin || auth.user.role === 'admin')} />
            </SidebarContent>
        </Sidebar>
    );
}
