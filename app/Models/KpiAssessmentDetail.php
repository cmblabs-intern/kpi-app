<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KpiAssessmentDetail extends Model
{
    protected $fillable = ['assessment_id', 'metric_id', 'score', 'note'];

    public function assessment()
    {
        return $this->belongsTo(KpiAssessment::class, 'assessment_id');
    }

    public function metric()
    {
        return $this->belongsTo(KpiMetric::class, 'metric_id');
    }
}
