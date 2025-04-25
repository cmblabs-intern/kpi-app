import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Users, LayoutGrid, Building2 } from 'lucide-react';

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
        onlyAdmin: true
    },
    {
        title: 'Divisi',
        href: '/divisions',
        icon: Building2,
        onlyAdmin: true
    },
];

const footerNavItems: NavItem[] = [
    
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch className='border flex items-center gap-3 py-2'>
                                <img src="/cmlabs.ico" alt="Logo cm labs" className='object-cover h-full rounded-sm' />
                                <p className='font-semibold '>CM LABS</p>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems.filter(item => !item.onlyAdmin || auth.user.role === 'admin')} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
