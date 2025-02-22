import { BaseModule, CourseContent, Section } from '@/components/CourseBuilder/types/course';
import { getDefaultStore } from 'jotai';
import { getCourseContent, updateCourseContent } from '../../components/CourseBuilder/store/course-builder';

const store = getDefaultStore();

function getcourse_idFromModule(moduleId: string, content: CourseContent): string | null {
    const module = content.modules.find((m) => m.id === moduleId);
    if (!module) return null;
    const section = content.sections.find((s) => s.id === module.sectionId);
    return section?.course_id || null;
}

function getcourse_idFromSection(sectionId: string, content: CourseContent): string | null {
    const section = content.sections.find((s) => s.id === sectionId);
    return section?.course_id || null;
}

export async function fetchCourseContent(course_id: string): Promise<CourseContent> {
    const getContent = store.get(getCourseContent);
    if (!getContent) return { sections: [], modules: [] };
    return getContent(course_id);
}

export async function updateModule(moduleId: string, data: Partial<BaseModule>): Promise<BaseModule> {
    
    const allContent = await fetchCourseContent('1'); 
    const course_id = getcourse_idFromModule(moduleId, allContent);
    if (!course_id) throw new Error('Module not found');

    const content = await fetchCourseContent(course_id);

    const updatedContent: CourseContent = {
        ...content,
        modules: content.modules.map((m: BaseModule) =>
            m.id === moduleId ? { ...m, ...data } as BaseModule : m,
        ),
    };

    store.set(updateCourseContent, { course_id, content: updatedContent });

    
    return updatedContent.modules.find((m: BaseModule) => m.id === moduleId) as BaseModule;
}

export async function createModule(data: Omit<BaseModule, 'id'>): Promise<BaseModule> {
    const allContent = await fetchCourseContent('1'); 
    const course_id = getcourse_idFromSection(data.sectionId, allContent);
    if (!course_id) throw new Error('Section not found');

    const content = await fetchCourseContent(course_id);

    const newModule: BaseModule = {
        ...data,
        id: `module-${Date.now()}`,
    };

    const updatedContent: CourseContent = {
        ...content,
        modules: [...content.modules, newModule],
    };
    store.set(updateCourseContent, { course_id, content: updatedContent });

    return newModule;
}

export async function createSection(data: Omit<Section, 'id'>): Promise<Section> {
    const course_id = data.course_id;
    const content = await fetchCourseContent(course_id);

    const newSection: Section = {
        ...data,
        id: `section-${Date.now()}`,
    };

    const updatedContent: CourseContent = {
        ...content,
        sections: [...content.sections, newSection],
    };
    store.set(updateCourseContent, { course_id, content: updatedContent });

    return newSection;
}

export async function updateSectionOrder(sections: Section[]): Promise<Section[]> {
    if (sections.length === 0) return sections;

    const course_id = sections[0].course_id;
    const content = await fetchCourseContent(course_id);

    const updatedContent: CourseContent = {
        ...content,
        sections,
    };
    store.set(updateCourseContent, { course_id, content: updatedContent });

    return sections;
}

export async function updateModuleOrder(modules: BaseModule[]): Promise<BaseModule[]> {
    if (modules.length === 0) return modules;

    const allContent = await fetchCourseContent('1'); 
    const course_id = getcourse_idFromModule(modules[0].id, allContent);
    if (!course_id) throw new Error('Module not found');

    const content = await fetchCourseContent(course_id);

    const updatedContent: CourseContent = {
        ...content,
        modules: content.modules.map(
            (m: BaseModule) => modules.find((nm) => nm.id === m.id) || m,
        ),
    };
    store.set(updateCourseContent, { course_id, content: updatedContent });

    return modules;
} 