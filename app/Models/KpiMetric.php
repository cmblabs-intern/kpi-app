<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KpiMetric extends Model
{
    protected $fillable = ['division_id', 'name', 'description', 'weight'];

    public function division()
    {
        return $this->belongsTo(Division::class);
    }

    public function kpiAssessmentDetails()
    {
        return $this->hasMany(KpiAssessmentDetail::class);
    }
}
