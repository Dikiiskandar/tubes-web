<?php

namespace App\Http\Controllers;

use App\Services\FirestoreService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request, FirestoreService $firestore)
    {
        $category = 'Burger';

        if ($request->filled('category')) {
            $category = $request->category;
        }

        $foods = $firestore->getCollection($category);

        return Inertia::render('dashboard', [
            'foods' => $foods,
            'filters' => $request->only(['category']),
        ]);
    }
}
