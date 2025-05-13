<?php 
namespace Illuminate\Foundation\Auth;

use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class EmailVerificationRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function fulfill()
    {
        if (! $this->user()->hasVerifiedEmail()) {
            $this->user()->markEmailAsVerified();

            event(new Verified($this->user()));
        }

        return $this->user();
    }

    public function user($guard = null)
    {
        return Auth::guard($guard)->user();
    }
}
