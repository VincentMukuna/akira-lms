import { BaseModule, QuizModule } from '@/components/CourseBuilder/types/course';
import { ClipboardList } from 'lucide-react';
import { nanoid } from 'nanoid';
import moduleRegistry from '../../../lib/moduleRegistry';
import QuizEditor from '../ModuleEditor/QuizEditor';
import { validateQuizModule } from '../schemas/quiz-module';
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
    id: nanoid(),
    title: '',
    order: 0,
    section_id: '',
    type: 'quiz',
    data: {
      questions: [],
    },
  }),
  validate: (module: BaseModule) => {
    const result = validateQuizModule(module);
    if (!result.success) {
      return (
        result.errors?.reduce(
          (acc, error) => {
            acc[error.path] = error.message;
            return acc;
          },
          {} as Record<string, string>,
        ) || null
      );
    }
    return null;
  },
});
