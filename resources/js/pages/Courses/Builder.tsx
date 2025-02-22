import CourseBuilder from '@/components/CourseBuilder';
import { CourseContent } from '@/components/CourseBuilder/types/course';
import CourseManagementNavigation from '@/components/CourseManagement/Navigation';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import React from 'react';

interface Props {
    course_id: string;
    defaultCourseContent: CourseContent;
}

function Builder({ course_id, defaultCourseContent }: Props) {
    return (
        <>
            <CourseManagementNavigation courseId={course_id} currentRoute="builder" />
            <div className="container py-6">
                <CourseBuilder course_id={course_id} defaultCourseContent={defaultCourseContent} />
            </div>
        </>
    );
}

Builder.layout = (page: React.ReactNode) => (
    <AuthenticatedLayout header="Course Builder">{page}</AuthenticatedLayout>
);

export default Builder;
