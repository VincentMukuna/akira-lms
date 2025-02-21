import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { BaseModule, VideoModule } from '@/types/course';
import { Video } from 'lucide-react';
import BaseModuleEditor from '../../components/CourseBuilder/ModuleEditor/BaseModuleEditor';
import moduleRegistry from '../moduleRegistry';

interface VideoModuleEditorProps {
    module: VideoModule;
    onChange: (module: Partial<VideoModule>) => void;
}

export function VideoModuleEditor({ module, onChange }: VideoModuleEditorProps) {
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
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="thumbnailUrl">Thumbnail URL (optional)</Label>
                    <Input
                        id="thumbnailUrl"
                        value={module.thumbnailUrl || ''}
                        onChange={(e) => handleThumbnailUrlChange(e.target.value)}
                        placeholder="Enter thumbnail URL"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        value={module.description || ''}
                        onChange={(e) => handleDescriptionChange(e.target.value)}
                        placeholder="Enter video description"
                        className="h-32"
                    />
                </div>

                {module.videoUrl && (
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
        if (!isVideoModule(module)) {
            return 'Invalid module type';
        }
        if (!module.videoUrl.trim()) {
            return 'Video URL cannot be empty';
        }
        return null;
    },
}); 