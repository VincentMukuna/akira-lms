import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head } from '@inertiajs/react';

interface Props {
    stats: {
        total_users: number;
        active_courses: number;
        total_instructors: number;
        total_learners: number;
    };
}

export default function AdminDashboard({ stats }: Props) {
    console.log(stats);
    return (
        <AuthenticatedLayout header="Admin Dashboard">
            <Head title="Admin Dashboard" />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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

            {/* TODO: Add more sections like:
                - Recent Activity
                - System Health
                - Latest Registrations
                - Course Analytics
            */}
        </AuthenticatedLayout>
    );
}
