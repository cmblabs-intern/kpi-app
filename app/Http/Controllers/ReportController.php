<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        $report = [
            // Januari 2025
            [
                'id' => 1,
                'employee_id' => 101,
                'month' => '2025-01-01',
                'total_score' => 87,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'employee_id' => 102,
                'month' => '2025-01-01',
                'total_score' => 92,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'employee_id' => 103,
                'month' => '2025-01-01',
                'total_score' => 75,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'employee_id' => 104,
                'month' => '2025-01-01',
                'total_score' => 88,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Februari 2025
            [
                'id' => 5,
                'employee_id' => 101,
                'month' => '2025-02-01',
                'total_score' => 78,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 6,
                'employee_id' => 102,
                'month' => '2025-02-01',
                'total_score' => 95,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 7,
                'employee_id' => 103,
                'month' => '2025-02-01',
                'total_score' => 82,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 8,
                'employee_id' => 104,
                'month' => '2025-02-01',
                'total_score' => 79,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Maret 2025
            [
                'id' => 9,
                'employee_id' => 101,
                'month' => '2025-03-01',
                'total_score' => 90,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 10,
                'employee_id' => 102,
                'month' => '2025-03-01',
                'total_score' => 88,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 11,
                'employee_id' => 103,
                'month' => '2025-03-01',
                'total_score' => 84,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 12,
                'employee_id' => 104,
                'month' => '2025-03-01',
                'total_score' => 91,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];


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
