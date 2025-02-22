import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { TrueFalseQuestion } from '../../../../types/course';

interface TrueFalseQuestionEditorProps {
    question: TrueFalseQuestion;
    index: number;
    onQuestionChange: (questionId: string, updates: Partial<TrueFalseQuestion>) => void;
    errors?: Record<string, string>;
}

export function TrueFalseQuestionEditor({
    question,
    index,
    onQuestionChange,
    errors = {},
}: TrueFalseQuestionEditorProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Switch
                    checked={question.correct_answer}
                    onCheckedChange={(checked) => onQuestionChange(question.id, { correct_answer: checked })}
                />
                <Label>Correct Answer is {question.correct_answer ? 'True' : 'False'}</Label>
            </div>
            <div className="space-y-2">
                <Label>Explanation (Optional)</Label>
                <Textarea
                    value={question.explanation || ''}
                    onChange={(e) => onQuestionChange(question.id, { explanation: e.target.value })}
                    placeholder="Explain why this answer is correct"
                    className="min-h-[100px]"
                />
            </div>
        </div>
    );
} 