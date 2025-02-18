import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { type CourseContent, type Module, type Section } from '../types/course-builder';

// Mock API functions (to be replaced with real API calls later)
const mockCourseContent: CourseContent = {
    sections: [],
    modules: [],
};

export async function fetchCourseContent(_courseId: string): Promise<CourseContent> {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockCourseContent);
        }, 500);
    });
}

export async function updateModule(moduleId: string, data: Partial<Module>): Promise<Module> {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                ...data,
                id: moduleId,
            } as Module);
        }, 500);
    });
}

export async function createModule(data: Omit<Module, 'id'>): Promise<Module> {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                ...data,
                id: `module-${Date.now()}`,
            });
        }, 500);
    });
}

export async function createSection(data: Omit<Section, 'id'>): Promise<Section> {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                ...data,
                id: `section-${Date.now()}`,
            });
        }, 500);
    });
}

export async function updateSectionOrder(sections: Section[]): Promise<Section[]> {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(sections);
        }, 500);
    });
}

export async function updateModuleOrder(modules: Module[]): Promise<Module[]> {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(modules);
        }, 500);
    });
}

// Atoms
export const courseContentAtom = atomWithStorage<CourseContent>(
    'course-content',
    mockCourseContent,
);
export const selectedModuleIdAtom = atom<string | null>(null);
export const isLoadingAtom = atom(false);
export const errorAtom = atom<string | null>(null);

// Derived atoms
export const selectedModuleAtom = atom((get) => {
    const moduleId = get(selectedModuleIdAtom);
    const content = get(courseContentAtom);
    return moduleId ? content.modules.find((m) => m.id === moduleId) || null : null;
});

// Action Atoms with optimistic updates
export const updateModuleContentAtom = atom(
    null,
    async (get, set, { moduleId, content }: { moduleId: string; content: string }) => {
        const courseContent = get(courseContentAtom);
        const currentModule = courseContent.modules.find((m) => m.id === moduleId);

        if (!currentModule) return;

        const updatedModule = {
            ...currentModule,
            content,
        };

        // Optimistic update
        set(courseContentAtom, {
            ...courseContent,
            modules: courseContent.modules.map((m) => (m.id === moduleId ? updatedModule : m)),
        });

        try {
            // API call in the background
            await updateModule(moduleId, updatedModule);
        } catch (error) {
            // Revert on error
            set(courseContentAtom, courseContent);
            set(errorAtom, 'Failed to update module content');
        }
    },
);

export const addModuleAtom = atom(
    null,
    async (get, set, { sectionId, type }: { sectionId: string; type: Module['type'] }) => {
        const courseContent = get(courseContentAtom);
        const sectionModules = courseContent.modules.filter((m) => m.sectionId === sectionId);
        const order =
            sectionModules.length > 0 ? Math.max(...sectionModules.map((m) => m.order)) + 1 : 0;

        // Create optimistic module with empty content
        const optimisticModule: Module = {
            id: `temp-${Date.now()}`,
            title: 'New Module',
            type,
            content: '<p></p>', // Initialize with empty paragraph for rich text editor
            order,
            sectionId,
        };

        // Optimistic update
        set(courseContentAtom, {
            ...courseContent,
            modules: [...courseContent.modules, optimisticModule],
        });
        set(selectedModuleIdAtom, optimisticModule.id);

        try {
            // API call in the background
            const newModule = await createModule({
                title: optimisticModule.title,
                type,
                content: optimisticModule.content,
                order,
                sectionId,
            });

            // Update with real module data
            set(courseContentAtom, {
                ...courseContent,
                modules: [
                    ...courseContent.modules.filter((m) => m.id !== optimisticModule.id),
                    newModule,
                ],
            });
            set(selectedModuleIdAtom, newModule.id);
        } catch (error) {
            // Revert on error
            set(courseContentAtom, courseContent);
            set(selectedModuleIdAtom, null);
            set(errorAtom, 'Failed to add module');
        }
    },
);

export const addSectionAtom = atom(null, async (get, set, courseId: string) => {
    const courseContent = get(courseContentAtom);
    const order =
        courseContent.sections.length > 0
            ? Math.max(...courseContent.sections.map((s) => s.order)) + 1
            : 0;

    // Create optimistic section
    const optimisticSection: Section = {
        id: `temp-${Date.now()}`,
        title: 'New Section',
        order,
        courseId,
    };

    // Optimistic update
    set(courseContentAtom, {
        ...courseContent,
        sections: [...courseContent.sections, optimisticSection],
    });

    try {
        // API call in the background
        const newSection = await createSection({
            title: optimisticSection.title,
            order,
            courseId,
        });

        // Update with real section data
        set(courseContentAtom, {
            ...courseContent,
            sections: [
                ...courseContent.sections.filter((s) => s.id !== optimisticSection.id),
                newSection,
            ],
        });
    } catch (error) {
        // Revert on error
        set(courseContentAtom, courseContent);
        set(errorAtom, 'Failed to add section');
    }
});
