import { BaseModule, TextModule } from '@/components/CourseBuilder/types/course';
import RichTextEditor from '@/components/RichTextEditor';
import { Label } from '@/components/ui/label';
import { FileText } from 'lucide-react';
import { nanoid } from 'nanoid';
import moduleRegistry from '../../../lib/moduleRegistry';
import BaseModuleEditor from '../ModuleEditor/BaseModuleEditor';
import { validateTextModule } from '../schemas/text-module';
interface TextModuleEditorProps {
    module: TextModule;
    onChange: (module: Partial<TextModule>) => void;
    errors?: Record<string, string>;
}

export function TextModuleEditor({ module, onChange, errors = {} }: TextModuleEditorProps) {
    const handleContentChange = (content: string) => {
        onChange({ data: { content } });
    };
    return (
        <BaseModuleEditor module={module} onChange={onChange}>
            <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <div className={errors.content ? "ring-2 ring-destructive rounded-md" : ""}>
                    <RichTextEditor
                        key={module.id}
                        content={module.data.content}
                        onChange={handleContentChange}
                        placeholder="Start writing your module content..."
                    />
                </div>
                {errors && errors['data.content'] && (
                    <div className="text-[0.8rem] font-medium text-destructive">{errors['data.content']}</div>
                )}
            </div>
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
        id: nanoid(),
        title: '',
        order: 0,
        section_id: '',
        type: 'text',
        data: {
            content: '',
        },
    }),
    validate: (module: BaseModule) => {
        const result = validateTextModule(module);
        if (!result.success) {
            return result.errors?.reduce((acc, error) => {
                acc[error.path] = error.message;
                return acc;
            }, {} as Record<string, string>) || null;
        }
        return null;
    },
}); 