import * as z from 'zod';
import { baseModuleSchema } from './base-module';

// Schema for multiple choice options
const multipleChoiceOptionSchema = z.object({
    id: z.string().min(1, 'Option ID is required'),
    text: z.string().min(1, 'Option text is required'),
    isCorrect: z.boolean(),
});

// Schema for the base question fields
const baseQuestionSchema = z.object({
    id: z.string().min(1, 'Question ID is required'),
    question: z.string().min(1, 'Question text is required'),
    order: z.number().int().min(0),
});

// Schema for multiple choice questions
const multipleChoiceQuestionSchema = baseQuestionSchema.extend({
    type: z.literal('multiple_choice'),
    options: z.array(multipleChoiceOptionSchema)
        .min(2, 'Multiple choice questions must have at least 2 options')
        .refine(
            options => options.some(opt => opt.isCorrect),
            'At least one option must be marked as correct'
        ),
});

// Schema for text questions
const textQuestionSchema = baseQuestionSchema.extend({
    type: z.literal('text'),
    correctAnswer: z.string().min(1, 'Correct answer is required'),
});

// Combined question schema using discriminated union
const questionSchema = z.discriminatedUnion('type', [
    multipleChoiceQuestionSchema,
    textQuestionSchema,
]);

// Main quiz module schema
export const quizModuleSchema = baseModuleSchema.extend({
    type: z.literal('quiz'),
    questions: z.array(questionSchema)
        .min(1, 'Quiz must have at least one question'),
});

export type QuizModuleSchema = z.infer<typeof quizModuleSchema>;

// Validation function that returns detailed error messages
export function validateQuizModule(data: unknown) {
    const result = quizModuleSchema.safeParse(data);
    if (!result.success) {
        const errors = result.error.errors.map(error => ({
            path: error.path.join('.'),
            message: error.message
        }));
        return { success: false, errors };
    }
    return { success: true, data: result.data };
} 