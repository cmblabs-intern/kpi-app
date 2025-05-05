<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class KpiMetricRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'division_id' => 'required|exists:divisions,id',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'weight' => 'required|numeric|min:0|max:100',
        ];
    }
}
