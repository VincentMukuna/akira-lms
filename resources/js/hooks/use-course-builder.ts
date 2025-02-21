import { BaseModule, ModuleType, Section } from '@/components/CourseBuilder/types/course';
import {
    createModule,
    createSection,
    fetchCourseContent,
    updateModule as updateModuleApi,
    updateModuleOrder as updateModuleOrderApi,
    updateSectionOrder as updateSectionOrderApi,
} from '@/lib/api/course-builder';
import moduleRegistry from '@/lib/moduleRegistry';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { nanoid } from 'nanoid';

interface AddModuleData {
    sectionId: string;
    type: ModuleType;
    [key: string]: any;
}

interface UpdateModuleData {
    moduleId: string;
    data: BaseModule;
}

// Fetch course content
export function useCourseContent(courseId: string) {
    return useQuery({
        queryKey: ['course-content', courseId],
        queryFn: () => fetchCourseContent(courseId),
    });
}

// Add a new section
export function useAddSection() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (courseId: string) => {
            const newSection: Section = {
                id: nanoid(),
                title: 'New Section',
                order: 0, // Will be updated when saving
                courseId,
            };

            return createSection(newSection);
        },
        onSuccess: (newSection, courseId) => {
            queryClient.setQueryData(['course-content', courseId], (old: any) => ({
                ...old,
                sections: [...(old?.sections || []), newSection],
            }));
        },
    });

    return {
        addSection: mutation.mutate,
        isLoading: mutation.isPending,
        error: mutation.error,
    };
}

// Add a new module
export function useAddModule() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async ({ sectionId, type, ...rest }: AddModuleData) => {
            // Get the module type's default data
            const defaultData = moduleRegistry.createDefaultData(type);

            // Create the new module with the default data
            const newModule: BaseModule = {
                id: nanoid(),
                title: 'New Module',
                order: 0, // Will be updated when saving
                sectionId,
                type,
                ...defaultData,
                ...rest, // Allow overriding defaults except for core properties
            };

            return createModule(newModule);
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
        mutationFn: async ({ moduleId, data }: UpdateModuleData) => {
            // Validate the module data before sending
            const validationError = moduleRegistry.validate(data);
            if (validationError) {
                throw new Error(validationError);
            }

            return updateModuleApi(moduleId, data);
        },
        onSuccess: (updatedModule) => {
            queryClient.setQueriesData({ queryKey: ['course-content'] }, (old: any) => {
                if (!old) return old;
                return {
                    ...old,
                    modules: old.modules.map((m: BaseModule) =>
                        m.id === updatedModule.id ? updatedModule : m,
                    ),
                };
            });
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
            const courseId = updatedSections[0].courseId;
            queryClient.setQueryData(['course-content', courseId], (old: any) => ({
                ...old,
                sections: updatedSections,
            }));
        },
    });
}

// Update module order
export function useUpdateModuleOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateModuleOrderApi,
        onSuccess: (updatedModules) => {
            queryClient.setQueriesData({ queryKey: ['course-content'] }, (old: any) => {
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
    });
} 