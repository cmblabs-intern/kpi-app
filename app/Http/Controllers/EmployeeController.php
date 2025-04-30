<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmployeeRequest;
use App\Http\Resources\DivisionResource;
use App\Http\Resources\EmployeeCollection;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\UserResource;
use App\Models\Division;
use App\Models\User;
use App\Services\EmployeeService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Inertia\Inertia;

class EmployeeController extends Controller 
{
    private $employeeService;

    public function __construct(EmployeeService $employeeService) 
    {
        $this->employeeService = $employeeService;
    }

    // Method untuk menampilkan daftar karyawan
    public function index()
    {
        $divisions = Division::all();
        $users = User::all();
        $fields = ['*'];
        
        // Ambil daftar karyawan menggunakan service
        $employees = $this->employeeService->list($fields);

        // Kirim data karyawan sebagai props ke komponen React
        return Inertia::render('employees/dashboard', [
            'divisions' => DivisionResource::collection($divisions),
            'users' => UserResource::collection($users),
            'employees' => new EmployeeCollection($employees),
        ]);
    }

    // Method untuk menampilkan detail karyawan
    public function show(int $id)
    {
        try {
            $fields = ['id', 'division_id', 'user_id', 'employee_code', 'position', 'phone'];
            $employee = $this->employeeService->getById($id, $fields);

            // Kirim data karyawan sebagai props ke komponen React
            return Inertia::render('employees/dashboard', [
                'employee' => new EmployeeResource($employee),
            ]);
        } catch (ModelNotFoundException $error) {
            // Jika data tidak ditemukan, kirimkan halaman error
            return Inertia::render('Error', [
                'message' => 'Data karyawan tidak ditemukan',
            ]);
        }
    }

    // Method untuk menyimpan/membuat data karyawan baru
    public function store(EmployeeRequest $request)
    {
        $employee = $this->employeeService->create($request->validated());

        // Kirim data karyawan baru sebagai props ke komponen React
        return Inertia::render('employees/dashboard', [
            'employee' => new EmployeeResource($employee),
            'employees' => EmployeeResource::collection($this->employeeService->list(['*'])),
        ], 201);
    }
    
    // Method untuk memperbarui data karyawan
    public function update(EmployeeRequest $request, int $id)
    {
        try {
            $this->employeeService->update($id, $request->validated());

            // Redirect ke route yang sudah dinamai 'employees.index' (/employees/dashboard)
            return redirect()->route('employees.index');
        } catch (ModelNotFoundException $error) {
            // Jika data tidak ditemukan, kirimkan halaman error
            return Inertia::render('Error', [
                'message' => 'Data karyawan tidak ditemukan',
            ], 404);
        }
    }

    // Method untuk menghapus data karyawan
    public function destroy(int $id)
    {
        try {
            $this->employeeService->delete($id);

            // Redirect ke route yang sudah dinamai 'employees.index' (/employees/dashboard)
            return redirect()->route('employees.index');
        } catch (ModelNotFoundException $error) {
            // Jika data tidak ditemukan, kirimkan halaman error
            return Inertia::render('Error', [
                'message' => 'Data karyawan tidak ditemukan',
            ]);
        }
    }
}
