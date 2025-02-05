import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GuestLayout from '@/layouts/guest-layout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <Card>
                <CardHeader>
                    <CardTitle>Forgot Password</CardTitle>
                    <CardDescription>
                        Forgot your password? No problem. Just let us know your email address and we
                        will email you a password reset link that will allow you to choose a new
                        one.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600">{status}</div>
                    )}

                    <form onSubmit={submit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoFocus
                            />
                            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={processing}>
                                Email Password Reset Link
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </GuestLayout>
    );
}
