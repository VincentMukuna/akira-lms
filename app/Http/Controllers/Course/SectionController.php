<?php

namespace App\Http\Controllers\Course;

use App\Domain\Course\Actions\Sections\CreateSectionAction;
use App\Domain\Course\Data\CreateSectionData;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    public function __construct(
        private CreateSectionAction $createSection
    ) {}

    public function store(Request $request)
    {
        $data = CreateSectionData::from($request->input());

        $section = $this->createSection->execute($data);

        return back()->with('section', $section);
    }
}
