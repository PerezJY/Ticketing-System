<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerNotification extends Model
{
    protected $fillable = [
        'ticket_id',
        'customer_id',
        'title',
        'message',
        'is_read',
    ];

       public function ticket()
    {
        return $this->belongsTo(Tickets::class,'ticket_id');
    }
        public function user()
    {
        return $this->belongsTo(User::class,'customer_id');
    }
}
