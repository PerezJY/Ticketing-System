<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdminNotification extends Model
{
    protected $fillable = [
        'ticket_id',
        'title',
        'name',
        'message',
        'is_read',
    ];

       public function ticket()
    {
        return $this->belongsTo(Tickets::class,'ticket_id');
    }
}
