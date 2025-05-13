<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Employee;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $employees = [
            [
                'name' => 'Budi Hartono',
                'email' => 'budi@gmail.com',
                'phone' => '081234567880',
                'division_id' => 1,
                'address' => 'Bandung',
                'employee_code' => 'EMP001',
                'position' => 'Manager',
            ],
            [
                'name' => 'Siti Aminah',
                'email' => 'siti@gmail.com',
                'phone' => '082345678901',
                 'address' => 'Bandung',
                'division_id' => 2,
                'employee_code' => 'EMP002',
                'position' => 'Supervisor',
            ],
            [
                'name' => 'Rudi Santoso',
                'email' => 'rudi@gmail.com',
                'phone' => '083456789012',
                 'address' => 'Bandung',
                'division_id' => 1,
                'employee_code' => 'EMP003',
                'position' => 'Staff',
            ],
        ];

       foreach ($employees as $data) {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'phone' => $data['phone'],
                'address' => $data['address'],
                'password' => Hash::make('password'),
            ]);

         Employee::create([
                'user_id' => $user->id,
                'division_id' => $data['division_id'],
                'employee_code' => $data['employee_code'],
                'position' => $data['position'],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
