import { SearchFilter } from '@/components/filters/search-filter';
import { SelectFilter } from '@/components/filters/select-filter';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useDebounce } from '@/hooks/use-debounce';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { router } from '@inertiajs/core';
import { Head } from '@inertiajs/react';
import { BookOpen, Clock, GraduationCap } from 'lucide-react';
import { useCallback, useState } from 'react';

interface Course {
    id: string;
    title: string;
    description: string;
    learning_objectives: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    modules_count: number;
    created_at: string;
    cover_image: string | null;
}

interface Props {
    courses: Course[];
    filters: {
        search?: string;
        level?: string;
    };
}

const levelOptions = [
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Advanced', value: 'advanced' },
];

const getLevelColor = (level: Course['level']) => {
    switch (level) {
        case 'beginner':
            return 'bg-green-100 text-green-800';
        case 'intermediate':
            return 'bg-blue-100 text-blue-800';
        case 'advanced':
            return 'bg-purple-100 text-purple-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const CoursesPage = ({ courses, filters }: Props) => {
    // Local state to track input values
    const [searchValue, setSearchValue] = useState(filters.search ?? '');
    const [levelValue, setLevelValue] = useState(filters.level ?? '');

    // Debounced function to update URL
    const debouncedUrlUpdate = useDebounce(() => {
        router.get(
            route('learner.courses'),
            { 
                search: searchValue || undefined,
                level: levelValue || undefined
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    }, 300);

    // Update local state and trigger debounced URL update
    const handleSearchChange = useCallback((value: string) => {
        setSearchValue(value);
        debouncedUrlUpdate();
    }, [debouncedUrlUpdate]);

    const handleLevelChange = useCallback((value: string) => {
        setLevelValue(value);
        debouncedUrlUpdate();
    }, [debouncedUrlUpdate]);

    return (
        <>
            <Head title="Available Courses" />

            {/* Search and Filter Section */}
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="flex-1 md:max-w-sm">
                    <SearchFilter
                        value={searchValue}
                        onChange={handleSearchChange}
                        placeholder="Search courses..."
                        label="Search"
                    />
                </div>
                <div className="w-full md:w-[200px]">
                    <SelectFilter
                        value={levelValue}
                        onChange={handleLevelChange}
                        options={levelOptions}
                        label="Level"
                        placeholder="Filter by level"
                    />
                </div>
            </div>

            {/* Courses Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                    <Card key={course.id} className="overflow-hidden">
                        {course.cover_image ? (
                            <div className="aspect-video w-full overflow-hidden">
                                <img
                                    src={course.cover_image}
                                    alt={course.title}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="flex aspect-video w-full items-center justify-center bg-gray-100">
                                <BookOpen className="h-12 w-12 text-gray-400" />
                            </div>
                        )}
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                                <Badge className={getLevelColor(course.level)} variant="secondary">
                                    {course.level}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="line-clamp-2 text-sm text-muted-foreground">
                                {course.description}
                            </p>
                            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <GraduationCap className="h-4 w-4" />
                                    <span>{course.modules_count} modules</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    <span>8 hours</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Enroll Now</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Empty State */}
            {courses.length === 0 && (
                <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed">
                    <BookOpen className="mb-4 h-12 w-12 text-gray-400" />
                    <h3 className="mb-2 text-lg font-medium">No courses found</h3>
                    <p className="text-sm text-muted-foreground">
                        Try adjusting your search or filter to find what you're looking for.
                    </p>
                </div>
            )}
        </>
    );
};

CoursesPage.layout = (page: any) => (
    <AuthenticatedLayout header="Available Courses">{page}</AuthenticatedLayout>
);

export default CoursesPage; 