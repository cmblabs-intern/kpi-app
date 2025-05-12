<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KpiAssessmentDetail extends Model
{
        protected $fillable = [
        'matrix_id',    
        'score',
    ];

    public function assessment()
    {
        return $this->belongsTo(KpiAssessment::class);
    }
    public function metric()
    {
        return $this->belongsTo(KpiMetric::class, 'matrix_id');
    }
}
