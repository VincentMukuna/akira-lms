import * as z from 'zod';
import { baseModuleSchema } from './base-module';

export const textModuleSchema = baseModuleSchema.extend({
    type: z.literal('text'),
    content: z.string()
        .min(1, 'Content is required')
        .max(50000, 'Content is too long (max 50000 characters)'),
});

export type TextModuleSchema = z.infer<typeof textModuleSchema>;

// Validation function that returns detailed error messages
export function validateTextModule(data: unknown) {
    const result = textModuleSchema.safeParse(data);
    if (!result.success) {
        const errors = result.error.errors.map(error => ({
            path: error.path.join('.'),
            message: error.message
        }));
        return { success: false, errors };
    }
    return { success: true, data: result.data };
} 