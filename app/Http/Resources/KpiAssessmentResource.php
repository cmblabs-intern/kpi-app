<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class KpiAssessmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'employee_id' => $this->employee_id,
            'month' => $this->month,
            'total_score' => $this->total_score,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'employee' => $this->whenLoaded('employee', function () {
                return [
                    'id' => $this->employee->id,
                    'position' => $this->employee->position,
                    'user' => $this->employee->user,
                    'division' => $this->employee->division,
                ];
            }),
            'details' => $this->whenLoaded('details', function () {
                return KpiAssessmentDetailResource::collection($this->details);
            }),
        ];
    }
}
