import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useRoleNavigation } from '@/hooks/use-role-navigation';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import React from 'react';

type FormData = {
    [K in 'title' | 'description' | 'learning_objectives' | 'level' | 'is_published']: K extends 'level' 
        ? 'beginner' | 'intermediate' | 'advanced'
        : K extends 'is_published'
        ? boolean
        : string;
}

interface Props {
    course: FormData & { id: string };
}

function EditCourse({ course }: Props) {
    const { activeRole } = useRoleNavigation();
    const { data, setData, put, processing, errors } = useForm<FormData>({
        title: course.title,
        description: course.description,
        learning_objectives: course.learning_objectives,
        level: course.level,
        is_published: course.is_published,
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route(`${activeRole}.courses.update`, { id: course.id }));
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Course Details</CardTitle>
                    <CardDescription>
                        Edit your course information.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Course Title
                        </label>
                        <Input 
                            placeholder="Enter course title"
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            disabled={processing}
                        />
                        {errors.title && (
                            <p className="text-sm font-medium text-destructive">{errors.title}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Description
                        </label>
                        <Textarea
                            placeholder="Enter course description"
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            disabled={processing}
                        />
                        {errors.description && (
                            <p className="text-sm font-medium text-destructive">{errors.description}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Learning Objectives
                        </label>
                        <Textarea
                            placeholder="What will students learn from this course?"
                            value={data.learning_objectives}
                            onChange={e => setData('learning_objectives', e.target.value)}
                            disabled={processing}
                        />
                        <p className="text-sm text-muted-foreground">
                            List the key learning outcomes for this course.
                        </p>
                        {errors.learning_objectives && (
                            <p className="text-sm font-medium text-destructive">{errors.learning_objectives}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Difficulty Level
                        </label>
                        <Select
                            value={data.level}
                            onValueChange={(value: FormData['level']) => setData('level', value)}
                            disabled={processing}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select difficulty level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="beginner">Beginner</SelectItem>
                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                <SelectItem value="advanced">Advanced</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.level && (
                            <p className="text-sm font-medium text-destructive">{errors.level}</p>
                        )}
                    </div>

                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <label className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Publish Immediately
                            </label>
                            <p className="text-sm text-muted-foreground">
                                If disabled, the course will be saved as a draft.
                            </p>
                        </div>
                        <Switch
                            checked={data.is_published}
                            onCheckedChange={(checked: boolean) => setData('is_published', checked)}
                            disabled={processing}
                        />
                        {errors.is_published && (
                            <p className="text-sm font-medium text-destructive">{errors.is_published}</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.history.back()}
                    disabled={processing}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={processing}>
                    {processing ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        'Save Changes'
                    )}
                </Button>
            </div>
        </form>
    );
}

EditCourse.layout = (page: React.ReactNode) => (
    <AuthenticatedLayout
        header={{
            items: [
                {
                    label: 'Courses',
                    href: route(`admin.courses.index`),
                },
                {
                    label: 'Edit',
                },
            ],
        }}
    >
        {page}
    </AuthenticatedLayout>
);

export default EditCourse; 