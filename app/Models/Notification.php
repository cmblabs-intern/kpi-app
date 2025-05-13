<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $table = 'notifications'; // Tentukan nama tabel (jika berbeda dengan nama model)

    protected $fillable = [
        'title', 'message', 'employee_id', 'status', 'created_at', 'updated_at',
    ];
}
