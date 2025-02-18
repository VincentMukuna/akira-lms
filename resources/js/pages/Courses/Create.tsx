import React from 'react';
import { useForm } from '@inertiajs/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useHookForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { courseFormSchema, type CourseFormValues } from '@/lib/validations/course';
import { useRoleNavigation } from '@/hooks/use-role-navigation';

function CreateCourse() {
    const { activeRole } = useRoleNavigation();
    const { post, processing } = useForm();
    const form = useHookForm<CourseFormValues>({
        resolver: zodResolver(courseFormSchema),
        defaultValues: {
            title: '',
            description: '',
            learning_objectives: '',
            level: 'beginner',
            is_published: false,
        },
    });

    const onSubmit = (data: CourseFormValues) => {
        post(route(`${activeRole}.courses.store`));
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Course Details</CardTitle>
                        <CardDescription>
                            Create a new course for your students.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Course Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter course title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter course description"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="learning_objectives"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Learning Objectives</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="What will students learn from this course?"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        List the key learning outcomes for this course.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="level"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Difficulty Level</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select difficulty level" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="beginner">Beginner</SelectItem>
                                            <SelectItem value="intermediate">
                                                Intermediate
                                            </SelectItem>
                                            <SelectItem value="advanced">Advanced</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="is_published"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">
                                            Publish Immediately
                                        </FormLabel>
                                        <FormDescription>
                                            If disabled, the course will be saved as a draft.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => window.history.back()}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={processing}>
                        Create Course
                    </Button>
                </div>
            </form>
        </Form>
    );
}

CreateCourse.layout = (page: React.ReactNode) => (
    <AuthenticatedLayout header="Create Course">{page}</AuthenticatedLayout>
);

export default CreateCourse; 