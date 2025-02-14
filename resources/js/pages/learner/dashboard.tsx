import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head } from '@inertiajs/react';

export default function LearnerDashboard() {
    return (
        <AuthenticatedLayout header="My Dashboard">
            <Head title="My Dashboard" />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Courses in Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">0</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Completed Courses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">0</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Achievements</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">0</p>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
