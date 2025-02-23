<?php

declare(strict_types=1);

namespace App\Domain\Course\Actions;

use App\Domain\Course\Models\Course;
use Illuminate\Support\Facades\DB;

class DeleteCourseAction
{
    public function execute(Course $course): void
    {
        DB::transaction(function () use ($course) {
            // Delete all media associated with the course
            $course->clearMediaCollection('cover');
            
            // Delete the course and its related data (sections and modules will be deleted via cascade)
            $course->delete();
        });
    }
} 