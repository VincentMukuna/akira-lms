<?php

namespace App\Http\Controllers\Course;

use App\Domain\Course\Actions\Modules\UpdateModuleOrderAction;
use App\Domain\Course\Data\UpdateModuleOrderData;
use App\Domain\Course\Models\Course;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ModuleOrderController extends Controller
{
    public function __construct(
        private UpdateModuleOrderAction $updateModuleOrderAction,
    ) {}

    public function update(Request $request)
    {
        $data = UpdateModuleOrderData::from($request->all());
        $this->updateModuleOrderAction->execute($data);

        $course = Course::find($data->course_id);
        $modules = $course->modules()->get();

        return response()->json($modules);
    }
}
