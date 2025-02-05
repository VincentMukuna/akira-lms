import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head } from '@inertiajs/react';
import { ArrowRight, BookOpen, CalendarDays, Clock, GraduationCap, Trophy } from 'lucide-react';

const upcomingDeadlines = [
    {
        course: 'Introduction to AI',
        task: 'Project Submission',
        dueDate: '2023-05-15',
    },
    {
        course: 'Data Science Fundamentals',
        task: 'Quiz 2',
        dueDate: '2023-05-18',
    },
    {
        course: 'Machine Learning Basics',
        task: 'Peer Review',
        dueDate: '2023-05-20',
    },
];

export default function Dashboard() {
    return (
        <AuthenticatedLayout header="Dashboard">
            <Head title="Dashboard" />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Courses in Progress</CardTitle>
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">+1 from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completed Courses</CardTitle>
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">+2 from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Certificates Earned</CardTitle>
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">7</div>
                        <p className="text-xs text-muted-foreground">+1 from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">246</div>
                        <p className="text-xs text-muted-foreground">+23 from last month</p>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Current Course</CardTitle>
                    <CardDescription>Introduction to AI</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <BookOpen className="h-12 w-12 text-primary" />
                            <div>
                                <h3 className="text-lg font-semibold">Module 3: Neural Networks</h3>
                                <p className="text-sm text-muted-foreground">
                                    4 of 6 lessons completed
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold">60%</div>
                            <p className="text-sm text-muted-foreground">Overall Progress</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <Progress value={60} className="h-2" />
                        <div className="flex justify-end">
                            <Button className="w-auto">
                                Continue Learning
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>Upcoming Deadlines</CardTitle>
                        <CardDescription>Stay on top of your coursework</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {upcomingDeadlines.map((deadline, index) => (
                                <div
                                    key={index}
                                    className="flex items-center rounded-lg bg-muted p-3"
                                >
                                    <CalendarDays className="mr-3 h-5 w-5 text-primary" />
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {deadline.course}: {deadline.task}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Due: {new Date(deadline.dueDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Learning Streak</CardTitle>
                        <CardDescription>Keep up the momentum!</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <div className="text-5xl font-bold text-primary">7</div>
                            <p className="text-lg font-medium">Days in a row</p>
                            <Progress value={70} className="h-2 w-full" />
                            <p className="text-sm text-muted-foreground">
                                3 more days to reach your best streak!
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
