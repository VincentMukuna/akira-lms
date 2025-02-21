import { BaseModule } from '@/components/CourseBuilder/types/course';

export type QuestionType = 'multiple_choice' | 'text';

export interface BaseQuestion {
    id: string;
    type: QuestionType;
    question: string;
    order: number;
}

export interface MultipleChoiceOption {
    id: string;
    text: string;
    isCorrect: boolean;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
    type: 'multiple_choice';
    options: MultipleChoiceOption[];
}

export interface TextQuestion extends BaseQuestion {
    type: 'text';
    correctAnswer: string;
}

export type Question = MultipleChoiceQuestion | TextQuestion;

export interface QuizModule extends BaseModule {
    type: 'quiz';
    questions: Question[];
} 