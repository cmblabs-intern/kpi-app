<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class KpiMetricCollection extends ResourceCollection
{
    public static $wrap = null;
    public function toArray(Request $request)
    {
        return KpiMetricResource::collection($this->collection)->resolve();
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