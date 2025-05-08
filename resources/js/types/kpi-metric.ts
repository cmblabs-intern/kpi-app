export interface KpiMetric {
    id: number;
    code: string;
    name: string;
    year: number;
    unit: string;
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
}
