import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useRoleNavigation } from '@/hooks/use-role-navigation';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Link } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import React from 'react';

interface Course {
    id: string;
    title: string;
    description: string;
    status: 'draft' | 'published';
    modules_count: number;
    created_at: string;
}

interface Props {
    courses: Course[];
}

function CoursesIndex({ courses }: Props) {
    const { activeRole } = useRoleNavigation();

    return (
        <>
            <div className="flex justify-between items-center">
                <div />
                <Button asChild>
                    <Link href={route(`${activeRole}.courses.create`)}>
                        <PlusIcon className="mr-2 h-4 w-4" />
                        New Course
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Modules</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {courses.map((course) => (
                            <TableRow key={course.id}>
                                <TableCell>
                                    <div className="font-medium">{course.title}</div>
                                    <div className="text-sm text-muted-foreground">
                                        {course.description}
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
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            asChild
                                        >
                                            <Link
                                                href={route(`${activeRole}.courses.builder`, {
                                                    id: course.id,
                                                })}
                                            >
                                                Build
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            asChild
                                        >
                                            <Link
                                                href={route(`${activeRole}.courses.edit`, {
                                                    id: course.id,
                                                })}
                                            >
                                                Edit
                                            </Link>
                                        </Button>
                                    </div>
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