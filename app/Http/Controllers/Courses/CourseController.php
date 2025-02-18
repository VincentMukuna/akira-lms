<?php

namespace App\Http\Controllers\Courses;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index()
    {
        return Inertia::render('Courses/Index');
    }

    public function create()
    {
        return Inertia::render('Courses/Create');
    }

    public function edit(string $id)
    {
        return Inertia::render('Courses/Edit', [
            'courseId' => $id
        ]);
    }

    public function builder(string $id)
    {
        return Inertia::render('Courses/Builder', [
            'courseId' => $id
        ]);
    }
}
