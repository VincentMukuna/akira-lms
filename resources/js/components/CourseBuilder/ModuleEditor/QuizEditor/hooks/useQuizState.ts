import { nanoid } from 'nanoid';
import { DropResult } from 'react-beautiful-dnd';
import { MultipleChoiceOption, Question, QuestionType, QuizModule } from '../../../types/course';

export function useQuizState(module: QuizModule, onChange: (module: Partial<QuizModule>) => void) {
    const questions = module.data.questions;

    const handleAddQuestion = (type: QuestionType) => {
        const baseQuestion = {
            id: nanoid(),
            type,
            question: '',
            order: questions.length,
        };

        const newQuestion: Question = (() => {
            switch (type) {
                case 'multiple_choice':
                    return {
                        ...baseQuestion,
                        type: 'multiple_choice',
                        options: [
                            { id: nanoid(), text: '', isCorrect: true },
                            { id: nanoid(), text: '', isCorrect: false },
                        ],
                    } as const;
                case 'text':
                    return {
                        ...baseQuestion,
                        type: 'text',
                        correct_answer: '',
                    } as const;
                case 'true_false':
                    return {
                        ...baseQuestion,
                        type: 'true_false',
                        correct_answer: true,
                        explanation: '',
                    } as const;
                case 'fill_in_blank':
                    return {
                        ...baseQuestion,
                        type: 'fill_in_blank',
                        question: 'Type your question and use [blank] to mark where blanks should appear.',
                        blanks: [{
                            id: nanoid(),
                            answer: '',
                            position: {
                                start: 32,
                                end: 39
                            }
                        }],
                    } as const;
            }
        })();

        onChange({
            data: {
                questions: [...questions, newQuestion],
            },
        });
    };

    const handleQuestionChange = (questionId: string, updates: Partial<Question>) => {
        onChange({
            data: {
                questions: questions.map(q => {
                    if (q.id !== questionId) return q;
                    
                    if (q.type === 'multiple_choice') {
                        return { ...q, ...updates } as Question;
                    }
                    return { ...q, ...updates } as Question;
                }),
            },
        });
    };

    const handleDeleteQuestion = (questionId: string) => {
        onChange({
            data: {
                questions: questions
                    .filter(q => q.id !== questionId)
                    .map((q, index) => ({ ...q, order: index })),
            },
        });
    };

    const handleAddOption = (questionId: string) => {
        onChange({
            data: {
                questions: questions.map(q =>
                    q.id === questionId && q.type === 'multiple_choice'
                        ? {
                            ...q,
                            options: [...q.options, { id: nanoid(), text: '', isCorrect: false }],
                        }
                        : q
                ),
            },
        });
    };

    const handleOptionChange = (questionId: string, optionId: string, updates: Partial<MultipleChoiceOption>) => {
        onChange({
            data: {
                questions: questions.map(q =>
                    q.id === questionId && q.type === 'multiple_choice'
                        ? {
                            ...q,
                            options: q.options.map(o =>
                                o.id === optionId ? { ...o, ...updates } : o
                            ),
                        }
                        : q
                ),
            },
        });
    };

    const handleDeleteOption = (questionId: string, optionId: string) => {
        onChange({
            data: {
                questions: questions.map(q =>
                    q.id === questionId && q.type === 'multiple_choice'
                        ? {
                            ...q,
                            options: q.options.filter(o => o.id !== optionId),
                        }
                        : q
                ),
            },
        });
    };

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(questions);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        onChange({
            data: {
                questions: items.map((item, index) => ({ ...item, order: index })),
            },
        });
    };

    return {
        questions,
        handleAddQuestion,
        handleQuestionChange,
        handleDeleteQuestion,
        handleAddOption,
        handleOptionChange,
        handleDeleteOption,
        handleDragEnd,
    };
} 