<?php

namespace Database\Seeders;

use App\Models\User;
use App\Enums\UserRole;
use App\Models\Division;
use App\Models\Employee;
use App\Models\KpiMetric;
use App\Models\KpiAssessment;
use Illuminate\Support\Carbon;
use Illuminate\Database\Seeder;
use App\Models\KpiAssessmentDetail;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $now = Carbon::now();

        User::create([
            "name" => "Super Admin",
            "email" => "superadmin@gmail.com",
            "role" => UserRole::Admin,
            "password" => Hash::make('Admin123'),
            "phone" => "081234555666",
            'address' => "Jakarta, Indonesia"
        ]);


        // Beberapa user biasa
        User::insert([
            [
                "name" => "Rido Septiawan",
                "email" => "ridoseptiawan@gmail.com",
                "role" => UserRole::User,
                "password" => Hash::make('password'),
                "phone" => "0811111111",
                "address" => "Jambi, Indonesia",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                "name" => "Puji Astuti",
                "email" => "pujiastuti@gmail.com",
                "role" => UserRole::User,
                "password" => Hash::make('password'),
                "phone" => "0822222222",
                "address" => "Surabaya, Indonesia",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                "name" => "Mochamad Faathir Azukhruf Siswandi",
                "email" => "faathir@gmail.com",
                "role" => UserRole::User,
                "password" => Hash::make('password'),
                "phone" => "0833333333",
                "address" => "Yogyakarta, Indonesia",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                "name" => "Yerikho William Tasilima",
                "email" => "yerikho@gmail.com",
                "role" => UserRole::User,
                "password" => Hash::make('password'),
                "phone" => "0844444444",
                "address" => "Yogyakarta, Indonesia",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                "name" => "Marhadi Akbar",
                "email" => "marhadi@gmail.com",
                "role" => UserRole::User,
                "password" => Hash::make('password'),
                "phone" => "0855555555",
                "address" => "Yogyakarta, Indonesia",
                'created_at' => now(),
                'updated_at' => now(),
            ],

        ]);




        Division::insert([
            ['name' => 'Information Technology', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Human Resources', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Finance & Accounting', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Marketing & Communication', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Sales & Business Development', 'created_at' => $now, 'updated_at' => $now],
        ]);


        Employee::insert([
            [
                'user_id' => 2,
                'division_id' => 4,
                'employee_code' => 'MC-191011001',
                'position' => 'Marketing Consultant',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'user_id' => 3,
                'division_id' => 2,
                'employee_code' => 'HR-191012001',
                'position' => 'HR Specialist',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'user_id' => 4,
                'division_id' => 3,
                'employee_code' => 'FA-19101113001',
                'position' => 'Marketing Manager',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'user_id' => 5,
                'division_id' => 1,
                'employee_code' => 'IT-191011002',
                'position' => 'Software Engineer',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'user_id' => 6,
                'division_id' => 5,
                'employee_code' => 'SMB-19101114001',
                'position' => 'Sales Manager',
                'created_at' => $now,
                'updated_at' => $now
            ],
        ]);


        // Insert KPI metrics per division
        KpiMetric::insert([
            // IT Division
            [
                'division_id' => 1,
                'name' => 'SLA Ticket Resolution',
                'description' => 'Persentase penyelesaian tiket sesuai SLA.',
                'weight' => 35,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'division_id' => 1,
                'name' => 'System Uptime',
                'description' => 'Waktu sistem aktif tanpa downtime.',
                'weight' => 40,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'division_id' => 1,
                'name' => 'Project Delivery',
                'description' => 'Proyek selesai tepat waktu dan sesuai scope.',
                'weight' => 25,
                'created_at' => $now,
                'updated_at' => $now,
            ],

            // HR Division
            [
                'division_id' => 2,
                'name' => 'Employee Turnover Rate',
                'description' => 'Rasio keluar masuk karyawan.',
                'weight' => 30,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'division_id' => 2,
                'name' => 'Training Effectiveness',
                'description' => 'Efektivitas pelatihan karyawan.',
                'weight' => 35,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'division_id' => 2,
                'name' => 'Absenteeism Rate',
                'description' => 'Tingkat absensi tidak wajar.',
                'weight' => 35,
                'created_at' => $now,
                'updated_at' => $now,
            ],

            // Finance Division
            [
                'division_id' => 3,
                'name' => 'Budget Accuracy',
                'description' => 'Akurasi realisasi anggaran dibandingkan rencana.',
                'weight' => 40,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'division_id' => 3,
                'name' => 'Report Timeliness',
                'description' => 'Ketepatan waktu pelaporan keuangan.',
                'weight' => 30,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'division_id' => 3,
                'name' => 'Cash Flow Monitoring',
                'description' => 'Pemantauan arus kas secara rutin.',
                'weight' => 30,
                'created_at' => $now,
                'updated_at' => $now,
            ],

            // Marketing Division
            [
                'division_id' => 4,
                'name' => 'Leads Generated',
                'description' => 'Jumlah leads dari campaign marketing.',
                'weight' => 40,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'division_id' => 4,
                'name' => 'Engagement Rate',
                'description' => 'Tingkat interaksi di media sosial atau email.',
                'weight' => 35,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'division_id' => 4,
                'name' => 'Campaign ROI',
                'description' => 'Return of investment dari kampanye.',
                'weight' => 25,
                'created_at' => $now,
                'updated_at' => $now,
            ],

            // Sales Division
            [
                'division_id' => 5,
                'name' => 'Sales Target Achievement',
                'description' => 'Persentase pencapaian target penjualan.',
                'weight' => 50,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'division_id' => 5,
                'name' => 'New Clients Acquired',
                'description' => 'Jumlah klien baru yang didapatkan.',
                'weight' => 30,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'division_id' => 5,
                'name' => 'Client Retention Rate',
                'description' => 'Tingkat retensi klien lama.',
                'weight' => 20,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);

        // Employee ID 1 (Marketing Consultant, division 4)
        $assessment1 = KpiAssessment::create([
            'employee_id' => 1,
            'month' => '2025-04-01',
            'total_score' => 85,
        ]);

        KpiAssessmentDetail::insert([
            ['assessment_id' => $assessment1->id, 'metric_id' => 10, 'score' => 90, 'note' => 'Great performance', 'created_at' => $now, 'updated_at' => $now],
            ['assessment_id' => $assessment1->id, 'metric_id' => 11, 'score' => 80, 'note' => 'Solid engagement', 'created_at' => $now, 'updated_at' => $now],
            ['assessment_id' => $assessment1->id, 'metric_id' => 12, 'score' => 85, 'note' => 'ROI OK', 'created_at' => $now, 'updated_at' => $now],
        ]);

        // Employee ID 2 (HR Specialist, division 2)
        $assessment2 = KpiAssessment::create([
            'employee_id' => 2,
            'month' => '2025-04-01',
            'total_score' => 82,
        ]);

        KpiAssessmentDetail::insert([
            ['assessment_id' => $assessment2->id, 'metric_id' => 4, 'score' => 75, 'note' => 'Turnover slightly high', 'created_at' => $now, 'updated_at' => $now],
            ['assessment_id' => $assessment2->id, 'metric_id' => 5, 'score' => 85, 'note' => 'Training improved', 'created_at' => $now, 'updated_at' => $now],
            ['assessment_id' => $assessment2->id, 'metric_id' => 6, 'score' => 85, 'note' => 'Absenteeism under control', 'created_at' => $now, 'updated_at' => $now],
        ]);

        // Employee ID 3 (Marketing Manager, division 3)
        $assessment3 = KpiAssessment::create([
            'employee_id' => 3,
            'month' => '2025-04-01',
            'total_score' => 80,
        ]);

        KpiAssessmentDetail::insert([
            ['assessment_id' => $assessment3->id, 'metric_id' => 7, 'score' => 85, 'note' => 'Budget matched', 'created_at' => $now, 'updated_at' => $now],
            ['assessment_id' => $assessment3->id, 'metric_id' => 8, 'score' => 75, 'note' => 'Report late', 'created_at' => $now, 'updated_at' => $now],
            ['assessment_id' => $assessment3->id, 'metric_id' => 9, 'score' => 80, 'note' => 'Cash flow OK', 'created_at' => $now, 'updated_at' => $now],
        ]);

        // Employee ID 4 (Software Engineer, division 1)
        $assessment4 = KpiAssessment::create([
            'employee_id' => 4,
            'month' => '2025-04-01',
            'total_score' => 88,
        ]);

        KpiAssessmentDetail::insert([
            ['assessment_id' => $assessment4->id, 'metric_id' => 1, 'score' => 90, 'note' => 'Fast resolution', 'created_at' => $now, 'updated_at' => $now],
            ['assessment_id' => $assessment4->id, 'metric_id' => 2, 'score' => 95, 'note' => 'Stable uptime', 'created_at' => $now, 'updated_at' => $now],
            ['assessment_id' => $assessment4->id, 'metric_id' => 3, 'score' => 80, 'note' => 'Project delivered', 'created_at' => $now, 'updated_at' => $now],
        ]);

        // Employee ID 5 (Sales Manager, division 5)
        $assessment5 = KpiAssessment::create([
            'employee_id' => 5,
            'month' => '2025-04-01',
            'total_score' => 90,
        ]);

        KpiAssessmentDetail::insert([
            ['assessment_id' => $assessment5->id, 'metric_id' => 13, 'score' => 95, 'note' => 'Exceeded target', 'created_at' => $now, 'updated_at' => $now],
            ['assessment_id' => $assessment5->id, 'metric_id' => 14, 'score' => 85, 'note' => 'New clients added', 'created_at' => $now, 'updated_at' => $now],
            ['assessment_id' => $assessment5->id, 'metric_id' => 15, 'score' => 90, 'note' => 'Client retention up', 'created_at' => $now, 'updated_at' => $now],
        ]);
    }
}
