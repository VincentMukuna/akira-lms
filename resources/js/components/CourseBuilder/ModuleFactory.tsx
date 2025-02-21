import { Button } from '@/components/ui/button';
import moduleRegistry from '@/lib/moduleRegistry';
import { getModuleEditorState, setModuleEditorState, updateCurrentModule } from '@/lib/store/module-editor';
import { BaseModule } from '@/types/course';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';

interface ModuleFactoryProps {
    module: BaseModule;
    onChange: (module: BaseModule) => void;
}

export default function ModuleFactory({ module, onChange }: ModuleFactoryProps) {
    const [editorState] = useAtom(getModuleEditorState);
    const setEditorState = useSetAtom(setModuleEditorState);
    const updateModule = useSetAtom(updateCurrentModule);

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
        if (editorState.currentModule) {
            onChange(editorState.currentModule);
        }
    };

    const handleReset = () => {
        setEditorState(module);
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
                />
            )}
        </div>
    );
} 