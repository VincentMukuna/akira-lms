import { BaseModule, ModuleRegistryEntry } from '@/components/CourseBuilder/types/course';

class ModuleRegistry {
    private modules: Map<string, ModuleRegistryEntry> = new Map();

    register(module: ModuleRegistryEntry) {
        // if (this.modules.has(module.type)) {
        //     throw new Error(`Module type ${module.type} is already registered`);
        // }
        this.modules.set(module.type, module);
    }

    get(type: string): ModuleRegistryEntry | undefined {
        return this.modules.get(type);
    }

    getAll(): ModuleRegistryEntry[] {
        return Array.from(this.modules.values());
    }

    createDefaultData(type: string): BaseModule & { data: any } {
        const module = this.modules.get(type);
        if (!module) {
            throw new Error(`Module type ${type} not found`);
        }
        return module.defaultData();
    }

    validate(module: BaseModule & { data: any }): Record<string, string> | null {
        const moduleType = this.modules.get(module.type);
        if (!moduleType) {
            return { error: 'Invalid module type' };
        }
        return moduleType.validate?.(module) ?? null;
    }
}

export const moduleRegistry = new ModuleRegistry();

// Export a singleton instance
export default moduleRegistry; 