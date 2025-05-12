<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable = [
        'user_id',
        'division_id',
        'employee_code',
        'position'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
    
    public function division() {
        return $this->belongsTo(Division::class);
    }
    public function assessments()
    {
        return $this->hasMany(KpiAssessment::class);
    }
}
