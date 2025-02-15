import { useDebouncedCallback } from '@/hooks/use-debounced-callback';
import { router } from '@inertiajs/react';
import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

export interface Filters {
    search?: string;
    role?: string;
    [key: string]: string | undefined;
}

interface FiltersContextType {
    filters: Filters;
    updateFilter: (key: keyof Filters, value: string) => void;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

interface FiltersProviderProps {
    children: ReactNode;
    initialFilters: Filters;
    routeName: string;
}

export function FiltersProvider({ children, initialFilters, routeName }: FiltersProviderProps) {
    const [filters, setFilters] = useState<Filters>(initialFilters);

    const debouncedRouteUpdate = useDebouncedCallback((newFilters: Filters) => {
        router.get(
            route(routeName),
            { ...newFilters },
            { preserveState: true, preserveScroll: true },
        );
    }, 300);

    const updateFilter = useCallback(
        (key: keyof Filters, value: string) => {
            const newFilters = { ...filters, [key]: value || undefined };
            setFilters(newFilters);
            debouncedRouteUpdate(newFilters);
        },
        [filters, debouncedRouteUpdate],
    );

    return (
        <FiltersContext.Provider value={{ filters, updateFilter }}>
            {children}
        </FiltersContext.Provider>
    );
}

export function useFilters() {
    const context = useContext(FiltersContext);
    if (context === undefined) {
        throw new Error('useFilters must be used within a FiltersProvider');
    }
    return context;
}
