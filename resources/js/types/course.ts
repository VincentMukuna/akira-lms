export type ModuleType = 'text' | 'video' | 'quiz';

export interface BaseModule {
    id: string;
    title: string;
    type: ModuleType;
    order: number;
    sectionId: string;
}

export interface TextModule extends BaseModule {
    type: 'text';
    content: string;
}

export interface VideoModule extends BaseModule {
    type: 'video';
    videoUrl: string;
    description?: string;
    thumbnailUrl?: string;
}

export interface QuizModule extends BaseModule {
    type: 'quiz';
    questions: QuizQuestion[];
}

export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
}

export interface Section {
    id: string;
    title: string;
    order: number;
    courseId: string;
}

export interface CourseContent {
    sections: Section[];
    modules: BaseModule[];
}

export interface ModuleEditorProps<T extends BaseModule> {
    module: T;
    onChange: (module: T) => void;
}

export interface ModuleRegistryEntry {
    type: ModuleType;
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    editor: React.ComponentType<ModuleEditorProps<any>>;
    defaultData: () => Omit<BaseModule, keyof BaseModule>;
    validate?: (module: BaseModule) => string | null;
} 