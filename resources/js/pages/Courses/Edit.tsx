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
import { useImageUpload } from '@/hooks/use-image-upload';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { cn } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { ImagePlus, Loader2, Trash2, Upload, X } from 'lucide-react';
import React, { useCallback, useState } from 'react';

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
    const [isDragging, setIsDragging] = useState(false);

    const {
        previewUrl,
        fileName,
        fileInputRef,
        handleThumbnailClick,
        handleFileChange,
        handleRemove,
    } = useImageUpload({
        onUpload: (url) => {
            if (fileInputRef.current?.files?.[0]) {
                setData('cover_image', fileInputRef.current.files[0]);
            }
        },
    });

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

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);

            const file = e.dataTransfer.files?.[0];
            if (file && file.type.startsWith("image/")) {
                const input = fileInputRef.current;
                if (input) {
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(file);
                    input.files = dataTransfer.files;
                    handleFileChange({ target: input } as React.ChangeEvent<HTMLInputElement>);
                }
            }
        },
        [handleFileChange],
    );

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
                                <Input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    disabled={processing}
                                />

                                {!previewUrl && !course.cover_image ? (
                                    <div
                                        onClick={handleThumbnailClick}
                                        onDragOver={handleDragOver}
                                        onDragEnter={handleDragEnter}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                        className={cn(
                                            "flex h-64 cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:bg-muted",
                                            isDragging && "border-primary/50 bg-primary/5",
                                            processing && "opacity-50 cursor-not-allowed"
                                        )}
                                    >
                                        <div className="rounded-full bg-background p-3 shadow-sm">
                                            <ImagePlus className="h-6 w-6 text-muted-foreground" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-medium">Click to select</p>
                                            <p className="text-xs text-muted-foreground">
                                                or drag and drop file here
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-2">
                                                Recommended size: 1280x720. Max file size: 5MB.
                                                Supported formats: JPEG, PNG, WebP.
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <div className="group relative h-64 overflow-hidden rounded-lg border">
                                            <img
                                                src={previewUrl || course.cover_image!}
                                                alt="Course cover"
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
                                            <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                                <Button
                                                    size="sm"
                                                    variant="secondary"
                                                    onClick={(e)=>{e.preventDefault(); e.stopPropagation(); handleThumbnailClick()}  }
                                                    className="h-9 w-9 p-0"
                                                    disabled={processing}
                                                >
                                                    <Upload className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => {
                                                        handleRemove();
                                                        setData('cover_image', null);
                                                    }}
                                                    className="h-9 w-9 p-0"
                                                    disabled={processing}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        {fileName && (
                                            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                                                <span className="truncate">{fileName}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        handleRemove();
                                                        setData('cover_image', null);
                                                    }}
                                                    className="ml-auto rounded-full p-1 hover:bg-muted"
                                                    disabled={processing}
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}

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