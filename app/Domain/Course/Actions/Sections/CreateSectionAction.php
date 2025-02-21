<?php

namespace App\Domain\Course\Actions\Sections;

use App\Domain\Course\Data\CreateSectionData;
use App\Domain\Course\Models\CourseSection;
use Illuminate\Support\Facades\DB;

class CreateSectionAction
{
    public function execute(CreateSectionData $data): CourseSection
    {
        return DB::transaction(function () use ($data) {
            return CourseSection::create([
                'title' => $data->title,
                'course_id' => $data->course_id,
                'order' => $data->order,
            ]);
        });
    }
}
