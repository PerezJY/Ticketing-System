<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsHeaders
{
    public function handle(Request $request, Closure $next)
    {
        // If this is a preflight request, return early
        if ($request->getMethod() === 'OPTIONS') {
            return response('', 204)
                ->header('Access-Control-Allow-Origin', 'http://localhost:5173')
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-XSRF-TOKEN')
                ->header('Access-Control-Allow-Credentials', 'true');
        }

        $response = $next($request);

        // Add CORS headers to every response
        return $response
            ->header('Access-Control-Allow-Origin', 'http://localhost:5173')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-XSRF-TOKEN')
            ->header('Access-Control-Allow-Credentials', 'true');
    }
}
