import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Plus, Trash2 } from 'lucide-react';
import { nanoid } from 'nanoid';
import { FillInBlankQuestion } from '../../../../types/course';

interface FillInBlankQuestionEditorProps {
    question: FillInBlankQuestion;
    index: number;
    onQuestionChange: (questionId: string, updates: Partial<FillInBlankQuestion>) => void;
    errors?: Record<string, string>;
}

export function FillInBlankQuestionEditor({
    question,
    index,
    onQuestionChange,
    errors = {},
}: FillInBlankQuestionEditorProps) {
    const getBlanksError = (blankIndex: number) => errors[`data.questions.${index}.blanks.${blankIndex}.answer`];

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
                                const existingBlanks = question.blanks || [];
                                
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
                            
                            const existingBlanks = question.blanks || [];
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
                {(question.blanks || []).map((blank, blankIndex) => {
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
                                            const newBlanks = [...(question.blanks || [])];
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
                                            const newBlanks = [...(question.blanks || [])];
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