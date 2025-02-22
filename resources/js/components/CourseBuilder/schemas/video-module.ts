import * as z from 'zod';
import { baseModuleSchema } from './base-module';

export const videoModuleSchema = baseModuleSchema.extend({
    type: z.literal('video'),
    data: z.object({
        video_url: z.string()
            .min(1, 'Video URL is required')
            .url('Please enter a valid URL')
            .refine(
            (url) => {
                // Basic validation for common video platforms
                const videoPatterns = [
                    /youtube\.com\/watch\?v=/,
                    /youtu\.be\//,
                    /vimeo\.com\//,
                    /dailymotion\.com\/video\//,
                    /wistia\.com\/medias\//
                ];
                return videoPatterns.some(pattern => pattern.test(url));
            },
            'Please enter a valid video platform URL (YouTube, Vimeo, etc.)'
        ),
    description: z.string().optional(),
    thumbnail_url: z.string()
            .url('Please enter a valid thumbnail URL')
            .optional()
            .nullable(),
    }),
});

export type VideoModuleSchema = z.infer<typeof videoModuleSchema>;

// Validation function that returns detailed error messages
export function validateVideoModule(data: unknown) {
    const result = videoModuleSchema.safeParse(data);
    if (!result.success) {
        const errors = result.error.errors.map(error => ({
            path: error.path.join('.'),
            message: error.message
        }));
        return { success: false, errors };
    }
    return { success: true, data: result.data };
} 