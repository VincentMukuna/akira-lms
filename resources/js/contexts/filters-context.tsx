import { useDebouncedCallback } from '@/hooks/use-debounced-callback';
import { router } from '@inertiajs/react';
import { format } from 'date-fns';
import { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { DateRange } from 'react-day-picker';

export interface Filters {
    search?: string;
    role?: string;
    startDate?: string;
    endDate?: string;
    [key: string]: string | undefined;
}

interface FiltersContextType {
    filters: Filters;
    dateRange: DateRange | undefined;
    updateFilter: (key: keyof Filters, value: string) => void;
    updateDateRange: (range: DateRange | undefined) => void;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

interface FiltersProviderProps {
    children: ReactNode;
    initialFilters: Filters;
    routeName: string;
}

export function FiltersProvider({ children, initialFilters, routeName }: FiltersProviderProps) {
    const [filters, setFilters] = useState<Filters>(initialFilters);
    const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
        if (initialFilters.startDate && initialFilters.endDate) {
            return {
                from: new Date(initialFilters.startDate),
                to: new Date(initialFilters.endDate),
            };
        }
        return undefined;
    });

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

    const updateDateRange = useCallback(
        (range: DateRange | undefined) => {
            setDateRange(range);
            const newFilters = {
                ...filters,
                startDate: range?.from ? format(range.from, 'yyyy-MM-dd') : undefined,
                endDate: range?.to ? format(range.to, 'yyyy-MM-dd') : undefined,
            };
            setFilters(newFilters);
            debouncedRouteUpdate(newFilters);
        },
        [filters, debouncedRouteUpdate],
    );

    return (
        <FiltersContext.Provider value={{ filters, dateRange, updateFilter, updateDateRange }}>
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
