<?php

namespace App\Domain\Course\Actions\Sections;

use App\Domain\Course\Data\UpdateSectionData;
use App\Domain\Course\Models\CourseSection;

class UpdateSectionAction
{
    public function execute(UpdateSectionData $data)
    {
        $section = CourseSection::find($data->id);
        $section->title = $data->title;
        $section->save();

        return $section;
    }
}
