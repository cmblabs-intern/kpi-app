import { ColumnDef } from '@tanstack/react-table';
import { LucideIcon } from 'lucide-react';

export interface NavItem {
    title: string;
    href: string;
    icon: LucideIcon;
}

export interface Paging {
    current_page: number;
    size: number;
    total_page: number;
}

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    paging?: Paging;
    service?: string;
}
