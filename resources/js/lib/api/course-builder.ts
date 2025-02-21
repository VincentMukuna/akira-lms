import { BaseModule, Section } from '@/types/course';
import { getDefaultStore } from 'jotai';
import { CourseContent, getCourseContent, updateCourseContent } from '../store/course-builder';

const store = getDefaultStore();

function getCourseIdFromModule(moduleId: string, content: CourseContent): string | null {
    const module = content.modules.find((m) => m.id === moduleId);
    if (!module) return null;
    const section = content.sections.find((s) => s.id === module.sectionId);
    return section?.courseId || null;
}

function getCourseIdFromSection(sectionId: string, content: CourseContent): string | null {
    const section = content.sections.find((s) => s.id === sectionId);
    return section?.courseId || null;
}

export async function fetchCourseContent(courseId: string): Promise<CourseContent> {
    const getContent = store.get(getCourseContent);
    if (!getContent) return { sections: [], modules: [] };
    return getContent(courseId);
}

export async function updateModule(moduleId: string, data: Partial<BaseModule>): Promise<BaseModule> {
    
    const allContent = await fetchCourseContent('1'); 
    const courseId = getCourseIdFromModule(moduleId, allContent);
    if (!courseId) throw new Error('Module not found');

    const content = await fetchCourseContent(courseId);

    const updatedContent: CourseContent = {
        ...content,
        modules: content.modules.map((m: BaseModule) =>
            m.id === moduleId ? { ...m, ...data } as BaseModule : m,
        ),
    };

    store.set(updateCourseContent, { courseId, content: updatedContent });

    
    return updatedContent.modules.find((m: BaseModule) => m.id === moduleId) as BaseModule;
}

export async function createModule(data: Omit<BaseModule, 'id'>): Promise<BaseModule> {
    const allContent = await fetchCourseContent('1'); 
    const courseId = getCourseIdFromSection(data.sectionId, allContent);
    if (!courseId) throw new Error('Section not found');

    const content = await fetchCourseContent(courseId);

    const newModule: BaseModule = {
        ...data,
        id: `module-${Date.now()}`,
    };

    const updatedContent: CourseContent = {
        ...content,
        modules: [...content.modules, newModule],
    };
    store.set(updateCourseContent, { courseId, content: updatedContent });

    return newModule;
}

export async function createSection(data: Omit<Section, 'id'>): Promise<Section> {
    const courseId = data.courseId;
    const content = await fetchCourseContent(courseId);

    const newSection: Section = {
        ...data,
        id: `section-${Date.now()}`,
    };

    const updatedContent: CourseContent = {
        ...content,
        sections: [...content.sections, newSection],
    };
    store.set(updateCourseContent, { courseId, content: updatedContent });

    return newSection;
}

export async function updateSectionOrder(sections: Section[]): Promise<Section[]> {
    if (sections.length === 0) return sections;

    const courseId = sections[0].courseId;
    const content = await fetchCourseContent(courseId);

    const updatedContent: CourseContent = {
        ...content,
        sections,
    };
    store.set(updateCourseContent, { courseId, content: updatedContent });

    return sections;
}

export async function updateModuleOrder(modules: BaseModule[]): Promise<BaseModule[]> {
    if (modules.length === 0) return modules;

    const allContent = await fetchCourseContent('1'); 
    const courseId = getCourseIdFromModule(modules[0].id, allContent);
    if (!courseId) throw new Error('Module not found');

    const content = await fetchCourseContent(courseId);

    const updatedContent: CourseContent = {
        ...content,
        modules: content.modules.map(
            (m: BaseModule) => modules.find((nm) => nm.id === m.id) || m,
        ),
    };
    store.set(updateCourseContent, { courseId, content: updatedContent });

    return modules;
} 