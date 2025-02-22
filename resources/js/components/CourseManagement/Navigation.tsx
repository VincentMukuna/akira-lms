import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { BookOpen, Settings } from 'lucide-react';

interface Props {
    courseId: string;
    currentRoute: 'builder' | 'edit';
}

export default function CourseManagementNavigation({ courseId, currentRoute }: Props) {
    return (
        <div className="bg-background border-b">
            <div className="container mx-auto">
                <nav className="flex -mb-px" aria-label="Course Management">
                    <Link
                        href={route('courses.builder', { id: courseId })}
                        className={cn(
                            'group inline-flex items-center px-6 py-4 border-b-2 text-sm font-medium',
                            currentRoute === 'builder'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-muted-foreground hover:border-muted hover:text-foreground'
                        )}
                    >
                        <BookOpen className="mr-2 h-4 w-4" />
                        Course Builder
                    </Link>

                    <Link
                        href={route('courses.edit', { id: courseId })}
                        className={cn(
                            'group inline-flex items-center px-6 py-4 border-b-2 text-sm font-medium',
                            currentRoute === 'edit'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-muted-foreground hover:border-muted hover:text-foreground'
                        )}
                    >
                        <Settings className="mr-2 h-4 w-4" />
                        Course Details
                    </Link>
                </nav>
            </div>
        </div>
    );
} 