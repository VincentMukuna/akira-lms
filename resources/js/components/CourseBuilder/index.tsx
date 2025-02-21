import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    useAddModule,
    useAddSection,
    useCourseContent,
    useUpdateModule,
    useUpdateModuleOrder,
    useUpdateSectionOrder,
} from '@/hooks/use-course-builder';
import { BaseModule, ModuleType } from '@/types/course';
import { FileText, Loader2 } from 'lucide-react';
import { useState } from 'react';
import ModuleFactory from './ModuleFactory';
import SectionList from './SectionList';

// Import module registry and register all modules
import '@/lib/modules';

interface Props {
    courseId: string;
}

export default function CourseBuilder({ courseId }: Props) {
    const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
    const { data: courseContent, isLoading } = useCourseContent(courseId);
    const { addSection, error: addSectionError } = useAddSection();
    const { addModule, error: addModuleError } = useAddModule();
    const updateModule = useUpdateModule();
    const updateSectionOrder = useUpdateSectionOrder();
    const updateModuleOrder = useUpdateModuleOrder();

    const selectedModule = courseContent?.modules.find((m) => m.id === selectedModuleId);
    const error = addSectionError || addModuleError || updateModule.error;

    const handleDragEnd = async (result: any) => {
        if (!result.destination || !courseContent) return;

        const { source, destination } = result;

        if (result.type === 'section') {
            const newSections = [...courseContent.sections];
            const [movedSection] = newSections.splice(source.index, 1);
            newSections.splice(destination.index, 0, movedSection);

            // Update order numbers
            newSections.forEach((section, index) => {
                section.order = index;
            });

            updateSectionOrder.mutate(newSections);
        } else {
            const sourceSection = source.droppableId;
            const destSection = destination.droppableId;

            const modulesToUpdate = courseContent.modules.filter(
                (m) => m.sectionId === sourceSection || m.sectionId === destSection,
            );

            const [movedModule] = modulesToUpdate.splice(source.index, 1);
            movedModule.sectionId = destSection;
            modulesToUpdate.splice(destination.index, 0, movedModule);

            // Update order numbers
            modulesToUpdate.forEach((module, index) => {
                module.order = index;
            });

            updateModuleOrder.mutate(modulesToUpdate);
        }
    };

    const handleAddSection = () => {
        addSection(courseId);
    };

    const handleAddModule = (sectionId: string, type: ModuleType) => {
        // By default, call it Module 1, Module 2, etc.
        const moduleCount = courseContent?.modules.filter((m) => m.sectionId === sectionId).length || 0;
        addModule({ sectionId, type, title: `Module ${moduleCount + 1}` });
    };

    const handleModuleUpdate = (module: BaseModule) => {
        updateModule.mutate({
            moduleId: module.id,
            data: module,
        });
    };

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!courseContent) return null;

    return (
        <div className="flex h-[calc(100vh-4rem)]">
            {/* Left Sidebar - Course Structure */}
            <div className="w-80 border-r">
                <ScrollArea className="h-full pe-4 -ps-4">
                    {error && (
                        <Alert variant="destructive" className="m-4">
                            <AlertDescription>{error.message}</AlertDescription>
                        </Alert>
                    )}
                    <SectionList
                        sections={courseContent.sections}
                        modules={courseContent.modules}
                        selectedModuleId={selectedModuleId}
                        onSectionAdd={handleAddSection}
                        onSectionUpdate={(section) =>
                            updateSectionOrder.mutate(
                                courseContent.sections.map((s) =>
                                    s.id === section.id ? { ...section, courseId } : s,
                                ),
                            )
                        }
                        onModuleAdd={handleAddModule}
                        onModuleSelect={setSelectedModuleId}
                        onDragEnd={handleDragEnd}
                    />
                </ScrollArea>
            </div>

            {/* Right Panel - Module Editor */}
            <div className="flex-1">
                <ScrollArea className="h-full">
                    {selectedModule ? (
                        <div className="p-6">
                            <ModuleFactory
                                module={selectedModule}
                                onChange={handleModuleUpdate}
                            />
                        </div>
                    ) : (
                        <div className="flex h-full items-center justify-center">
                            <div className="text-center">
                                <div className="mx-auto h-12 w-12 text-muted-foreground">
                                    <FileText className="h-full w-full" />
                                </div>
                                <h3 className="mt-2 text-sm font-medium">No module selected</h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Select a module from the sidebar to start editing
                                </p>
                            </div>
                        </div>
                    )}
                </ScrollArea>
            </div>
        </div>
    );
}
