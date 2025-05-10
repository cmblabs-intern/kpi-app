import { ColumnDef } from '@tanstack/react-table';
import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    role: string[];
    role: string[];
    isActive?: boolean;
    className?: string;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    phone: string;
    addres: string;
    email_verified_at: string | null;
    role: UserRole;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Division {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface Employee {
    id: number;
    user_id: number;
    division_id: number;
    employee_code: number;
    position: string;
    user: User;
    division: Division;
    created_at: string;
    updated_at: string;
}

export interface KpiAssessment {
    id: number;
    employee_id: number;
    month: string;
    total_score: string;
    employee: Employee;
    created_at: string;
    updated_at: string;
}

export interface KpiMetric {
    id: number;
    code: string;
    name: string;
    year: number;
    unit: string;
    division: Division;
    description?: string;
    weight?: number;
    created_at?: string;
    updated_at?: string;
}

export interface CreateKpiMetricData {
    code: string;
    name: string;
    year: number;
    unit: string;
    [key: string]: string | number;
}

export interface UpdateKpiMetricData extends CreateKpiMetricData {
    id: number;
}

export interface KpiMetricPaging {
    current_page: number;
    size: number;
    total_page: number;
}

export interface KpiMetricResponse {
    data: KpiMetric[];
    paging: KpiMetricPaging;
    message?: string;
    status: string;
}

export interface KpiAssesments {
    id: number;
    employee_id: number;
    month: string;
    total_score: number;
    created_at: string;
    updated_at: string;
}

export enum UserRole {
    Admin = 'admin',
    User = 'user',
}

export interface PageProps<T = unknown> extends SharedData {
    flash?: {
        success?: string;
        error?: string;
    };
    errors?: Record<string, string>;
    data?: T;
}

export interface UserResponse {
    data: User[];

    paging?: {
        current_page: number;
        size: number;
        total_page: number;
    };
    message?: string;
    status: string;
}

export interface DivisionResponse {
    data: Division[];
    paging?: {
        current_page: number;
        size: number;
        total_page: number;
    };
    message?: string;
    status: string;
}

export interface EmployeeResponse {
    data: Employee[];
    paging?: {
        current_page: number;
        size: number;
        total_page: number;
    };
    message?: string;
    status: string;
}

export interface KpiAssesmentsResponse {
    data: KpiAssesments[];
    meta?: {
        total: number;
        perPage: number;
        currentPage: number;
        totalPages: number;
    };
    message?: string;
    status: string;
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    paging?: {
        current_page: number;
        size: number;
        total_page: number;
    };
    service: string;
}
