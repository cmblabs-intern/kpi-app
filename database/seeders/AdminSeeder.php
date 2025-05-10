<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        User::create([
            "name" => "Super Admin",
            "email" => "superadmin@gmail.com",
            "role" => UserRole::Admin,
            "password" => Hash::make('Admin123'),
            "phone" => "081234555666",
            'address' => "Jakarta, Indonesia"
        ]);
        DB::table('employees')->insert([
            [
                'user_id' => 1,
                'division_id' => 1,
                'employee_code' => 'E001',
                'position' => 'Manager'
            ]
        ]);

        DB::table('divisions')->insert([
            [
                'name' => 'Sales',
                'position' => 'Manager'
            ]
        ]);

        DB::table('kpi_assessments')->insert([
            [
                'employee_id' => 1,
                'month' => '2023-01-01',
                'total_score' => 2.5
            ]
        ]);

        DB::table('kpi_metrics')->insert([
            [
                'division_id' => 1,
                'name' => 'Productivity',
                'description' => 'Productivity',
                'weight' => 0.5
            ]
        ]);

        DB::table('kpi_assessment_details')->insert([
            [
                'score' => 1,
                'note' => 'Good',
                'assessment_id' => 1,
                'metric_id' => 1,
            ],
            [
                'score' => 2,
                'note' => 'Good',
                'assessment_id' => 1,
                'metric_id' => 2,
            ]
        ]);

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
