import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head } from '@inertiajs/react';
import { Award, BookOpen, Clock, Crown } from 'lucide-react';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

// Update the mock data to be more corporate-focused
const currentCoursesData = [
    { name: 'Leadership Essentials', progress: 65 },
    { name: 'Project Management', progress: 30 },
    { name: 'Compliance Training', progress: 45 },
];

const learningTimeData = [
    { day: 'Mon', hours: 1.5 },
    { day: 'Tue', hours: 1.0 },
    { day: 'Wed', hours: 2.0 },
    { day: 'Thu', hours: 1.5 },
    { day: 'Fri', hours: 1.0 },
];

const skillsData = [
    { name: 'Programming', value: 45, fill: 'hsl(var(--chart-1))' },
    { name: 'Design', value: 30, fill: 'hsl(var(--chart-2))' },
    { name: 'Data Analysis', value: 25, fill: 'hsl(var(--chart-3))' },
];

const recentActivities = [
    { 
        course: 'Compliance Training', 
        action: 'Completed Module: Data Privacy and Security', 
        time: '2 hours ago',
        type: 'completion'
    },
    { 
        course: 'Project Management', 
        action: 'Started Assessment: Agile Methodologies', 
        time: '5 hours ago',
        type: 'assessment'
    },
    { 
        course: 'Leadership Essentials', 
        action: 'Completed Workshop: Team Building', 
        time: 'Yesterday',
        type: 'workshop'
    },
];

// Mock data for leaderboard with more corporate titles
const leaderboardData = [
    { 
        rank: 1,
        name: 'Sarah Chen',
        title: 'Senior Manager',
        points: 285,
        avatar: '/avatars/sarah.jpg',
        badge: 'Expert',
        department: 'Operations'
    },
    {
        rank: 2,
        name: 'Mike Johnson',
        title: 'Team Lead',
        points: 272,
        avatar: '/avatars/mike.jpg',
        badge: 'Advanced',
        department: 'Technology'
    },
    {
        rank: 3,
        name: 'Emma Davis',
        title: 'Project Manager',
        points: 268,
        avatar: '/avatars/emma.jpg',
        badge: 'Advanced',
        department: 'Product'
    },
    {
        rank: 4,
        name: 'Alex Turner',
        title: 'Business Analyst',
        points: 259,
        avatar: '/avatars/alex.jpg',
        badge: 'Intermediate',
        department: 'Finance'
    },
    {
        rank: 5,
        name: 'You',
        title: 'Software Engineer',
        points: 247,
        avatar: '/avatars/user.jpg',
        badge: 'Intermediate',
        department: 'Technology',
        isCurrentUser: true
    }
];

type ChartConfig = {
    [key: string]: {
        label: string;
        color: string;
    };
};

const chartConfig = {
    progress: {
        label: "Course Progress",
        color: "hsl(var(--chart-1))",
    },
    hours: {
        label: "Learning Hours",
        color: "hsl(var(--chart-2))",
    }
} satisfies ChartConfig;

