import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import moduleRegistry from '@/lib/moduleRegistry';
import { ModuleType } from '@/types/course';
import { Plus } from 'lucide-react';

interface ModuleTypeSelectorProps {
    onSelect: (type: ModuleType) => void;
}

export default function ModuleTypeSelector({ onSelect }: ModuleTypeSelectorProps) {
    const moduleTypes = moduleRegistry.getAll();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {moduleTypes.map((moduleType) => {
                    const Icon = moduleType.icon;
                    return (
                        <DropdownMenuItem
                            key={moduleType.type}
                            onClick={() => onSelect(moduleType.type)}
                        >
                            <Icon className="mr-2 h-4 w-4" />
                            <span>{moduleType.name}</span>
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
} 