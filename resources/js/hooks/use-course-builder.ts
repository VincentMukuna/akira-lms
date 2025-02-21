import {
    createModule,
    createSection,
    emptyEditorContent,
    fetchCourseContent,
    updateModule,
    updateModuleOrder,
    updateSectionOrder,
} from '@/lib/api/course-builder';
import { type Module, type Section } from '@/lib/types/course-builder';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useCourseContent(courseId: string) {
    return useQuery({
        queryKey: ['course-content', courseId],
        queryFn: () => fetchCourseContent(courseId),
    });
}

export function useUpdateModule() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ moduleId, data }: { moduleId: string; data: Partial<Module> }) =>
            updateModule(moduleId, data),
        onMutate: async ({ moduleId, data }) => {
            const courseId = '1'; // This would come from the module in a real app
            await queryClient.cancelQueries({ queryKey: ['course-content', courseId] });

            const previousData = queryClient.getQueryData(['course-content', courseId]);

            queryClient.setQueryData(['course-content', courseId], (old: any) => {
                if (!old) return;
                return {
                    ...old,
                    modules: old.modules.map((m: Module) =>
                        m.id === moduleId ? { ...m, ...data } as Module : m,
                    ),
                };
            });

            return { previousData };
        },
        onError: (err, variables, context) => {
            const courseId = '1'; // This would come from the module in a real app
            if (context?.previousData) {
                queryClient.setQueryData(['course-content', courseId], context.previousData);
            }
        },
        onSettled: () => {
            const courseId = '1'; // This would come from the module in a real app
            queryClient.invalidateQueries({ queryKey: ['course-content', courseId] });
        },
    });
}

export function useCreateModule() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Omit<Module, 'id'>) => createModule(data),
        onMutate: async (newModule) => {
            const courseId = '1'; // This would come from the section in a real app
            await queryClient.cancelQueries({ queryKey: ['course-content', courseId] });

            const previousData = queryClient.getQueryData(['course-content', courseId]);

            const tempModule = {
                ...newModule,
                id: `temp-${Date.now()}`,
            };

            queryClient.setQueryData(['course-content', courseId], (old: any) => {
                if (!old) return;
                return {
                    ...old,
                    modules: [...old.modules, tempModule as Module],
                };
            });

            return { previousData, tempModule };
        },
        onError: (err, variables, context) => {
            const courseId = '1'; // This would come from the section in a real app
            if (context?.previousData) {
                queryClient.setQueryData(['course-content', courseId], context.previousData);
            }
        },
        onSettled: () => {
            const courseId = '1'; // This would come from the section in a real app
            queryClient.invalidateQueries({ queryKey: ['course-content', courseId] });
        },
    });
}

export function useCreateSection() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Omit<Section, 'id'>) => createSection(data),
        onMutate: async (newSection) => {
            const courseId = newSection.courseId;
            await queryClient.cancelQueries({ queryKey: ['course-content', courseId] });

            const previousData = queryClient.getQueryData(['course-content', courseId]);

            const tempSection = {
                ...newSection,
                id: `temp-${Date.now()}`,
            };

            queryClient.setQueryData(['course-content', courseId], (old: any) => {
                if (!old) return;
                return {
                    ...old,
                    sections: [...old.sections, tempSection as Section],
                };
            });

            return { previousData, tempSection };
        },
        onError: (err, variables, context) => {
            const courseId = variables.courseId;
            if (context?.previousData) {
                queryClient.setQueryData(['course-content', courseId], context.previousData);
            }
        },
        onSettled: (data, error, variables) => {
            const courseId = variables.courseId;
            queryClient.invalidateQueries({ queryKey: ['course-content', courseId] });
        },
    });
}

export function useUpdateSectionOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (sections: Section[]) => updateSectionOrder(sections),
        onMutate: async (newSections) => {
            if (newSections.length === 0) return { previousData: null };
            const courseId = newSections[0].courseId;
            await queryClient.cancelQueries({ queryKey: ['course-content', courseId] });

            const previousData = queryClient.getQueryData(['course-content', courseId]);

            queryClient.setQueryData(['course-content', courseId], (old: any) => {
                if (!old) return;
                return {
                    ...old,
                    sections: newSections,
                };
            });

            return { previousData };
        },
        onError: (err, variables, context) => {
            if (variables.length === 0 || !context?.previousData) return;
            const courseId = variables[0].courseId;
            queryClient.setQueryData(['course-content', courseId], context.previousData);
        },
        onSettled: (data, error, variables) => {
            if (variables.length === 0) return;
            const courseId = variables[0].courseId;
            queryClient.invalidateQueries({ queryKey: ['course-content', courseId] });
        },
    });
}

export function useUpdateModuleOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (modules: Module[]) => updateModuleOrder(modules),
        onMutate: async (newModules) => {
            if (newModules.length === 0) return { previousData: null };
            const courseId = '1'; // This would come from the section in a real app
            await queryClient.cancelQueries({ queryKey: ['course-content', courseId] });

            const previousData = queryClient.getQueryData(['course-content', courseId]);

            queryClient.setQueryData(['course-content', courseId], (old: any) => {
                if (!old) return;
                return {
                    ...old,
                    modules: old.modules.map((m: Module) => {
                        const updatedModule = newModules.find((nm) => nm.id === m.id);
                        return updatedModule || m;
                    }),
                };
            });

            return { previousData };
        },
        onError: (err, variables, context) => {
            if (variables.length === 0 || !context?.previousData) return;
            const courseId = '1'; // This would come from the section in a real app
            queryClient.setQueryData(['course-content', courseId], context.previousData);
        },
        onSettled: (data, error, variables) => {
            if (variables.length === 0) return;
            const courseId = '1'; // This would come from the section in a real app
            queryClient.invalidateQueries({ queryKey: ['course-content', courseId] });
        },
    });
}

export function useAddModule() {
    const createModuleMutation = useCreateModule();

    const addModule = async ({
        sectionId,
        type,
    }: {
        sectionId: string;
        type: Module['type'];
    }) => {
        const order = 0; // This will be calculated on the server
        return createModuleMutation.mutateAsync({
            title: 'New Module',
            type,
            content: JSON.stringify(emptyEditorContent),
            order,
            sectionId,
        });
    };

    return {
        addModule,
        isLoading: createModuleMutation.isPending,
        error: createModuleMutation.error,
    };
}

export function useAddSection() {
    const createSectionMutation = useCreateSection();

    const addSection = async (courseId: string) => {
        const order = 0; // This will be calculated on the server
        return createSectionMutation.mutateAsync({
            title: 'New Section',
            order,
            courseId,
        });
    };

    return {
        addSection,
        isLoading: createSectionMutation.isPending,
        error: createSectionMutation.error,
    };
} 