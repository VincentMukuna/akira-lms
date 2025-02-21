export type ModuleType = 'text' | 'video' | 'quiz';

export interface Module {
    id: string;
    title: string;
    type: ModuleType;
    content: string;
    order: number;
    sectionId: string;
}

export interface Section {
    id: string;
    title: string;
    order: number;
    courseId: string;
}

export interface CourseContent {
    sections: Section[];
    modules: Module[];
}

export interface CourseBuilderState {
    selectedModuleId: string | null;
    courseContent: CourseContent;
    isLoading: boolean;
    error: string | null;
}
