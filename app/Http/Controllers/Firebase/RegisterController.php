<?php

namespace App\Http\Controllers\Firebase;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Kreait\Firebase\Auth as FirebaseAuth;
use App\Models\User;
use App\Services\FirestoreService;

class RegisterController extends Controller
{
    public function register(Request $request, FirebaseAuth $auth, FirestoreService $firestore)
    {
        $idToken = $request->input('idToken');
        $name = $request->input('name');

        try {
            $verifiedIdToken = $auth->verifyIdToken($idToken);
            $uid = $verifiedIdToken->claims()->get('sub');
            $firebaseUser = $auth->getUser($uid);

            $user = User::firstOrCreate(
                ['firebase_uid' => $uid],
                [
                    'name' => $name,
                    'email' => $firebaseUser->email,
                    'password' => 'System'
                ]
            );

            $data = [
                'Id' => $user->firebase_uid,
                'Email' => $user->email,
                'Name' => $user->name,
            ];

            $firestore->updateDocument('users', $user->firebase_uid, $data);

            auth()->login($user);

            return redirect()->intended(route('dashboard', absolute: false));
        } catch (\Throwable $e) {
            return redirect()->back()->withErrors(['auth' => 'Invalid Firebase ID token']);
        }
    }
}
