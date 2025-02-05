import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                    Update your account's profile information and email address.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={submit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            autoComplete="name"
                        />
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            autoComplete="username"
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>

                    {mustVerifyEmail && user.email_verified_at === null && (
                        <div>
                            <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                                Your email address is unverified.
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="ml-2 text-sm text-primary underline hover:text-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:text-primary-foreground dark:hover:text-primary-foreground/90 dark:focus:ring-offset-gray-800"
                                >
                                    Click here to re-send the verification email.
                                </Link>
                            </p>

                            {status === 'verification-link-sent' && (
                                <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                    A new verification link has been sent to your email address.
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            Save
                        </Button>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
                        </Transition>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
