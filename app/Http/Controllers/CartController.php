<?php

namespace App\Http\Controllers;

use App\Services\FirestoreService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index(Request $request, FirestoreService $firestore)
    {
        $cart = $firestore->getSubcollection('users', auth()->user()->firebase_uid, 'Cart');

        return Inertia::render('cart', [
            'cart' => $cart
        ]);
    }

    public function add(Request $request, FirestoreService $firestore)
    {
        $request->validate([
            'category' => 'required',
            'food_id' => 'required',
        ]);

        $food = $firestore->getDocument($request->category, $request->food_id);

        $foodCart = $firestore->getSubcollectionDocument('users', auth()->user()->firebase_uid, 'Cart', $food['id']);

        $quantity = 1;
        if($foodCart) {
            $quantity += $foodCart['Quantity'];
        }

        $data = [
            'ID' => $food['id'],
            'Name' => $food['Name'],
            'Image' => $food['Image'],
            'Quantity' => $quantity,
            'Total' => $food['Price'] * $quantity,
            'Price' => $food['Price'],
        ];

        $firestore->setSubcollectionDocument('users', auth()->user()->firebase_uid, 'Cart', $request->food_id, $data);

        return back()->with('success', 'Item added to cart.');
    }

    public function checkout(Request $request, FirestoreService $firestore)
    {
        $cart = $firestore->getSubcollection('users', auth()->user()->firebase_uid, 'Cart');

        $total = array_sum(array_map(fn($item) => $item['data']['Total'], $cart));


        $user = $firestore->getDocument('users', auth()->user()->firebase_uid);

        if($user['Wallet'] > $total) {
            $data = [
                'Wallet' => $user['Wallet'] - $total
            ];

            $firestore->updateDocument('users', auth()->user()->firebase_uid, $data);

            $firestore->deleteAllSubcollectionDocuments('users', auth()->user()->firebase_uid, 'Cart');

            return back()->with('success', 'Checkout success.');
        }else {
            return back()->with('error', 'Insufficient balance.');
        }
    }
}
