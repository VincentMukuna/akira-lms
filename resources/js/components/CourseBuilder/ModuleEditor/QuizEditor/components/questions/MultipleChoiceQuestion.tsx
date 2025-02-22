import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { Plus, Trash2 } from 'lucide-react';
import { MultipleChoiceOption, MultipleChoiceQuestion } from '../../../../types/course';

interface MultipleChoiceQuestionEditorProps {
    question: MultipleChoiceQuestion;
    index: number;
    onQuestionChange: (questionId: string, updates: Partial<MultipleChoiceQuestion>) => void;
    onAddOption: (questionId: string) => void;
    onOptionChange: (questionId: string, optionId: string, updates: Partial<MultipleChoiceOption>) => void;
    onDeleteOption: (questionId: string, optionId: string) => void;
    errors?: Record<string, string>;
}

export function MultipleChoiceQuestionEditor({
    question,
    index,
    onQuestionChange,
    onAddOption,
    onOptionChange,
    onDeleteOption,
    errors = {},
}: MultipleChoiceQuestionEditorProps) {
    const getOptionError = (optionIndex: number) => errors[`data.questions.${index}.options.${optionIndex}.text`];
    const getOptionsError = () => errors[`data.questions.${index}.options`];

    return (
        <div className="space-y-4">
            {getOptionsError() && (
                <div className="text-[0.8rem] font-medium text-destructive">
                    {getOptionsError()}
                </div>
            )}
            <RadioGroup
                value={question.options.find(o => o.isCorrect)?.id}
                onValueChange={(value) => {
                    const updates = question.options.map(o => ({
                        ...o,
                        isCorrect: o.id === value,
                    }));
                    onQuestionChange(question.id, { options: updates });
                }}
            >
                {question.options.map((option, optionIndex) => (
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
                onClick={() => onAddOption(question.id)}
            >
                <Plus className="mr-2 h-4 w-4" />
                Add Option
            </Button>
        </div>
    );
} 