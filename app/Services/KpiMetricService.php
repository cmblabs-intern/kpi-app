<?php

namespace App\Services;

use App\Repositories\KpiMetricRepository;

class KpiMetricService 
{
    private $kpiMetricRepository;

    public function __construct(KpiMetricRepository $kpiMetricRepository)
    {
        $this->kpiMetricRepository = $kpiMetricRepository;
    }

    public function list(array $fields = ['*'])
    {
        return $this->kpiMetricRepository->list($fields);
    }

    public function getById(int $id, array $fields = ['*'])
    {
        return $this->kpiMetricRepository->getById($id, $fields);
    }

    public function create(array $data)
    {
        return $this->kpiMetricRepository->create($data);
    }

    public function update(int $id, array $data)
    {
        return $this->kpiMetricRepository->update($id, $data);
    }

    public function delete(int $id)
    {
        return $this->kpiMetricRepository->delete($id);
    }
}
