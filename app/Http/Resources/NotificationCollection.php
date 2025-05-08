<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class NotificationCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return NotificationResource::collection($this->collection)->resolve();
    }

    /**
     * Customize the pagination response.
     */
    public function with(Request $request): array
    {
        $paginator = $this->resource;
        return [
            'paging' => [
                'size' => $paginator->perPage(),
                'total_page' => $paginator->lastPage(),
                'current_page' => $paginator->currentPage(),
            ],
        ];
    }

    public function paginationInformation($request)
    {
        return [];
    }
}
