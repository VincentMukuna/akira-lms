import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head } from '@inertiajs/react';
import { BookOpen, CheckCircle2, Clock, FileText, GraduationCap, PlayCircle } from 'lucide-react';

interface Module {
    id: string;
    title: string;
    type: string;
    order: number;
}

interface Section {
    id: string;
    title: string;
    order: number;
    modules: Module[];
}

interface Course {
    id: string;
    title: string;
    description: string;
    learning_objectives: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    cover_image: string | null;
    sections: Section[];
}

interface Props {
    course: Course;
}

function ModuleTypeIcon({ type }: { type: string }) {
    switch (type) {
        case 'video':
            return <PlayCircle className="h-4 w-4 text-blue-500" />;
        case 'quiz':
            return <CheckCircle2 className="h-4 w-4 text-green-500" />;
        default:
            return <FileText className="h-4 w-4 text-gray-500" />;
    }
}

function CourseView({ course }: Props) {
    const totalModules = course.sections.reduce((acc, section) => acc + section.modules.length, 0);

    return (
        <>
            <Head title={course.title} />

            <div className="container py-8">
                <div className="grid gap-6 md:grid-cols-3">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Course Header */}
                        <div className="space-y-4">
                            <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
                            <p className="text-lg text-muted-foreground">{course.description}</p>
                            
                            <div className="flex items-center gap-4">
                                <Badge variant="secondary" className="text-sm">
                                    {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                                </Badge>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <GraduationCap className="h-4 w-4" />
                                    <span>{totalModules} modules</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    <span>8 hours</span>
                                </div>
                            </div>
                        </div>

                        {/* Course Progress */}
                        <Card>
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-xl">Your Progress</CardTitle>
                                <div className="text-sm text-muted-foreground">0 of {totalModules} modules completed</div>
                            </CardHeader>
                            <CardContent>
                                <Progress value={0} className="h-2" />
                            </CardContent>
                        </Card>

                        {/* Course Content */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Course Content</h2>
                            <div className="space-y-4">
                                {course.sections.map((section) => (
                                    <Card key={section.id}>
                                        <CardHeader>
                                            <CardTitle className="text-lg">{section.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                {section.modules.map((module) => (
                                                    <Button
                                                        key={module.id}
                                                        variant="ghost"
                                                        className="w-full justify-start gap-2 h-auto py-2"
                                                    >
                                                        <ModuleTypeIcon type={module.type} />
                                                        <span>{module.title}</span>
                                                    </Button>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Course Image */}
                        {course.cover_image ? (
                            <div className="aspect-video overflow-hidden rounded-lg border">
                                <img
                                    src={course.cover_image}
                                    alt={course.title}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="aspect-video flex items-center justify-center rounded-lg border bg-muted">
                                <BookOpen className="h-12 w-12 text-muted-foreground" />
                            </div>
                        )}

                        {/* Learning Objectives */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Learning Objectives</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="prose prose-sm max-w-none">
                                    {course.learning_objectives}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Start/Continue Button */}
                        <Button size="lg" className="w-full">
                            Start Course
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

CourseView.layout = (page: React.ReactNode) => {
    return (
        <AuthenticatedLayout header={
            {
                items: [
                    {
                        label: 'Courses',
                        href: route('learner.courses')
                    },
                ]
            }
        }>{page}</AuthenticatedLayout>
    );
}

export default CourseView; 