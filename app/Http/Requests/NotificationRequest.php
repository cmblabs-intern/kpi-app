<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NotificationRequest extends FormRequest
{
    /**
     * Tentukan apakah pengguna diizinkan membuat request ini.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Aturan validasi untuk request pengiriman notifikasi email.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'message' => 'required|string',
        ];
    }

    /**
     * Pesan error kustom untuk validasi.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Judul notifikasi wajib diisi.',
            'title.string' => 'Judul notifikasi harus berupa teks.',
            'title.max' => 'Judul tidak boleh lebih dari 255 karakter.',
            'message.required' => 'Pesan notifikasi wajib diisi.',
            'message.string' => 'Pesan notifikasi harus berupa teks.',
        ];
    }

    /**
     * Nama atribut untuk pesan error yang lebih ramah.
     *
     * @return array
     */
    public function attributes(): array
    {
        return [
            'title' => 'Judul',
            'message' => 'Pesan',
        ];
    }
}
