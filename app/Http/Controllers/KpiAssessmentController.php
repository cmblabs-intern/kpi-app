<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Models\KpiAssessment;
use App\Models\KpiMetric;

class KpiAssessmentController extends Controller
{
    public function index()
    {
         $data = KpiAssessment::select(
            DB::raw('DATE_FORMAT(month, "%Y-%m") as month'),
            DB::raw('COUNT(*) as count')
        )
        ->groupBy('month')
        ->orderBy('month', 'desc')
        ->paginate(10); 
   

        return Inertia::render('assesment/dashboard', [
            'assessments' => $data,
        ]);

    }
    public function create()
    {
           $employees = Employee::join('users', 'employees.user_id', '=', 'users.id')
            ->select('employees.id', 'users.name')
            ->get();
            
            $matrices = KpiMetric::select('id', 'name')->get();
            return Inertia::render('assesment/create',
        [
            'employees' => $employees,
            'matrices' => $matrices,

        ]);
    }
    public function store(Request $request)
    {
         $data = $request->validate([
                'user_id' => 'required|exists:users,id',
                'month' => 'required|date_format:Y-m',
                'details' => 'required|array',
                'details.*.metric_id' => 'required|exists:kpi_metrics,id',
                'details.*.score' => 'required|numeric|min:0|max:100',
    ]);
        $monthDate = $data['month'] . '-01';
         $matrixWeights = KpiMetric::whereIn('id', collect($data['details'])->pluck('metric_id'))
        ->pluck('weight', 'id');

        $totalWeight = 0;
        $weightedScoreSum = 0;

        foreach ($data['details'] as $detail) {
        $weight = $matrixWeights[$detail['metric_id']] ?? 0;
        $totalWeight += $weight;
        $weightedScoreSum += $detail['score'] * $weight;
    }

         $finalScore = $totalWeight > 0 ? $weightedScoreSum / $totalWeight : 0;

    
        $assessment = KpiAssessment::create([
        'month' => $monthDate,
        'employee_id'   => $data['user_id'],
        'total_score' => $finalScore,
        ]);

        foreach ($data['details'] as $detail) {
        $assessment->details()->create([
            'matrix_id' => $detail['metric_id'],
            'score' => $detail['score'],
        ]);
    }

        return redirect()->route('assesments.index')->with('success', 'Penilaian berhasil disimpan.');
    }

    public function showByMonth($month)
    {
             $assessments = KpiAssessment::with(['employee.user', 'details.metric'])
                ->whereRaw("DATE_FORMAT(month, '%Y-%m') = ?", [$month])
                ->paginate(2) // Sesuaikan jumlah per halaman
                ->withQueryString();

            return Inertia::render('assesment/show-by-month', [
                'month' => $month,
                'assessments' => $assessments,
            ]);
    }
    public function destroy($id)
    {
            $assessment = KpiAssessment::findOrFail($id);
            $assessment->delete();

            return back()->with('success', 'Penilaian berhasil dihapus.');
    }
    
}
