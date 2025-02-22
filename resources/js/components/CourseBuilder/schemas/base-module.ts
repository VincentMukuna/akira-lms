import * as z from 'zod';
import { ModuleType } from '../types/course';

export const baseModuleSchema = z.object({
    id: z.string().min(1, 'ID is required'),
    title: z.string().min(1, 'Title is required'),
    type: z.enum(['text', 'video', 'quiz'] as const satisfies readonly ModuleType[]),
    order: z.number().int().min(0, 'Order must be a non-negative integer'),
    section_id: z.string().min(1, 'Section ID is required'),
    data: z.any(),
});

export type BaseModuleSchema = z.infer<typeof baseModuleSchema>; 