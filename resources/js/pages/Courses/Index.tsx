import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Link, router } from '@inertiajs/react';
import { BookIcon, MoreVerticalIcon, PlusIcon } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

interface Course {
    id: string;
    title: string;
    description: string;
    status: 'draft' | 'published';
    modules_count: number;
    created_at: string;
    cover_image: string;
}

interface Props {
    courses: Course[];
}

function CoursesIndex({ courses }: Props) {
    const handleDelete = (courseId: string, e: React.MouseEvent) => {
        // Prevent the row click event from firing
        e.stopPropagation();
        if (confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
            router.delete(route('courses.destroy', { id: courseId }), {
                onSuccess: () => {
                    toast.success('Course deleted successfully');
                },
                onError: () => {
                    toast.error('Failed to delete course');
                },
            });
        }
    };

    return (
        <>
            <div className="flex justify-between items-center">
                <div />
                <Button asChild>
                    <Link href={route(`courses.create`)}>
                        <PlusIcon className="mr-2 h-4 w-4" />
                        New Course
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Course</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Modules</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {courses.map((course) => (
                            <TableRow 
                                key={course.id}
                                className="cursor-pointer hover:bg-muted/50"
                                onClick={() => router.get(route('courses.edit', { id: course.id }))}
                            >
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        {course.cover_image ? (
                                            <div className="relative h-16 w-24 overflow-hidden rounded-md border">
                                                <img
                                                    src={course.cover_image}
                                                    alt={course.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex h-16 w-24 items-center justify-center rounded-md border bg-muted">
                                                <BookIcon className="h-8 w-8 text-muted-foreground" />
                                            </div>
                                        )}
                                        <div>
                                            <div className="font-medium">{course.title}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {course.description}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={course.status === 'published' ? 'default' : 'secondary'}
                                    >
                                        {course.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{course.modules_count} modules</TableCell>
                                <TableCell>{course.created_at}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0"
                                            >
                                                <span className="sr-only">Open menu</span>
                                                <MoreVerticalIcon className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href={route(`courses.builder`, {
                                                        id: course.id,
                                                    })}
                                                >
                                                    Build Course
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href={route(`courses.edit`, {
                                                        id: course.id,
                                                    })}
                                                >
                                                    Edit Details
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                className="text-destructive focus:text-destructive"
                                                onClick={(e) => handleDelete(course.id, e)}
                                            >
                                                Delete Course
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}

CoursesIndex.layout = (page: React.ReactNode) => (
    <AuthenticatedLayout header="Courses">{page}</AuthenticatedLayout>
);

export default CoursesIndex; 