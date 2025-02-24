import CourseManagementNavigation from '@/components/CourseManagement/Navigation';
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
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { useForm } from '@inertiajs/react';
import { BookIcon, Loader2, X } from 'lucide-react';
import React, { useRef } from 'react';

type FormData = {
    [K in 'title' | 'description' | 'learning_objectives' | 'level' | 'is_published' | 'cover_image']: K extends 'level' 
        ? 'beginner' | 'intermediate' | 'advanced'
        : K extends 'is_published'
        ? boolean
        : K extends 'cover_image'
        ? File | null
        : string;
}

interface Props {
    course: FormData & { 
        id: string;
        cover_image: string | null;
    };
}

function EditCourse({ course }: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors, progress } = useForm<FormData>({
        title: course.title,
        description: course.description,
        learning_objectives: course.learning_objectives,
        level: course.level,
        is_published: course.is_published,
        cover_image: null,
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route(`courses.update`, { id: course.id }), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setData('cover_image', e.target.files[0]);
        }
    };

    const removeCoverImage = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setData('cover_image', null);
    };

    return (
        <>
            <CourseManagementNavigation courseId={course.id} currentRoute="edit" />
            <div className="container py-6">
                <form onSubmit={onSubmit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Course Details</CardTitle>
                            <CardDescription>
                                Edit your course information.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Cover Image
                                </label>
                                <div className="flex items-center gap-6">
                                    {/* Preview current or uploaded image */}
                                    <div className="relative h-32 w-48 overflow-hidden rounded-md border">
                                        {data.cover_image || course.cover_image ? (
                                            <>
                                                <img
                                                    src={data.cover_image ? URL.createObjectURL(data.cover_image) : course.cover_image!}
                                                    alt="Course cover"
                                                    className="h-full w-full object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={removeCoverImage}
                                                    className="absolute right-2 top-2 rounded-full bg-background/80 p-1 hover:bg-background"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </>
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-muted">
                                                <BookIcon className="h-12 w-12 text-muted-foreground" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <Input
                                            ref={fileInputRef}
                                            type="file"
                                            onChange={handleFileChange}
                                            accept="image/jpeg,image/png,image/webp"
                                            disabled={processing}
                                        />
                                        <p className="text-sm text-muted-foreground">
                                            Recommended size: 1280x720. Max file size: 5MB.
                                            Supported formats: JPEG, PNG, WebP.
                                        </p>
                                    </div>
                                </div>
                                {errors.cover_image && (
                                    <p className="text-sm font-medium text-destructive">{errors.cover_image}</p>
                                )}
                                {progress && (
                                    <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
                                        <div
                                            className="h-full bg-primary transition-all duration-300"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                )}
                            </div>

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
                                    placeholder="Enter learning objectives"
                                    value={data.learning_objectives}
                                    onChange={e => setData('learning_objectives', e.target.value)}
                                    disabled={processing}
                                />
                                {errors.learning_objectives && (
                                    <p className="text-sm font-medium text-destructive">{errors.learning_objectives}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Level
                                </label>
                                <Select
                                    value={data.level}
                                    onValueChange={(value: 'beginner' | 'intermediate' | 'advanced') => setData('level', value)}
                                    disabled={processing}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select course level" />
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

                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="is_published"
                                    checked={data.is_published}
                                    onCheckedChange={checked => setData('is_published', checked)}
                                    disabled={processing}
                                />
                                <label
                                    htmlFor="is_published"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Published
                                </label>
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" disabled={processing}>
                                    {processing && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Save Changes
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </>
    );
}

EditCourse.layout = (page: React.ReactNode) => (
    <AuthenticatedLayout
        header={{
            items: [
                {
                    label: 'Courses',
                    href: route(`courses.index`),
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