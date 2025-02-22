import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { TextQuestion } from '../../../../types/course';

interface TextQuestionEditorProps {
    question: TextQuestion;
    index: number;
    onQuestionChange: (questionId: string, updates: Partial<TextQuestion>) => void;
    errors?: Record<string, string>;
}

export function TextQuestionEditor({
    question,
    index,
    onQuestionChange,
    errors = {},
}: TextQuestionEditorProps) {
    const getcorrect_answerError = () => errors[`data.questions.${index}.correct_answer`];

    return (
        <div className="space-y-2">
            <Label>Correct Answer</Label>
            <Input
                value={question.correct_answer}
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
} 