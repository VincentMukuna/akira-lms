import { SearchFilter } from '@/components/filters/search-filter';
import { SelectFilter } from '@/components/filters/select-filter';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FiltersProvider, useFilters } from '@/contexts/filters-context';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, GraduationCap } from 'lucide-react';

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

function CoursesGrid({ courses }: { courses: Course[] }) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, index) => (
                <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                    <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                            className="relative"
                        >
                            {course.cover_image ? (
                                <div className="aspect-video w-full overflow-hidden">
                                    <img
                                        src={course.cover_image}
                                        alt={course.title}
                                        className="h-full w-full object-cover transition-transform"
                                    />
                                </div>
                            ) : (
                                <div className="flex aspect-video w-full items-center justify-center bg-gray-50">
                                    <BookOpen className="h-12 w-12 text-gray-300" />
                                </div>
                            )}
                            <div className="absolute right-3 top-3">
                                <Badge className={`${getLevelColor(course.level)} shadow-sm`} variant="secondary">
                                    {course.level}
                                </Badge>
                            </div>
                        </motion.div>
                        <CardHeader className="space-y-2 p-4">
                            <CardTitle className="line-clamp-2 text-lg">{course.title}</CardTitle>
                            <p className="line-clamp-2 text-sm text-muted-foreground">
                                {course.description}
                            </p>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
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
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}

function CoursesFilters() {
    const { filters, updateFilter } = useFilters();
    
    return (
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="flex-1 md:max-w-sm">
                <SearchFilter
                    value={filters.search ?? ''}
                    onChange={(value) => updateFilter('search', value)}
                    placeholder="Search courses..."
                    label="Search"
                />
            </div>
            <div className="w-full md:w-[200px]">
                <SelectFilter
                    value={filters.level ?? ''}
                    onChange={(value) => updateFilter('level', value)}
                    options={levelOptions}
                    label="Level"
                    placeholder="Filter by level"
                />
            </div>
        </div>
    );
}

const CoursesPage = ({ courses, filters: initialFilters }: Props) => {
    return (
        <FiltersProvider initialFilters={initialFilters} routeName="learner.courses">
            <Head title="Available Courses" />
            
            <CoursesFilters />

            <CoursesGrid courses={courses} />

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
        </FiltersProvider>
    );
};

CoursesPage.layout = (page: any) => (
    <AuthenticatedLayout header="Available Courses">{page}</AuthenticatedLayout>
);

export default CoursesPage; 