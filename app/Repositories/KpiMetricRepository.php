<?php

namespace App\Repositories;

use App\Models\KpiMetric;

class KpiMetricRepository
{
    public function list(array $fields)
    {
        return KpiMetric::select($fields)->latest()->paginate(10);
    }

    public function getById(int $id, array $fields)
    {
        return KpiMetric::select($fields)->findOrFail($id);
    }

    public function create(array $data)
    {
        return KpiMetric::create($data);
    }

    public function update(int $id, array $data)
    {
        $metric = KpiMetric::findOrFail($id);
        $metric->update($data);
        return $metric;
    }

    public function delete(int $id)
    {
        $metric = KpiMetric::findOrFail($id);
        $metric->delete();
    }
}