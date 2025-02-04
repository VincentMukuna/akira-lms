'use client';

import {
    Award,
    BarChart,
    BookOpen,
    Calendar,
    GraduationCap,
    MessageSquare,
    Settings2,
    User,
} from 'lucide-react';
import type * as React from 'react';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { NavCourses } from './nav-courses';
import { NavMain } from './nav-main';
import { NavSecondary } from './nav-secondary';
import { NavUser } from './nav-user';

const data = {
    user: {
        name: 'Alex Johnson',
        email: 'alex@example.com',
        avatar: '/avatars/alex-johnson.jpg',
    },
    navMain: [
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: BarChart,
            isActive: true,
        },
        {
            title: 'My Courses',
            url: '/courses',
            icon: BookOpen,
            items: [
                {
                    title: 'In Progress',
                    url: '/courses/in-progress',
                },
                {
                    title: 'Completed',
                    url: '/courses/completed',
                },
                {
                    title: 'Bookmarked',
                    url: '/courses/bookmarked',
                },
            ],
        },
        {
            title: 'Calendar',
            url: '/calendar',
            icon: Calendar,
        },
        {
            title: 'Achievements',
            url: '/achievements',
            icon: Award,
        },
        {
            title: 'Messages',
            url: '/messages',
            icon: MessageSquare,
        },
        {
            title: 'Profile',
            url: '/profile',
            icon: User,
        },
        {
            title: 'Settings',
            url: '/settings',
            icon: Settings2,
        },
    ],
    navSecondary: [
        {
            title: 'Help Center',
            url: '/help',
            icon: MessageSquare,
        },
    ],
    courses: [
        {
            name: 'Introduction to AI',
            url: '/courses/intro-to-ai',
            icon: GraduationCap,
        },
        {
            name: 'Data Science Fundamentals',
            url: '/courses/data-science-fundamentals',
            icon: GraduationCap,
        },
        {
            name: 'Machine Learning Basics',
            url: '/courses/machine-learning-basics',
            icon: GraduationCap,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { isMobile } = useSidebar();

    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="/dashboard">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <GraduationCap className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        AkiraLMS
                                    </span>
                                    <span className="truncate text-xs">
                                        Learner Dashboard
                                    </span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavCourses courses={data.courses} isMobile={isMobile} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    );
}
