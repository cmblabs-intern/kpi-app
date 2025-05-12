<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KpiAssessment extends Model
{
    protected $table = 'Kpi_assessments';
    protected $fillable = ['employee_id', 'month', 'total_score'];
    public $timestamps = true;

    public function employee()
{
    return $this->belongsTo(Employee::class);
}

    public function details()
    {
    return $this->hasMany(KpiAssessmentDetail::class, 'assessment_id');
    }
}
