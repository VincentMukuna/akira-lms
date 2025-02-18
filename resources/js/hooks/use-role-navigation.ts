import { navigation, NavigationRole } from '@/config/navigation';
import { usePage } from '@inertiajs/react';
import { Config } from 'ziggy-js';

interface User {
    id: number;
    name: string;
    email: string;
}

interface PageProps extends Record<string, unknown> {
    auth: {
        user: User;
        roles: string[];
    };
    ziggy: Config & { location: string };
}

export function useRoleNavigation() {
    const { auth } = usePage<PageProps>().props;
    const roles = auth?.roles || [];

    // Get the highest priority role (admin > instructor > learner)
    const getActiveRole = (): NavigationRole => {
        if (roles.includes('admin')) return 'admin';
        if (roles.includes('instructor')) return 'instructor';
        return 'learner';
    };

    const activeRole = getActiveRole();
    const activeNavigation = navigation[activeRole];

    return {
        activeRole,
        activeNavigation,
        roles,
    };
}
