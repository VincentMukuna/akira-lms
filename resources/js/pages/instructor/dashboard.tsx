import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head } from '@inertiajs/react';

export default function InstructorDashboard() {
    return (
        <AuthenticatedLayout header="Instructor Dashboard">
            <Head title="Instructor Dashboard" />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Active Courses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">0</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Total Students</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">0</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Pending Assessments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">0</p>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
