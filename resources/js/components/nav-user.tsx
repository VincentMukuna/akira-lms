'use client';

import { usePage } from '@inertiajs/react';
import { User as UserIcon } from 'lucide-react';
import { Config } from 'ziggy-js';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar';

interface User {
    id: number;
    name: string;
    email: string;
}

interface PageProps extends Record<string, unknown> {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
}

export function NavUser() {
    const { auth } = usePage<PageProps>().props;

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <a href="/profile">
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-muted">
                            <UserIcon className="size-4" />
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">{auth.user.name}</span>
                            <span className="truncate text-xs text-muted-foreground">
                                {auth.user.email}
                            </span>
                        </div>
                    </a>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
