<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class KpiMetricResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'division_id' => $this->division_id,
            'name' => $this->name,
            'description' => $this->description,
            'weight' => $this->weight,
            'created_at' => $this->created_at 
            ? $this->created_at->locale('id')->translatedFormat('l, d F Y, H:i:s') . ' WIB'
            : null,
            'updated_at' => $this->updated_at 
            ? $this->updated_at->locale('id')->translatedFormat('l, d F Y, H:i:s') . ' WIB'
            : null,
            'division' => $this->division,
        ];
    }
}