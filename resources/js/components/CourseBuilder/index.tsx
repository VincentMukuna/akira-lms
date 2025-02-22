import {
    useAddModule,
    useAddSection,
    useCourseContent,
    useUpdateModule,
    useUpdateModuleOrder,
    useUpdateSection,
    useUpdateSectionOrder,
} from '@/components/CourseBuilder/hooks/use-course-builder';
import { BaseModule, CourseContent, ModuleType } from '@/components/CourseBuilder/types/course';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Loader2 } from 'lucide-react';
import { useState } from 'react';
import ModuleFactory from './ModuleFactory';
import SectionList from './SectionList';

// Import module registry and register all modules
import '@/components/CourseBuilder/modules';

interface Props {
    course_id: string;
    defaultCourseContent: CourseContent;
}

export default function CourseBuilder({ course_id, defaultCourseContent }: Props) {
    const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
    const { data: courseContent, isLoading } = useCourseContent(course_id, defaultCourseContent);
    const { addSection,  } = useAddSection();
    const { addModule, } = useAddModule();
    const updateModule = useUpdateModule();
    const updateSection = useUpdateSection();
    const updateSectionOrder = useUpdateSectionOrder();
    const updateModuleOrder = useUpdateModuleOrder();

    const selectedModule = courseContent?.modules.find((m) => m.id === selectedModuleId);
    const handleDragEnd = async (result: any) => {
        if (!result.destination || !courseContent) return;

        const { source, destination } = result;
        console.log({source, destination});

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

            // Get all modules from the source and destination sections
            const sourceModules = courseContent.modules
                .filter((m: BaseModule) => m.section_id === sourceSection)
                .sort((a: BaseModule, b: BaseModule) => a.order - b.order);
            
            const destModules = courseContent.modules
                .filter((m: BaseModule) => m.section_id === destSection)
                .sort((a: BaseModule, b: BaseModule) => a.order - b.order);

            // Remove the module from source section
            const [movedModule] = sourceModules.splice(source.index, 1);
            movedModule.section_id = destSection;

            // Insert into destination section
            destModules.splice(destination.index, 0, movedModule);

            // Update order numbers for both sections
            sourceModules.forEach((module: BaseModule, index: number) => {
                module.order = index;
            });

            destModules.forEach((module: BaseModule, index: number) => {
                module.order = index;
            });

            // Combine all modules that need updating
            const modulesToUpdate = [...sourceModules, ...destModules];

            updateModuleOrder.mutate({
                course_id: course_id,
                module_orders: modulesToUpdate.map((m: BaseModule) => ({
                    id: m.id,
                    order: m.order,
                    section_id: m.section_id,
                })),
            });
        }
    };

    const handleAddSection = () => {
        console.log('handleAddSection', course_id);
        const sectionCount = courseContent?.sections.length || 0;
        addSection({course_id, title: 'New Section', order: sectionCount+1});
    };

    const handleAddModule = (section_id: string, type: ModuleType) => {
        // By default, call it Module 1, Module 2, etc.
        const moduleCount = courseContent?.modules.filter((m) => m.section_id === section_id).length || 0;
        addModule({ section_id, course_id, type, title: `Module ${moduleCount + 1}`, order: moduleCount+1, data: null});
    };

    const handleModuleUpdate = (module: BaseModule) => {
        if (!selectedModuleId) return;
        if(!selectedModule) return;
        updateModule.mutate({
            id: selectedModuleId,
            course_id: course_id,
            type: selectedModule?.type,
            title: module.title,
            data: module.data,
        });
    };

    const handleSectionUpdate = (section: Section) => {
        updateSection.mutate({
            id: section.id,
            title: section.title,
            course_id: course_id,
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
                    <SectionList
                        sections={courseContent.sections}
                        modules={courseContent.modules}
                        selectedModuleId={selectedModuleId}
                        onSectionAdd={handleAddSection}
                        onSectionUpdate={handleSectionUpdate}
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
