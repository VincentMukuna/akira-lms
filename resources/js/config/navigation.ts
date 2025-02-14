import { NavItem } from '@/components/nav-main';
import {
    Award,
    BarChart,
    BookOpen,
    Calendar,
    FileText,
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
                icon: BarChart,
                url: '/admin/dashboard',
            },
            {
                title: 'Users',
                icon: Users,
                url: '/admin/users',
                items: [
                    {
                        title: 'Manage Users',
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
                icon: BookOpen,
                url: '/admin/courses',
            },
            {
                title: 'Reports',
                icon: FileText,
                url: '/admin/reports',
            },
            {
                title: 'Settings',
                icon: Settings,
                url: '/admin/settings',
            },
        ],
    },
    instructor: {
        main: [
            {
                title: 'Dashboard',
                icon: BarChart,
                url: '/instructor/dashboard',
            },
            {
                title: 'My Courses',
                icon: BookOpen,
                url: '/instructor/courses',
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
                title: 'Students',
                icon: Users,
                url: '/instructor/students',
            },
            {
                title: 'Calendar',
                icon: Calendar,
                url: '/instructor/calendar',
            },
            {
                title: 'Assessments',
                icon: FileText,
                url: '/instructor/assessments',
            },
        ],
    },
    learner: {
        main: [
            {
                title: 'Dashboard',
                icon: BarChart,
                url: '/learner/dashboard',
            },
            {
                title: 'My Courses',
                icon: BookOpen,
                url: '/learner/courses',
                items: [
                    {
                        title: 'In Progress',
                        url: '/learner/courses/in-progress',
                    },
                    {
                        title: 'Completed',
                        url: '/learner/courses/completed',
                    },
                    {
                        title: 'Bookmarked',
                        url: '/learner/courses/bookmarked',
                    },
                ],
            },
            {
                title: 'Progress',
                icon: TrendingUp,
                url: '/learner/progress',
            },
            {
                title: 'Calendar',
                icon: Calendar,
                url: '/learner/calendar',
            },
            {
                title: 'Achievements',
                icon: Award,
                url: '/learner/achievements',
            },
            {
                title: 'Messages',
                icon: MessageSquare,
                url: '/learner/messages',
            },
        ],
    },
} as const;

export type NavigationRole = keyof typeof navigation;
export type NavigationConfig = typeof navigation;
