import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
    useAddModule,
    useAddSection,
    useCourseContent,
    useUpdateModule,
    useUpdateModuleOrder,
    useUpdateSectionOrder,
} from '@/hooks/use-course-builder';
import { FileText, GripVertical, Loader2, Plus } from 'lucide-react';
import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import RichTextEditor from '../RichTextEditor';

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

            // Optimistically update the UI and send the update to the server
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

            // Optimistically update the UI and send the update to the server
            updateModuleOrder.mutate(modulesToUpdate);
        }
    };

    const handleAddSection = () => {
        addSection(courseId);
    };

    const handleAddModule = (sectionId: string) => {
        addModule({ sectionId, type: 'text' });
    };

    const handleModuleContentChange = (content: string) => {
        if (selectedModule) {
            updateModule.mutate({
                moduleId: selectedModule.id,
                data: { ...selectedModule, content },
            });
        }
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
                <ScrollArea className="h-full">
                    <div className="space-y-6 p-4">
                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error.message}</AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-4">
                            <DragDropContext onDragEnd={handleDragEnd}>
                                <Droppable droppableId="sections" type="section">
                                    {(provided) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className="space-y-4"
                                        >
                                            {courseContent.sections.map((section, index) => (
                                                <Draggable
                                                    key={section.id}
                                                    draggableId={section.id}
                                                    index={index}
                                                >
                                                    {(provided) => (
                                                        <Card
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                        >
                                                            <CardContent className="space-y-4 p-4">
                                                                <div
                                                                    className="flex items-center justify-between"
                                                                    {...provided.dragHandleProps}
                                                                >
                                                                    <Input
                                                                        value={section.title}
                                                                        onChange={(e) => {
                                                                            updateSectionOrder.mutate(
                                                                                courseContent.sections.map(
                                                                                    (s) =>
                                                                                        s.id ===
                                                                                        section.id
                                                                                            ? {
                                                                                                  ...s,
                                                                                                  title: e
                                                                                                      .target
                                                                                                      .value,
                                                                                              }
                                                                                            : s,
                                                                                ),
                                                                            );
                                                                        }}
                                                                        className="h-7 px-2"
                                                                    />
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        onClick={() =>
                                                                            handleAddModule(
                                                                                section.id,
                                                                            )
                                                                        }
                                                                    >
                                                                        <Plus className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                                <Droppable
                                                                    droppableId={section.id}
                                                                    type="module"
                                                                >
                                                                    {(provided) => (
                                                                        <div
                                                                            {...provided.droppableProps}
                                                                            ref={provided.innerRef}
                                                                            className="space-y-2"
                                                                        >
                                                                            {courseContent.modules
                                                                                .filter(
                                                                                    (m) =>
                                                                                        m.sectionId ===
                                                                                        section.id,
                                                                                )
                                                                                .sort(
                                                                                    (a, b) =>
                                                                                        a.order -
                                                                                        b.order,
                                                                                )
                                                                                .map(
                                                                                    (
                                                                                        module,
                                                                                        index,
                                                                                    ) => (
                                                                                        <Draggable
                                                                                            key={
                                                                                                module.id
                                                                                            }
                                                                                            draggableId={
                                                                                                module.id
                                                                                            }
                                                                                            index={
                                                                                                index
                                                                                            }
                                                                                        >
                                                                                            {(
                                                                                                provided,
                                                                                            ) => (
                                                                                                <div
                                                                                                    ref={
                                                                                                        provided.innerRef
                                                                                                    }
                                                                                                    {...provided.draggableProps}
                                                                                                    className={`flex items-center gap-2 rounded-md border p-2 ${
                                                                                                        selectedModuleId ===
                                                                                                        module.id
                                                                                                            ? 'border-primary bg-muted'
                                                                                                            : 'border-border hover:border-primary'
                                                                                                    } cursor-pointer`}
                                                                                                    onClick={() =>
                                                                                                        setSelectedModuleId(
                                                                                                            module.id,
                                                                                                        )
                                                                                                    }
                                                                                                >
                                                                                                    <div
                                                                                                        {...provided.dragHandleProps}
                                                                                                        className="flex items-center"
                                                                                                    >
                                                                                                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                                                                                                    </div>
                                                                                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                                                                                    <span className="truncate text-sm">
                                                                                                        {
                                                                                                            module.title
                                                                                                        }
                                                                                                    </span>
                                                                                                </div>
                                                                                            )}
                                                                                        </Draggable>
                                                                                    ),
                                                                                )}
                                                                            {provided.placeholder}
                                                                        </div>
                                                                    )}
                                                                </Droppable>
                                                            </CardContent>
                                                        </Card>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </div>
                        <Button variant="outline" className="w-full" onClick={handleAddSection}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Section
                        </Button>
                    </div>
                </ScrollArea>
            </div>

            {/* Right Panel - Module Editor */}
            <div className="flex-1">
                <ScrollArea className="h-full">
                    {selectedModule ? (
                        <div className="space-y-6 p-6">
                            <div className="space-y-4">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Module Title
                                </label>
                                <Input
                                    value={selectedModule.title}
                                    onChange={(e) => {
                                        updateModule.mutate({
                                            moduleId: selectedModule.id,
                                            data: {
                                                ...selectedModule,
                                                title: e.target.value,
                                            },
                                        });
                                    }}
                                />
                            </div>
                            <Separator />
                            <RichTextEditor
                                content={selectedModule.content}
                                onChange={handleModuleContentChange}
                                key={selectedModule.id}
                                placeholder="Start writing your module content..."
                            />
                        </div>
                    ) : (
                        <div className="flex h-full items-center justify-center">
                            <div className="text-center">
                                <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
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
