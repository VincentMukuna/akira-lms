import RichTextEditor from '@/components/RichTextEditor';
import { BaseModule, TextModule } from '@/types/course';
import { FileText } from 'lucide-react';
import BaseModuleEditor from '../../components/CourseBuilder/ModuleEditor/BaseModuleEditor';
import moduleRegistry from '../moduleRegistry';

interface TextModuleEditorProps {
    module: TextModule;
    onChange: (module: Partial<TextModule>) => void;
}

export function TextModuleEditor({ module, onChange }: TextModuleEditorProps) {
    const handleContentChange = (content: string) => {
        onChange({ content });
    };

    return (
        <BaseModuleEditor module={module} onChange={onChange}>
            <RichTextEditor
                key={module.id}
                content={module.content}
                onChange={handleContentChange}
                placeholder="Start writing your module content..."
            />
        </BaseModuleEditor>
    );
}

// Type guard to check if a module is a TextModule
function isTextModule(module: BaseModule): module is TextModule {
    return module.type === 'text' && 'content' in module;
}

// Register the text module type
moduleRegistry.register({
    type: 'text',
    name: 'Text Module',
    icon: FileText,
    editor: TextModuleEditor,
    defaultData: () => ({
        content: '',
    }),
    validate: (module: BaseModule) => {
        if (!isTextModule(module)) {
            return 'Invalid module type';
        }
        if (!module.content.trim()) {
            return 'Content cannot be empty';
        }
        return null;
    },
}); 