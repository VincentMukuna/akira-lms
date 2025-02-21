<?php

namespace App\Http\Controllers\Course;

use App\Domain\Course\Actions\Modules\ReorderModulesAction;
use App\Domain\Course\Data\ModuleReorderData;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ModuleReorderController extends Controller
{
    public function __construct(
        private ReorderModulesAction $reorderModules
    ) {}

    public function __invoke(Request $request)
    {
        $data = ModuleReorderData::from($request->input());

        $this->reorderModules->execute($data);

        return back();
    }
}
