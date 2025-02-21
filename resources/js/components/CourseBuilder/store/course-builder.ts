import { BaseModule, Section } from '@/components/CourseBuilder/types/course';
import { atom } from 'jotai';

export interface CourseContent {
    sections: Section[];
    modules: BaseModule[];
}

interface CourseStore {
    [courseId: string]: CourseContent;
}

const initialStore: CourseStore = {};

const courseBuilderStore = atom<CourseStore>(initialStore);

export const getCourseContent = atom(
    (get) => (courseId: string) => {
        const store = get(courseBuilderStore);
        return (
            store[courseId] || {
                sections: [],
                modules: [],
            }
        );
    },
);


export const updateCourseContent = atom(
    null,
    (get, set, { courseId, content }: { courseId: string; content: CourseContent }) => {
        const store = get(courseBuilderStore);
        set(courseBuilderStore, {
            ...store,
            [courseId]: content,
        });
    },
); 