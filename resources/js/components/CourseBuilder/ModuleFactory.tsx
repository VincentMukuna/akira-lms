import { getModuleEditorState, setModuleEditorState, updateCurrentModule } from '@/components/CourseBuilder/store/module-editor';
import { BaseModule } from '@/components/CourseBuilder/types/course';
import { Button } from '@/components/ui/button';
import moduleRegistry from '@/lib/moduleRegistry';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';

interface ModuleFactoryProps {
    module: BaseModule;
    onChange: (module: BaseModule) => void;
}

interface ValidationErrors {
    [key: string]: string;
}

export default function ModuleFactory({ module, onChange }: ModuleFactoryProps) {
    const [editorState] = useAtom(getModuleEditorState);
    const setEditorState = useSetAtom(setModuleEditorState);
    const updateModule = useSetAtom(updateCurrentModule);
    const [errors, setErrors] = useState<ValidationErrors>({});

    useEffect(() => {
        setEditorState(module);
    }, [module.id]);

    const moduleType = moduleRegistry.get(module.type);

    if (!moduleType) {
        return (
            <div className="p-4 text-center text-red-500">
                Unknown module type: {module.type}
            </div>
        );
    }

    const ModuleEditor = moduleType.editor;

    const handleSave = () => {
        if (!editorState.currentModule) return;

        // Get the validation function for this module type
        const validateFn = moduleType.validate;

        if (!validateFn) {
            onChange(editorState.currentModule);
            return;
        }

        // Run validation
        const validationResult = validateFn(editorState.currentModule);
        console.log('validationResult', validationResult);
        if (validationResult) {
            // If there are validation errors, show them and don't save
            setErrors(validationResult);
            return;
        }

        // Clear errors and save if validation passes
        setErrors({});
        onChange(editorState.currentModule);
    };

    const handleReset = () => {
        setEditorState(module);
        setErrors({});
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Edit Module</h2>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={handleReset}
                        disabled={!editorState.isDirty}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={!editorState.isDirty}
                    >
                        Save Changes
                    </Button>
                </div>
            </div>
            {editorState.currentModule && (
                <ModuleEditor
                    module={editorState.currentModule}
                    onChange={(updates) => updateModule(updates)}
                    errors={errors}
                />
            )}
        </div>
    );
} 