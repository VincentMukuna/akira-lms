import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { DragDropContext, Draggable, DraggableProvided, DraggableStateSnapshot, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { QuizModule } from '../../types/course';
import BaseModuleEditor from '../BaseModuleEditor';
import { QuestionEditor } from './components/QuestionEditor';
import { useQuizState } from './hooks/useQuizState';

interface QuizEditorProps {
    module: QuizModule;
    onChange: (module: Partial<QuizModule>) => void;
    errors?: Record<string, string>;
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