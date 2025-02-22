import { BaseModule, CourseContent, ModuleData, ModuleType, Section } from '@/components/CourseBuilder/types/course';
import {
    updateSectionOrder as updateSectionOrderApi
} from '@/lib/api/course-builder';
import moduleRegistry from '@/lib/moduleRegistry';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { nanoid } from 'nanoid';
import { toast } from 'sonner';
import { courseBuilderApi, ModuleOrder } from '../api/course-builder-api';

interface AddModuleData {
    section_id: string;
    course_id: string;
    type: ModuleType;
    title: string;
    order: number;
    data: ModuleData[keyof ModuleData] | null | undefined;
}

interface UpdateModuleData {
    id: string;
    course_id: string;
    title: string;
    type: ModuleType;
    data: ModuleData[keyof ModuleData];
}

// Fetch course content
export function useCourseContent(course_id: string, defaultCourseContent: CourseContent) {
    return useQuery({
        queryKey: ['course-content', course_id],
        queryFn: () => courseBuilderApi.getCourseContent({ course_id: course_id }),
        initialData: defaultCourseContent,
    });
}

// Add a new section
export function useAddSection() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async ({course_id, title, order}: {course_id: string, title: string, order: number}) => {
            return courseBuilderApi.createSection({course_id, title, order});
        },
        onMutate: async ({ course_id, title, order }) => {
            const newSection: Section = {
                id: nanoid(),
                title: 'New Section',
                order: order, // Will be updated when saving
                course_id: course_id,
            };
            await queryClient.cancelQueries({ queryKey: ['course-content', course_id] });
            const previousContent = queryClient.getQueryData<CourseContent>(['course-content', course_id]);
            queryClient.setQueryData(['course-content', course_id], (old: any) => ({
                ...old,
                sections: [...(old?.sections || []), newSection],
            }));
            return { previousContent };
        },
        onSuccess: (newSection, course_id) => {
            queryClient.setQueryData(['course-content', course_id], (old: any) => ({
                ...old,
                sections: [...(old?.sections || []), newSection],
            }));
        },
        onError: (error, variables, context) => {
            console.log('onError', error, variables, context);
            toast.error('Failed to add section');
            queryClient.setQueryData(['course-content', variables.course_id], context?.previousContent);
        },
    });

    return {
        addSection: mutation.mutate,
        isLoading: mutation.isPending,
        error: mutation.error,
    };
}

// Update a section
export function useUpdateSection() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (section: {id: string, title: string, course_id: string}) => {
            return courseBuilderApi.updateSection(section);
        },
        onMutate: async (section) => {
            const previousContent = queryClient.getQueryData<CourseContent>(['course-content', section.course_id]);
            queryClient.setQueryData(['course-content', section.course_id], (old: any) => ({
                ...old,
                sections: old.sections.map((s: Section) => s.id === section.id ? section : s),
            }));
            return { previousContent };
        },
        onSuccess: (updatedSection) => {
            queryClient.setQueryData(['course-content', updatedSection.course_id], (old: any) => ({
                ...old,
                sections: old.sections.map((s: Section) => s.id === updatedSection.id ? updatedSection : s),
            }));
        },
        onError: (error, variables, context) => {
            console.log('onError', error, variables, context);
            toast.error('Failed to update section');
            queryClient.setQueryData(['course-content', variables.course_id], context?.previousContent);
        },
    });
}
// Add a new module
export function useAddModule() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async ({ section_id, type, title, order, data }: AddModuleData) => {
            // Get the module type's default data       
            const defaultData = data ? data : moduleRegistry.createDefaultData(type).data;
            console.log("DEFAULT DATA", defaultData);
            return courseBuilderApi.createModule({section_id, type, title, order, data: defaultData});
        },
        onMutate: async ({ section_id, course_id, type, title, order, data }) => {
            const newModule: BaseModule = {
                id: nanoid(),
                title: title,
                order: order, // Will be updated when saving
                section_id: section_id,
                type,
                data: data ? data : moduleRegistry.createDefaultData(type).data,
            };          

            const previousContent = queryClient.getQueryData<CourseContent>(['course-content', course_id]);

            console.log("PREVIOUS CONTENT", previousContent);
            queryClient.setQueryData(['course-content', course_id], (old: any) => ({
                ...old,
                modules: [...(old?.modules || []), newModule],
            }));
            return { previousContent };
        },        
        
        onSuccess: (newModule) => {
            queryClient.setQueriesData({ queryKey: ['course-content'] }, (old: any) => {
                if (!old) return old;
                return {
                    ...old,
                    modules: [...(old.modules || []), newModule],
                };
            });
        },

        onError: (error, variables, context) => {
            console.log('onError', error, variables, context);
            toast.error('Failed to add module');
            queryClient.setQueryData(['course-content', variables.section_id], context?.previousContent);
        },
    });

    return {
        addModule: mutation.mutate,
        isLoading: mutation.isPending,
        error: mutation.error,
    };
}

