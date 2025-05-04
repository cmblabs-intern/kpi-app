<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DivisionResource extends JsonResource
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
            'name' => $this->name,
            'created_at' => $this->created_at 
            ? $this->created_at->locale('id')->translatedFormat('l, d F Y, H:i:s') . ' WIB'
            : null,
            'updated_at' => $this->updated_at 
            ? $this->updated_at->locale('id')->translatedFormat('l, d F Y, H:i:s') . ' WIB'
            : null,
        ];
    }
}
