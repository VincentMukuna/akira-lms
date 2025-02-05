import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import GuestLayout from '@/layouts/guest-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <Card>
                <CardHeader>
                    <CardTitle>Email Verification</CardTitle>
                    <CardDescription>
                        Thanks for signing up! Before getting started, could you verify your email
                        address by clicking on the link we just emailed to you? If you didn't
                        receive the email, we will gladly send you another.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {status === 'verification-link-sent' && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            A new verification link has been sent to the email address you provided
                            during registration.
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Button type="submit" disabled={processing}>
                                Resend Verification Email
                            </Button>

                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="text-sm text-primary underline hover:text-primary/90"
                            >
                                Log Out
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </GuestLayout>
    );
}
