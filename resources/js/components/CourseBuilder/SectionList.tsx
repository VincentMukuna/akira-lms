import { BaseModule, ModuleType, Section } from '@/components/CourseBuilder/types/course';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Input } from '@/components/ui/input';
import { useDebouncedCallback } from '@/hooks/use-debounced-callback';
import moduleRegistry from '@/lib/moduleRegistry';
import { cn } from '@/lib/utils';
import { Archive, GripVertical, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { DragDropContext, Draggable, DraggableProvided, Droppable } from 'react-beautiful-dnd';
import { toast } from 'sonner';
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

interface ModuleItemProps {
    module: BaseModule;
    index: number;
    isSelected: boolean;
    provided: DraggableProvided;
    onSelect: () => void;
    onAction: (action: string) => void;
}

function ModuleItem({ module, index, isSelected, provided, onSelect, onAction }: ModuleItemProps) {
    const ModuleIcon = moduleRegistry.get(module.type)?.icon || (() => null);

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={cn(
                        'flex items-center gap-2 rounded-md border-2 p-2.5 cursor-pointer',
                        'transition-all duration-200 ease-in-out',
                        isSelected
                            ? 'border-primary bg-primary/5 shadow-sm'
                            : 'border-border hover:border-primary/30 hover:bg-muted/50'
                    )}
                    onClick={onSelect}
                >
                    <div
                        {...provided.dragHandleProps}
                        className="flex items-center"
                    >
                        <GripVertical className="h-4 w-4 text-muted-foreground/50 hover:text-muted-foreground transition-colors cursor-grab" />
                    </div>
                    <ModuleIcon className={cn(
                        'h-4 w-4 transition-colors',
                        isSelected ? 'text-primary' : 'text-muted-foreground'
                    )} />
                    <span className="truncate text-sm font-medium flex-1">
                        {module.title || 'Untitled Module'}
                    </span>
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem
                    onClick={() => onAction('Archive module')}
                    className="gap-2"
                >
                    <Archive className="h-4 w-4" />
                    Archive
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem
                    onClick={() => onAction('Delete module')}
                    className="gap-2 text-destructive focus:text-destructive"
                >
                    <Trash2 className="h-4 w-4" />
                    Delete
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
}

interface ModuleListProps {
    modules: BaseModule[];
    sectionId: string;
    selectedModuleId: string | null;
    onModuleSelect: (moduleId: string) => void;
    onAction: (action: string) => void;
}

function ModuleList({ modules, sectionId, selectedModuleId, onModuleSelect, onAction }: ModuleListProps) {
    return (
        <Droppable droppableId={sectionId} type="module">
            {(provided) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-2 min-h-[40px]"
                >
                    {modules
                        .filter((m) => m.section_id === sectionId)
                        .sort((a, b) => a.order - b.order)
                        .map((module, index) => (
                            <Draggable
                                key={module.id}
                                draggableId={module.id}
                                index={index}
                            >
                                {(provided) => (
                                    <ModuleItem
                                        module={module}
                                        index={index}
                                        isSelected={selectedModuleId === module.id}
                                        provided={provided}
                                        onSelect={() => onModuleSelect(module.id)}
                                        onAction={onAction}
                                    />
                                )}
                            </Draggable>
                        ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}

interface SectionItemProps {
    section: Section;
    modules: BaseModule[];
    selectedModuleId: string | null;
    provided: DraggableProvided;
    onUpdate: (section: Section) => void;
    onModuleAdd: (type: ModuleType) => void;
    onModuleSelect: (moduleId: string) => void;
    onAction: (action: string) => void;
}

function SectionItem({
    section,
    modules,
    selectedModuleId,
    provided,
    onUpdate,
    onModuleAdd,
    onModuleSelect,
    onAction,
}: SectionItemProps) {
    const debouncedUpdate = useDebouncedCallback(onUpdate, 1000);
    const [sectionTitle, setSectionTitle] = useState(section.title);
    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <div className="w-full">
                    <Card 
                        ref={provided.innerRef} 
                        {...provided.draggableProps}
                        className="border-2 transition-colors hover:border-primary/50"
                    >
                        <CardHeader className="p-4 pb-0">
                            <div
                                className="flex items-center gap-3"
                                {...provided.dragHandleProps}
                            >
                                <GripVertical className="h-5 w-5 text-muted-foreground/50 hover:text-muted-foreground transition-colors cursor-grab" />
                                <Input
                                    value={sectionTitle}
                                    onChange={(e) => setSectionTitle(e.target.value)}
                                    onBlur={() => debouncedUpdate({
                                        ...section,
                                        title: sectionTitle,
                                    })}
                                    className="h-9 text-lg font-medium bg-transparent border-transparent hover:border-input focus:border-input transition-colors"
                                    placeholder="Section Title"
                                />
                                <ModuleTypeSelector
                                    onSelect={(type) => onModuleAdd(type)}
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="p-4">
                            <ModuleList
                                modules={modules}
                                sectionId={section.id}
                                selectedModuleId={selectedModuleId}
                                onModuleSelect={onModuleSelect}
                                onAction={onAction}
                            />
                        </CardContent>
                    </Card>
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem
                    onClick={() => onAction('Archive section')}
                    className="gap-2"
                >
                    <Archive className="h-4 w-4" />
                    Archive
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem
                    onClick={() => onAction('Delete section')}
                    className="gap-2 text-destructive focus:text-destructive"
                >
                    <Trash2 className="h-4 w-4" />
                    Delete
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
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
    const handleActionClick = (action: string) => {
        toast.info(`${action} feature coming soon!`);
    };

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
                                            <SectionItem
                                                section={section}
                                                modules={modules}
                                                selectedModuleId={selectedModuleId}
                                                provided={provided}
                                                onUpdate={onSectionUpdate}
                                                onModuleAdd={(type) => onModuleAdd(section.id, type)}
                                                onModuleSelect={onModuleSelect}
                                                onAction={handleActionClick}
                                            />
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
            <Button 
                variant="outline" 
                className="w-full border-2 border-dashed hover:border-primary hover:text-black hover:bg-primary/5 transition-colors" 
                onClick={onSectionAdd}
            >
                Add Section
            </Button>
        </div>
    );
} 