import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head } from '@inertiajs/react';
import { BookOpen } from 'lucide-react';

const LearnerDashboard = () => {
    return (
        <>
            <Head title="Learning Dashboard" />

            <div className="flex items-center justify-center min-h-[400px]">
                <Card className="max-w-md w-full">
                    <CardHeader className="text-center">
                        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle>Welcome to Your Learning Dashboard</CardTitle>
                        <CardDescription>Your assigned training modules and courses will appear here</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center text-sm text-muted-foreground">
                        <p>Contact your supervisor or HR department to get started with your training program.</p>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

LearnerDashboard.layout = (page: any) => (
    <AuthenticatedLayout header="Learning Dashboard">{page}</AuthenticatedLayout>
);

export default LearnerDashboard;
