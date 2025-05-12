<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class KpiAssessmentRequest extends FormRequest
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
            'employee_id' => 'required|exists:employees,id',
            'month' => 'required|date',
            'details' => 'required|array|min:1',
            'details.*.metric_id' => 'required|exists:kpi_metrics,id',
            'details.*.score' => 'required|numeric|min:0|max:100',
            'details.*.note' => 'nullable|string'
        ];
    }

    public function validatedDetails()
    {
        return $this->validated()['details'];
    }
}
