<?php

namespace App\Http\Controllers\Course;

use App\Domain\Course\Actions\Modules\CreateModuleAction;
use App\Domain\Course\Actions\Modules\UpdateModuleAction;
use App\Domain\Course\Data\CreateModuleData;
use App\Domain\Course\Models\CourseModule;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ModuleController extends Controller
{
    public function __construct(
        private CreateModuleAction $createModule,
        private UpdateModuleAction $updateModule
    ) {}

    public function store(Request $request)
    {
        $data = CreateModuleData::from($request->input());

        $module = $this->createModule->execute($data);

        return back()->with('module', $module);
    }

    public function update(Request $request, CourseModule $module)
    {
        $module = $this->updateModule->execute($module, $request->input('content'));

        return back()->with('module', $module);
    }
}
