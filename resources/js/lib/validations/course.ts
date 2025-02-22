import * as z from 'zod';

export const courseFormSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    learning_objectives: z.string().min(1, 'Learning objectives are required'),
    level: z.enum(['beginner', 'intermediate', 'advanced']),
    is_published: z.boolean().default(false),
});

export type CourseFormValues = z.infer<typeof courseFormSchema>; 