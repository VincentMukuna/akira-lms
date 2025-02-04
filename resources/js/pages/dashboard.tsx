import { AppSidebar } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock,
  GraduationCap,
  Trophy,
} from 'lucide-react';

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

export default function LearnerDashboard() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        Learner Dashboard
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Courses in Progress
                                </CardTitle>
                                <GraduationCap className="text-muted-foreground h-4 w-4" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">3</div>
                                <p className="text-muted-foreground text-xs">
                                    +1 from last month
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Completed Courses
                                </CardTitle>
                                <Trophy className="text-muted-foreground h-4 w-4" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">12</div>
                                <p className="text-muted-foreground text-xs">
                                    +2 from last month
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Certificates Earned
                                </CardTitle>
                                <GraduationCap className="text-muted-foreground h-4 w-4" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">7</div>
                                <p className="text-muted-foreground text-xs">
                                    +1 from last month
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Learning Hours
                                </CardTitle>
                                <Clock className="text-muted-foreground h-4 w-4" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">246</div>
                                <p className="text-muted-foreground text-xs">
                                    +23 from last month
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Current Course</CardTitle>
                            <CardDescription>
                                Introduction to AI
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-6 flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <BookOpen className="text-primary h-12 w-12" />
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            Module 3: Neural Networks
                                        </h3>
                                        <p className="text-muted-foreground text-sm">
                                            4 of 6 lessons completed
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold">
                                        60%
                                    </div>
                                    <p className="text-muted-foreground text-sm">
                                        Overall Progress
                                    </p>
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
                                <CardDescription>
                                    Stay on top of your coursework
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {upcomingDeadlines.map(
                                        (deadline, index) => (
                                            <div
                                                key={index}
                                                className="bg-muted flex items-center rounded-lg p-3"
                                            >
                                                <CalendarDays className="text-primary mr-3 h-5 w-5" />
                                                <div className="flex-1 space-y-1">
                                                    <p className="text-sm font-medium leading-none">
                                                        {deadline.course}:{' '}
                                                        {deadline.task}
                                                    </p>
                                                    <p className="text-muted-foreground text-sm">
                                                        Due:{' '}
                                                        {new Date(
                                                            deadline.dueDate,
                                                        ).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Learning Streak</CardTitle>
                                <CardDescription>
                                    Keep up the momentum!
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col items-center justify-center space-y-2">
                                    <div className="text-primary text-5xl font-bold">
                                        7
                                    </div>
                                    <p className="text-lg font-medium">
                                        Days in a row
                                    </p>
                                    <Progress
                                        value={70}
                                        className="h-2 w-full"
                                    />
                                    <p className="text-muted-foreground text-sm">
                                        3 more days to reach your best streak!
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
