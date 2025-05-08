import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type ReactNode } from 'react';
import { Toaster } from 'sonner';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: { title: string; href: string; }[];
}

export default ({ children, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate {...props}>
        <Toaster
            position='top-center'
            richColors
            duration={5000}
            closeButton
        />
        {children}
    </AppLayoutTemplate>
);
