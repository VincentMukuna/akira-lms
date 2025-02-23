export type ModuleType = 'text' | 'video' | 'quiz';

export interface BaseModule {
  id: string;
  title: string;
  type: ModuleType;
  order: number;
  section_id: string;
  data: ModuleData[keyof ModuleData];
}

export interface TextModule extends BaseModule {
  type: 'text';
  data: {
    content: string;
  };
}

export interface VideoModule extends BaseModule {
  type: 'video';
  data: {
    video_url: string;
    description?: string;
    thumbnail_url?: string;
  };
}

export type QuestionType = 'multiple_choice' | 'text' | 'true_false' | 'fill_in_blank';

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  question: string;
  order: number;
}

export interface MultipleChoiceOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple_choice';
  options: MultipleChoiceOption[];
}

export interface TextQuestion extends BaseQuestion {
  type: 'text';
  correct_answer: string;
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true_false';
  correct_answer: boolean;
  explanation?: string;
}

export interface FillInBlankQuestion extends BaseQuestion {
  type: 'fill_in_blank';
  blanks: {
    id: string;
    answer: string;
    position: {
      start: number;
      end: number;
    };
  }[];
}

export type Question =
  | MultipleChoiceQuestion
  | TextQuestion
  | TrueFalseQuestion
  | FillInBlankQuestion;

export interface QuizModule extends BaseModule {
  type: 'quiz';
  data: {
    questions: Question[];
  };
}

export interface Section {
  id: string;
  title: string;
  order: number;
  course_id: string;
}

export interface CourseContent {
  sections: Section[];
  modules: BaseModule[];
}

export interface ModuleEditorProps<T extends BaseModule> {
  module: T;
  onChange: (module: Partial<T>) => void;
  errors?: Record<string, string>;
}

export interface ModuleRegistryEntry {
  type: ModuleType;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  editor: React.ComponentType<ModuleEditorProps<any>>;
  defaultData: () => BaseModule & { data: any };
  validate?: (module: BaseModule) => Record<string, string> | null;
}

export interface ModuleData {
  text: { content: string };
  video: { video_url: string; description?: string; thumbnail_url?: string };
  quiz: { questions: Question[] };
}

export interface ModuleRecord {
  id: string;
  title: string;
  type: ModuleType;
  order: number;
  section_id: string;
  data: ModuleData[keyof ModuleData];
  created_at: string;
  updated_at: string;
}
