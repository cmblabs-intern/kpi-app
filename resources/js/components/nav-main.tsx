import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [], role }: { items: NavItem[]; role: string }) {
    const page = usePage();
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const isActive = page.url.startsWith(item.href);

                    const hasAccess = item.role.includes(role);
                    
                    if (!hasAccess) return null;
                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild isActive={item.href === page.url} tooltip={{ children: item.title }}>
                                <Link
                                    href={item.href}
                                    prefetch
                                >
                                    {item.icon && <item.icon className={isActive ? 'text-sky-500' : 'text-accent-foreground'}/>}
                                    <span className={`hover:bg-accent px-4 py-1 rounded-sm ${isActive ? 'text-sky-500' : 'text-accent-foreground'}`}>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
