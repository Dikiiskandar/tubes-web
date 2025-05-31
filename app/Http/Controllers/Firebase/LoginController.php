<?php

namespace App\Http\Controllers\Firebase;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Kreait\Firebase\Auth as FirebaseAuth;
use Kreait\Firebase\Exception\Auth\FailedToVerifyToken;

class LoginController extends Controller
{
    protected FirebaseAuth $firebaseAuth;

    public function __construct(FirebaseAuth $firebaseAuth)
    {
        $this->firebaseAuth = $firebaseAuth;
    }

    public function login(Request $request)
    {
        $request->validate([
            'idToken' => 'required|string',
        ]);

        try {
            $verifiedIdToken = $this->firebaseAuth->verifyIdToken($request->idToken);

            $firebaseUid = $verifiedIdToken->claims()->get('sub');

            $user = \App\Models\User::firstOrCreate(
                ['firebase_uid' => $firebaseUid],
                [
                    'name' => $verifiedIdToken->claims()->get('name') ?? 'Unknown',
                    'email' => $verifiedIdToken->claims()->get('email'),
                ]
            );

            // Log in user to Laravel session
            Auth::login($user);

            return redirect()->intended(route('dashboard', absolute: false));
        } catch (FailedToVerifyToken $e) {
            return redirect()->back()->withErrors(['auth' => 'Invalid Firebase ID token']);
        }
    }
}
