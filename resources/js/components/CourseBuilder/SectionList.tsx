import { BaseModule, ModuleType, Section } from '@/components/CourseBuilder/types/course';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import moduleRegistry from '@/lib/moduleRegistry';
import { GripVertical } from 'lucide-react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import ModuleTypeSelector from './ModuleTypeSelector';

interface SectionListProps {
    sections: Section[];
    modules: BaseModule[];
    selectedModuleId: string | null;
    onSectionAdd: () => void;
    onSectionUpdate: (section: Section) => void;
    onModuleAdd: (sectionId: string, type: ModuleType) => void;
    onModuleSelect: (moduleId: string) => void;
    onDragEnd: (result: any) => void;
}

export default function SectionList({
    sections,
    modules,
    selectedModuleId,
    onSectionAdd,
    onSectionUpdate,
    onModuleAdd,
    onModuleSelect,
    onDragEnd,
}: SectionListProps) {
    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="sections" type="section">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                                {sections.map((section, index) => (
                                    <Draggable key={section.id} draggableId={section.id} index={index}>
                                        {(provided) => (
                                            <Card ref={provided.innerRef} {...provided.draggableProps}>
                                                <CardContent className="space-y-4 p-4">
                                                    <div
                                                        className="flex items-center justify-between"
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <Input
                                                            value={section.title}
                                                            onChange={(e) =>
                                                                onSectionUpdate({
                                                                    ...section,
                                                                    title: e.target.value,
                                                                })
                                                            }
                                                            className="h-7 px-2 me-2"
                                                        />
                                                        <ModuleTypeSelector
                                                            onSelect={(type) => onModuleAdd(section.id, type)}
                                                        />
                                                    </div>
                                                    <Droppable droppableId={section.id} type="module">
                                                        {(provided) => (
                                                            <div
                                                                {...provided.droppableProps}
                                                                ref={provided.innerRef}
                                                                className="space-y-2"
                                                            >
                                                                {modules
                                                                    .filter((m) => m.section_id === section.id)
                                                                    .sort((a, b) => a.order - b.order)
                                                                    .map((module, index) => {
                                                                        const ModuleIcon = moduleRegistry.get(module.type)?.icon || (() => null);
                                                                        return (
                                                                            <Draggable
                                                                                key={module.id}
                                                                                draggableId={module.id}                                                                                
                                                                                index={index}
                                                                            >
                                                                                {(provided) => (
                                                                                    <div
                                                                                        ref={provided.innerRef}
                                                                                        {...provided.draggableProps}
                                                                                        className={`flex items-center gap-2 rounded-md border p-2 ${
                                                                                            selectedModuleId ===
                                                                                            module.id
                                                                                                ? 'border-primary bg-muted'
                                                                                                : 'border-border hover:border-primary'
                                                                                        } cursor-pointer`}
                                                                                        onClick={() =>
                                                                                            onModuleSelect(module.id)
                                                                                        }
                                                                                    >
                                                                                        <div
                                                                                            {...provided.dragHandleProps}
                                                                                            className="flex items-center"
                                                                                        >
                                                                                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                                                                                        </div>
                                                                                        <ModuleIcon className="h-4 w-4 text-muted-foreground" />
                                                                                        <span className="truncate text-sm">
                                                                                            {module.title}
                                                                                        </span>
                                                                                    </div>
                                                                                )}
                                                                            </Draggable>
                                                                        );
                                                                    })}
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
            <Button variant="outline" className="w-full" onClick={onSectionAdd}>
                Add Section
            </Button>
        </div>
    );
} 