<?php

namespace App\Http\Controllers;

use App\Mail\KPINotificationMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class KpiAssessmentDetailController extends Controller
{
    public function details(Request $request)
    {
        $month = $request->query('month');

        $employee = [
            [ 'id' => '1', 'name' => 'Andi', 'penilaian' => 85],
            [ 'id' => '2', 'name' => 'Budi', 'penilaian' => 90],
            [ 'id' => '3', 'name' => 'Joko', 'penilaian' => 80],
        ];

        return Inertia::render('kpi-assessments/details', [
            'month' => $month,
            'employee' => $employee,
        ]);
    }

    public function employeeDetail(Request $request)
    {
        $employeeId = $request->query('employee');

        $employees = [
            ['id' => '1', 'name' => 'Andi'],
            ['id' => '2', 'name' => 'Budi'],
            ['id' => '3', 'name' => 'Joko'],
        ];

        $employee = collect($employees)->firstWhere('id', $employeeId);

        if (!$employee) {
            abort(404, 'Karyawan tidak ditemukan');
        }
       
        // Data dummy untuk detail karyawan
        $data = [
            'employee' => $employee,
            'total_penilaian' => 88, // Total penilaian
            'penilaian_terakhir' => [
                'bulan' => 'Januari',
                'score' => 85,
            ],
            'riwayat_penilaian' => [
                ['bulan' => 'Desember', 'score' => 90],
                ['bulan' => 'November', 'score' => 85],
            ],
        ];

        return Inertia::render('kpi-assessments/employee-detail', [
            'data' => $data,
            'csrfToken' => csrf_token(),
        ]);
    }

    public function sendNotification(Request $request)
{
    // Log::info('Send Notification method called', ['data' => $request->all()]);

    $employee = [
        'name' => 'Yerikho William Tasilima',
        'email' => 'yerikhowilliamt@gmail.com',
    ];

    $total = 87;
    $latest = [
        'bulan' => 'April 2025',
        'score' => 90,
    ];
    $history = [
        ['bulan' => 'Maret 2025', 'score' => 85],
        ['bulan' => 'Februari 2025', 'score' => 80],
    ];

    // Validasi email (harusnya email karyawan ada di DB, disederhanakan di sini)
    if (!isset($employee['email'])) {
        return response()->json(['message' => 'Email tidak ditemukan.'], 422);
    }

    try {
        // Kirim email
        Mail::to($employee['email'])->send(
            new KPINotificationMail($employee, $total, $latest, $history)
        );
    } catch (\Exception $e) {
        Log::error('Mail sending failed', ['error' => $e->getMessage()]);
        return response()->json(['message' => 'Gagal mengirim email.'], 500);
    }

    return response()->json(['message' => 'Email berhasil dikirim.']);
}
}