const LearnerDashboard = () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
        <>
            <Head title="Learning Dashboard" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Stats Overview Cards - Row 1 */}
                <Card className="md:col-span-4 bg-gradient-to-br from-primary/5 to-transparent">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
                        <BookOpen className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-primary">3</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Required: 2 • Optional: 1
                        </p>
                    </CardContent>
                </Card>

                <Card className="md:col-span-4 bg-gradient-to-br from-blue-500/5 to-transparent">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Learning Time</CardTitle>
                        <Clock className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-blue-500">7.0</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Hours this week • Target: 8.0
                        </p>
                    </CardContent>
                </Card>

                <Card className="md:col-span-4 bg-gradient-to-br from-yellow-500/5 to-transparent">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Certifications</CardTitle>
                        <Award className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-yellow-500">5</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Active: 3 • Expiring soon: 2
                        </p>
                    </CardContent>
                </Card>

                {/* Main Content Area - Row 2 & 3 */}
                <Card className="md:col-span-8 md:row-span-3 overflow-hidden">
                    <CardHeader>
                        <CardTitle>Course Progress</CardTitle>
                        <CardDescription>
                            Track your progress in mandatory and optional courses
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="p-6">
                            <ChartContainer config={chartConfig}>
                                <BarChart 
                                    data={currentCoursesData}
                                    accessibilityLayer
                                    margin={{ left: 0, right: 16, top: 16, bottom: 0 }}
                                    height={300}
                                >
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
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
                                        dataKey="progress"
                                        fill={chartConfig.progress.color}
                                        radius={[4, 4, 0, 0]}
                                    />
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                                </BarChart>
                            </ChartContainer>
                        </div>
                        <div className="border-t bg-muted/20 p-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">Upcoming Deadline</p>
                                    <p className="text-sm text-muted-foreground">Complete Annual Compliance Training</p>
                                </div>
                                <Badge variant="destructive" className="text-sm">Due in 5 days</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Calendar - Row 2 */}
                <Card className="md:col-span-4 md:row-span-2">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Training Schedule</CardTitle>
                                <CardDescription>Upcoming sessions and deadlines</CardDescription>
                            </div>
                            <Badge variant="outline" className="ml-2">2 Required Today</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="p-6 pb-0">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="w-full rounded-md"
                                classNames={{
                                    months: "w-full",
                                    month: "w-full",
                                    table: "w-full border-collapse",
                                    head_row: "flex w-full",
                                    head_cell: "w-9 font-normal text-muted-foreground",
                                    row: "flex w-full mt-2",
                                    cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
                                    day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                                    day_today: "bg-accent text-accent-foreground",
                                    day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
                                }}
                            />
                        </div>
                        <div className="border-t bg-muted/20 p-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="h-2 w-2 rounded-full bg-destructive" />
                                    <div>
                                        <p className="text-sm font-medium">Compliance Training</p>
                                        <p className="text-xs text-muted-foreground">10:00 AM - 11:00 AM • Required</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                                    <div>
                                        <p className="text-sm font-medium">Project Management Review</p>
                                        <p className="text-xs text-muted-foreground">2:00 PM - 3:00 PM • Optional</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="h-2 w-2 rounded-full bg-primary" />
                                    <div>
                                        <p className="text-sm font-medium">Leadership Workshop</p>
                                        <p className="text-xs text-muted-foreground">4:00 PM - 5:00 PM • Department</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Learning Time - Row 3 */}
                <Card className="md:col-span-4">
                    <CardHeader>
                        <CardTitle>Learning Activity</CardTitle>
                        <CardDescription>
                            Daily training completion
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig}>
                            <LineChart 
                                data={learningTimeData}
                                accessibilityLayer
                                margin={{ left: 0, right: 16, top: 16, bottom: 0 }}
                                height={200}
                            >
                                <CartesianGrid vertical={false} strokeDasharray="3 3" />
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
                                    dataKey="hours"
                                    stroke={chartConfig.hours.color}
                                    strokeWidth={2}
                                    dot
                                />
                                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                            </LineChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* Bottom Row - Row 4 */}
                <Card className="md:col-span-6">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Recent Activity</CardTitle>
                                <CardDescription>Your latest training activities</CardDescription>
                            </div>
                            <Badge variant="outline">Last 24 hours</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivities.map((activity, index) => (
                                <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-4">
                                        <div className={`h-2 w-2 rounded-full ${
                                            activity.type === 'completion' ? 'bg-primary' :
                                            activity.type === 'assessment' ? 'bg-blue-500' :
                                            'bg-green-500'
                                        }`} />
                                        <div>
                                            <p className="text-sm font-medium">{activity.course}</p>
                                            <p className="text-sm text-muted-foreground">{activity.action}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Leaderboard */}
                <Card className="md:col-span-6">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Department Rankings</CardTitle>
                                <CardDescription>Top learners this quarter</CardDescription>
                            </div>
                            <Crown className="h-5 w-5 text-yellow-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {leaderboardData.slice(0, 3).map((user) => (
                                <div
                                    key={user.rank}
                                    className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                                        user.isCurrentUser ? 'bg-muted' : 'hover:bg-muted/50'
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <span className={`text-sm font-medium w-6 h-6 flex items-center justify-center rounded-full ${
                                            user.rank === 1 ? 'bg-yellow-500/10 text-yellow-500' :
                                            user.rank === 2 ? 'bg-gray-500/10 text-gray-500' :
                                            'bg-orange-500/10 text-orange-500'
                                        }`}>{user.rank}</span>
                                        <Avatar className="h-8 w-8 border-2 border-muted">
                                            <AvatarImage src={user.avatar} alt={user.name} />
                                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-medium leading-none">{user.name}</p>
                                            <p className="text-xs text-muted-foreground">{user.title} • {user.department}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-muted-foreground">{user.points} pts</span>
                                        <Badge variant="secondary" className="ml-2">
                                            {user.badge}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

LearnerDashboard.layout = (page: any) => (
    <AuthenticatedLayout header="My Dashboard">{page}</AuthenticatedLayout>
);

export default LearnerDashboard;
