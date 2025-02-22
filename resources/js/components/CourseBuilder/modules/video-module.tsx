import { BaseModule, VideoModule } from '@/components/CourseBuilder/types/course';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Video } from 'lucide-react';
import { nanoid } from 'nanoid';
import moduleRegistry from '../../../lib/moduleRegistry';
import BaseModuleEditor from '../ModuleEditor/BaseModuleEditor';
import { validateVideoModule } from '../schemas/video-module';
interface VideoModuleEditorProps {
    module: VideoModule;
    onChange: (module: Partial<VideoModule>) => void;
    errors?: Record<string, string>;
}

export function VideoModuleEditor({ module, onChange, errors = {} }: VideoModuleEditorProps) {
    const handlevideo_urlChange = (video_url: string) => {
        onChange({ data: { video_url } });
    };

    const handleDescriptionChange = (description: string) => {
        onChange({ data: { description, video_url: module.data.video_url } });
    };

    const handlethumbnail_urlChange = (thumbnail_url: string) => {
        onChange({ data: { thumbnail_url, video_url: module.data.video_url } });
    };

    return (
        <BaseModuleEditor module={module} onChange={onChange}>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="video_url">Video URL</Label>
                    <Input
                        id="video_url"
                        value={module.data.video_url}
                        onChange={(e) => handlevideo_urlChange(e.target.value)}
                        placeholder="Enter video URL (YouTube, Vimeo, etc.)"
                        className={errors.video_url ? "border-red-500" : ""}
                    />
                    {errors && errors["data.video_url"] && (
                        <div className="text-[0.8rem] font-medium text-destructive">{errors["data.video_url"]}</div>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="thumbnail_url">Thumbnail URL (optional)</Label>
                    <Input
                        id="thumbnail_url"
                        value={module.data.thumbnail_url || ''}
                        onChange={(e) => handlethumbnail_urlChange(e.target.value)}
                        placeholder="Enter thumbnail URL"
                        className={errors.thumbnail_url ? "border-red-500" : ""}
                    />
                    {errors && errors["data.thumbnail_url"] && (
                        <div className="text-[0.8rem] font-medium text-destructive">{errors.thumbnail_url}</div>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        value={module.data.description || ''}
                        onChange={(e) => handleDescriptionChange(e.target.value)}
                        placeholder="Enter video description"
                        className={`h-32 ${errors.description ? "border-red-500" : ""}`}
                    />
                    {errors.description && (
                        <div className="text-[0.8rem] font-medium text-destructive">{errors.description}</div>
                    )}
                </div>

                {module.data.video_url && !errors.video_url && (
                    <div className="aspect-video rounded-lg border bg-muted">
                        <iframe
                            src={module.data.video_url}
                            className="h-full w-full rounded-lg"
                            allowFullScreen
                            title={module.title}
                        />
                    </div>
                )}
            </div>
        </BaseModuleEditor>
    );
}

// Type guard to check if a module is a VideoModule
function isVideoModule(module: BaseModule): module is VideoModule {
    return module.type === 'video' && 'video_url' in module;
}

// Register the video module type
moduleRegistry.register({
    type: 'video',
    name: 'Video Module',
    icon: Video,
    editor: VideoModuleEditor,
    defaultData: () => ({
        id: nanoid(),
        title: '',
        order: 0,
        section_id: '',
        type: 'video',
        data: {
            video_url: '',
            description: '',
            thumbnail_url: '',
            title: '',
        },
    }),
    validate: (module: BaseModule) => {
        const result = validateVideoModule(module);
        if (!result.success) {
            // Convert validation errors to a Record<string, string>
            console.log(result.errors);
            return result.errors?.reduce((acc, error) => {
                acc[error.path] = error.message;
                return acc;
            }, {} as Record<string, string>) || null;
        }
        return null;
    },
}); 