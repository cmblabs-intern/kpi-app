<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
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
            'user_id' => $this->user_id,
            'division_id' => $this->division_id,
            'employee_code' => $this->employee_code,
            'position' => $this->position,
            'created_at' => $this->created_at 
            ? $this->created_at->locale('id')->translatedFormat('l, d F Y, H:i:s') . ' WIB'
            : null,
            'updated_at' => $this->updated_at 
            ? $this->updated_at->locale('id')->translatedFormat('l, d F Y, H:i:s') . ' WIB'
            : null,
            'user' => [
                'name' => optional($this->user)->name,
                'email' => optional($this->user)->email,
                'phone' => optional($this->user)->phone,
                'address' => optional($this->user)->address,
            ],
            'division' => [
                'name' => optional($this->division)->name,
            ]
        ];
    }
}
