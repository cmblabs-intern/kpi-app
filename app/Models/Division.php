<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Division extends Model
{
    protected $fillable = ['name'];

    public function division()
    {
        return $this->hasOne(Division::class);
    }
}
