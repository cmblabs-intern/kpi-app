<?php

namespace App\Http\Controllers;

use App\Models\KpiAssessment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        $report = KpiAssessment::all();


        return Inertia::render('report/dashboard', [

            'report' => [
                'data' => $report,
                'status' => 'success',
                'meta' => [
                    'total' => count($report),
                    'perPage' => count($report),
                    'currentPage' => 1,
                    'totalPages' => 1
                ]
            ]
        ]);
    }
}
