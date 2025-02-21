import { BaseModule, VideoModule } from '@/components/CourseBuilder/types/course';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Video } from 'lucide-react';
import moduleRegistry from '../../../lib/moduleRegistry';
import BaseModuleEditor from '../ModuleEditor/BaseModuleEditor';
import { validateVideoModule } from '../schemas/video-module';

interface VideoModuleEditorProps {
    module: VideoModule;
    onChange: (module: Partial<VideoModule>) => void;
    errors?: Record<string, string>;
}

export function VideoModuleEditor({ module, onChange, errors = {} }: VideoModuleEditorProps) {
    const handleVideoUrlChange = (videoUrl: string) => {
        onChange({ videoUrl });
    };

    const handleDescriptionChange = (description: string) => {
        onChange({ description });
    };

    const handleThumbnailUrlChange = (thumbnailUrl: string) => {
        onChange({ thumbnailUrl });
    };

    return (
        <BaseModuleEditor module={module} onChange={onChange}>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="videoUrl">Video URL</Label>
                    <Input
                        id="videoUrl"
                        value={module.videoUrl}
                        onChange={(e) => handleVideoUrlChange(e.target.value)}
                        placeholder="Enter video URL (YouTube, Vimeo, etc.)"
                        className={errors.videoUrl ? "border-red-500" : ""}
                    />
                    {errors.videoUrl && (
                        <div className="text-[0.8rem] font-medium text-destructive">{errors.videoUrl}</div>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="thumbnailUrl">Thumbnail URL (optional)</Label>
                    <Input
                        id="thumbnailUrl"
                        value={module.thumbnailUrl || ''}
                        onChange={(e) => handleThumbnailUrlChange(e.target.value)}
                        placeholder="Enter thumbnail URL"
                        className={errors.thumbnailUrl ? "border-red-500" : ""}
                    />
                    {errors.thumbnailUrl && (
                        <div className="text-[0.8rem] font-medium text-destructive">{errors.thumbnailUrl}</div>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        value={module.description || ''}
                        onChange={(e) => handleDescriptionChange(e.target.value)}
                        placeholder="Enter video description"
                        className={`h-32 ${errors.description ? "border-red-500" : ""}`}
                    />
                    {errors.description && (
                        <div className="text-[0.8rem] font-medium text-destructive">{errors.description}</div>
                    )}
                </div>

                {module.videoUrl && !errors.videoUrl && (
                    <div className="aspect-video rounded-lg border bg-muted">
                        <iframe
                            src={module.videoUrl}
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
    return module.type === 'video' && 'videoUrl' in module;
}

// Register the video module type
moduleRegistry.register({
    type: 'video',
    name: 'Video Module',
    icon: Video,
    editor: VideoModuleEditor,
    defaultData: () => ({
        videoUrl: '',
        description: '',
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