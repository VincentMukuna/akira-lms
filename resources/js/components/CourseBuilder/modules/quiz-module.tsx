import { BaseModule } from '@/components/CourseBuilder/types/course';
import { QuizModule } from '@/components/CourseBuilder/types/quiz';
import { ClipboardList } from 'lucide-react';
import moduleRegistry from '../../../lib/moduleRegistry';
import QuizEditor from '../ModuleEditor/QuizEditor';

function isQuizModule(module: BaseModule): module is QuizModule {
    return module.type === 'quiz';
}

// Register the quiz module type
moduleRegistry.register({
    type: 'quiz',
    name: 'Quiz Module',
    icon: ClipboardList,
    editor: QuizEditor,
    defaultData: () => ({
        questions: [],
    }),
    validate: (module: BaseModule) => {
        if (!isQuizModule(module)) {
            return 'Invalid module type';
        }
        if (!module.questions.length) {
            return 'Quiz must have at least one question';
        }
        for (const question of module.questions) {
            if (!question.question.trim()) {
                return 'All questions must have content';
            }
            if (question.type === 'multiple_choice') {
                if (question.options.length < 2) {
                    return 'Multiple choice questions must have at least 2 options';
                }
                if (!question.options.some(o => o.isCorrect)) {
                    return 'Multiple choice questions must have at least one correct answer';
                }
                if (question.options.some(o => !o.text.trim())) {
                    return 'All options must have content';
                }
            } else if (question.type === 'text') {
                if (!question.correctAnswer.trim()) {
                    return 'Text questions must have a correct answer';
                }
            }
        }
        return null;
    },
}); 