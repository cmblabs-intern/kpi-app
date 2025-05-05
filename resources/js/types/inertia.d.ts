import { KpiMetricResponse } from './kpi-metric';

export interface SharedData {
    user?: {
        id: number;
        name: string;
        email: string;
        role: string;
    };
    auth?: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
    [key: string]: any;
}

declare module '@inertiajs/core' {
    interface PageProps extends SharedData {
        kpiMetrics?: KpiMetricResponse;
        [key: string]: any;
    }
}
