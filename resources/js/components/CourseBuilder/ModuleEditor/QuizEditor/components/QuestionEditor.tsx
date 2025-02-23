import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { GripVertical, Trash2 } from 'lucide-react';
import { MultipleChoiceOption, Question } from '../../../types/course';
import { FillInBlankQuestionEditor } from './questions/FillInBlankQuestion';
import { MultipleChoiceQuestionEditor } from './questions/MultipleChoiceQuestion';
import { TextQuestionEditor } from './questions/TextQuestion';
import { TrueFalseQuestionEditor } from './questions/TrueFalseQuestion';

interface QuestionEditorProps {
  question: Question;
  index: number;
  onQuestionChange: (questionId: string, updates: Partial<Question>) => void;
  onDeleteQuestion: (questionId: string) => void;
  onAddOption: (questionId: string) => void;
  onOptionChange: (
    questionId: string,
    optionId: string,
    updates: Partial<MultipleChoiceOption>,
  ) => void;
  onDeleteOption: (questionId: string, optionId: string) => void;
  dragHandleProps: any;
  errors?: Record<string, string>;
}

export function QuestionEditor({
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
  const getQuestionError = () =>
    errors[`data.questions.${index}.question`] || errors[`data.questions.${index}`];

  const renderQuestionContent = () => {
    switch (question.type) {
      case 'multiple_choice':
        return (
          <MultipleChoiceQuestionEditor
            question={question}
            index={index}
            onQuestionChange={onQuestionChange}
            onAddOption={onAddOption}
            onOptionChange={onOptionChange}
            onDeleteOption={onDeleteOption}
            errors={errors}
          />
        );
      case 'text':
        return (
          <TextQuestionEditor
            question={question}
            index={index}
            onQuestionChange={onQuestionChange}
            errors={errors}
          />
        );
      case 'true_false':
        return (
          <TrueFalseQuestionEditor
            question={question}
            index={index}
            onQuestionChange={onQuestionChange}
            errors={errors}
          />
        );
      case 'fill_in_blank':
        return (
          <FillInBlankQuestionEditor
            question={question}
            index={index}
            onQuestionChange={onQuestionChange}
            errors={errors}
          />
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
            <Button variant="ghost" size="sm" onClick={() => onDeleteQuestion(question.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            <Textarea
              value={question.question}
              onChange={(e) => onQuestionChange(question.id, { question: e.target.value })}
              placeholder="Enter your question"
              className={cn('min-h-[100px]', getQuestionError() && 'border-destructive')}
            />
            {getQuestionError() && (
              <div className="text-[0.8rem] font-medium text-destructive">{getQuestionError()}</div>
            )}
          </div>
          {renderQuestionContent()}
        </div>
      </div>
    </Card>
  );
}
