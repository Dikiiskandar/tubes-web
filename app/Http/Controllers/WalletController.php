<?php

namespace App\Http\Controllers;

use App\Services\FirestoreService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WalletController extends Controller
{
    public function index(Request $request, FirestoreService $firestore)
    {
        $user = $firestore->getDocument('users', auth()->user()->firebase_uid);

        return Inertia::render('wallet', [
            'user' => $user
        ]);
    }

    public function add(Request $request, FirestoreService $firestore)
    {
        $validated = $request->validate([
            'amount' => 'required|integer|min:1000',
        ]);

        $user = $firestore->getDocument('users', auth()->user()->firebase_uid);

        $data = [
            'Wallet' => $request->amount + ($user['Wallet'] ?? 0)
        ];

        $firestore->updateDocument('users', auth()->user()->firebase_uid, $data);


        return redirect()->back()->with('success', 'Money added successfully.');
    }
}
