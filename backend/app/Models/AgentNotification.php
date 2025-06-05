<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AgentNotification extends Model
{
    protected $fillable = [
        'ticket_id',
        'title',
        'user_ID',
        'name',
        'message',
        'is_read',
    ];

       public function ticket()
    {
        return $this->belongsTo(Tickets::class,'ticket_id');
    }
        public function user()
    {
        return $this->belongsTo(User::class,'user_ID');
    }
}
