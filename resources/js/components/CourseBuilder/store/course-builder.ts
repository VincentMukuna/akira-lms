import { atom } from 'jotai';
import { CourseContent } from '../types/course';


interface CourseStore {
    [course_id: string]: CourseContent;
}

const initialStore: CourseStore = {};

const courseBuilderStore = atom<CourseStore>(initialStore);

export const getCourseContent = atom(
    (get) => (course_id: string) => {
        const store = get(courseBuilderStore);
        return (
            store[course_id] || {
                sections: [],
                modules: [],
            }
        );
    },
);


export const updateCourseContent = atom(
    null,
    (get, set, { course_id, content }: { course_id: string; content: CourseContent }) => {
        const store = get(courseBuilderStore);
        set(courseBuilderStore, {
            ...store,
            [course_id]: content,
        });
    },
); 