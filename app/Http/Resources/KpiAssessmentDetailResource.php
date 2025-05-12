<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class KpiAssessmentDetailResource extends JsonResource
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
            'assessment_id' => $this->assessment_id,
            'metric_id' => $this->metric_id,
            'metric' => [
                'id' => optional($this->metric)->id,
                'division_id' => optional($this->metric)->division_id,
                'name' => optional($this->metric)->name,
                'description' => optional($this->metric)->description,
                'weight' => optional($this->metric)->weight,
                'created_at' => optional($this->metric)->created_at,
                'updated_at' => optional($this->metric)->updated_at,
                'division' => optional($this->metric)->division,
            ],
            'assessment' => [
                'id' => optional($this->assessment)->id,
                'employee_id' => optional($this->assessment)->employee_id,
                'month' => optional($this->assessment)->month,
                'total_score' => optional($this->assessment)->total_score,
                'employee' => [
                    'id' => optional(optional($this->assessment)->employee)->id,
                    'position' => optional(optional($this->assessment)->employee)->position,
                    'user' => optional(optional($this->assessment)->employee)->user,
                    'division' => optional(optional($this->assessment)->employee)->division,
                ]
            ],
            'kpi_name' => $this->metric->name,
            'weight' => $this->metric->weight,
            'score' => $this->score,
            'note' => $this->note,
            'created_at' => $this->created_at 
            ? $this->created_at->locale('id')->translatedFormat('l, d F Y, H:i:s') . ' WIB'
            : null,
            'updated_at' => $this->updated_at 
            ? $this->updated_at->locale('id')->translatedFormat('l, d F Y, H:i:s') . ' WIB'
            : null,
        ];
    }
}
