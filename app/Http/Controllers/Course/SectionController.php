<?php

namespace App\Http\Controllers\Course;

use App\Domain\Course\Actions\Sections\CreateSectionAction;
use App\Domain\Course\Data\CreateSectionData;
use App\Domain\Course\Data\UpdateSectionData;
use App\Domain\Course\Actions\Sections\UpdateSectionAction;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    public function __construct(
        private CreateSectionAction $createSection,
        private UpdateSectionAction $updateSection,
    ) {}

    public function store(Request $request)
    {
        $data = CreateSectionData::from($request->all());

        $section = $this->createSection->execute($data);

        return response()->json($section);
    }

    public function update(Request $request, string $id)
    {
        $data = UpdateSectionData::from($request->all());

        $section = $this->updateSection->execute($data);

        return response()->json($section);
    }
}
