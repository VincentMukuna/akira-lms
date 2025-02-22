import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { GripVertical, Plus, Trash2 } from 'lucide-react';
import { nanoid } from 'nanoid';
import { DragDropContext, Draggable, DraggableProvided, DraggableStateSnapshot, Droppable, DroppableProvided, DropResult } from 'react-beautiful-dnd';
import { FillInBlankQuestion, MultipleChoiceOption, MultipleChoiceQuestion, Question, QuestionType, QuizModule, TextQuestion, TrueFalseQuestion } from '../types/course';
import BaseModuleEditor from './BaseModuleEditor';

interface QuizEditorProps {
    module: QuizModule;
    onChange: (module: Partial<QuizModule>) => void;
    errors?: Record<string, string>;
}

interface QuestionEditorProps {
    question: Question;
    index: number;
    onQuestionChange: (questionId: string, updates: Partial<Question>) => void;
    onDeleteQuestion: (questionId: string) => void;
    onAddOption: (questionId: string) => void;
    onOptionChange: (questionId: string, optionId: string, updates: Partial<MultipleChoiceOption>) => void;
    onDeleteOption: (questionId: string, optionId: string) => void;
    dragHandleProps: any;
    errors?: Record<string, string>;
}

function QuestionEditor({
    question,
    index,
    onQuestionChange,
    onDeleteQuestion,
    onAddOption,
    onOptionChange,
    onDeleteOption,
    dragHandleProps,
    errors = {},
}: QuestionEditorProps) {
    const getQuestionError = () => errors[`data.questions.${index}.question`] || errors[`data.questions.${index}`];
    const getOptionError = (optionIndex: number) => errors[`data.questions.${index}.options.${optionIndex}.text`];
    const getcorrect_answerError = () => errors[`data.questions.${index}.correct_answer`];
    const getOptionsError = () => errors[`data.questions.${index}.options`];
    const getBlanksError = (blankIndex: number) => errors[`data.questions.${index}.blanks.${blankIndex}.answer`];

    const renderQuestionContent = () => {
        switch (question.type) {
            case 'multiple_choice':
                return (
                    <div className="space-y-4">
                        {getOptionsError() && (
                            <div className="text-[0.8rem] font-medium text-destructive">
                                {getOptionsError()}
                            </div>
                        )}
                        <RadioGroup
                            value={(question as MultipleChoiceQuestion).options.find(o => o.isCorrect)?.id}
                            onValueChange={(value) => {
                                const updates = (question as MultipleChoiceQuestion).options.map(o => ({
                                    ...o,
                                    isCorrect: o.id === value,
                                }));
                                onQuestionChange(question.id, { options: updates });
                            }}
                        >
                            {(question as MultipleChoiceQuestion).options.map((option, optionIndex) => (
                                <div key={option.id} className="flex items-center gap-2">
                                    <RadioGroupItem value={option.id} id={option.id} />
                                    <div className="flex-1 space-y-2">
                                        <Input
                                            value={option.text}
                                            onChange={(e) => onOptionChange(question.id, option.id, { text: e.target.value })}
                                            placeholder="Option text"
                                            className={cn(getOptionError(optionIndex) && "border-destructive")}
                                        />
                                        {getOptionError(optionIndex) && (
                                            <div className="text-[0.8rem] font-medium text-destructive">
                                                {getOptionError(optionIndex)}
                                            </div>
                                        )}
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onDeleteOption(question.id, option.id)}
                                        disabled={(question as MultipleChoiceQuestion).options.length <= 2}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </RadioGroup>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onAddOption(question.id)}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Option
                        </Button>
                    </div>
                );
            case 'text':
                return (
                    <div className="space-y-2">
                        <Label>Correct Answer</Label>
                        <Input
                            value={(question as TextQuestion).correct_answer}
                            onChange={(e) => onQuestionChange(question.id, { correct_answer: e.target.value })}
                            placeholder="Enter the correct answer"
                            className={cn(getcorrect_answerError() && "border-destructive")}
                        />
                        {getcorrect_answerError() && (
                            <div className="text-[0.8rem] font-medium text-destructive">
                                {getcorrect_answerError()}
                            </div>
                        )}
                    </div>
                );
            case 'true_false':
                return (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Switch
                                checked={(question as TrueFalseQuestion).correct_answer}
                                onCheckedChange={(checked) => onQuestionChange(question.id, { correct_answer: checked })}
                            />
                            <Label>Correct Answer is {(question as TrueFalseQuestion).correct_answer ? 'True' : 'False'}</Label>
                        </div>
                        <div className="space-y-2">
                            <Label>Explanation (Optional)</Label>
                            <Textarea
                                value={(question as TrueFalseQuestion).explanation || ''}
                                onChange={(e) => onQuestionChange(question.id, { explanation: e.target.value })}
                                placeholder="Explain why this answer is correct"
                                className="min-h-[100px]"
                            />
                        </div>
                    </div>
                );
            case 'fill_in_blank':
                return (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Question Text</Label>
                            <div className="text-sm text-muted-foreground">
                                Use [blank] in your question text to mark where blanks should appear.
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="flex-1">
                                    <Textarea
                                        value={question.question}
                                        onChange={(e) => {
                                            const text = e.target.value;
                                            const blankMatches = Array.from(text.matchAll(/\[blank\]/g));
                                            const existingBlanks = (question as FillInBlankQuestion).blanks || [];
                                            
                                            // Create or update blanks based on [blank] markers
                                            const newBlanks = blankMatches.map((match, index) => {
                                                const existingBlank = existingBlanks[index];
                                                return {
                                                    id: existingBlank?.id || nanoid(),
                                                    answer: existingBlank?.answer || '',
                                                    position: {
                                                        start: match.index!,
                                                        end: match.index! + 7 // length of "[blank]"
                                                    }
                                                };
                                            });

                                            onQuestionChange(question.id, {
                                                question: text,
                                                blanks: newBlanks
                                            });
                                        }}
                                        placeholder="Enter your question with [blank] markers, e.g.: The capital of France is [blank]."
                                        className="min-h-[100px]"
                                    />
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        const text = question.question;
                                        const cursorPosition = (document.activeElement as HTMLTextAreaElement)?.selectionStart || text.length;
                                        const newText = text.slice(0, cursorPosition) + '[blank]' + text.slice(cursorPosition);
                                        const blankMatches = Array.from(newText.matchAll(/\[blank\]/g));
                                        
                                        const existingBlanks = (question as FillInBlankQuestion).blanks || [];
                                        const newBlanks = blankMatches.map((match, index) => {
                                            const existingBlank = existingBlanks[index];
                                            return {
                                                id: existingBlank?.id || nanoid(),
                                                answer: existingBlank?.answer || '',
                                                position: {
                                                    start: match.index!,
                                                    end: match.index! + 7
                                                }
                                            };
                                        });

                                        onQuestionChange(question.id, {
                                            question: newText,
                                            blanks: newBlanks
                                        });
                                    }}
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Insert Blank
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label>Answers</Label>
                            {((question as FillInBlankQuestion).blanks || []).map((blank, blankIndex) => {
                                // Find the context around the blank
                                const text = question.question;
                                const start = Math.max(0, blank.position?.start - 20 || 0);
                                const end = Math.min(text.length, (blank.position?.end || 0) + 20);
                                const context = text.slice(start, blank.position?.start || 0) + 
                                    '___________' + 
                                    text.slice(blank.position?.end || 0, end);

                                return (
                                    <div key={blank.id} className="rounded-md border p-4">
                                        <div className="mb-2 text-sm text-muted-foreground">
                                            ...{context}...
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1">
                                                <Input
                                                    value={blank.answer}
                                                    onChange={(e) => {
                                                        const newBlanks = [...((question as FillInBlankQuestion).blanks || [])];
                                                        newBlanks[blankIndex] = { ...blank, answer: e.target.value };
                                                        onQuestionChange(question.id, { blanks: newBlanks });
                                                    }}
                                                    placeholder="Enter the correct answer"
                                                    className={cn(getBlanksError(blankIndex) && "border-destructive")}
                                                />
                                                {getBlanksError(blankIndex) && (
                                                    <div className="mt-1 text-[0.8rem] font-medium text-destructive">
                                                        {getBlanksError(blankIndex)}
                                                    </div>
                                                )}
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    // Remove the [blank] marker from the question text
                                                    const text = question.question;
                                                    const blankMatches = Array.from(text.matchAll(/\[blank\]/g));
                                                    if (blankMatches[blankIndex]) {
                                                        const pos = blankMatches[blankIndex].index!;
                                                        const newText = text.slice(0, pos) + text.slice(pos + 7); // 7 is length of "[blank]"
                                                        
                                                        // Update blanks array and their positions
                                                        const newBlanks = [...((question as FillInBlankQuestion).blanks || [])];
                                                        newBlanks.splice(blankIndex, 1);
                                                        
                                                        // Update positions for remaining blanks after the removed one
                                                        for (let i = blankIndex; i < newBlanks.length; i++) {
                                                            if (newBlanks[i].position.start > pos) {
                                                                newBlanks[i].position.start -= 7;
                                                                newBlanks[i].position.end -= 7;
                                                            }
                                                        }

                                                        onQuestionChange(question.id, {
                                                            question: newText,
                                                            blanks: newBlanks
                                                        });
                                                    }
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
        }
    };

    return (
        <Card className={cn('p-4', getQuestionError() && 'ring-2 ring-destructive')}>
            <div className="flex items-start gap-4">
                <div {...dragHandleProps} className="mt-3 cursor-move">
                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                        <Label className="text-sm font-medium">Question {index + 1}</Label>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDeleteQuestion(question.id)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="space-y-2">
                        <Textarea
                            value={question.question}
                            onChange={(e) => onQuestionChange(question.id, { question: e.target.value })}
                            placeholder="Enter your question"
                            className={cn("min-h-[100px]", getQuestionError() && "border-destructive")}
                        />
                        {getQuestionError() && (
                            <div className="text-[0.8rem] font-medium text-destructive">
                                {getQuestionError()}
                            </div>
                        )}
                    </div>
                    {renderQuestionContent()}
                </div>
            </div>
        </Card>
    );
}

function useQuizState(module: QuizModule, onChange: (module: Partial<QuizModule>) => void) {
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
                        return { ...q, ...updates } as MultipleChoiceQuestion;
                    }
                    return { ...q, ...updates } as TextQuestion;
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

export default function QuizEditor({ module, onChange, errors = {} }: QuizEditorProps) {
    const {
        questions,
        handleAddQuestion,
        handleQuestionChange,
        handleDeleteQuestion,
        handleAddOption,
        handleOptionChange,
        handleDeleteOption,
        handleDragEnd,
    } = useQuizState(module, onChange);

    return (
        <BaseModuleEditor module={module} onChange={onChange}>
            <div className="space-y-6">
                {errors.questions && !errors.questions.includes('.') && (
                    <div className="text-[0.8rem] font-medium text-destructive">{errors.questions}</div>
                )}
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="questions">
                        {(provided: DroppableProvided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="space-y-4"
                            >
                                {questions?.map((question, questionIndex) => (
                                    <Draggable
                                        key={question.id}
                                        draggableId={question.id}
                                        index={questionIndex}
                                    >
                                        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                className={cn(snapshot.isDragging && 'opacity-50')}
                                            >
                                                <QuestionEditor
                                                    question={question}
                                                    index={questionIndex}
                                                    onQuestionChange={handleQuestionChange}
                                                    onDeleteQuestion={handleDeleteQuestion}
                                                    onAddOption={handleAddOption}
                                                    onOptionChange={handleOptionChange}
                                                    onDeleteOption={handleDeleteOption}
                                                    dragHandleProps={provided.dragHandleProps}
                                                    errors={errors}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant="outline"
                        onClick={() => handleAddQuestion('multiple_choice')}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Multiple Choice
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => handleAddQuestion('text')}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Text Question
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => handleAddQuestion('true_false')}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add True/False
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => handleAddQuestion('fill_in_blank')}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Fill in Blank
                    </Button>
                </div>
            </div>
        </BaseModuleEditor>
    );
} 