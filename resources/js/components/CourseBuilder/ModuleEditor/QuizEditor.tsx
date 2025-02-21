import { MultipleChoiceOption, MultipleChoiceQuestion, Question, QuizModule, TextQuestion } from '@/components/CourseBuilder/types/quiz';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { GripVertical, Plus, Trash2 } from 'lucide-react';
import { nanoid } from 'nanoid';
import { DragDropContext, Draggable, DraggableProvided, DraggableStateSnapshot, Droppable, DroppableProvided, DropResult } from 'react-beautiful-dnd';
import BaseModuleEditor from './BaseModuleEditor';

interface QuizEditorProps {
    module: QuizModule;
    onChange: (module: Partial<QuizModule>) => void;
}

export default function QuizEditor({ module, onChange }: QuizEditorProps) {
    const handleAddQuestion = (type: 'multiple_choice' | 'text') => {
        const newQuestion: Question = type === 'multiple_choice'
            ? {
                id: nanoid(),
                type: 'multiple_choice',
                question: '',
                order: module.questions.length,
                options: [
                    { id: nanoid(), text: '', isCorrect: true },
                    { id: nanoid(), text: '', isCorrect: false },
                ],
            }
            : {
                id: nanoid(),
                type: 'text',
                question: '',
                order: module.questions.length,
                correctAnswer: '',
            };

        onChange({
            questions: [...module.questions, newQuestion],
        });
    };

    const handleQuestionChange = (questionId: string, updates: Partial<Question>) => {
        onChange({
            questions: module.questions.map(q => {
                if (q.id !== questionId) return q;
                
                if (q.type === 'multiple_choice') {
                    return { ...q, ...updates } as MultipleChoiceQuestion;
                }
                return { ...q, ...updates } as TextQuestion;
            }),
        });
    };

    const handleDeleteQuestion = (questionId: string) => {
        onChange({
            questions: module.questions
                .filter(q => q.id !== questionId)
                .map((q, index) => ({ ...q, order: index })),
        });
    };

    const handleAddOption = (questionId: string) => {
        onChange({
            questions: module.questions.map(q =>
                q.id === questionId && q.type === 'multiple_choice'
                    ? {
                        ...q,
                        options: [...q.options, { id: nanoid(), text: '', isCorrect: false }],
                    }
                    : q
            ),
        });
    };

    const handleOptionChange = (questionId: string, optionId: string, updates: Partial<MultipleChoiceOption>) => {
        onChange({
            questions: module.questions.map(q =>
                q.id === questionId && q.type === 'multiple_choice'
                    ? {
                        ...q,
                        options: q.options.map(o =>
                            o.id === optionId ? { ...o, ...updates } : o
                        ),
                    }
                    : q
            ),
        });
    };

    const handleDeleteOption = (questionId: string, optionId: string) => {
        onChange({
            questions: module.questions.map(q =>
                q.id === questionId && q.type === 'multiple_choice'
                    ? {
                        ...q,
                        options: q.options.filter(o => o.id !== optionId),
                    }
                    : q
            ),
        });
    };

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(module.questions);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        onChange({
            questions: items.map((item, index) => ({ ...item, order: index })),
        });
    };

    return (
        <BaseModuleEditor module={module} onChange={onChange}>
            <div className="space-y-6">
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="questions">
                        {(provided: DroppableProvided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="space-y-4"
                            >
                                {module.questions.map((question, index) => (
                                    <Draggable
                                        key={question.id}
                                        draggableId={question.id}
                                        index={index}
                                    >
                                        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                            <Card
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                className={cn(
                                                    'p-4',
                                                    snapshot.isDragging && 'opacity-50'
                                                )}
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div
                                                        {...provided.dragHandleProps}
                                                        className="mt-3 cursor-move"
                                                    >
                                                        <GripVertical className="h-5 w-5 text-muted-foreground" />
                                                    </div>
                                                    <div className="flex-1 space-y-4">
                                                        <div className="flex items-start justify-between">
                                                            <Label className="text-sm font-medium">
                                                                Question {index + 1}
                                                            </Label>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => handleDeleteQuestion(question.id)}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                        <Textarea
                                                            value={question.question}
                                                            onChange={(e) =>
                                                                handleQuestionChange(question.id, {
                                                                    question: e.target.value,
                                                                })
                                                            }
                                                            placeholder="Enter your question"
                                                            className="min-h-[100px]"
                                                        />

                                                        {question.type === 'multiple_choice' ? (
                                                            <div className="space-y-4">
                                                                <RadioGroup
                                                                    value={question.options.find(o => o.isCorrect)?.id}
                                                                    onValueChange={(value) => {
                                                                        const updates = question.options.map(o => ({
                                                                            ...o,
                                                                            isCorrect: o.id === value,
                                                                        }));
                                                                        handleQuestionChange(question.id, {
                                                                            options: updates,
                                                                        });
                                                                    }}
                                                                >
                                                                    {question.options.map((option) => (
                                                                        <div
                                                                            key={option.id}
                                                                            className="flex items-center gap-2"
                                                                        >
                                                                            <RadioGroupItem
                                                                                value={option.id}
                                                                                id={option.id}
                                                                            />
                                                                            <div className="flex-1">
                                                                                <Input
                                                                                    value={option.text}
                                                                                    onChange={(e) =>
                                                                                        handleOptionChange(
                                                                                            question.id,
                                                                                            option.id,
                                                                                            { text: e.target.value }
                                                                                        )
                                                                                    }
                                                                                    placeholder="Option text"
                                                                                />
                                                                            </div>
                                                                            <Button
                                                                                variant="ghost"
                                                                                size="sm"
                                                                                onClick={() =>
                                                                                    handleDeleteOption(
                                                                                        question.id,
                                                                                        option.id
                                                                                    )
                                                                                }
                                                                                disabled={question.options.length <= 2}
                                                                            >
                                                                                <Trash2 className="h-4 w-4" />
                                                                            </Button>
                                                                        </div>
                                                                    ))}
                                                                </RadioGroup>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => handleAddOption(question.id)}
                                                                >
                                                                    <Plus className="mr-2 h-4 w-4" />
                                                                    Add Option
                                                                </Button>
                                                            </div>
                                                        ) : (
                                                            <div className="space-y-2">
                                                                <Label>Correct Answer</Label>
                                                                <Input
                                                                    value={question.correctAnswer}
                                                                    onChange={(e) =>
                                                                        handleQuestionChange(question.id, {
                                                                            correctAnswer: e.target.value,
                                                                        })
                                                                    }
                                                                    placeholder="Enter the correct answer"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </Card>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <div className="flex gap-2">
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
                </div>
            </div>
        </BaseModuleEditor>
    );
} 