// Update a module
export function useUpdateModule() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (updateModuleData: UpdateModuleData) => {
            console.log('updateModuleData', updateModuleData);
            // Validate the module data before sending
            const courseContent = queryClient.getQueryData<CourseContent>(['course-content', updateModuleData.course_id]);
            if (!courseContent) {
                throw new Error('Course content not found');
            }

            console.log("COURSE CONTENT", courseContent);
            const module = courseContent.modules.find((m) => m.id === updateModuleData.id);
            console.log("MODULE", module);
            if (!module) {
                throw new Error('Module not found');
            }
            return courseBuilderApi.updateModule({ id: updateModuleData.id, title: updateModuleData.title, data: updateModuleData.data });
        },
        onMutate: async (updateModuleData) => {
            const previousContent = queryClient.getQueryData<CourseContent>(['course-content', updateModuleData.course_id]);
            console.log("PREVIOUS CONTENT", previousContent);
            if (!previousContent) {
                throw new Error('Previous content not found');
            }
            queryClient.setQueryData(['course-content', updateModuleData.course_id], (old: any) => ({
                ...old,
                modules: old.modules.map((m: BaseModule) => m.id === updateModuleData.id ? updateModuleData : m),
            }));
            return { previousContent };
        },

        onSuccess: (updatedModule, updateModuleData) => {
            queryClient.setQueriesData({ queryKey: ['course-content', updateModuleData.course_id] }, (old: any) => {
                if (!old) return old;
                return {
                    ...old,
                    modules: old.modules.map((m: BaseModule) =>
                        m.id === updatedModule.id ? updatedModule : m,
                    ),
                };
            });
        },

        onError: (error, variables, context) => {
            console.log('onError', error, variables, context);
            toast.error('Failed to update module');
            queryClient.setQueryData(['course-content', variables.course_id], context?.previousContent);
        },
    });
}

// Update section order
export function useUpdateSectionOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateSectionOrderApi,
        onSuccess: (updatedSections) => {
            if (!updatedSections.length) return;
            const course_id = updatedSections[0].course_id;
            queryClient.setQueryData(['course-content', course_id], (old: any) => ({
                ...old,
                sections: updatedSections,
            }));
        },
    });
}

interface UpdateModuleOrderData {
    course_id: string;
    module_orders: ModuleOrder[];
}

// Update module order
export function useUpdateModuleOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (updateModuleOrderData: UpdateModuleOrderData) => {
            return courseBuilderApi.updateModuleOrder(updateModuleOrderData);
        },
        onMutate: async (updateModuleOrderData) => {
            const previousContent = queryClient.getQueryData<CourseContent>(['course-content', updateModuleOrderData.course_id]);
            console.log("PREVIOUS CONTENT", previousContent);
            if (!previousContent) {
                throw new Error('Previous content not found');
            }
            queryClient.setQueryData(['course-content', updateModuleOrderData.course_id], (old: any) => ({
                ...old,
                modules: old.modules.map((m: BaseModule) => updateModuleOrderData.module_orders.find((mo: ModuleOrder) => mo.id === m.id) || m),
            }));
            return { previousContent };
        },
        onSuccess: (updatedModules, updateModuleOrderData) => {
            queryClient.setQueriesData({ queryKey: ['course-content', updateModuleOrderData.course_id] }, (old: any) => {
                if (!old) return old;
                return {
                    ...old,
                    modules: old.modules.map((m: BaseModule) => {
                        const updated = updatedModules.find((um: BaseModule) => um.id === m.id);
                        return updated || m;
                    }),
                };
            });
        },
        onError: (error, variables, context) => {
            console.log('onError', error, variables, context);
            toast.error('Failed to update module order');
            queryClient.setQueryData(['course-content', variables.course_id], context?.previousContent);
        },
    });
} 