import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { type CourseContent } from '../types/course-builder';

// Initial dummy data
const initialContent: CourseContent = {
    sections: [
        {
            id: 'section-1',
            title: 'Introduction',
            order: 0,
            courseId: '1',
        },
        {
            id: 'section-2',
            title: 'Getting Started',
            order: 1,
            courseId: '1',
        },
    ],
    modules: [
        {
            id: 'module-1',
            title: 'Welcome',
            type: 'text',
            content: JSON.stringify({
                type: 'doc',
                content: [
                    {
                        type: 'paragraph',
                        content: [{ type: 'text', text: 'Welcome to the course!' }],
                    },
                ],
            }),
            order: 0,
            sectionId: 'section-1',
        },
        {
            id: 'module-2',
            title: 'Course Overview',
            type: 'text',
            content: JSON.stringify({
                type: 'doc',
                content: [
                    {
                        type: 'paragraph',
                        content: [{ type: 'text', text: 'In this course, you will learn...' }],
                    },
                ],
            }),
            order: 1,
            sectionId: 'section-1',
        },
    ],
};

// Persist the store in localStorage for development
export const courseBuilderStore = atomWithStorage<Record<string, CourseContent>>(
    'course-builder-store',
    { '1': initialContent },
);

// Helper atoms for managing the store
export const getCourseContent = atom(
    (get) => (courseId: string) => {
        const store = get(courseBuilderStore);
        return store[courseId] || { sections: [], modules: [] };
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