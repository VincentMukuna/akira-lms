import CourseBuilder from '@/components/CourseBuilder';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import React from 'react';

interface Props {
    courseId: string;
}

function Builder({ courseId }: Props) {
    return <CourseBuilder courseId={courseId} />;
}

Builder.layout = (page: React.ReactNode) => (
    <AuthenticatedLayout header="Course Builder">{page}</AuthenticatedLayout>
);

export default Builder;
