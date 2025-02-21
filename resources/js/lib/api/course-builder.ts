import { getDefaultStore } from 'jotai';
import { getCourseContent, updateCourseContent } from '../store/course-builder';
import { type CourseContent, type Module, type Section } from '../types/course-builder';

// Initial empty content for new modules
export const emptyEditorContent = {
    type: 'doc',
    content: [
        {
            type: 'paragraph',
            content: [],
        },
    ],
};

const store = getDefaultStore();

// API functions that update the store
export async function fetchCourseContent(courseId: string): Promise<CourseContent> {
    // Get content from the store
    const getContent = store.get(getCourseContent);
    return getContent(courseId);
}

export async function updateModule(moduleId: string, data: Partial<Module>): Promise<Module> {
    // Get the current state
    const courseId = '1'; // This would come from the module in a real app
    const content = store.get(getCourseContent)(courseId);

    // Update the module
    const updatedContent = {
        ...content,
        modules: content.modules.map((m) => (m.id === moduleId ? { ...m, ...data } as Module : m)),
    };

    // Update the store
    store.set(updateCourseContent, { courseId, content: updatedContent });

    // Return the updated module
    return updatedContent.modules.find((m) => m.id === moduleId) as Module;
}

export async function createModule(data: Omit<Module, 'id'>): Promise<Module> {
    // Get the current state
    const courseId = '1'; // This would come from the section in a real app
    const content = store.get(getCourseContent)(courseId);

    // Create new module
    const newModule = {
        ...data,
        id: `module-${Date.now()}`,
    };

    // Update the store
    const updatedContent = {
        ...content,
        modules: [...content.modules, newModule],
    };
    store.set(updateCourseContent, { courseId, content: updatedContent });

    return newModule;
}

export async function createSection(data: Omit<Section, 'id'>): Promise<Section> {
    // Get the current state
    const courseId = data.courseId;
    const content = store.get(getCourseContent)(courseId);

    // Create new section
    const newSection = {
        ...data,
        id: `section-${Date.now()}`,
    };

    // Update the store
    const updatedContent = {
        ...content,
        sections: [...content.sections, newSection],
    };
    store.set(updateCourseContent, { courseId, content: updatedContent });

    return newSection;
}

export async function updateSectionOrder(sections: Section[]): Promise<Section[]> {
    if (sections.length === 0) return sections;

    // Get the current state
    const courseId = sections[0].courseId;
    const content = store.get(getCourseContent)(courseId);

    // Update the store
    const updatedContent = {
        ...content,
        sections,
    };
    store.set(updateCourseContent, { courseId, content: updatedContent });

    return sections;
}

export async function updateModuleOrder(modules: Module[]): Promise<Module[]> {
    if (modules.length === 0) return modules;

    // Get the current state
    const courseId = '1'; // This would come from the section in a real app
    const content = store.get(getCourseContent)(courseId);

    // Update the store with new module order
    const updatedContent = {
        ...content,
        modules: content.modules.map(
            (m) => modules.find((nm) => nm.id === m.id) || m,
        ),
    };
    store.set(updateCourseContent, { courseId, content: updatedContent });

    return modules;
} 