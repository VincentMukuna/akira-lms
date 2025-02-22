import { NavItem } from '@/components/nav-main';
import {
    Award,
    BookOpen,
    Calendar,
    FileText,
    GraduationCap,
    LayoutDashboard,
    MessageSquare,
    Settings,
    TrendingUp,
    Users,
} from 'lucide-react';

export const navigation: Record<string, { main: NavItem[] }> = {
    admin: {
        main: [
            {
                title: 'Dashboard',
                url: '/admin/dashboard',
                icon: LayoutDashboard,
            },
            {
                title: 'Users',
                url: '/admin/users',
                icon: Users,
                items: [
                    {
                        title: 'All Users',
                        url: '/admin/users',
                    },
                    {
                        title: 'Invite Users',
                        url: '/admin/users/invite',
                    },
                ],
            },
            {
                title: 'Courses',
                url: '/courses',
                icon: BookOpen,
                items: [
                    {
                        title: 'All Courses',
                        url: '/courses',
                    },
                    {
                        title: 'Create Course',
                        url: '/courses/create',
                    },
                ],
            },
            {
                title: 'Reports',
                url: '/admin/reports',
                icon: FileText,
            },
            {
                title: 'Settings',
                url: '/admin/settings',
                icon: Settings,
            },
        ],
    },
    instructor: {
        main: [
            {
                title: 'Dashboard',
                url: '/instructor/dashboard',
                icon: LayoutDashboard,
            },
            {
                title: 'Courses',
                url: '/instructor/courses',
                icon: BookOpen,
                items: [
                    {
                        title: 'All Courses',
                        url: '/instructor/courses',
                    },
                    {
                        title: 'Create Course',
                        url: '/instructor/courses/create',
                    },
                ],
            },
            {
                title: 'Settings',
                url: '/instructor/settings',
                icon: Settings,
            },
        ],
    },
    learner: {
        main: [
            {
                title: 'Dashboard',
                url: '/learner/dashboard',
                icon: LayoutDashboard,
            },
            {
                title: 'My Courses',
                url: '/learner/courses',
                icon: GraduationCap,
                items: [
                    {
                        title: 'All Courses',
                        url: '/learner/courses',
                    },
                    {
                        title: 'In Progress',
                        url: '/learner/courses/in-progress',
                    },
                    {
                        title: 'Completed',
                        url: '/learner/courses/completed',
                    },
                ],
            },
            {
                title: 'Progress',
                url: '/learner/progress',
                icon: TrendingUp,
            },
            {
                title: 'Calendar',
                url: '/learner/calendar',
                icon: Calendar,
            },
            {
                title: 'Achievements',
                url: '/learner/achievements',
                icon: Award,
            },
            {
                title: 'Messages',
                url: '/learner/messages',
                icon: MessageSquare,
            },
            {
                title: 'Settings',
                url: '/learner/settings',
                icon: Settings,
            },
        ],
    },
} as const;

export type NavigationRole = keyof typeof navigation;
export type NavigationConfig = typeof navigation;
