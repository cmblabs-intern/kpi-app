<?php

namespace App\Http\Controllers;

use App\Http\Requests\DivisionRequest;
use App\Http\Resources\DivisionCollection;
use App\Http\Resources\DivisionResource;
use App\Models\Division;
use App\Services\DivisionService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Inertia\Inertia;

class DivisionController extends Controller
{
    private $divisionService;

    public function __construct(DivisionService $divisionService) {
        $this->divisionService = $divisionService;
    }

    // Method untuk menampilkan daftar divisi
    public function index()
    {
        $fields = ['*'];
        $divisions = $this->divisionService->list($fields, 10);

        // Kirim data karyawan sebagai props ke komponen React
        return Inertia::render('divisions/dashboard', [
            'divisions' => new DivisionCollection($divisions),
        ]);
    }

    // Method untuk menampilkan detail divisi
    public function show(int $id)
    {
        try {
            $fields = ['*'];
            $division = $this->divisionService->getById($id, $fields);

            // Kirim data divisi sebagai props ke komponen React
            return Inertia::render('divisions/dashboard', [
                'division' => new DivisionResource($division),
            ]);
        } catch (ModelNotFoundException $error) {
            // Jika data tidak ditemukan, kirimkan halaman error
            return response()->json([
                'message' => 'Data divisi tidak ditemukan'
            ], 404);
        }
    }

    // Method untuk menyimpan/membuat data karyawan
    public function store(DivisionRequest $request)
    {
        $division = $this->divisionService->create($request->validated());
        
        // Kirim data division baru sebagai props ke komponen React
        return Inertia::render('divisions/dashboard', [
            'division' => new DivisionResource($division),
            'divisions' => DivisionResource::collection($this->divisionService->list(['*'])),
        ], 201);
    }
    
    // Method untuk memperbarui data divisi
    public function update(DivisionRequest $request, int $id)
    {
        try {
            $division = $this->divisionService->update($id, $request->validated());
            
            // Redirect ke route yang sudah dinamai 'divisions.index' (/divisions/dashboard)
            return Inertia::render('divisions/dashboard', [
                'division' => new DivisionResource($division),
                'divisions' => DivisionResource::collection($this->divisionService->list(['*'])),
            ], 201);
        } catch (ModelNotFoundException $error) {
            // Jika data tidak ditemukan, kirimkan halaman error
            return response()->json([
                'message' => 'Data divisi tidak ditemukan'
            ], 404);
        }
    }

    // Method untuk menghapus data divisi
    public function destroy(int $id)
    {
        try {
            $this->divisionService->delete($id);

        // Redirect ke route yang sudah dinamai 'divisions.index' (/divisions/dashboard)
        return redirect()->route('divisions.index');
        } catch (ModelNotFoundException $error) {
            // Jika data tidak ditemukan, kirimkan halaman error
            return response()->json([
                'message' => 'Data divisi tidak ditemukan'
            ], 404);
        }
    }
}
