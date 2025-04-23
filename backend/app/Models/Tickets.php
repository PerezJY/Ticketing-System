<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Tickets extends Model
{
    // Specify the table if it doesn't follow the pluralized convention
    // protected $table = 'tickets';

    // The attributes that are mass assignable
    protected $fillable = [
       'user_id',
        'email',
        'category',
        'ticket_body',
        'image_path',
    ];

    // The attributes that should be hidden for serialization (for example, for sensitive data)
    protected $hidden = [
    ];

    // The attributes that should be cast to native types (e.g., status to a boolean, date to datetime)
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Define the relationship: A ticket belongs to a user.
     */
    public function user()
    {
        return $this->belongsTo(User::class); // Defines that each ticket belongs to one user
    }
    public function customer()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function agent()
    {
        return $this->belongsTo(User::class, 'agent_id');
    }
    
    /**
     * A method to change the status of the ticket
     *
     * @param string $status
     * @return bool
     */
    public function changeStatus($status)
    {
        $this->status = $status;
        return $this->save();
    }
}
