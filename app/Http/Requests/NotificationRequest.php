<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NotificationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',      // Validasi untuk judul notifikasi, wajib diisi, berupa string, max 255 karakter
            'message' => 'required|string',            // Validasi untuk pesan notifikasi, wajib diisi, berupa string
            'type' => 'required|in:in-app,email',      // Validasi untuk tipe notifikasi, harusnya 'in-app' atau 'email'
            'is_read' => 'required|boolean',           
        ];
    }

     /**
     * Pesan kustom untuk setiap aturan validasi.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'title.required' => 'Judul notifikasi wajib diisi.',
            'title.string' => 'Judul notifikasi harus berupa teks.',
            'title.max' => 'Judul notifikasi tidak boleh lebih dari 255 karakter.',
            'message.required' => 'Pesan notifikasi wajib diisi.',
            'message.string' => 'Pesan notifikasi harus berupa teks.',
            'type.required' => 'Tipe notifikasi wajib dipilih.',
            'type.in' => 'Tipe notifikasi harus berupa "in-app" atau "email".',
            'is_read.boolean' => 'Status baca harus berupa nilai boolean.',
        ];
    }

    /**
     * Tentukan atribut yang akan digunakan dalam error bag.
     *
     * @return array<string, string>
     */
    public function attributes()
    {
        return [
            'title' => 'Judul',
            'message' => 'Pesan',
            'type' => 'Tipe Notifikasi',
            'is_read' => 'Status Baca',
        ];
    }
}
