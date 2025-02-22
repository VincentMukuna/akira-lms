import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head } from '@inertiajs/react';
import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, XAxis, YAxis } from 'recharts';

interface Props {
    stats: {
        total_users: number;
        active_courses: number;
        total_instructors: number;
        total_learners: number;
    };
}

type ChartConfig = {
    [key: string]: {
        label: string;
        color: string;
    };
};

// Chart configuration using app.css chart colors
const chartConfig = {
    enrollments: {
        label: "Course Enrollments",
        color: "hsl(var(--chart-1))",
    },
    active_users: {
        label: "Active Users",
        color: "hsl(var(--chart-2))",
    },
    beginner: {
        label: "Beginner",
        color: "hsl(var(--chart-3))",
    },
    intermediate: {
        label: "Intermediate",
        color: "hsl(var(--chart-4))",
    },
    advanced: {
        label: "Advanced",
        color: "hsl(var(--chart-5))",
    },
    completed: {
        label: "Completed",
        color: "hsl(var(--chart-1))",
    },
    in_progress: {
        label: "In Progress",
        color: "hsl(var(--chart-2))",
    }
} satisfies ChartConfig;

// Mock data - Replace with real data from backend
const courseEnrollmentData = [
    { name: 'Web Development', enrollments: 120 },
    { name: 'Data Science', enrollments: 80 },
    { name: 'Mobile App Dev', enrollments: 60 },
    { name: 'UI/UX Design', enrollments: 90 },
];

const userActivityData = [
    { day: 'Mon', active_users: 150 },
    { day: 'Tue', active_users: 230 },
    { day: 'Wed', active_users: 180 },
    { day: 'Thu', active_users: 290 },
    { day: 'Fri', active_users: 200 },
];

const courseLevelData = [
    { name: 'Beginner', value: 45, fill: chartConfig.beginner.color },
    { name: 'Intermediate', value: 35, fill: chartConfig.intermediate.color },
    { name: 'Advanced', value: 20, fill: chartConfig.advanced.color },
];

const courseProgressData = [
    { name: 'Web Dev', completed: 65, in_progress: 35 },
    { name: 'Data Science', completed: 45, in_progress: 55 },
    { name: 'Mobile Dev', completed: 80, in_progress: 20 },
    { name: 'UI/UX', completed: 30, in_progress: 70 },
];

const recentActivities = [
    { user: 'John Doe', action: 'Enrolled in Web Development', time: '2 hours ago' },
    { user: 'Jane Smith', action: 'Completed Data Science Module 3', time: '3 hours ago' },
    { user: 'Mike Johnson', action: 'Started Mobile App Course', time: '5 hours ago' },
    { user: 'Sarah Wilson', action: 'Submitted Final Project', time: '6 hours ago' },
];

const AdminDashboard = ({ stats }: Props) => {
    return (
        <>
            <Head title="Admin Dashboard" />

            {/* Stats Overview Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{stats.total_users}</p>
                        <p className="text-xs text-muted-foreground">All registered users</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Active Courses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{stats.active_courses}</p>
                        <p className="text-xs text-muted-foreground">Currently active courses</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Total Instructors</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{stats.total_instructors}</p>
                        <p className="text-xs text-muted-foreground">Registered instructors</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Total Learners</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{stats.total_learners}</p>
                        <p className="text-xs text-muted-foreground">Registered learners</p>
                    </CardContent>
                </Card>
            </div>

            {/* Course Analytics */}
            <div className="grid gap-4 md:grid-cols-2 mb-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Course Enrollments</CardTitle>
                        <CardDescription>
                            Total enrollments per course
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig}>
                            <BarChart 
                                data={courseEnrollmentData}
                                accessibilityLayer
                                margin={{ left: 0, right: 16, top: 16, bottom: 0 }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis 
                                    dataKey="name"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={(value) => value.slice(0, 8) + '...'}
                                />
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickCount={5}
                                />
                                <Bar 
                                    dataKey="enrollments"
                                    fill={chartConfig.enrollments.color}
                                    radius={[4, 4, 0, 0]}
                                />
                                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter>
                        <div className="flex w-full items-start gap-2 text-sm">
                            <div className="grid gap-2">
                                <div className="flex items-center gap-2 font-medium leading-none">
                                    Up by 12% from last month <TrendingUp className="h-4 w-4" />
                                </div>
                                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                                    Based on current enrollment trends
                                </div>
                            </div>
                        </div>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Daily Active Users</CardTitle>
                        <CardDescription>
                            User activity over the past week
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig}>
                            <LineChart 
                                data={userActivityData}
                                accessibilityLayer
                                margin={{ left: 0, right: 16, top: 16, bottom: 0 }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis 
                                    dataKey="day"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                />
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickCount={5}
                                />
                                <Line 
                                    type="monotone"
                                    dataKey="active_users"
                                    stroke={chartConfig.active_users.color}
                                    strokeWidth={2}
                                    dot={false}
                                />
                                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                            </LineChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter>
                        <div className="flex w-full items-start gap-2 text-sm">
                            <div className="grid gap-2">
                                <div className="flex items-center gap-2 font-medium leading-none">
                                    Active users up 8.3% <TrendingUp className="h-4 w-4" />
                                </div>
                                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                                    Week over week comparison
                                </div>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </div>

            {/* Additional Analytics */}
            <div className="grid gap-4 md:grid-cols-2 mb-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Course Level Distribution</CardTitle>
                        <CardDescription>
                            Distribution of courses by difficulty level
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig}>
                            <PieChart 
                                accessibilityLayer
                                margin={{ top: 16, right: 16, bottom: 16, left: 16 }}
                            >
                                <Pie
                                    data={courseLevelData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label
                                >
                                    {courseLevelData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                                <ChartLegend content={<ChartLegendContent />} />
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter>
                        <div className="flex w-full items-start gap-2 text-sm">
                            <div className="grid gap-2">
                                <div className="flex items-center gap-2 font-medium leading-none">
                                    Beginner courses dominate at 45%
                                </div>
                                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                                    Current course catalog breakdown
                                </div>
                            </div>
                        </div>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Course Completion Rates</CardTitle>
                        <CardDescription>
                            Progress tracking across all courses
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig}>
                            <BarChart 
                                data={courseProgressData}
                                accessibilityLayer
                                margin={{ left: 0, right: 16, top: 16, bottom: 0 }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis 
                                    dataKey="name"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                />
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickCount={5}
                                />
                                <Bar 
                                    dataKey="completed" 
                                    stackId="progress"
                                    fill={chartConfig.completed.color}
                                    radius={[4, 4, 0, 0]}
                                />
                                <Bar 
                                    dataKey="in_progress" 
                                    stackId="progress"
                                    fill={chartConfig.in_progress.color}
                                    radius={[4, 4, 0, 0]}
                                />
                                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter>
                        <div className="flex w-full items-start gap-2 text-sm">
                            <div className="grid gap-2">
                                <div className="flex items-center gap-2 font-medium leading-none">
                                    Average completion rate: 55% <TrendingUp className="h-4 w-4" />
                                </div>
                                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                                    Based on all active courses
                                </div>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </div>

            {/* Recent Activity */}
            <div className="mb-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Action</TableHead>
                                    <TableHead>Time</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentActivities.map((activity, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{activity.user}</TableCell>
                                        <TableCell>{activity.action}</TableCell>
                                        <TableCell>{activity.time}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

AdminDashboard.layout = (page: any) => (
    <AuthenticatedLayout header="Admin Dashboard">{page}</AuthenticatedLayout>
);

export default AdminDashboard;
