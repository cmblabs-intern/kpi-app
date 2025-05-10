<?php

namespace App\Http\Controllers;

use App\Http\Requests\KpiMetricRequest;
use App\Http\Resources\DivisionResource;
use App\Http\Resources\KpiMetricCollection;
use App\Http\Resources\KpiMetricResource;
use App\Models\Division;
use App\Services\KpiMetricService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Inertia\Inertia;

class KpiMetricController extends Controller
{
    private $kpiMetricService;

    public function __construct(KpiMetricService $service)
    {
        $this->kpiMetricService = $service;
    }

    public function index()
    {
        $divisions = Division::all();
        $fields = ['*'];
        $metrics = $this->kpiMetricService->list($fields, 10);

        return Inertia::render('kpi-metrics/dashboard', [
            'kpi_metrics' => new KpiMetricCollection($metrics),
            'divisions' => DivisionResource::collection($divisions),
        ]);
    }

    public function show(int $id)
    {
        try {
            $fields = ['*'];
            $metric = $this->kpiMetricService->getById($id, $fields);

            return Inertia::render('kpi-metrics/dashboard', [
                'kpi_metric' => new KpiMetricResource($metric),
            ]);
        } catch (ModelNotFoundException $error) {
            return response()->json(['message' => 'Data KPI Metric tidak ditemukan'], 404);
        }
    }
    public function store(KpiMetricRequest $request)
    {
        $metric = $this->kpiMetricService->create($request->validated());

        return Inertia::render('kpi-metrics/dashboard', [
            'kpi_metric' => new KpiMetricResource($metric),
            'kpi_metrics' => KpiMetricResource::collection($this->kpiMetricService->list(['*'])),
        ], 201);
    }

    public function update(KpiMetricRequest $request, int $id)
    {
        try {
            $this->kpiMetricService->update($id, $request->validated());

            return redirect()->route('kpi-metrics.index');
        } catch (ModelNotFoundException $error) {
            return response()->json(['message' => 'Data KPI Metric tidak ditemukan'], 404);
        }
    }

    public function destroy(int $id)
    {
        try {
            $this->kpiMetricService->delete($id);
            return redirect()->route('kpi-metrics.index');
        } catch (ModelNotFoundException $error) {
            return response()->json(['message' => 'Data KPI Metric tidak ditemukan'], 404);
        }
    }
}
